---
title: "驱动管理"
section: apps
order: 1
---

<a href="/zh/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← 返回文档</a>
<h1>驱动与硬件配置（lhwd）</h1>
<p><code>lhwd</code>（Linxira Hardware Detection）是 Linxira OS 的硬件检测与驱动配置工具，自动识别 GPU / 网卡 / 虚拟机等硬件并匹配最佳驱动配置。它由 <code>linxira-hwd-detector</code> 包提供，基于 CHWD 1.23.0 完整移植。</p>

<h2>快速配置</h2>
<p>两种方式，效果相同：</p>
<ol>
<li><strong>图形界面</strong>：打开「硬件和驱动」（Linxira Hardware Driver Manager），点击自动配置。</li>
<li><strong>终端</strong>：执行 <code>sudo lhwd -a</code>，自动检测全部硬件并安装匹配的驱动 profile。</li>
</ol>

```
sudo lhwd -a
```


<div class="note">
<strong>内核说明</strong>：Linxira 使用 Arch Linux 通用内核（<code>linux</code> / <code>linux-lts</code> 双内核），
目前不做定制内核构建。新硬件的支持来自内核与固件包的常规更新。
</div>

<h2>命令参考</h2>
<table>
<tr><th>命令</th><th>说明</th></tr>
<tr><td><code>lhwd --list</code></td><td>列出当前硬件可用的驱动 profile</td></tr>
<tr><td><code>lhwd --list-installed</code></td><td>列出已安装的 profile</td></tr>
<tr><td><code>lhwd --list-all</code></td><td>列出全部 profile</td></tr>
<tr><td><code>lhwd -a</code></td><td>自动配置：检测硬件并安装最佳匹配驱动</td></tr>
<tr><td><code>lhwd -i &lt;profile&gt;</code></td><td>安装指定驱动 profile</td></tr>
<tr><td><code>lhwd -r &lt;profile&gt;</code></td><td>移除指定驱动 profile</td></tr>
<tr><td><code>lhwd --check &lt;profile&gt;</code></td><td>检查 profile 状态</td></tr>
</table>
<p>profile 数据随包分发于 <code>/var/lib/chwd/db/</code>（图形驱动 / 网卡 / 手持设备 / USB 指纹等），
与上游 CHWD 布局一致。</p>

<h2>只读检测报告</h2>
<p>不带参数调用 <code>linxira-hwd-detector</code> 输出版本化 JSON 硬件报告
（PCI / DMI / CPU 证据与稳定 profile ID），供「硬件和驱动」界面与系统诊断使用，零副作用：</p>

```
linxira-hwd-detector
```


<h2>协议说明</h2>
<p><code>linxira-hwd-detector</code> 是 CHWD 1.23.0 的 fork，遵循 GPL-3.0-only 许可证；
上游来源、改动点与命名说明见仓库内 <code>UPSTREAM.md</code>。</p>
