# AGENTS — 维护规范（Linxira-OS.github.io）

本仓库是 **Linxira 官网**（Astro 5 静态站点，推送 `master` 后由 GitHub Actions 构建并部署到 GitHub Pages）。本文档面向后续维护者与 AI agent，是本仓库的**唯一结构与流程规范**。改动前先读完；与本文冲突的做法一律不采用。

> English summary at the end of this file.

---

## 1. 定位与架构原则（为什么这样组织）

1. **单仓库、单站点、一个域名。** 整个 Linxira 组织的 Web 呈现只有这一个仓库、一次部署、一个域名根（当前 `linxira-os.github.io`，未来自定义域名绑定一次即全站生效）。
2. **路径式子站，不拆仓库。** 每个产品以路径子站形式存在（`/bio-sdk/`、`/zeta/`），代码放在 `src/sites/<product>/`。**不要**为产品另建 Pages 站点或子域名——那会带来域名冲突、跨仓链接断裂和多套部署。
3. **产品仓库保持纯净。** `linxira-bio-sdk`、`linxira-zeta` 等产品仓库**只放产品代码**，不放网站、宣传页、杂文、设计说明。别人 fork / clone 产品仓库拿到的必须是干净的代码。
4. **所有文章只有一个家。** 公告、技术文章、基准报告、设计想法、系列文——全部进本仓库的博客。产品子站只做产品呈现（landing / demo / 文档入口），长文一律链回博客。
5. **站内跳转只在本仓库内发生。** 主站 ↔ 博客 ↔ 子站的互链都是站内相对路径，不依赖其他仓库的 Pages。这样任何产品仓库日后迁移组织或合并，网站链接都不会断。

---

## 2. 目录结构（真实结构，改动后同步更新本节）

```
src/
  pages/
    index.astro              根路径语言重定向
    zh/  en/                 主站页面（首页/博客/文档/下载/路线图…），中英各一份
    zh/blog/<slug>/index.astro   博客文章页（中文）
    en/blog/<slug>/index.astro   博客文章页（英文）
    bio-sdk/  zeta/          产品子站的路由入口：index.astro 做语言重定向，
                             zh/ en/ 下的页面仅 import 子站 layout，不写内容
  sites/
    bio-sdk/                 bio-sdk 子站：BioSDKLayout.astro + components/
    zeta/                    zeta 子站：ZetaLayout.astro
  components/                主站共享组件：Navbar / PageLayout / DocsLayout / SiteShared
  data/blog.ts               博客文章唯一数据源（注册表）
  content/                   Astro 内容集合（历史遗留，blog/ 仅 1 篇旧文；新文章不走这里）
public/                      静态资源（`public/bio-sdk/`、`public/packages/` 为独立产物，不经 Astro 编译）
.github/workflows/deploy.yml 推送 master 自动构建部署
```

**产品子站边界**：`src/sites/<product>/` 内的代码只能被 `src/pages/<product>/` 下的路由文件引用；主站页面不 import 子站组件，子站也不 import 主站页面（可共用 `src/components/` 的共享组件）。

---

## 3. 内容归属：什么放这里，什么不放

| 内容 | 放哪 |
|---|---|
| 公告、版本发布、技术文章、基准/实测报告、设计想法、系列专栏 | **本仓库博客**（`data/blog.ts` + 双语文章页） |
| 产品 landing、功能介绍、demo、文档入口 | 本仓库 `src/sites/<product>/` |
| 产品代码、README、CHANGELOG、API 文档源 | 产品自己的仓库（不要搬到这里） |
| 大体积二进制（ISO、软件包） | 不入本仓库普通提交；`public/packages/` 只放已有产物，勿追加 |

判断标准：**一篇“文章”不论讲的是哪个产品，都进博客**；**一个“页面”属于产品呈现，进子站**。

---

## 4. 新增博客文章（Markdown 直投，两份文件即可）

1. **中文稿**：新建 `src/content/blog/<slug>.zh.md`——frontmatter 含 `title / date / tag（announcement|technical）/ lang: zh / desc`，正文即 Markdown（标题从 `##` 起排，H1 与顶部说明 blockquote 可保留，渲染样式由模板统一提供）。
2. **英文稿**：新建 `src/content/blog/<slug>.en.md`，同 frontmatter 结构、`lang: en`、正文为英文。**两种语言缺一不可**，缺的语言会出现列表死链。
3. 完成。路由由 `src/pages/{zh,en}/blog/[slug].astro` 自动生成（`/zh/blog/<slug>/`、`/en/blog/<slug>/`），列表与首页「最新动态」由 `src/data/allPosts.ts` 自动合并，无需注册。

