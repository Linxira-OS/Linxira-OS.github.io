---
title: "远程访问"
section: guide
order: 7
---

<a href="/zh/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← 返回文档</a>
<h1>远程访问：SSH</h1>
<p>Linxira OS 内置 OpenSSH 服务端与 <code>linxira-config</code> SSH 管理工具。本文把一台 Linxira 电脑变成可远程连接的服务器，并说明每一步的权限与风险。</p>

<div class="warn">⚠️ SSH 相关子命令仍在完善，<strong>可能存在问题</strong>（改端口与防火墙联动、与已有配置的合并尤其如此）。启用前请确认 root 与日常账户密码足够强；建议开启后手动核对 <code>/etc/ssh/sshd_config.d/</code> 的实际内容，再决定是否暴露到公网。</div>

<h2>0. 先分清哪些命令要 sudo</h2>
<table>
<tr><th>命令</th><th>sudo</th><th>说明</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>否</td><td>只读</td></tr>
<tr><td><code>linxira-config ssh key …</code></td><td>否</td><td>写当前用户 <code>~/.ssh</code></td></tr>
<tr><td><code>linxira-config ssh authorized …</code></td><td>否</td><td>写当前用户 <code>~/.ssh/authorized_keys</code></td></tr>
<tr><td><code>linxira-config ssh on / off / port</code></td><td><strong>是</strong></td><td>改系统配置、控制 sshd</td></tr>
<tr><td><code>linxira-config security ufw …</code></td><td><strong>是</strong></td><td>改防火墙</td></tr>
</table>
<p><code>linxira-config</code> 不会自动提权；缺少 sudo 时命令直接报错并提示。</p>

<h2>1. 开启 SSH 服务</h2>
<p>先查看状态：</p>

```
linxira-config ssh status
```

<p>输出示例：</p>

```
SSH Status
  Service state:        inactive
  Service startup:      disabled
  Port:                 22
  Root login:           prohibit-password
  Password authentication: yes
  Connect:              ssh user@192.168.1.100 -p 22
```

<div class="step">
<div class="step-num">1</div>
<div class="step-body">
<p><strong>持久开启</strong>（开机自启）：</p>

```
sudo linxira-config ssh on
```

<p><code>on</code> 会安装 openssh、写入 <code>PasswordAuthentication yes</code>、启用并启动 sshd，UFW 已启用时放行当前端口。</p>

<p><strong>临时开启</strong>（仅本次，重启后关闭，适合一次性排障）：</p>

```
sudo systemctl start sshd
sudo systemctl stop sshd
```

<p>如启用了 UFW，放行 SSH 端口：</p>

```
sudo ufw allow 22/tcp
```

</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-body">
<p><strong>确认状态</strong>：</p>

```
linxira-config ssh status
```

</div>
</div>

<h2>2. 从另一台机器连接</h2>
<p>首次连接建议带上这两个参数：跳过交互式指纹确认、8 秒超时，适合临时排障：</p>

```
ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=8 用户名@IP
```

<p>Windows 10/11 自带 <code>ssh</code>，在 PowerShell 里执行同一命令即可。IP 用 <code>ip -4 addr show</code> 或 <code>linxira-config ssh status</code> 查看。</p>

<h2>3. 生成密钥对（客户端）</h2>
<p>在<strong>客户端</strong>（你用来连接的那台电脑）上生成 Ed25519 密钥对，比密码登录安全得多。以下命令不需要 sudo：</p>

```
linxira-config ssh key generate
linxira-config ssh key list
linxira-config ssh key show
linxira-config ssh key fingerprint
```

<h2>4. 授权密钥（服务器端）</h2>
<p>在<strong>服务器</strong>（Linxira 电脑）上，把客户端公钥加入 <code>authorized_keys</code>。命令同样不需要 sudo，写入的是当前用户的 <code>~/.ssh/authorized_keys</code>。</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-body">
<p>在客户端执行 <code>linxira-config ssh key show</code>，复制输出的整行（形如 <code>ssh-ed25519 AAAA... linxira@hostname</code>）。</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-body">
<p>在服务器上把这一整行作为参数传入：</p>

```
linxira-config ssh authorized add "ssh-ed25519 AAAA... linxira@hostname"
```

<p><code>authorized add</code> 只接受<strong>纯公钥字符串</strong>，不接受文件路径，也拒绝带 <code>command=</code>、<code>environment=</code> 等 options 的条目——这是刻意的安全设计。</p>

