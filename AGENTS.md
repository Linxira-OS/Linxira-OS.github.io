# AGENTS — 维护指南（Linxira-OS.github.io）

本仓库是 **Linxira 官网**（Astro 静态站点，构建产物部署到 GitHub Pages）。本文档面向后续维护者与 AI agent，说明站点结构与导航维护规则。

## 站点结构

- `src/pages/<lang>/` — 页面源码，中英文各自维护（`zh/`、`en/`）。
- `src/components/` — 可复用组件。目前有 `Navbar.astro`（全站唯一导航来源）。
- `public/` — 静态资源；`public/bio-sdk/`、`public/packages/` 是独立产物，不经 Astro 编译。
- `public/packages/` — 自建软件二进制包（`.pkg.tar.zst`），体积大，勿纳入普通提交。
- `.github/workflows/deploy.yml` — 推送到 `master` 后自动构建并部署 GitHub Pages。

## 导航（banner）维护规则 —— 重要

- **全站顶部导航只有 `src/components/Navbar.astro` 一个来源**。任何页面顶部导航都通过
  `<Navbar lang="zh|en" active="..." />` 引入，**禁止**再在单页内复制粘贴 `<nav>` 代码。
- **新增/修改顶部导航项**：改 `Navbar.astro` 里的 `navItems` 数组，不要改模板。
- **新增/修改自建产品下拉项（Zeta / Bio SDK）**：改 `Navbar.astro` 里的 `products` 数组。
  `href` 指向产品落地页的标准跳转入口（如 `/zeta/`、`/bio-sdk/`，由各自 index 页做语言重定向），
  **不要改动产品子页面的标准跳转逻辑**。
- **语言切换按钮会自动保留当前页面路径**（`/zh/docs/install/` → `/en/docs/install/`），
  由组件内 `Astro.url.pathname` 计算，无需在页面里手写。
- **active 取值**：`home | docs | ecosystem | products | brand | roadmap | blog`；
  `home` 表示首页、无高亮项。

## 构建与验证

```bash
npm ci            # 安装依赖
npm run dev       # 本地开发（http://localhost:4321）
npx astro build   # 生产构建，产物在 dist/
```

改动后务必 `npx astro build` 通过再提交。部署由 CI 自动完成，等待约一小时后核对 GitHub Pages。