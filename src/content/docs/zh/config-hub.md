---
title: "配置中心"
section: guide
order: 3
---

<a href="/zh/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← 返回文档</a>
<h1>Config Hub CLI（linxira-config）</h1>
<p><code>linxira-config</code> 是系统配置中心 <b>config-hub</b> 的命令行入口：SSH、镜像源、诊断日志、环境变量、软件栈、工作区守护、安全态势，一条命令一个动作。直接输入 <code>linxira-config</code> 回车可进入纯 bash 的数字菜单（TUI），所有菜单项与命令行子命令一一对应。</p>
<div class="note">📌 本页对应 <b>config-hub 2.6.2</b>。任何子命令加 <code>--json</code> 可获得机器可读输出（workspace-guard / ssh status / net diag / mirror list 均支持），方便脚本与 AI 助手消费。</div>

<div class="note">🔑 <strong>提权约定</strong>：需要 root 的子命令（<code>ssh on/off/port</code>、<code>workspace-guard enable/disable</code>、<code>security ufw …</code>、<code>headless on/off</code>、<code>mirror arch auto</code> 写入系统源时）都必须显式加 <code>sudo</code>；<code>linxira-config</code> 不会自动提权，缺 sudo 时直接报错。只读查询（<code>status</code> / <code>list</code> / <code>show</code> / <code>diag</code>）不需要 sudo。</div>

<h2 id="logs">诊断日志：一键收集与上传</h2>
<p>安装失败、更新异常、行为诡异时，第一步永远是它——收集本机诊断并换回一个可分享的短链：</p>

```
linxira-config logs collect
linxira-config logs upload
linxira-config logs upload 某文件
```

<table>
<tr><th>命令</th><th>作用</th></tr>
<tr><td><code>logs collect</code></td><td>收集到 <code>~/linxira-logs/linxira-logs-*.txt</code></td></tr>
<tr><td><code>logs upload</code></td><td>上传最新一份并打印短链</td></tr>
<tr><td><code>logs upload &lt;文件&gt;</code></td><td>上传指定文件</td></tr>
</table>

<p>收集内容包括：系统与磁盘概况、已装 linxira 软件包、失败单元、<b>安装器完整日志</b>（/tmp/linxira-installer.log 与 Calamares 会话日志）、pacman.log、本次开机的错误日志。上传走 <b>paste.rs → termbin → dpaste</b> 三通道自动降级（国内外均可达），返回的链接可直接发给维护者或 AI 助手。</p>

<h2 id="ssh">SSH 远程访问</h2>
<p>把电脑变成可远程管理的服务器。开启、关闭、改端口会修改系统配置并控制 sshd，<strong>必须加 sudo</strong>；密钥与授权只写当前用户目录，不需要 sudo。</p>

```
sudo linxira-config ssh on
linxira-config ssh status
sudo linxira-config ssh off
sudo linxira-config ssh port 2222
linxira-config ssh status --json
```

<table>
<tr><th>命令</th><th>作用</th></tr>
<tr><td><code>ssh on</code></td><td>安装 openssh、启用并启动 sshd，UFW 启用时放行端口</td></tr>
<tr><td><code>ssh status</code></td><td>服务状态与连接信息（IP / 端口）</td></tr>
<tr><td><code>ssh off</code></td><td>停止并禁用 sshd</td></tr>
<tr><td><code>ssh port &lt;n&gt;</code></td><td>更换监听端口（记得同步放行防火墙）</td></tr>
</table>

<p>密钥管理（Ed25519，均不需要 sudo）：</p>

```
linxira-config ssh key generate [名称]
linxira-config ssh key list
linxira-config ssh key show [名称]
linxira-config ssh key fingerprint [名称]
linxira-config ssh key remove [名称] --yes
linxira-config ssh authorized add "<公钥字符串>"
linxira-config ssh authorized list
linxira-config ssh authorized remove <指纹> --yes
```

<p>注意：<code>authorized add</code> 只接受无 options 的纯公钥字符串（不是文件路径）；密钥路径拒绝 symlink。</p>

<div class="warn">⚠️ SSH 子命令仍在完善，可能存在缺陷。启用前请确认账户密码强度，并在改动后手动核对 <code>/etc/ssh/sshd_config.d/</code> 与 <code>sudo sshd -T</code> 的实际生效配置。</div>

<p>分步教程（含密钥登录与加固）见 <a href="/zh/docs/remote-access/">远程访问指南</a>。</p>

<h2 id="env">环境变量</h2>
<p>机器级环境变量统一落在 <code>/etc/profile.d/linxira-env.sh</code>，重启不丢：</p>

