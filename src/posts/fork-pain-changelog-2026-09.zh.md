---
title: "更新日志：分叉之痛的一轮系统性修复"
date: 2026-09-22
tag: announcement
lang: zh
desc: "linxira-update 0.1.3、Welcome 1.0.4 与下一版镜像安装器修复：所有权误判、COSMIC 灰卡、深色模式、国内镜像与 Flathub 预置；去除第三方发行版仓库依赖的最后一层。"
---

# 更新日志：分叉之痛的一轮系统性修复

> 2026-09-22。本轮修复覆盖更新工具、欢迎页与安装器三层，全部来自真实装机实测暴露的问题。涉及版本：`linxira-update 0.1.3`、`linxira-welcome 1.0.4`、下一版安装镜像（安装器侧改动已合入主线）。

## 分叉之后，痛在哪

Linxira OS 以 Arch 为底座分叉而来。分叉的第一个月，上游一致性带来的隐性假设开始逐个爆雷——这类问题在"别人装一次"的视角下才会现形：

### 1. 更新工具误报"无法判定所有权"

`pacman -Qmq` 在**没有外来包**时同样返回 1。旧代码把"空集"当作"检测失败"——于是把 `[linxira]` 仓库配置得越干净（这正是我们想要的终态），更新工具越是报错。修复后仅返回码 ≥2 才视为故障。同批修复还包括：检查超时 30s → 120s（国内网络拉取全量数据库经常超过 30 秒，"慢"被误判成"卡死"），以及 checkupdates 遇到偶发下载失败时自动重试一次。

### 2. 包名 ≠ 二进制名：COSMIC 灰卡三连

Arch 的 `cosmic-terminal` 包，装出来的二进制叫 **`/usr/bin/cosmic-term`**。欢迎页的「终端」「Config CLI」两张卡都在检查一个不存在的路径，在 COSMIC 下永远灰着；`linxira-update --launch` 的终端回退链也因三个候选全落空而"点击无反应"。「系统设置」卡则硬编码了 KDE 的 `systemsettings`。三个问题一并修复：按桌面环境回退候选（`cosmic-term` → `konsole` → `xterm`；`cosmic-settings` → `systemsettings`）。

### 3. 深色模式跟随桌面

Qt 在 COSMIC 下没有平台主题插件，深色桌面配白色窗口非常刺眼。Welcome 1.0.4 现在读取 freedesktop `color-scheme` portal（`org.freedesktop.appearance`），检测到深色偏好时应用 Fusion 深色调色板，高亮色与品牌青一致。

### 4. 安装器：镜像策略本地化 + 服务器路径松绑

- **中文安装自动国内镜像优先**：安装语言为中文时，目标机 mirrorlist 直接写入清华/中科大/阿里/南大镜像，不再依赖 reflector 全球排序——"可达"不等于"快"，国外镜像曾把首次更新拖到超时。非中文安装保持原逻辑。
- **Flathub 国内源预置**：`/etc/flatpak/remotes.d` 预置上海交大镜像的 Flathub 定义，cosmic-store 开箱可用（上游 `dl.flathub.org` 国内基本不可达）。
- **sddm / cronie 服务降为非强制**：服务器与最小安装路径不再因个别服务名变更而硬失败。

## 去除第三方发行版仓库依赖

Linxira 分叉时继承的隐性依赖正在清零：包构建 CI 的 `check-boundaries.sh` 一直禁止 PKGBUILD 引用 CachyOS / AUR / Seafoam 源；安装介质只含 **Arch 官方仓库 + 签名的 `[linxira]` 自建仓库**，内核使用官方 `linux` / `linux-lts`，不携带任何第三方发行版构建件。剩下的只是几条"参数参照"注释（zram、sysctl 调优值）——那是致敬，不是依赖。

## 接下来

下一步是**全量 Linux 自举式系统开发**：用自建工具链（Bio SDK、Zeta）逐步把"借来的底座"换成自己掌控的每一层。路线细节见同日另一篇《从 Omarchy 说起》。
