# 参与贡献 · Linxira 官网

[English version / 英文版](./CONTRIBUTING.md)

本仓库是 **Linxira 组织唯一的网站**：主站、博客，以及全部产品子站（`/bio-sdk/`、`/zeta/`）都在这里。完整的结构规则见 [AGENTS.md](./AGENTS.md)——改动前请先读完。本文是对贡献要求的精简版。

## 什么放这里

- 任何形式的文章——公告、技术文、基准报告、设计想法、系列专栏——不论讲的是哪个产品，都进**本仓库的博客**。
- 产品的 landing 页、功能页、demo 放在 `src/sites/<product>/`。
- 产品**代码**永远不放这里；它留在产品自己的仓库，且产品仓库必须对 fork / clone 的人保持干净。

## 基本规则

1. **中英文必须同时有。** 每个页面、每篇文章都同时提供中文（`zh`）与英文（`en`）。只交一半的贡献不合并。
2. **构建必须通过。** 提交前运行 `npx astro build`；构建不过的改动不合并。
3. **一次提交只做一件事。** 提交信息用 `<type>(<scope>): <简述>`，`type ∈ feat | fix | docs | refactor | chore`（如 `feat(blog): …`、`refactor(site): …`）。
4. **不提交构建产物与大体积二进制。** `dist/`、`node_modules/`、`.astro/` 已忽略，不要强加；不要加 ISO / 软件包二进制。
5. **导航只有一个来源。** 改 `src/components/Navbar.astro`（`navItems` / `products`），不要把 `<nav>` 复制进页面。
6. **产品链接一律用标准入口**（`/bio-sdk/`、`/zeta/`），不要链到带语言的具体路径。

## 新增博客文章（最常见的贡献）

1. 在 `src/data/blog.ts` 顶部追加一条（`slug`、`date`、`tag`、`zh {title, desc}`、`en {title, desc}`）。
2. 新建 `src/pages/zh/blog/<slug>/index.astro`。
3. 新建 `src/pages/en/blog/<slug>/index.astro`。
4. 照抄现有文章的结构与 `<style>` 块；代码块内的 `<`/`>` 写成 `&lt;`/`&gt;`；正文避免裸 `{ }`。
5. `npx astro build`，确认 `dist/zh/blog/<slug>/index.html` 与 `dist/en/blog/<slug>/index.html` 都已生成。

## 修改产品子站

- 代码在 `src/sites/<product>/`；路由在 `src/pages/<product>/{index, zh/index, en/index}.astro`。
- 子站首页必须是正经的产品宣传页（价值主张 → 信任点 → 能力 → 行动按钮），demo / workbench 只作为次级入口。
- 长文写成博客文章，从子站链过去，不要嵌进子站。

## 本地开发

```bash
npm ci
npm run dev        # http://localhost:4321
npx astro build    # 生产构建 → dist/
```

部署是自动的：推送 `master` 会触发 `.github/workflows/deploy.yml`。

## 贡献内容的许可

博客文章默认以 **CC BY 4.0** 发布（文章另有声明者除外）；提交文章即表示同意。站点代码遵循仓库许可证。

## 致 AI agent

如果你是 AI agent，请把 [AGENTS.md](./AGENTS.md) 当作强制规范。尤其是：不要把站点拆成多个 Pages 站点或子域名，不要把网站文件搬进产品仓库，不要跳过构建检查。