```
linxira-config env list
linxira-config env set KEY value
linxira-config env get KEY
linxira-config env unset KEY
```

<h2 id="stack">软件栈</h2>
<p>面向科研场景的一键软件栈（桥接 linxira-component-manager 的事务后端）：</p>

```
linxira-config stack list
linxira-config stack status
linxira-config stack install <id>
linxira-config stack tui
```

<h2 id="workspace-guard">工作区守护</h2>
<p>每 30 分钟对工作区做一次独立恢复点（含 .git），误删可回滚。启用与停用需要 sudo，查询不需要：</p>

```
linxira-config workspace-guard status
sudo linxira-config workspace-guard enable
sudo linxira-config workspace-guard disable
linxira-config workspace-guard handbook
```

<p>日常恢复点操作用 <code>linxira-components guard &lt;status|list|snapshot|restore&gt;</code>。</p>

<h2 id="mirror">镜像源管理</h2>
<p>覆盖 Arch、npm、PyPI、AUR、Go 模块与 Flatpak 六类源：</p>

```
linxira-config mirror arch list
linxira-config mirror arch speed
sudo linxira-config mirror arch auto
linxira-config mirror pip set tsinghua
linxira-config mirror flatpak set <id|url>
sudo linxira-config mirror arch reset
linxira-config mirror arch list --json
```

<table>
<tr><th>命令</th><th>作用</th></tr>
<tr><td><code>mirror arch list</code></td><td>列出候选镜像</td></tr>
<tr><td><code>mirror arch speed</code></td><td>全量测速</td></tr>
<tr><td><code>mirror arch auto</code></td><td>自动选最快并写入系统源（sudo）</td></tr>
<tr><td><code>mirror pip set &lt;名称&gt;</code></td><td>按名称切换（npm/pip/aur/go 用户级生效）</td></tr>
<tr><td><code>mirror flatpak set &lt;id|url&gt;</code></td><td>指定 Flatpak 远程</td></tr>
<tr><td><code>mirror arch reset</code></td><td>恢复官方源（sudo）</td></tr>
</table>

<p>Miniforge 频道单独管理，仅允许审核过的 <code>conda-forge</code> 与 <code>bioconda</code>：<code>conda channels list|add|remove|reset</code>。</p>

<h2 id="catalog">Catalog 查询（只读）</h2>
<p>查询经审核的软件目录状态。命令接受 catalog ID（不是包名），全部只读、不需要 sudo：</p>

```
linxira-config catalog software --all
linxira-config catalog software --status drifted
linxira-config catalog component list
linxira-config catalog bundle list
linxira-config catalog bundle show desktop-plasma
linxira-config catalog bundle show desktop-cosmic
linxira-config catalog software show firefox
```

<p>默认显示 <code>installed / partial / external / pending / drifted / reboot-required</code>；<code>--all</code> 追加 <code>not-installed</code>。桌面档位的 catalog ID 为 <code>desktop-plasma</code>、<code>desktop-cosmic</code>、<code>desktop-server</code>、<code>desktop-server-minimal</code>，详见 <a href="/zh/docs/desktop/">桌面环境</a>。</p>

<h2 id="netsec">网络与安全</h2>

```
linxira-config net diag
linxira-config net dns
linxira-config net dns set 223.5.5.5
linxira-config security status
sudo linxira-config security ufw allow 22
linxira-config runtime status
```

<table>
<tr><th>命令</th><th>作用</th></tr>
<tr><td><code>net diag</code></td><td>完整网络诊断（<code>--json</code> 可用）</td></tr>
<tr><td><code>net dns</code> / <code>net dns set &lt;ip&gt;</code></td><td>查看 / 设置 DNS</td></tr>
<tr><td><code>security status</code></td><td>安全态势总览（UFW/SSH/fail2ban/KVM）</td></tr>
<tr><td><code>security ufw allow &lt;端口&gt;</code></td><td>放行一个 TCP 端口（sudo）</td></tr>
<tr><td><code>runtime status</code></td><td>运行时与包管理器状态</td></tr>
</table>

<h2 id="misc">其他</h2>

```
linxira-config timeshift status
sudo linxira-config headless on
linxira-config headless status
linxira-config info
linxira-config status
linxira-config tui
```

<p><code>rdp</code>、<code>virt kvm-on/docker-on</code>、<code>security harden</code>、<code>power</code> 写操作目前<b>等待事务后端</b>启用（状态查询可用）——这是有意的安全设计：所有变更类操作必须经过可回滚的事务通道。</p>

<p>问题、bug 与功能建议请提交到 <a href="https://github.com/Linxira-OS/linxira-config-hub" target="_blank">linxira-config-hub 仓库</a>。</p>