</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-body">
<p><strong>查看已授权列表</strong>：</p>

```
linxira-config ssh authorized list
```

</div>
</div>

<div class="note">💡 两台机器都装了 linxira-config 时，也可以通过 U 盘或可信聊天工具传输公钥字符串。密钥传输途径必须是可信的。</div>

<h2>5. 从客户端连接</h2>
<p>IP 可从 <code>linxira-config ssh status</code> 的 <code>Connect:</code> 行看到：</p>

```
ssh 用户名@服务器IP
```

<p>首次连接会提示确认主机指纹，输入 <code>yes</code> 即可。</p>

<h3>局域网 / 公网场景</h3>
<ul>
<li><strong>同一局域网</strong>：直接用内网 IP，无需额外配置。</li>
<li><strong>跨网络 / 公网</strong>：在路由器上做端口转发，或使用 Tailscale / ZeroTier 组网，避免直接暴露 22 端口。</li>
<li><strong>主机名</strong>：同一局域网内也可用 <code>ssh 用户@主机名.local</code>（需 mDNS）。</li>
</ul>

<h2>6. 安全加固</h2>
<p>把电脑当作对外服务器前，至少完成前两项：</p>
<ul>
<li><strong>只允许密钥登录</strong>：先确认公钥能登录，再在 <code>/etc/ssh/sshd_config.d/</code> 里设置 <code>PasswordAuthentication no</code>，然后 <code>sudo systemctl restart sshd</code>。</li>
<li><strong>禁止 root 登录</strong>：默认 <code>PermitRootLogin prohibit-password</code>；对外可改为 <code>no</code>。</li>
<li><strong>核对生效配置</strong>：<code>sudo sshd -T | grep -E '^(port|permitrootlogin|passwordauthentication)'</code>。</li>
<li><strong>启用 UFW</strong>：<code>sudo ufw enable</code>，只放行需要的端口。</li>
<li><strong>fail2ban</strong>（可选）：<code>sudo pacman -S fail2ban</code>。</li>
<li><strong>改默认端口</strong>（可选）：<code>sudo linxira-config ssh port 2222</code>，并同步放行新端口。</li>
</ul>

<div class="warn">⚠️ 暴露公网前必须确认已启用密钥认证并关闭密码登录，同时保留一个已登录的会话用于回滚。<code>ssh authorized add</code> 只接受无 options 的纯公钥，这是刻意的安全设计。</div>

<h2>7. 关闭与移除</h2>

```
sudo systemctl disable --now sshd
linxira-config ssh authorized list
linxira-config ssh authorized remove SHA256:xxxx --yes
linxira-config ssh key remove work-laptop --yes
```

<h2>命令速查表</h2>
<table>
<tr><th>命令</th><th>作用</th><th>sudo</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>服务状态、端口、连接方式</td><td>否</td></tr>
<tr><td><code>linxira-config ssh on</code></td><td>安装并启用 sshd</td><td>是</td></tr>
<tr><td><code>linxira-config ssh off</code></td><td>停止并禁用 sshd</td><td>是</td></tr>
<tr><td><code>linxira-config ssh port &lt;n&gt;</code></td><td>修改监听端口</td><td>是</td></tr>
<tr><td><code>linxira-config ssh key generate [name]</code></td><td>生成 Ed25519 密钥对</td><td>否</td></tr>
<tr><td><code>linxira-config ssh key list</code></td><td>列出本机公钥</td><td>否</td></tr>
<tr><td><code>linxira-config ssh key show [name]</code></td><td>显示公钥内容</td><td>否</td></tr>
<tr><td><code>linxira-config ssh key fingerprint [name]</code></td><td>显示公钥指纹</td><td>否</td></tr>
<tr><td><code>linxira-config ssh key remove &lt;name&gt; --yes</code></td><td>删除密钥对</td><td>否</td></tr>
<tr><td><code>linxira-config ssh authorized list</code></td><td>列出已授权密钥</td><td>否</td></tr>
<tr><td><code>linxira-config ssh authorized add &lt;公钥字符串&gt;</code></td><td>授权一个纯公钥</td><td>否</td></tr>
<tr><td><code>linxira-config ssh authorized remove &lt;fp&gt; --yes</code></td><td>按指纹移除授权</td><td>否</td></tr>
</table>

<p>更多配置与诊断能力（镜像源、网络诊断、安全状态）见 <a href="/zh/docs/config-hub/">Config Hub 文档</a>。</p>
