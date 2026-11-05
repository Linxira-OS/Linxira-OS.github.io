// 生成 src/data/ecosystem.json —— 站点上「生态规模」数字的唯一来源。
//
// 为什么要它:首页/发布页/生态页原来手写「93 款审核软件」「17 个自研工具」
// 「804 个离线包」，全部是某一时刻的快照，之后 catalog 与 packages 继续增长，
// 页面就开始说谎。这里把数字变成构建产物：每次构建前重新抓取，取不到才沿用快照。
//
// 取值来源（都无需 token）：
//   catalog  —— linxira-catalog 仓的 catalog/catalog-v3.json（raw）
//               总数 / 分类数 / 已审核数量（review.status === "reviewed"）
//   packages —— GitHub Contents API 列 packages/packages 目录，
//               linxira-* 子目录数 = 自研包数量
//
// 失败策略：任一步失败就保留已有 ecosystem.json 并打印警告，构建继续。
// 想让它硬失败用 --strict。
//
// 用法: node scripts/fetch-ecosystem-data.mjs [--strict]

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'data', 'ecosystem.json');
const STRICT = process.argv.includes('--strict');

const PKGBUILD_RAW = 'https://raw.githubusercontent.com/Linxira-OS/packages/main/packages';
const CATALOG_URL =
  'https://raw.githubusercontent.com/Linxira-OS/linxira-catalog/main/catalog/catalog-v3.json';
const PACKAGES_API = 'https://api.github.com/repos/Linxira-OS/packages/contents/packages';
const packagesRepoUrl = 'https://github.com/Linxira-OS/packages';

const warnings = [];

async function getText(url) {
  const headers = {
    'user-agent': 'linxira-site-data-fetcher',
    accept: 'text/plain, */*'
  };
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    return execFileSync('curl', ['-sSL', '--max-time', '20', url], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  }
}

async function getJson(url) {
  const headers = {
    'user-agent': 'linxira-site-data-fetcher',
    accept: 'application/vnd.github+json, application/json'
  };
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // 本地网络里 node fetch 可能不走系统代理；curl 会。用它兜底。
    const args = ['-sSL', '--max-time', '25', '-H', `user-agent: ${headers['user-agent']}`,
      '-H', `accept: ${headers.accept}`, url];
    const out = execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
    try {
      return JSON.parse(out);
    } catch {
      throw new Error(`${url} -> fetch: ${err.message}; curl 返回无法解析`);
    }
  }
}

/** catalog：总数 / 分类数 / 已审核数。 */
async function fetchCatalog() {
  const data = await getJson(CATALOG_URL);
  const apps = data?.applications;
  if (!Array.isArray(apps) || apps.length === 0) throw new Error('catalog: applications 为空');

  const categories = new Set();
  let reviewed = 0;
  for (const app of apps) {
    if (app?.primaryCategory) categories.add(app.primaryCategory);
    const status = app?.review?.status ?? app?.status;
    if (status === 'reviewed') reviewed++;
  }
  return {
    catalogTotal: apps.length,
    catalogCategories: categories.size,
    catalogReviewed: reviewed,
    catalogVersion: data.catalogVersion ?? null,
    catalogRelease: data.release ?? null
  };
}

/** packages：linxira-* 子目录数。 */
async function fetchPackages() {
  const entries = await getJson(PACKAGES_API);
  if (!Array.isArray(entries)) throw new Error('packages: 返回不是数组');
  const dirs = entries.filter((e) => e.type === 'dir').map((e) => e.name);
  const firstParty = dirs.filter((name) => name.startsWith('linxira-'));
  if (firstParty.length === 0) throw new Error('packages: 未找到 linxira-* 目录');
  return {
    packageTotal: firstParty.length,
    packageNames: firstParty.sort()
  };
}

/**
 * 自研包里有几个真正并入 pacman 组 `linxira`（groups=('linxira')）。
 * 首页终端会跑 `pacman -Sg linxira | wc -l`，这个数字必须来自真实 PKGBUILD，
 * 不能手写——之前手写的 "linxira-meta"、假包数都被指出来了。
 */
async function fetchGroupCount(names) {
  let total = 0;
  for (const name of names) {
    let src = await getText(`${PKGBUILD_RAW}/${name}/PKGBUILD`);
    if (!src || src.trim().length < 20) {
      // 单次抓取失败会让计数偏小——重试一次，仍失败就整步失败、保留旧快照
      src = await getText(`${PKGBUILD_RAW}/${name}/PKGBUILD`);
    }
    if (!src || src.trim().length < 20) throw new Error(`PKGBUILD 拉取失败: ${name}`);
    if (/groups=\(\s*'linxira'\s*\)/.test(src)) total++;
  }
  if (total === 0) throw new Error('未在 PKGBUILD 里找到任何 groups=(linxira)');
  return { groupTotal: total };
}

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

const next = {
  generatedAt: new Date().toISOString(),
  sources: { catalog: CATALOG_URL, packages: packagesRepoUrl },
  ...previous
};

let ok = true;
for (const [name, fn] of [
  ['catalog', fetchCatalog],
  ['packages', fetchPackages],
  ['group', async () => fetchGroupCount(next.packageNames ?? previous.packageNames ?? [])]
]) {
  try {
    Object.assign(next, await fn());
    console.log(`✓ ${name}`);
  } catch (err) {
    ok = false;
    warnings.push(`${name}: ${err.message}`);
    console.warn(`! ${name} 失败：${err.message}`);
  }
}

if (!ok && Object.keys(previous).length === 0) {
  console.error('没有可用快照，无法生成 ecosystem.json');
  if (STRICT) process.exit(1);
}

next.generatedAt = new Date().toISOString();
writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n', 'utf8');
console.log(`wrote ${OUT}`);
if (warnings.length) console.warn(`warnings: ${warnings.length}`);
if (warnings.length && STRICT) process.exit(1);
