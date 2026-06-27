---
title: "Linxira OS 介绍"
date: 2026-06-27
description: "Linxira OS 是什么，为谁而建，为什么要做这个项目。"
lang: "zh"
---

# Linxira OS 介绍

**Linxira OS** 是一个独立的 Linux 发行版，专为科学计算和 AI 开发而构建。

## Linxira OS 是什么？

Linxira OS 是一个基于 Linux Mint（Ubuntu LTS 生态）的桌面 Linux 发行版。它预装了 KDE Plasma 桌面环境和一套精心挑选的开发与科学工具。

"Linxira" 这个名字结合了 "Linux" 和一个独特的标识符——它与任何现有的 Linux 发行版或硬件项目都没有关联。

## 为谁而建？

Linxira OS 面向三类主要用户：

### 1. 研究人员和科学家

- 需要 bioconda、Nextflow 和常用测序工具的生物信息学家
- 需要 Python 科学计算栈的物理学家和化学家
- 需要 LaTeX 撰写论文的任何人

### 2. 开发者

- 想用 mise 管理语言版本的全栈开发者
- 需要开箱即用环境的 Rust、Go、Node.js、Python 开发者
- 需要 CUDA、PyTorch 和本地大模型支持的 AI/ML 工程师

### 3. 学生

- 想要现代 Linux 桌面的计算机科学学生
- 需要 GUI 和终端工具的理科学生
- 想要配置完善的系统来学习 Linux 的任何人

## 设计理念

### 分层架构

我们相信关注点分离：

- **基础层**：Linux Mint 提供稳定性和硬件兼容性
- **平台层**：Linxira 工具提供跨生态源管理
- **可复现层**：mise + Miniforge + Distrobox 提供可移植环境
- **领域层**：通过配置文件交付科学和开发工具

### 不是所有东西都塞进 ISO

我们刻意避免把每个科学工具都塞进基础 ISO：

- 核心 ISO 包含必要的工具和包管理器
- 重型科学工具通过工作流模板提供
- 用户可以用 `linxira-config` 自定义环境

### 稳定宿主，滚动环境

宿主系统（Linux Mint）提供稳定性。开发环境可以通过以下方式滚动更新：

- mise 管理语言版本
- Miniforge 管理 Python/conda 包
- Distrobox 容器化 Arch Linux

## 核心特性

| 特性 | 说明 |
|------|------|
| KDE Plasma 桌面 | 现代、可定制的桌面环境 |
| btrfs + Timeshift | 系统快照，轻松回滚 |
| mise | 多语言版本管理器 |
| Miniforge3 | 带 bioconda 的科学计算 |
| Distrobox | 在容器中运行其他发行版 |
| OpenCode | AI 编程助手 |
| Linxira 配置中心 | 跨生态源配置工具 |

## 品牌标识

我们的视觉识别系统围绕**棱镜**概念构建——代表科学学科的光谱：

- **青绿** (#14b8a6) — 物理、生物
- **靛蓝** (#6366f1) — 化学、计算
- **紫色** (#8b5cf6) — 光谱末端

单字符 **L** 标识采用几何角度和光线折射元素，与其他 Linux 发行版 logo 有明显区别。

## 下一步

我们目前正在开发：

1. **v1.0 发布** — 包含所有核心功能的稳定桌面 ISO
2. **工作流模板** — 为科研、开发和 AI 预配置的环境
3. **配置中心** — 管理源和服务的 GUI + CLI 工具

在 [GitHub](https://github.com/Linxira-OS) 关注我们的进展。

---

*这是我们博客的第一篇文章。敬请期待关于发布、功能和技术深度解析的更新。*
