// 博客文章唯一数据源。
// 首页「最新动态」与博客列表页共同消费这份数据；
// 新增文章只需在此追加一条记录（slug 对应 src/pages/{zh,en}/blog/<slug>/）。
// 顺序即展示顺序：最新的在前，旧文沉底。

export type BlogTag = "announcement" | "technical";

export interface BlogPost {
  slug: string;
  date: string;
  tag: BlogTag;
  zh: { title: string; desc: string };
  en: { title: string; desc: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "direct-arch-transition",
    date: "2026-08-15",
    tag: "announcement",
    zh: {
      title: "Linxira OS 现状：从 Mint 原型到 Direct Arch",
      desc: "为什么从 Linux Mint 转向 Direct Arch，现在的桌面超算定位、软件生态与自研工具链。",
    },
    en: {
      title: "Linxira OS Today: From a Mint Prototype to Direct Arch",
      desc: "Why Linxira moved from Linux Mint to Direct Arch — the desktop-supercomputer positioning, software ecosystem, and first-party toolchain.",
    },
  },
  {
    slug: "experimental-stable-2026-08-14",
    date: "2026-08-15",
    tag: "announcement",
    zh: {
      title: "首个实验性正式版：2026.08.14 发布说明",
      desc: "ISO 下载、发布要点、安装测试结果与从测试版以来的演进。",
    },
    en: {
      title: "First Experimental Stable: 2026.08.14 Release Notes",
      desc: "ISO download, release highlights, install-test results, and what changed since the betas.",
    },
  },
  {
    slug: "headless-mode",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "无头模式：桌面⇄计算一键切换",
      desc: "systemd 标准目标切换：关掉桌面、内存全给计算。",
    },
    en: {
      title: "Headless Mode: One-Command Switching Between Desktop and Compute",
      desc: "A standard systemd target switch that turns the desktop off and frees all RAM for compute.",
    },
  },
  {
    slug: "signed-repository-supply-chain",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "签名仓库：Linxira 的供应链安全设计",
      desc: "pacman 签名强制、发布密钥轮换与 PKGBUILD CI 门禁如何防篡改。",
    },
    en: {
      title: "Signed Repositories: Linxira's Supply-Chain Security Design",
      desc: "How mandatory pacman signatures, release-key rotation, and a PKGBUILD CI gate block tampering.",
    },
  },
  {
    slug: "catalog-v2-v3",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "一份审核目录驱动整个软件生态：catalog v2/v3",
      desc: "安装器、Welcome 与图形软件管理共享同一份审核元数据的架构。",
    },
    en: {
      title: "One Reviewed Catalog Driving the Whole Software Ecosystem: catalog v2/v3",
      desc: "The architecture behind one reviewed metadata source shared by the installer, Welcome, and graphical package management.",
    },
  },
  {
    slug: "btrfs-snapshots-rollback",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "btrfs 快照与 grub-btrfs：系统自愈与一键回滚",
      desc: "双内核兜底、更新前自动快照、GRUB 菜单直接回滚。",
    },
    en: {
      title: "btrfs Snapshots and grub-btrfs: Self-Healing and One-Key Rollback",
      desc: "Dual-kernel fallback, automatic pre-update snapshots, and direct rollback from the GRUB menu.",
    },
  },
  {
    slug: "ai-cli-toolchain",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "AI 编码代理一键装：镜像加速与六个 CLI",
      desc: "npm 源加速 + Claude Code、Codex、Gemini CLI、Grok、OpenCode 一键安装。",
    },
    en: {
      title: "AI Coding Agents in One Line: Mirror Acceleration and Six CLIs",
      desc: "npm mirror acceleration plus one-line installs of Claude Code, Codex, Gemini CLI, Grok, and OpenCode.",
    },
  },
  {
    slug: "newbie-guide-design",
    date: "2026-08-15",
    tag: "technical",
    zh: {
      title: "新手向导背后的设计：让 Linux 新手落地",
      desc: "终端基础、Arch Wiki 导航、中文输入法排查与桌面选择的页面设计。",
    },
    en: {
      title: "Designing the Beginner's Guide: Landing Linxira for Linux Newcomers",
      desc: "How the new beginner's guide covers terminal basics, Arch Wiki navigation, Chinese input troubleshooting, and desktop choice.",
    },
  },
  {
    slug: "introducing-linxira-os",
    date: "2026-06-27",
    tag: "announcement",
    zh: {
      title: "Linxira OS 介绍",
      desc: "Linxira OS 是什么，为谁而建，为什么要做这个项目。设计理念、技术架构和目标用户。",
    },
    en: {
      title: "Introducing Linxira OS",
      desc: "What is Linxira OS, who is it for, and why we built it. Design philosophy, technical architecture, and target users.",
    },
  },
];
