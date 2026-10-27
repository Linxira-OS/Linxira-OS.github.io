---
title: "linxira-config 用例"
section: guide
order: 4
---

# linxira-config 用例

`linxira-config` 是系统配置的统一入口。这里按「你想做什么」组织，命令都是可直接复制的。

## 先看有什么

```bash
linxira-config help            # 完整命令表
linxira-config status          # 一屏总览
linxira-config info            # 硬件与系统信息
linxira-config capabilities    # 机器可读能力清单（给 agent 用）
```


## 软件源

```bash
linxira-config mirror arch list          # 候选镜像
linxira-config mirror arch speed tuna    # 测单个源
linxira-config mirror arch auto          # 探测并选最快的
linxira-config source                    # 查看当前启用的源
```


非系统源（用户级，不改系统文件）：

```bash
linxira-config mirror npm auto
linxira-config mirror pip set tuna
linxira-config mirror aur list
linxira-config mirror go set official
```


## 远程访问

```bash
linxira-config ssh on            # 安装 openssh、启用 sshd
linxira-config ssh status        # 连接信息与端口
linxira-config ssh port 2222
linxira-config ssh key generate work
linxira-config ssh key fingerprint work
linxira-config ssh authorized add "ssh-ed25519 AAAA..."
```


`rdp` 与 `vnc` 目前**禁用**：xrdp 尚未进入签名仓库，TigerVNC 的按用户策略也没定案。

## 网络诊断

```bash
linxira-config net diag          # 全量诊断
linxira-config net dns           # 当前 DNS
linxira-config net dns set 1.1.1.1
```


`net dns set` 会直接写 `/etc/resolv.conf`；若启用了 NetworkManager 的自动管理，重启后会被覆盖。

## 安全与防火墙

```bash
linxira-config security status
linxira-config security ufw on
linxira-config security ufw allow 22
linxira-config security ufw status
```


`security harden` 目前禁用，等待事务化后端。

## 快照与工作区守护

```bash
linxira-config timeshift status
sudo linxira-config timeshift enable
linxira-config workspace-guard status
sudo linxira-config workspace-guard enable
linxira-config workspace-guard handbook
```


`timeshift enable` 会启用 `linxira-timeshift-boot.timer` 与 `linxira-timeshift-daily.timer`，以及 `grub-btrfsd`。

## 软件目录（只读）

```bash
linxira-config catalog software --all
linxira-config catalog component list
linxira-config catalog bundle show science
linxira-config catalog software show firefox
```


安装动作不在这里 —— 走 `linxira-components`（唯一有事务计划的入口）。

## 运行时与工具链

```bash
linxira-config runtime status
linxira-config conda channels list
linxira-config conda channels add bioconda
linxira-config gpu status
linxira-config stack list
```


## 环境变量

```bash
linxira-config env list
linxira-config env set OMP_NUM_THREADS 8
linxira-config env get OMP_NUM_THREADS
linxira-config env unset OMP_NUM_THREADS
```


写入 `/etc/profile.d/linxira-env.sh`，对所有用户生效。

## 诊断日志

```bash
linxira-config logs collect      # 收集到 ~/linxira-logs/
linxira-config logs upload       # 上传并返回分享链接
```


提交 issue 前先跑 `collect`，比截图有用。

## 交互式菜单

```bash
linxira-config tui
```


不清楚命令名时用它，效果与直接敲命令一致。