规范：
- 文件名必须以 `.zh.md` / `.en.md` 结尾（语言即文件名后缀）。
- 涉及产品的文章在正文开头 blockquote 中加产品页链接：`[Linxira Bio SDK](/bio-sdk/)`（标准入口路径，见第 5 节）。
- 旧手写文章（`src/pages/{zh,en}/blog/<slug>/index.astro` + `data/blog.ts` 注册）为遗留机制，仅维护不再新增；新文章若与旧文同 slug 会路由冲突。
- `data/blog.ts` 仅作旧文注册表，不要再往里加新条目。

---

## 5. 产品子站规则

- 子站入口的**标准跳转路径**是 `/<product>/`（如 `/bio-sdk/`、`/zeta/`），由 `src/pages/<product>/index.astro` 做语言重定向。站内所有指向产品的链接都用这个路径，**不要**直接链到 `/bio-sdk/zh/`。
- 子站首页必须是**产品宣传页**（价值主张 → 信任点 → 能力 → 行动按钮），demo / workbench 等演示内容作为次级入口，不能一进站就是演示界面。
- 子站里不写长文；深度内容写成博客文章，子站放摘要与「阅读完整报告 →」链接。
- 新增产品子站：建 `src/sites/<product>/` + `src/pages/<product>/{index,zh/index,en/index}.astro`，并在 `Navbar.astro` 的 `products` 数组加入口。

---

## 6. 导航（banner）规则

- **全站顶部导航只有 `src/components/Navbar.astro` 一个来源。** 任何页面通过 `<Navbar lang="zh|en" active="…" />` 引入，**禁止**在单页内复制 `<nav>`。
- 顶部导航项改 `navItems` 数组；自建产品下拉项改 `products` 数组（`href` 用第 5 节的标准入口路径）。
- 语言切换按钮自动保留当前路径（组件内按 `Astro.url.pathname` 计算），页面里不要手写。
- `active` 取值：`home | docs | ecosystem | products | brand | roadmap | blog`。

---

## 7. 双语要求

主站与子站**每个页面都必须同时有 zh 与 en**。新增页面、新增文章、改导航文案，都要同步两种语言；不允许只交一半。译文以中文为准确性基准，英文表达自然即可，不逐字直译。

---

## 8. 构建与验证门禁

```bash
npm ci             # 安装依赖
npm run dev        # 本地开发 http://localhost:4321
npx astro build    # 生产构建，产物在 dist/
```

- **每次改动提交前必须 `npx astro build` 通过**；新增文章还要确认 `dist/zh/blog/<slug>/index.html` 与 `dist/en/blog/<slug>/index.html` 都生成。
- 只提交源码：`dist/`、`node_modules/`、`.astro/`、`.mimosa/` 已在 `.gitignore`，不要强加。
- 部署由 `deploy.yml` 在推送 `master` 后自动完成，通常数分钟内生效；CDN 可能缓存旧页面，验收时带 query 参数刷新。

---

## 9. 提交信息

沿用现有风格：`<type>(<scope>): <中文简述>`，type ∈ `feat | fix | docs | refactor | chore`，scope 如 `blog | site | bio-sdk | zeta | nav`。一次提交只做一类事（文章、重构、文档分开提交）。

---

## 10. 禁止事项

- 不为产品另开 Pages 站点/子域名；不把网站文件放进产品仓库
- 不在子站放长文；不在主站页面 import 子站组件
- 不只写一种语言；不跳过 `astro build`
- 不复制 `<nav>`；不手写语言切换
- 不提交构建产物与大体积二进制
- 不为新文章往 `data/blog.ts` 注册表加条目（它只存 2026-09 前的手写旧文）

---

## English summary

- **One repo, one site, one domain.** All Linxira web presence lives here; products are **path-based sub-sites** (`/bio-sdk/`, `/zeta/`) under `src/sites/<product>/`. Never create separate Pages sites or subdomains; never put website files in product repos (they must stay clean for forks/clones).
- **Every article goes to the blog here**, regardless of product. Sub-sites are product landing pages only and link back to blog posts for long-form content.
- **Adding a post = 2 markdown files**: `src/content/blog/<slug>.zh.md` and `<slug>.en.md` with frontmatter (`title / date / tag / lang / desc`). Routes, lists and the homepage "latest" feed pick them up automatically. The old `data/blog.ts` registry is legacy-only.
- **Both zh and en are mandatory** for every page and post.
- Product entry links use the canonical path `/<product>/` (language redirect handled by `src/pages/<product>/index.astro`).
- Navigation has a single source: `src/components/Navbar.astro` (`navItems`, `products` arrays). Never copy `<nav>` into pages.
- **`npx astro build` must pass before every commit.** Deployment is automatic on push to `master`.
- Commit style: `<type>(<scope>): <summary>`; one concern per commit.
