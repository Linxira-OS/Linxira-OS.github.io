---
title: "系统软件一览"
section: apps
order: 2
---

# 系统软件一览

Linxira 自带一组自研组件。**它们不是应用商店里的软件**，而是系统的一部分；这里按「出问题时找谁」组织。

## 一句话职责

| 组件 | 职责 | 入口 |
|---|---|---|
| `linxira-config` | 配置总入口：镜像、SSH、网络、安全、环境变量、诊断 | `linxira-config` / `linxira-config tui` |
| `linxira-components` | **唯一**的事务化安装/卸载：计划、确认、提权执行、回执 | `linxira-components` |
| `linxira-package-center` | 软件目录与已安装状态的图形界面 | 应用菜单 |
| `linxira-component-manager` | 组件与能力的图形界面 | 应用菜单 |
| `linxira-update` | 系统更新与更新托盘 | 托盘 / `linxira-update` |
| `linxira-welcome` | 首次启动引导与状态检查 | 首次登录自动弹出 |
| `linxira-crash-watch` | 崩溃诊断与调试工作区 | `linxira-crash` |
| `linxira-recovery-diagnostics` | 起不来时的恢复就绪检查与修复计划 | 恢复入口 |
| `linxira-kernel-manager` | 内核策略与启动状态 | 设置内 |
| `linxira-hardware-driver-manager` | 驱动策略、DKMS 报告 | 设置内 |
| `linxira-hwd-detector` | **只读**硬件检测，产出硬件事实 | 被其它组件调用 |
| `linxira-gaming-manager` | 游戏库、兼容层启动、用户备份 | 应用菜单 |
| `linxira-completion-agent` | 首次联网后的补全计划 | 自动/手动触发 |
| `linxira-catalog` | 软件目录数据（JSON），不是界面 | 被读取 |

## 该用哪个

| 你想做 | 用这个 | 不要用 |
|---|---|---|
| 装/卸软件 | `linxira-components` | 直接 `pacman -S` 跳过事务记录 |
| 换镜像源 | `linxira-config mirror` | 手改 `mirrorlist` |
| 开 SSH | `linxira-config ssh on` | 手动 `systemctl enable sshd` |
| 看系统状态 | `linxira-config status` | — |
| 系统崩了 | `linxira-recovery-diagnostics` | 反复重启 |
| 程序闪退 | `linxira-crash` / 崩溃窗口 | 只截图 |

## 权限模型

- 只读命令（`status`、`list`、`show`）**不需要 root**
- 写操作走 `linxira-components`，由 polkit 逐次询问
- 不要直接 `sudo`/`su`/`doas`/`run0` 执行这些组件的写路径

## 常驻情况

登录时自动启动的只有两个：`linxira-welcome`（仅首次）与更新托盘。
`linxira-crash-watch` 的守护单元目前**没有随包安装**，若需要常驻需手动启用（见已知问题）。

## 相关

- 命令行细节：[linxira-config 用例](/zh/docs/config-hub-examples/)
- 每个组件的设计边界：[Wiki 项目总览](https://linxira-os.github.io/linxira-wiki/项目总览/)
