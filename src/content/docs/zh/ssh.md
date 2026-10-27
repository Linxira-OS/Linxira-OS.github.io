---
title: "SSH 快速配置"
section: guide
order: 13
---

# SSH 快速配置

<div class="warn">⚠️ 现状说明：SSH 相关子命令仍在完善，<strong>可能存在缺陷</strong>（尤其是改端口与防火墙联动、已有配置的合并）。启用前请确认 root 账户与日常账户的密码足够强，不要把 SSH 直接暴露到公网后再补配置。建议装好后手动核对 <code>/etc/ssh/sshd_config.d/</code> 的实际内容，不要完全依赖一条命令。</div>

`linxira-config ssh` 把「装 openssh、启用 sshd、放行端口、管密钥」收在一个入口里，但每条命令的提权要求不同。

## 哪些命令要 sudo

<table>
<tr><th>命令</th><th>需要 sudo</th><th>原因</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>否</td><td>只读查询</td></tr>
<tr><td><code>linxira-config ssh key …</code></td><td>否</td><td>只写当前用户的 <code>~/.ssh</code></td></tr>
<tr><td><code>linxira-config ssh authorized …</code></td><td>否</td><td>只写当前用户的 <code>~/.ssh/authorized_keys</code></td></tr>
<tr><td><code>linxira-config ssh on / off / port</code></td><td><strong>是</strong></td><td>改 <code>/etc/ssh/sshd_config.d/</code>、操作 sshd 服务</td></tr>
<tr><td><code>linxira-config security ufw …</code></td><td><strong>是</strong></td><td>改防火墙规则</td></tr>
<tr><td><code>linxira-config net diag</code></td><td>否</td><td>只读诊断</td></tr>
</table>

<p><code>linxira-config</code> <strong>不会自动提权</strong>：需要 root 的子命令在普通用户下会直接报错并提示使用 sudo。</p>

## 开启与关闭

```
sudo linxira-config ssh on
linxira-config ssh status
sudo linxira-config ssh off
```

<p><code>on</code> 会安装 openssh、写入 <code>PasswordAuthentication yes</code>、启用并启动 sshd；如果 UFW 已启用，同时放行当前端口。</p>

## 改端口

```
sudo linxira-config ssh port 2222
linxira-config ssh status
sudo linxira-config security ufw allow 2222
```

<p>改完端口必须在防火墙放行新端口，否则连接会被挡；UFW 未启用时这一步可跳过。改完先在本机 <code>ssh 用户名@127.0.0.1 -p 2222</code> 验证，再断开现有会话。</p>

## 密钥

<p>以下命令都以<strong>当前用户</strong>身份运行，不需要 sudo；私钥落在 <code>~/.ssh/</code>，权限由命令处理。</p>

```
linxira-config ssh key generate work
linxira-config ssh key list
linxira-config ssh key show work
linxira-config ssh key fingerprint work
linxira-config ssh key remove work --yes
```

## 授权公钥

```
linxira-config ssh authorized list
linxira-config ssh authorized add "ssh-ed25519 AAAA... user@host"
linxira-config ssh authorized remove SHA256:xxxx --yes
```

<p><code>authorized add</code> 只接受<strong>一个纯公钥字符串</strong>（不是文件路径），并且拒绝带 <code>command=</code>、<code>environment=</code> 等 options 的条目——这是刻意的安全设计。要授权多把密钥就执行多次。</p>

## root 与密码安全

<p>默认配置是 <code>PermitRootLogin prohibit-password</code>：root 只能用密钥登录，不能用密码。除非你非常清楚后果，<strong>不要改成 <code>yes</code></strong>。</p>

<p>日常操作请用普通账户加 sudo，不要用 root 长期登录。确认当前生效的配置（只读，需要 sudo 读取系统配置）：</p>

```
sudo sshd -T | grep -E '^(port|permitrootlogin|passwordauthentication)'
```

<p>要彻底关闭密码登录，只保留密钥：先把公钥加入 <code>authorized_keys</code> 并验证能登录，再创建配置片段：</p>

```
sudo tee /etc/ssh/sshd_config.d/99-linxira-hardening.conf > /dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF
sudo systemctl restart sshd
```

<p>重启后<strong>不要关闭当前会话</strong>，另开一个终端验证新连接成功，再决定是否退出。</p>

<div class="note">
<p>账户密码强度仍然重要：sudo、本地登录、以及尚未关闭密码认证的 SSH 都依赖它。可选加固：<code>sudo pacman -S fail2ban</code> 后启用 <code>fail2ban.service</code>，减少暴力破解尝试。</p>
</div>

## 从另一台机器连过来

```
ssh 用户名@192.168.1.100 -p 22
```

<p><code>ssh status</code> 的 <code>Connect:</code> 行会直接给出地址与端口。</p>

## 连不上时的排查顺序

1. `linxira-config ssh status` —— 服务是否在跑、端口是多少
2. `linxira-config security ufw status` —— 端口是否放行
3. `linxira-config net diag` —— 本机网络栈是否正常
4. `sudo sshd -T | grep -E '^(port|listenaddress)'` —— sshd 实际监听端口与地址

## 安全边界

- `ssh on` 打开的是系统级 sshd，对所有账户生效
- 公网暴露前必须先改成密钥登录，并考虑改端口或走 Tailscale / ZeroTier 组网
- RDP / VNC 目前不可用（xrdp 未进签名仓库），远程桌面请用 SSH + X11 转发或其它方案

## 相关

- 远程访问完整流程：[远程访问](/zh/docs/remote-access/)
- 防火墙与安全：[linxira-config 用例](/zh/docs/config-hub-examples/)
