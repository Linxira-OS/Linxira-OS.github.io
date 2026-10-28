// 生成 src/data/releases.json —— 站点上所有「当前发布物」数字的唯一来源。
//
// 为什么需要它:镜像大小/SHA256/WSL 版本每次发布都会变,静态站原先靠人手同步,
// 已经出现过「r4 实际 5.34 GB 却写 5.0 GB」这类不一致。
//
// 取值来源(都无需 token):
//   ISO  —— 匿名 clone GitCode 仓库(--depth 1 --filter=blob:none),读 LFS 指针
//           `oid sha256:… / size …`,顺带拿到文件名。不下载 5 GB 实体。
//   WSL  —— GitHub Releases API 的 latest,再取 .sha256 附件内容。
//
// 失败策略:任一步失败就保留已有 releases.json 并打印警告,构建继续 ——
// 站点不能因为第三方接口抖动而挂掉。想让它硬失败用 --strict。
//
// 用法:node scripts/fetch-release-data.mjs [--strict]

import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'data', 'releases.json');

const ISO_REPO = 'https://gitcode.com/BOHUYESHAN-APB/Linxira-os.git';
const WSL_API = 'https://api.github.com/repos/Linxira-OS/linxira-wsl/releases/latest';
const STRICT = process.argv.includes('--strict');

const warnings = [];

function humanSize(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (bytes >= 1e6) return `${Math.round(bytes / 1e6)} MB`;
  if (bytes >= 1e3) return `${Math.round(bytes / 1e3)} KB`;
  return `${bytes} B`;
}

function dateFromName(name) {
  const m = /(\d{4})\.(\d{2})\.(\d{2})/.exec(name);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function labelFromName(name) {
  // linxira-2026.10.27-r4-x86_64.iso -> 2026.10.27-r4
  const m = /^linxira-(.+?)-x86_64\.iso$/.exec(name);
  return m ? m[1] : name;
}

/** ISO:匿名浅克隆 + blob:none,只读 LFS 指针,不拉 5 GB 实体。 */
function fetchIso() {
  const dir = mkdtempSync(join(tmpdir(), 'linxira-iso-'));
  try {
    execFileSync(
      'git',
      ['clone', '--depth', '1', '--filter=blob:none', '--no-checkout', '--quiet', ISO_REPO, dir],
      { stdio: ['ignore', 'ignore', 'pipe'], timeout: 120_000 },
    );
    const files = execFileSync('git', ['-C', dir, 'ls-tree', '-r', '--name-only', 'HEAD'], {
      encoding: 'utf8',
      timeout: 30_000,
    })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const isos = files.filter((f) => f.endsWith('.iso'));
    if (isos.length !== 1) throw new Error(`expected exactly one ISO in repo, found ${isos.length}`);
    const filename = isos[0];

    const pointer = execFileSync('git', ['-C', dir, 'cat-file', '-p', `HEAD:${filename}`], {
      encoding: 'utf8',
      timeout: 60_000,
    });
    const oid = /^oid sha256:([0-9a-f]{64})$/m.exec(pointer)?.[1];
    const size = Number(/^size (\d+)$/m.exec(pointer)?.[1]);
    if (!oid || !Number.isFinite(size)) throw new Error(`${filename} is not an LFS pointer`);

    // SHA256SUMS 是仓库里对外公布的清单,与指针交叉核对一次。
    let listed = null;
    try {
      const sums = execFileSync('git', ['-C', dir, 'cat-file', '-p', 'HEAD:SHA256SUMS'], {
        encoding: 'utf8',
        timeout: 30_000,
      });
      listed = /^([0-9a-f]{64})\s+\*?(.+)$/m.exec(sums.trim().split('\n')[0])?.[1] ?? null;
      if (listed && listed !== oid) warnings.push(`SHA256SUMS (${listed.slice(0, 8)}) != LFS oid (${oid.slice(0, 8)})`);
    } catch {
      warnings.push('SHA256SUMS missing or unreadable');
    }

    return {
      filename,
      label: labelFromName(filename),
      date: dateFromName(filename),
      sizeBytes: size,
      sizeHuman: humanSize(size),
      sha256: oid,
      sha256Short: `${oid.slice(0, 8)}…`,
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** WSL:GitHub Releases 的 latest 及其 .sha256 附件。 */
async function fetchWsl() {
  const res = await fetch(WSL_API, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'linxira-site-build' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const rel = await res.json();

  const assets = rel.assets ?? [];
  const tarball = assets.find((a) => a.name.endsWith('.tar.gz'));
  if (!tarball) throw new Error('no .tar.gz asset in latest WSL release');
  const sumAsset = assets.find((a) => a.name.endsWith('.sha256'));

  let sha256 = null;
  if (sumAsset) {
    const sres = await fetch(sumAsset.browser_download_url, { signal: AbortSignal.timeout(30_000) });
    if (sres.ok) sha256 = /^([0-9a-f]{64})/m.exec(await sres.text())?.[1] ?? null;
  }
  if (!sha256) warnings.push('WSL .sha256 asset missing; hash left as previous value');

  return {
    filename: tarball.name,
    tag: rel.tag_name ?? null,
    date: dateFromName(tarball.name) ?? (rel.published_at ?? '').slice(0, 10) ?? null,
    sizeBytes: tarball.size,
    sizeHuman: humanSize(tarball.size),
    sha256,
    sha256Short: sha256 ? `${sha256.slice(0, 8)}…` : null,
    downloadUrl: tarball.browser_download_url,
  };
}

function loadPrev() {
  if (!existsSync(OUT)) return null;
  try {
    return JSON.parse(readFileSync(OUT, 'utf8'));
  } catch {
    return null;
  }
}

const prev = loadPrev();
const next = {
  generatedAt: new Date().toISOString(),
  sources: { iso: ISO_REPO, wsl: WSL_API },
  iso: prev?.iso ?? null,
  wsl: prev?.wsl ?? null,
};

let bad = false;

try {
  next.iso = fetchIso();
  console.log(`iso  ${next.iso.filename}  ${next.iso.sizeHuman}  ${next.iso.sha256Short}`);
} catch (err) {
  bad = true;
  warnings.push(`ISO fetch failed: ${err.message} (keeping previous snapshot)`);
}

try {
  const wsl = await fetchWsl();
  // 哈希取不到时沿用旧值,避免把已知哈希抹成 null。
  if (!wsl.sha256 && next.wsl?.sha256) {
    wsl.sha256 = next.wsl.sha256;
    wsl.sha256Short = next.wsl.sha256Short;
  }
  next.wsl = wsl;
  console.log(`wsl  ${wsl.filename}  ${wsl.sizeHuman}  ${wsl.sha256Short}`);
} catch (err) {
  bad = true;
  warnings.push(`WSL fetch failed: ${err.message} (keeping previous snapshot)`);
}

for (const w of warnings) console.warn(`warn: ${w}`);

writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
console.log(`wrote ${OUT}`);

if (bad && STRICT) process.exit(1);
