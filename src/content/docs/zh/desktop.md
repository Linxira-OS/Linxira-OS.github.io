---
title: "桌面环境"
section: guide
order: 5
---

<h1>桌面环境与软件选择</h1>
<p>安装器的「软件选择」步骤由 catalog v3 驱动，提供 <strong>4 个桌面档位</strong>，可任选其一：</p>

<table>
<tr><th>档位</th><th>catalog 标识</th><th>说明</th></tr>
<tr><td><strong>KDE Plasma</strong>（默认）</td><td><code>desktop-plasma</code></td><td>完整桌面，开箱即用</td></tr>
<tr><td><strong>COSMIC</strong></td><td><code>desktop-cosmic</code></td><td>System76 的 Rust 原生桌面</td></tr>
<tr><td><strong>无桌面（完整工具集）</strong></td><td><code>desktop-server</code></td><td>纯终端，保留浏览器/容器/诊断</td></tr>
<tr><td><strong>无桌面（超精简）</strong></td><td><code>desktop-server-minimal</code></td><td>纯终端，对齐 Arch 基线</td></tr>
</table>

<h2>KDE Plasma 桌面</h2>
<p>默认推荐：蓝牙、Wi-Fi、打印、显示管理器（SDDM）与完整图形界面全部就绪。等离子桌面经过审核配置，适合日常使用与科研开发兼顾的工作站。</p>

<h2>COSMIC 桌面</h2>
<p>COSMIC 是 System76 用 Rust 编写的 Wayland 原生桌面，与 Plasma 同为<strong>一等桌面</strong>：桌面包随镜像离线附带，安装时无需联网即可勾选安装，包集合与 catalog 的 <code>desktop-cosmic</code> 条目一致。</p>
<p>终端组件为 <code>cosmic-term</code>。自 config-hub 2.6.2、linxira-update 0.1.10、crash-watch 0.1.3 起，Linxira 的终端派发链已兼容 <code>cosmic-term</code>，不再因 <code>-e</code> 参数不兼容而闪退。</p>

<h2>无桌面的两个档位</h2>
<p>两者都不安装桌面环境、显示管理器与图形界面，启动后进入 <strong>纯终端</strong>（tty 登录），区别在于保留的工具量：</p>
<ul>
<li><strong>完整工具集</strong>（<code>desktop-server</code>）：保留浏览器、终端工具、容器运行时、驱动检测、诊断命令等，适合当服务器但仍需排障工具的场景。</li>
<li><strong>超精简</strong>（<code>desktop-server-minimal</code>）：只保留系统核心与 Linxira 管理工具，对齐 Arch Linux 基线安装，内存占用最低。</li>
</ul>

<h2>查看每个档位装了什么</h2>
<p>以下命令只读查询，<strong>不需要 sudo</strong>：</p>

```
linxira-config catalog bundle list
linxira-config catalog bundle show desktop-cosmic
linxira-config catalog bundle show desktop-server-minimal
```

<p>输出给出该档位包含的包清单与状态。安装器勾选后由 <code>linxirapacstrap</code> 从镜像内的离线包安装，不走网络。</p>

<h2>装完后再加另一个桌面</h2>
<p>安装时的选择<strong>不锁定任何东西</strong>。COSMIC 的包已在镜像里，装完可直接用 pacman 补齐：</p>

```
sudo pacman -S --needed cosmic-session cosmic-comp cosmic-term cosmic-files cosmic-applets
sudo systemctl enable --now cosmic-greeter
```

<p>Plasma 同理：</p>

```
sudo pacman -S --needed plasma-desktop sddm
sudo systemctl enable --now sddm
```

<p>其它 Arch 支持的桌面（如 GNOME）也能装，但包需联网从官方仓库获取：</p>

```
sudo pacman -S --needed gnome gdm
sudo systemctl enable --now gdm
```

<div class="note">
<p>同时安装多个显示管理器时，只有最后 <code>enable</code> 的那个会在开机时启动；先用 <code>systemctl disable</code> 关掉旧的再启用新的，避免登录界面错乱。</p>
</div>

<h2>桌面 ⇄ 无桌面快速切换</h2>
<p>无论哪种安装方式，系统都内置「无头模式」切换（systemd 标准目标切换，桌面零占用、内存全给计算）。这三条命令<strong>需要 sudo</strong>：</p>

```
sudo linxira-config headless on now
sudo linxira-config headless off now
linxira-config headless status
```

<p><code>status</code> 只读，不需要 sudo；<code>on now</code> / <code>off now</code> 会切换运行目标，必须提权。</p>

<div class="note">
<p>提示：无桌面档位仍包含少量通用工具（浏览器、终端工具、容器等，取决于档位）；真正的桌面组件（Plasma / COSMIC / SDDM / 文件管理器等）仅在选择对应桌面档位或自行安装后出现。</p>
</div>
