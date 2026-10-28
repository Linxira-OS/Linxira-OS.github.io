---
title: "桌面环境"
section: guide
order: 5
---

  <h1>桌面与服务器模式</h1>
  <p>安装时在「桌面环境」一步二选一：<strong>KDE Plasma</strong>（完整桌面）或 <strong>服务器（无桌面）</strong>（纯终端）。</p>

  <h2>KDE Plasma 桌面</h2>
  <p>默认推荐：开箱即用的完整 KDE Plasma 桌面——蓝牙、Wi-Fi、打印、图形界面全部可用。等离子桌面经过审核配置，适合日常使用与科研开发兼顾的工作站。</p>

  <h2>服务器（无桌面）模式</h2>
  <p>选择服务器模式安装后，系统不包含桌面环境与显示管理器，启动后进入 <strong>纯终端环境</strong>（tty 登录），与 Arch Linux 的基础安装一致——内存全部留给计算任务。系统工具、容器、驱动检测等能力完整保留。</p>

  <h2>随时自行安装桌面环境</h2>
  <p>服务器模式<strong>不锁定任何选择</strong>——装完系统后，你可以像在 Arch 上一样自行安装任何桌面环境（Plasma、GNOME 或任何 Arch 支持的桌面）：</p>
  <pre><code>sudo pacman -S plasma-desktop sddm
sudo systemctl enable --now sddm</code></pre>
  <p>登录界面出现后即回到图形环境。GNOME 同理：</p>
  <pre><code>sudo pacman -S gnome gdm
sudo systemctl enable --now gdm</code></pre>

  <h2>桌面 ⇄ 无桌面快速切换</h2>
  <p>无论哪种安装方式，系统都内置「无头模式」切换（systemd 标准目标切换，桌面零占用、内存全给计算）：</p>
  <pre><code>linxira-config headless on now    # 立即关闭桌面(需确认)
linxira-config headless off now   # 立即恢复桌面
linxira-config headless status    # 查看当前模式</code></pre>

  <div class="note">
    <p>提示：服务器模式下的基线仍包含少量通用工具（浏览器、终端工具、容器等）；真正的桌面组件（Plasma、SDDM、文件管理器等）仅在选择 KDE Plasma 或自行安装时出现。</p>
  </div>
