---
title: "应用清单"
section: apps
order: 0
---

<a href="/zh/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← 返回文档</a>
<h1>Linxira 官方软件</h1>
<p>Linxira OS 自带一套自研工具链，围绕「<strong>经过审核的 catalog 元数据 + 确定性事务后端 + 只读/规划式安全模型</strong>」构建：GUI 只负责展示与规划，真正的系统修改由受控后端执行。所有软件包托管在 Linxira 官方签名仓库 <a href="https://linxira-os.github.io/linxira-packages/x86_64" target="_blank">[linxira]</a>，通过 <code>pacman</code> 安装。</p>

<h2>日常工具</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Linxira Welcome</h3>
    <div class="pkg">linxira-welcome</div>
    <p>Plasma 原生状态与路由中心：Home / Status / Help 三页，开机自动打开。只读展示 catalog 与安装 receipt，固定工具启动器。</p>
    <span class="tag">GUI</span><span class="tag">自动启动</span>
  </div>
  <div class="app-card">
    <h3>Config Hub</h3>
    <div class="pkg">linxira-config-hub</div>
    <p>管理员命令行：SSH 服务与密钥管理、镜像源（Arch/npm/PyPI/AUR/Go/Flatpak）、网络诊断、安全状态、catalog 只读查询。</p>
    <span class="tag">CLI</span>
    <code class="cli">linxira-config ssh status</code>
  </div>
  <div class="app-card">
    <h3>Shelly</h3>
    <div class="pkg">shelly</div>
    <p>安装后的通用图形化软件包管理器（CLI + GTK 界面 + 更新通知），替代手动 pacman 操作。</p>
    <span class="tag">GUI</span><span class="tag">CLI</span>
  </div>
  <div class="app-card">
    <h3>Linxira Update</h3>
    <div class="pkg">linxira-update</div>
    <p>系统更新通知与维护助手：交互式更新提示、系统托盘小程序、更新前后自定义任务。由 systemd 用户服务驱动。用法详见 <a href="/zh/docs/updates/">系统更新与快照回滚</a>。</p>
    <span class="tag">托盘</span><span class="tag">自动检查</span>
  </div>
</div>

<h2>软件安装与运行时</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Package Center</h3>
    <div class="pkg">linxira-package-center</div>
    <p>精选应用安装工具（Quick System Software Setup）：catalog v3 应用分类树、plan/confirm/apply 三步事务。通用软件中心由 Shelly 负责。</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Component Manager</h3>
    <div class="pkg">linxira-component-manager</div>
    <p>能力包 / 运行时 / 工具链选择（Quick System Runtime Setup）：组件三态树（required/recommended/optional），仅安装、不支持卸载。</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Components</h3>
    <div class="pkg">linxira-components</div>
    <p>目录绑定的 pacman 事务规划与 receipt 后端：确定性 plan、SHA-256 规范 JSON 摘要、root-only pacman、持久 receipt。D-Bus 服务 <code>org.linxira.Components1</code>。</p>
    <span class="tag">后端</span><span class="tag">systemd</span>
  </div>
  <div class="app-card">
    <h3>Catalog</h3>
    <div class="pkg">linxira-catalog</div>
    <p>经审核的软件组件元数据目录：desktops / applications / components / bundles / operations / categories 六面模型，稳定 ID，bundles 组成 DAG。</p>
    <span class="tag">数据</span><span class="tag">schema</span>
  </div>
</div>

<h2>硬件与系统管理</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Hardware Driver Manager</h3>
    <div class="pkg">linxira-hardware-driver-manager</div>
    <p>硬件/驱动报告与固定策略规划 UI：消费 chwd-detector 输出、NVIDIA open/proprietary 策略、root 只读诊断；驱动 Apply 仅限 Hyper-V/QEMU/VMware。</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Kernel Manager</h3>
    <div class="pkg">linxira-kernel-manager</div>
    <p>内核/启动/initramfs 只读报告与固定策略规划：仅支持 linux/linux-lts 矩阵、GRUB 报告；Apply 恒为 backend-not-ready。</p>
    <span class="tag">GUI</span><span class="tag">CLI</span>
  </div>
  <div class="app-card">
    <h3>HWD Detector（lhwd）</h3>
    <div class="pkg">linxira-hwd-detector</div>
    <p>硬件检测与驱动配置工具（Rust，完整 CHWD 移植）：无参输出只读 JSON 检测报告；<code>lhwd</code> 命令提供 list / autoconfigure / install / remove 完整 CLI。详见<a href="/zh/docs/drivers/">驱动配置</a>。</p>
    <code class="cli">lhwd --list · lhwd -a</code>
  </div>
  <div class="app-card">
    <h3>Gaming Manager</h3>
    <div class="pkg">linxira-gaming-manager</div>
    <p>用户级游戏库与兼容性工作区：Steam 库发现、导入非 Steam .exe、固定 UMU/Wine runner、restic 备份、catalog 绑定。</p>
    <span class="tag">GUI</span>
  </div>
</div>

<h2>恢复与诊断</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Recovery Diagnostics</h3>
    <div class="pkg">linxira-recovery-diagnostics</div>
    <p>只读恢复诊断与修复规划：pacman-lock 诊断、live-chroot 就绪检查；快照/回滚/修复操作当前均为 apply-backend-not-ready。</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Completion Agent</h3>
    <div class="pkg">linxira-completion-agent</div>
    <p>首次联网完成流程：绑定 installer receipt、展示延后安装项。拒绝错误交接，AUR/Flatpak 一律延后，仅展示 reviewed 项。</p>
    <span class="tag">GUI</span><span class="tag">自动启动</span>
  </div>
</div>

<h2>系统组件</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Artwork</h3>
    <div class="pkg">linxira-artwork</div>
    <p>官方美术资源：Logo、壁纸、图标、Plymouth 启动动画、欢迎横幅。品牌色规范与 SVG 源文件。</p>
    <span class="tag">资源</span>
  </div>
  <div class="app-card">
    <h3>Hooks</h3>
    <div class="pkg">linxira-hooks</div>
    <p>系统识别的 pacman hooks：os-release / lsb-release / reboot-required / plymouth-initramfs 与配套脚本。</p>
    <span class="tag">pacman</span>
  </div>
  <div class="app-card">
    <h3>Keyring</h3>
    <div class="pkg">linxira-keyring</div>
    <p>Linxira 包签名公钥环：<code>/usr/share/keyrings/linxira.gpg</code>，安装时自动 pacman-key 添加并本地信任。</p>
    <span class="tag">签名</span>
  </div>
</div>

<h2>设计原则</h2>
<ul style="color:#94a3b8; margin:0.5rem 0 1rem 1.5rem;">
  <li><strong>只读优先</strong>：检测器与诊断只读，修改一律走受控后端。</li>
  <li><strong>目录绑定</strong>：GUI 只从 catalog 读取稳定 ID，绝不接受任意参数/命令/路径。</li>
  <li><strong>规划式事务</strong>：plan → confirm → apply，receipt 持久记录结果。</li>
  <li><strong>签名仓库</strong>：所有官方包经 GPG 签名，安装时校验。</li>
</ul>
