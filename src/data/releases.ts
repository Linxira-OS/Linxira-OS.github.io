// 站点「当前发布物」数字的唯一入口 —— 镜像大小 / SHA256 / WSL 版本都从这里取,
// 页面里不要再硬编码,否则必然出现「r4 实际 5.34 GB 却写 5.0 GB」这类漂移。
//
// snapshot 由 scripts/fetch-release-data.mjs 生成:
//   ISO  <- 匿名 clone GitCode 仓库读 LFS 指针(oid + size)
//   WSL  <- GitHub Releases API 的 latest + .sha256 附件
// 部署时构建前会刷新;取不到就沿用仓库里的快照,页面永远有值。
//
// 大小统一按十进制(1 GB = 10^9 字节、1 MB = 10^6 字节),与页面口径一致。
import snapshot from './releases.json';

export type IsoFacts = {
  filename: string;
  /** 例:2026.10.27-r4 */
  label: string;
  /** 例:2026-10-27 */
  date: string;
  sizeBytes: number;
  /** 例:5.34 GB */
  sizeHuman: string;
  sha256: string;
  /** 例:9f62b11f… */
  sha256Short: string;
};

export type WslFacts = {
  filename: string;
  tag: string | null;
  date: string | null;
  sizeBytes: number;
  sizeHuman: string;
  sha256: string | null;
  sha256Short: string | null;
  downloadUrl: string;
};

export type ReleaseFacts = {
  generatedAt: string;
  sources: { iso: string; wsl: string };
  iso: IsoFacts;
  wsl: WslFacts;
};

export const releases = snapshot as unknown as ReleaseFacts;
