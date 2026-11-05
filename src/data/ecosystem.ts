// 站点「生态规模」数字的唯一入口 —— catalog 条目数 / 分类数 / 已审核数 / 自研包数。
// 页面里不要再硬编码 93、17、804 之类的数字，否则 catalog 与 packages 一长就会说谎。
//
// ── 标准口径（全站唯一，页面与文档都按这个说） ─────────────────────
//   软件目录   catalogTotal       catalog v3 里的 applications 条目总数（含审核中）
//   已审核     catalogReviewed    其中 review.status === "reviewed" 的条数
//   分类       catalogCategories  catalog 实际用到的 primaryCategory 个数
//   自研包     packageTotal       packages 仓里 linxira-* 包目录数
//   入组包     groupTotal         其中声明了 pacman 组 linxira 的包数
//   镜像       releases.iso.*     最新 ISO 的批次号 / 体积 / 日期
// 任何页面上的数字都必须来自这里，且标签用上面这组词，不要混用
// 「审核软件 / 精选应用 / 自研工具」这类同义词。
//
// snapshot 由 scripts/fetch-ecosystem-data.mjs 生成：
//   catalog  <- linxira-catalog 仓的 catalog/catalog-v3.json（raw）
//   packages <- GitHub Contents API 的 packages/packages 目录
// 部署时构建前会刷新；取不到就沿用仓库里的快照，页面永远有值。
import snapshot from './ecosystem.json';

export type EcosystemFacts = {
  generatedAt: string;
  sources: { catalog: string; packages: string };
  /** catalog v3 的软件条目总数 */
  catalogTotal: number;
  /** catalog v3 用到的分类数 */
  catalogCategories: number;
  /** review.status === "reviewed" 的条目数 */
  catalogReviewed: number;
  catalogVersion: number | null;
  catalogRelease: string | null;
  /** 其中真正并入 pacman 组 linxira 的包数（groups=('linxira')） */
  groupTotal: number;
  /** packages 仓里 linxira-* 子目录数（自研包） */
  packageTotal: number;
  packageNames: string[];
};

export const ecosystem = snapshot as unknown as EcosystemFacts;
