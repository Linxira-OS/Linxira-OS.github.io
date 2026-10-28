---
title: "软件源快速配置"
section: guide
order: 12
---

# 软件源快速配置

系统源、语言包源、AUR 源可以分开换。`linxira-config mirror` 负责探测与选择，不手改 `/etc/pacman.conf`。

## 先看现状

```bash
linxira-config source                 # 当前启用的包源
linxira-config mirror arch list       # 候选镜像（含官方与国内）
```

## 系统源（Arch）

```bash
linxira-config mirror arch auto       # 探测全部候选并选最快的
linxira-config mirror arch speed tuna # 只测清华源
linxira-config mirror arch set ustc   # 直接指定
linxira-config mirror arch reset      # 回到官方 geo 镜像
```

改完刷新索引：

```bash
sudo pacman -Syu
```

`linxira-config` 会写 `/etc/pacman.d/mirrorlist`；如果你手动编辑过这个文件，先备份。

## 语言与工具链源（用户级）

这些只影响当前用户，不需要 root：

```bash
linxira-config mirror npm auto
linxira-config mirror pip set tuna
linxira-config mirror go set official
```

| 类型 | 写入位置 | 影响 |
|---|---|---|
| `npm` | `~/.npmrc` | `npm install` |
| `pip` | `~/.config/pip/pip.conf` | `pip install` |
| `go` | `~/.config/go/env` | `go get` |

## AUR 源

```bash
linxira-config mirror aur list
linxira-config mirror aur set https://aur.tuna.tsinghua.edu.cn
linxira-config mirror aur reset
```

只接受 https 地址，且会校验格式。AUR 构建仍走 `yay`/`paru`，这里只换 Git 源。

## Flatpak

```bash
linxira-config mirror flatpak list
linxira-config mirror flatpak set flathub
```

## 什么时候不用 auto

- 内网有自建镜像 → 用 `set`
- 测速结果抖动很大（HK/JP 节点不稳定）→ 固定一个同城源
- 公司网络只放行特定域名 → 直接 `set`

换源后首次同步失败，先跑 `linxira-config net diag` 再 `mirror arch speed <id>`，不要连续 `reset` 反复试。

## 相关

- 包状态与安装：见[包管理器](/zh/docs/package-managers/)
- 网络排查：`linxira-config net diag`
