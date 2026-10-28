// 生成 src/data/bio-sdk.json —— Bio SDK 产品页上所有「版本与数量」的唯一来源。
//
// 为什么需要它:产品页此前把 v0.1.0、50+ 能力、108 文档、14 领域、30+ skills
// 全部写死,仓库到 1.1.0 / 120 / 117 / 32 / 40 之后整页数字全错。
//
// 取值来源(GitHub API,只读):
//   版本      —— main 分支 Cargo.toml 里第一个 `version = "x.y.z"`(workspace 版本)
//   能力/领域 —— capabilities/catalog.json 的 capabilities[].status / .category
//   文档数    —— git tree 里 docs/capabilities/<name>/ 的一级目录数
//   skills    —— git tree 里 skills/<name>/SKILL.md 的个数
//   工作流    —— git tree 里 workflows/org.linxira.<name>/ 的一级目录数
//   运行时    —— runtimes/catalog.json 的 providers 数
//
// 失败策略:任一步失败就保留已有 bio-sdk.json 并打印警告,构建继续 ——
// 站点不能因为 GitHub API 限流而挂掉。想让它硬失败用 --strict。
//
// 用法:node scripts/fetch-bio-sdk-data.mjs [--strict]

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'data', 'bio-sdk.json');

const REPO = 'Linxira-OS/linxira-bio-sdk';
const BRANCH = 'main';
const STRICT = process.argv.includes('--strict');
const TOKEN = process.env.GITHUB_TOKEN || '';

const headers = { 'User-Agent': 'linxira-site-fetch' };
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

const warnings = [];

async function api(path) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, { headers });
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
  return res.json();
}

async function raw(path) {
  const res = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}`, { headers });
  if (res.ok) return res.text();
  // 某些网络环境会拦 raw.githubusercontent.com；改用 API contents 接口取原文。
  const apiRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: { ...headers, Accept: 'application/vnd.github.raw' } },
  );
  if (!apiRes.ok) throw new Error(`raw ${path} -> HTTP ${res.status}, api fallback -> HTTP ${apiRes.status}`);
  return apiRes.text();
}

function topLevelDirs(paths, prefix, leaf) {
  const out = new Set();
  for (const p of paths) {
    if (!p.startsWith(prefix)) continue;
    const rest = p.slice(prefix.length);
    if (leaf && !rest.endsWith(leaf)) continue;
    const name = rest.split('/')[0];
    if (name && name !== leaf) out.add(name);
  }
  return out.size;
}

async function main() {
  const tree = await api(`/git/trees/${BRANCH}?recursive=1`);
  const paths = (tree.tree || []).map((e) => e.path);

  const cargo = await raw('Cargo.toml');
  const vm = cargo.match(/^version\s*=\s*"([^"]+)"/m);
  if (!vm) throw new Error('Cargo.toml 里找不到 version');
  const version = vm[1];

  const catalog = JSON.parse(await raw('capabilities/catalog.json'));
  const caps = Array.isArray(catalog.capabilities) ? catalog.capabilities : [];
  if (!caps.length) throw new Error('catalog.json 没有 capabilities 数组');

  const byStatus = { available: 0, experimental: 0, planned: 0 };
  const categories = new Set();
  for (const c of caps) {
    if (c.status in byStatus) byStatus[c.status] += 1;
    if (c.category) categories.add(c.category);
  }

  const providers = JSON.parse(await raw('runtimes/catalog.json'));
  const runtimeCount = Array.isArray(providers.providers) ? providers.providers.length : 0;

  const data = {
    version,
    capabilities: {
      total: caps.length,
      available: byStatus.available,
      experimental: byStatus.experimental,
      planned: byStatus.planned,
      categories: categories.size,
    },
    docs: topLevelDirs(paths, 'docs/capabilities/', null),
    skills: paths.filter((p) => /^skills\/[^/]+\/SKILL\.md$/.test(p)).length,
    workflows: topLevelDirs(paths, 'workflows/org.linxira.', null),
    runtimes: runtimeCount,
    fetchedAt: new Date().toISOString(),
    source: `github.com/${REPO}@${BRANCH}`,
  };

  if (!data.docs || !data.skills) warnings.push('文档数或 skills 数为 0，tree 可能被截断');

  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`bio-sdk: v${data.version} · ${data.capabilities.total} 能力(${data.capabilities.available} 可用) · ${data.docs} 文档 · ${data.capabilities.categories} 领域 · ${data.skills} skills · ${data.workflows} 工作流 · ${data.runtimes} 运行时`);
}

try {
  await main();
} catch (err) {
  warnings.push(String(err && err.message ? err.message : err));
  if (STRICT) {
    console.error('bio-sdk 数据抓取失败 --strict:', err);
    process.exit(1);
  }
  if (existsSync(OUT)) {
    const prev = JSON.parse(readFileSync(OUT, 'utf8'));
    console.warn(`bio-sdk 数据抓取失败，沿用快照 v${prev.version}:`, err.message);
  } else {
    console.warn('bio-sdk 数据抓取失败且无快照:', err.message);
  }
}

for (const w of warnings) console.warn('warn:', w);
