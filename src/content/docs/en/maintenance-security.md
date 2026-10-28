---
title: "Maintenance, Trust and Security"
section: reference
order: 3
---

<h1>Maintenance, trust and software security</h1>
<p>This page explains how Linxira is maintained, where software comes from, what AUR really costs you, and why a distro without a foundation behind it can still be worth trusting.</p>

<h2>Maintenance: directly on Arch</h2>
<ul>
<li><strong>Security fixes come with Arch</strong>: the kernel, glibc, browsers and friends are Arch's own builds. Nothing is delayed or re-screened; once Arch's security team publishes an advisory, the fix arrives with your next <code>pacman -Syu</code>.</li>
<li><strong>No custom performance kernel</strong>: the kernel is Arch's <code>linux</code> / <code>linux-lts</code>. No third-party patchset means no divergence that could lag behind upstream security work.</li>
<li><strong>No delayed rolling</strong>: unlike derivatives that freeze packages for two weeks to several months, Linxira tracks Arch as it rolls.</li>
<li><strong>First-party components ship separately</strong>: config-hub, update, crash-watch and others carry their own <code>VERSION</code>, CI build and signed repository, decoupled from the upstream cadence.</li>
</ul>
<p>Check your machine for known issues with <code>arch-audit</code>; upstream advisories live at <a href="https://security.archlinux.org/" target="_blank">security.archlinux.org</a>.</p>

<h2>Software sources at a glance</h2>
<table>
<tr><th>Source</th><th>Signed</th><th>Maintained by</th><th>Risk</th></tr>
<tr><td><a href="https://linxira-os.github.io/linxira-packages/x86_64" target="_blank">[linxira]</a> first-party repo</td><td>Yes</td><td>This project's CI</td><td>Low, build is inspectable</td></tr>
<tr><td>Arch official core / extra / multilib</td><td>Yes</td><td>Arch packagers</td><td>Low, officially maintained</td></tr>
<tr><td>AUR</td><td>No (built locally)</td><td>Any registered user</td><td><strong>High</strong> — review it yourself</td></tr>
</table>

<h2>AUR: disabled by default, read before you build</h2>
<p>Only <code>[linxira]</code> and the official Arch repositories are enabled out of the box; <strong>no AUR helper is preinstalled</strong>. AUR is not a repository — it is a pile of user-submitted build scripts (PKGBUILDs). The package is compiled on your machine, so nobody vouches for its contents.</p>
<p>If you do use an AUR package:</p>
<ul>
<li>Read the whole PKGBUILD and any <code>.install</code> file. Watch where <code>source=</code> points, whether <code>sha256sums=</code> is complete, and what the install script touches.</li>
<li>Check the <code># Maintainer:</code> line and the commit history; be careful with packages that were abandoned and recently taken over.</li>
<li>Build as an ordinary user (<code>makepkg</code> refuses root) and only elevate for the install step.</li>
<li>A broken AUR package is the responsibility of its submitter. Neither Arch nor this project supports it, and we will not bend the system for it.</li>
</ul>

<h2>Trust model: no foundation, but verifiable</h2>
<p>Linxira is maintained by an individual / small team, without a foundation or company behind it. Skepticism is reasonable, so here is what you can verify yourself:</p>
<table>
<tr><th>What we can do</th><th>What we cannot</th></tr>
<tr><td>Publish all sources, build scripts and CI config</td><td>Provide a 24/7 security response team</td></tr>
<tr><td>Build every package in CI and sign it with the release key shipped in <code>linxira-keyring</code></td><td>Offer a legal entity or commercial SLA</td></tr>
<tr><td>Record repository ownership and lifecycle in <code>governance/repositories.yaml</code></td><td>Match upstream's audit headcount</td></tr>
<tr><td>Keep releases traceable (tags, Releases, signed packages)</td><td>Take responsibility for third-party AUR packages</td></tr>
</table>
<p><strong>No lock-in</strong>: this is standard Arch — pacman, systemd, the usual <code>/etc</code> layout, the official repositories. You can disable the <code>[linxira]</code> repository and keep only Arch's mirrors at any time; the system still works. That exit path is intentional.</p>
<p><strong>No telemetry</strong>: nothing is collected. Only when you explicitly run <code>linxira-config logs collect/upload</code> does a diagnostic bundle leave the machine, through the channel you chose.</p>

<h2>How this differs from other Arch derivatives</h2>
<table>
<tr><th>Dimension</th><th>Linxira</th><th>Performance-tuned derivatives</th><th>Delayed-rolling derivatives</th></tr>
<tr><td>Kernel</td><td>Arch stock</td><td>Own patchset, self-built</td><td>Mostly stock</td></tr>
<tr><td>Package lag</td><td>Same as Arch</td><td>Same as Arch</td><td>Frozen 2 weeks to months</td></tr>
<tr><td>First-party layer</td><td>Integration and management tools (catalog, config-hub, update)</td><td>Schedulers, kernel flags, tuning</td><td>Installer, themes, separate repos</td></tr>
</table>
<p>The trade-off: no kernel-level tuning, in exchange for zero lag against Arch security fixes and the ability to debug problems against upstream documentation and forums.</p>

<h2>Filesystem compatibility</h2>
<table>
<tr><th>Filesystem</th><th>Linux support</th><th>Notes</th></tr>
<tr><td>NTFS</td><td>Read/write; <code>ntfs3</code> (5.15+) coexists with the new NTFS driver merged in Linux 7.1</td><td>Best choice for a shared data disk; make sure Windows is fully shut down (Fast Startup off) before mounting</td></tr>
<tr><td>exFAT</td><td>In-kernel driver, read/write</td><td>USB sticks and external drives, no permission headaches across systems</td></tr>
<tr><td>FAT32</td><td>In-kernel driver, read/write</td><td>4 GB per-file limit; fine for the EFI partition and small drives</td></tr>
<tr><td>ReFS</td><td><strong>Not supported</strong></td><td>Windows-proprietary (Dev Drive, Storage Spaces); there is no usable Linux driver, so it cannot be mounted</td></tr>
<tr><td>BitLocker</td><td>Limited</td><td><code>cryptsetup</code> can unlock with a recovery key depending on the encryption mode; do not share an encrypted partition between both systems long term</td></tr>
</table>
<p>The safe pattern for shared storage: create a dedicated NTFS partition for both systems and never mount Windows' own system volume (<code>C:</code>) from Linux — especially not while Windows is hibernated.</p>

<h2>Related</h2>
<ul>
<li><a href="/en/docs/updates/">Updates and snapshot rollback</a></li>
<li><a href="/en/docs/sources/">Software sources quick setup</a></li>
<li><a href="/en/docs/dual-boot/">Dual boot</a></li>
</ul>
