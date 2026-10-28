---
title: "SSH 快速配置"
section: guide
order: 13
---

# SSH 快速配置

`linxira-config ssh` 把「装 openssh、启用 sshd、放行端口、管密钥」收在一个入口里，不用手改 `sshd_config`。

## 开启与关闭

```bash
linxira-config ssh on        # 安装 openssh、启用并启动 sshd
linxira-config ssh status    # 状态、端口、可连接地址
linxira-config ssh off       # 停止并禁用 sshd
```

`on` 会同时允许密码认证。要只保留密钥登录，先把自己的公钥加进去（见下），再改 `/etc/ssh/sshd_config.d/` 关闭密码。

## 改端口

```bash
linxira-config ssh port 2222
linxira-config ssh status
```

改完记得在防火墙放行新端口，否则会被挡：

```bash
linxira-config security ufw allow 2222
```

## 密钥

```bash
linxira-config ssh key list                # 已生成的密钥
linxira-config ssh key generate work       # 生成 Ed25519
linxira-config ssh key show work           # 打印公钥
linxira-config ssh key fingerprint work    # 指纹
linxira-config ssh key remove work --yes
```

生成的私钥在 `~/.ssh/`，权限由命令处理。

## 授权公钥

```bash
linxira-config ssh authorized list
linxira-config ssh authorized add "ssh-ed25519 AAAA... user@host"
linxira-config ssh authorized remove <fingerprint> --yes
```

只接受单个公钥字符串，不接受文件路径。

## 从另一台机器连过来

```bash
ssh 用户名@<本机IP> -p 2222
```

`ssh status` 会直接给出可连接地址与端口。局域网连不上时按顺序查：

1. `linxira-config ssh status` —— 服务是否在跑
2. `linxira-config security ufw status` —— 端口是否放行
3. `linxira-config net diag` —— 本机网络栈

## 安全边界

- 公网暴露前一定改成密钥登录，并改默认端口
- `ssh on` 打开的是系统级 sshd，对所有用户生效
- RDP/VNC 目前不可用（xrdp 未进签名仓库），远程桌面请先用 SSH + X11 转发或其它方案

## 相关

- 远程桌面与端口转发：[远程访问](/zh/docs/remote-access/)
- 防火墙：[linxira-config 用例](/zh/docs/config-hub-examples/)
