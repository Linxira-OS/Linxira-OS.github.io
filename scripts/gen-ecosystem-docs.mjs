// 用 catalog v3 重新生成应用清单页：
//   src/content/docs/zh/ecosystem.md
//   src/content/docs/en/ecosystem.md
//
// 为什么需要它：这两页原来是手抄的应用清单（13x 张卡），catalog 继续增长后
// 页头写着 107 条、清单却只有 93 张卡，还夹着 4 个不在 catalog 里的包。
// 现在清单直接由 catalog v3 生成，卡片、分类标题里的计数、页头总数三者同源。
//
// 用法：
//   node scripts/gen-ecosystem-docs.mjs            # 生成
//   node scripts/gen-ecosystem-docs.mjs --check    # 只校验，落后于 catalog 时退出码 1
//
// 生成范围：frontmatter + 返回链接 + <h1> + 导语之后的全部内容（分类小节与卡片）。
// 导语之上的手写内容原样保留。

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CATALOG_URL =
  'https://raw.githubusercontent.com/Linxira-OS/linxira-catalog/main/catalog/catalog-v3.json';
const CHECK = process.argv.includes('--check');

async function getJson(url) {
  const headers = {
    'user-agent': 'linxira-site-docs-gen',
    accept: 'application/vnd.github+json, application/json'
  };
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    const out = execFileSync(
      'curl',
      ['-sSL', '--max-time', '25', '-H', `user-agent: ${headers['user-agent']}`, url],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
    );
    try {
      return JSON.parse(out);
    } catch {
      throw new Error(`${url} -> fetch: ${err.message}; curl 输出不可解析`);
    }
  }
}

const catalog = await getJson(CATALOG_URL);
const apps = catalog.applications ?? [];
const categories = (catalog.categories ?? []).filter((c) => c.id.startsWith('app-'));

const LOCALES = [
  { key: 'zh_CN', file: 'zh', back: '← 返回文档', h1: '软件生态', tagRec: '推荐', tagProp: '专有' },
  { key: 'en', file: 'en', back: '← Back to Docs', h1: 'Ecosystem', tagRec: 'Recommended', tagProp: 'Proprietary' }
];

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function card(app, loc) {
  const name = app.name?.[loc.key] ?? app.name?.en ?? app.id;
  const desc = app.description?.[loc.key] ?? app.description?.en ?? '';
  const pkgs = (app.artifact?.ids ?? [app.id]).join(' ');
  const tags = [];
  if (app.presentation?.recommended) tags.push(`<span class="tag rec">${loc.tagRec}</span>`);
  if (app.license?.classification === 'proprietary') tags.push(`<span class="tag prop">${loc.tagProp}</span>`);
  return [
    '<div class="app-card">',
    `<h3>${esc(name)}</h3>`,
    `<div class="pkg">${esc(pkgs)}</div>`,
    `<p>${esc(desc)}</p>`,
    ...tags,
    '',
    '</div>'
  ].join('\n');
}

function body(loc) {
  const out = [];
  for (const cat of categories) {
    const list = apps
      .filter((a) => a.primaryCategory === cat.id)
      .sort(
        (a, b) =>
          (a.presentation?.order ?? 0) - (b.presentation?.order ?? 0) ||
          String(a.id).localeCompare(String(b.id))
      );
    if (!list.length) continue;
    const title = cat.name?.[loc.key] ?? cat.name?.en ?? cat.id;
    out.push(
      `<h2>${esc(title)} <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(${list.length})</span></h2>`,
      '<div class="app-grid">',
      ...list.map((a) => card(a, loc)),
      '</div>'
    );
  }
  return out.join('\n') + '\n';
}

/** 保留导语（到最后一个 <p> 结束），替换其后的清单。 */
function rebuild(src, loc) {
  const marker = `\n<h2>`;
  const idx = src.indexOf(marker);
  if (idx < 0) throw new Error(`${loc.file}: 找不到第一个 <h2>，无法定位清单起点`);
  const head = src.slice(0, idx);
  return head.replace(/\n+$/, '\n') + '\n' + body(loc);
}

let drifted = false;
for (const loc of LOCALES) {
  const path = join(ROOT, 'src/content/docs', loc.file, 'ecosystem.md');
  const src = readFileSync(path, 'utf8');
  const next = rebuild(src, loc);
  if (next === src) {
    console.log(`${loc.file}: up to date`);
    continue;
  }
  if (CHECK) {
    console.log(`${loc.file}: DRIFT against catalog v3`);
    drifted = true;
  } else {
    writeFileSync(path, next, 'utf8');
    console.log(`${loc.file}: regenerated (${apps.length} entries, ${categories.length} categories)`);
  }
}

if (CHECK && drifted) process.exit(1);
