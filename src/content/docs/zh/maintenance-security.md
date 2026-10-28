---
title: "维护、信任与软件安全"
section: reference
order: 3
---

<h1>维护、信任与软件安全</h1>
<p>这一页说明 Linxira 怎么维护、软件从哪来、AUR 的风险，以及一个没有基金会背书的发行版凭什么值得信任。</p>

<h2>维护方式：直系 Arch 上游</h2>
<ul>
<li><strong>安全修复跟随 Arch</strong>：内核、glibc、浏览器等包直接使用 Arch 官方构建，不延迟、不二次筛选。Arch 安全团队发布公告后，更新随下一次 <code>pacman -Syu</code> 到达。</li>
<li><strong>不自建性能内核</strong>：内核就是 Arch 的 <code>linux</code> / <code>linux-lts</code>，不叠加第三方 patchset，减少与上游分叉带来的安全滞后。</li>
<li><strong>不做延迟滚动</strong>：不像部分衍生版把包冻结两周到数月；Linxira 跟 Arch 同步滚动。</li>
<li><strong>自研组件单独发布</strong>：config-hub、update、crash-watch 等有自己的 <code>VERSION</code>、CI 构建与签名仓库，更新节奏与上游解耦。</li>
</ul>
<p>查本机已知漏洞：<code>arch-audit</code>。查上游公告：<a href="https://security.archlinux.org/" target="_blank">security.archlinux.org</a>。</p>

<h2>软件来源分级</h2>
<table>
<tr><th>来源</th><th>签名</th><th>谁维护</th><th>风险</th></tr>
<tr><td><a href="https://linxira-os.github.io/linxira-packages/x86_64" target="_blank">[linxira]</a> 自研仓库</td><td>是</td><td>本项目 CI</td><td>低，构建过程可查</td></tr>
<tr><td>Arch 官方 core / extra / multilib</td><td>是</td><td>Arch 打包者</td><td>低，官方维护</td></tr>
<tr><td>AUR</td><td>否（本机构建）</td><td>任意注册用户</td><td><strong>高</strong>，必须自行审阅</td></tr>
</table>

<h2>AUR：默认不启用，用之前先读</h2>
<p>系统默认只启用 <code>[linxira]</code> 与 Arch 官方仓库，<strong>不预装 AUR helper</strong>。AUR 不是仓库，是一堆用户提交的构建脚本（PKGBUILD），包由你自己的机器编译，因此没有任何人替你担保内容。</p>
<p>如果确实要用 AUR 包：</p>
<ul>
<li>打开 PKGBUILD 和配套的 <code>.install</code> 完整读一遍，重点看 <code>source=</code> 指向哪里、<code>sha256sums=</code> 是否齐全、安装脚本改了什么。</li>
<li>留意 <code># Maintainer:</code> 与提交历史；长期无人维护、刚被接手的包要格外小心。</li>
<li>构建必须用普通用户（<code>makepkg</code> 本身拒绝 root），只在安装那一步提权。</li>
<li>AUR 包出问题属于上游个人脚本的问题，Arch 与本项目都不提供支持，也不会为它改系统。</li>
</ul>

<h2>信任模型：没有基金会，靠可验证</h2>
<p>Linxira 由个人/小团队维护，没有基金会或公司实体背书。这类发行版值得怀疑是合理的，所以这里只列能被你亲自验证的东西：</p>
<table>
<tr><th>能做到</th><th>做不到</th></tr>
<tr><td>源码、构建脚本、CI 配置全部公开</td><td>7×24 安全响应团队</td></tr>
<tr><td>所有包由 CI 构建并用发布密钥签名，密钥打进 <code>linxira-keyring</code></td><td>法律实体、商业 SLA</td></tr>
<tr><td>仓库归属与生命周期登记在 <code>governance/repositories.yaml</code></td><td>与上游同等规模的审计人力</td></tr>
<tr><td>发布记录可追溯（tag、Release、签名包）</td><td>对第三方 AUR 包负责</td></tr>
</table>
<p><strong>不锁定</strong>：系统是标准 Arch——pacman、systemd、<code>/etc</code> 布局、官方仓库都在。你可以随时停用 <code>[linxira]</code> 仓库、只保留 Arch 官方源，系统仍然可用；这是刻意保留的退出路径。</p>
<p><strong>无遥测</strong>：系统不收集使用数据。只有你主动执行 <code>linxira-config logs collect/upload</code> 时，诊断包才会上传到你选择的通道。</p>

<h2>与其它 Arch 衍生版的差异</h2>
<table>
<tr><th>维度</th><th>Linxira</th><th>性能优化型衍生版</th><th>延迟滚动型衍生版</th></tr>
<tr><td>内核</td><td>Arch 原版</td><td>自带 patchset，自行构建</td><td>多为原版</td></tr>
<tr><td>包延迟</td><td>跟随 Arch</td><td>跟随 Arch</td><td>冻结 2 周到数月</td></tr>
<tr><td>自研层</td><td>集成与管理工具（catalog、config-hub、update）</td><td>性能调优、调度器、内核参数</td><td>安装器、主题、独立仓库</td></tr>
</table>
<p>代价与收益：我们不提供内核级性能调优，换来的是与 Arch 安全修复零延迟、出问题能直接对照上游文档与论坛排查。</p>

<h2>文件系统兼容性</h2>
<table>
<tr><th>文件系统</th><th>Linux 支持</th><th>说明</th></tr>
<tr><td>NTFS</td><td>读写；<code>ntfs3</code>（5.15+）与 7.1 起主线合入的新 NTFS 驱动并存</td><td>双系统共享数据盘的首选；挂载前确保 Windows 已完全关机（关闭快速启动）</td></tr>
<tr><td>exFAT</td><td>内核驱动，读写</td><td>U 盘、移动硬盘，跨系统无权限困扰</td></tr>
<tr><td>FAT32</td><td>内核驱动，读写</td><td>单文件上限 4 GB，仅适合 EFI 分区与小容量盘</td></tr>
<tr><td>ReFS</td><td><strong>不支持</strong></td><td>Windows 专有（含 Dev Drive、存储空间），Linux 无可用驱动，无法挂载</td></tr>
<tr><td>BitLocker</td><td>有限支持</td><td><code>cryptsetup</code> 可用恢复密钥解锁，兼容性取决于加密模式；不建议双系统长期共用加密分区</td></tr>
</table>
<p>共享盘的稳妥做法：单独划一个 NTFS 分区给两边读写，不要试图让 Linux 直接挂载 Windows 的系统盘（<code>C:</code>），休眠/快速启动状态下更不要挂载。</p>

<h2>相关</h2>
<ul>
<li><a href="/zh/docs/updates/">更新与快照回滚</a></li>
<li><a href="/zh/docs/sources/">软件源快速配置</a></li>
<li><a href="/zh/docs/dual-boot/">双系统</a></li>
</ul>
