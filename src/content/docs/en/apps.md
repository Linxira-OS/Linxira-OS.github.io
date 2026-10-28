---
title: "Applications"
section: apps
order: 0
---

<a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to Docs</a>
<h1>Official Linxira Apps</h1>
<p>Linxira OS ships with a first-party toolchain built around a <strong>reviewed catalog metadata + deterministic transaction backend + read-only/planning security model</strong>: GUI tools only present and plan; real system mutations are executed by a controlled backend. All packages are hosted on the official signed repository <a href="https://linxira-os.github.io/linxira-packages/x86_64" target="_blank">[linxira]</a> and installed via <code>pacman</code>.</p>

<h2>Daily tools</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Linxira Welcome</h3>
    <div class="pkg">linxira-welcome</div>
    <p>Plasma-native status &amp; routing hub: Home / Status / Help pages, auto-opens on boot. Read-only catalog &amp; receipt display, fixed launcher set.</p>
    <span class="tag">GUI</span><span class="tag">autostart</span>
  </div>
  <div class="app-card">
    <h3>Config Hub</h3>
    <div class="pkg">linxira-config-hub</div>
    <p>Administrator CLI: SSH service &amp; key management, mirrors (Arch/npm/PyPI/AUR/Go/Flatpak), network diagnostics, security posture, read-only catalog queries.</p>
    <span class="tag">CLI</span>
    <code class="cli">linxira-config ssh status</code>
  </div>
  <div class="app-card">
    <h3>Shelly</h3>
    <div class="pkg">shelly</div>
    <p>General graphical package manager after install (CLI + GTK UI + update notifications), a friendlier front-end to pacman.</p>
    <span class="tag">GUI</span><span class="tag">CLI</span>
  </div>
  <div class="app-card">
    <h3>Linxira Update</h3>
    <div class="pkg">linxira-update</div>
    <p>System update notifier &amp; maintenance assistant: interactive prompts, systray applet, pre/post update tasks. Driven by a systemd user service. See <a href="/en/docs/updates/">Updates &amp; Rollback</a> for usage.</p>
    <span class="tag">tray</span><span class="tag">auto-check</span>
  </div>
</div>

<h2>Software installation &amp; runtimes</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Package Center</h3>
    <div class="pkg">linxira-package-center</div>
    <p>Curated app installer (Quick System Software Setup): catalog v3 application tree with a plan/confirm/apply transaction. General software center is Shelly.</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Component Manager</h3>
    <div class="pkg">linxira-component-manager</div>
    <p>Capability packs / runtimes / toolchains (Quick System Runtime Setup): three-state component tree (required/recommended/optional). Install-only, no uninstall.</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Components</h3>
    <div class="pkg">linxira-components</div>
    <p>Catalog-bound pacman transaction planner &amp; receipt backend: deterministic plans, SHA-256 canonical JSON digests, root-only pacman, persistent receipts. D-Bus service <code>org.linxira.Components1</code>.</p>
    <span class="tag">backend</span><span class="tag">systemd</span>
  </div>
  <div class="app-card">
    <h3>Catalog</h3>
    <div class="pkg">linxira-catalog</div>
    <p>Reviewed software/component metadata catalog: six-face model (desktops/applications/components/bundles/operations/categories), stable IDs, bundles form a DAG.</p>
    <span class="tag">data</span><span class="tag">schema</span>
  </div>
</div>

<h2>Hardware &amp; system management</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Hardware Driver Manager</h3>
    <div class="pkg">linxira-hardware-driver-manager</div>
    <p>Hardware/driver reporting &amp; fixed-policy planning UI: consumes chwd-detector output, NVIDIA open/proprietary policy, root read-only diagnostics. Driver Apply limited to Hyper-V/QEMU/VMware.</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Kernel Manager</h3>
    <div class="pkg">linxira-kernel-manager</div>
    <p>Read-only kernel/boot/initramfs reporting &amp; fixed-policy planning: linux/linux-lts matrix only, GRUB reporting; Apply always backend-not-ready.</p>
    <span class="tag">GUI</span><span class="tag">CLI</span>
  </div>
  <div class="app-card">
    <h3>HWD Detector (lhwd)</h3>
    <div class="pkg">linxira-hwd-detector</div>
    <p>Hardware detection and driver configuration tool (Rust, full CHWD port): no-argument mode emits a read-only JSON report; <code>lhwd</code> provides the full list / autoconfigure / install / remove CLI. See <a href="/en/docs/drivers/">Driver setup</a>.</p>
    <code class="cli">lhwd --list · lhwd -a</code>
  </div>
  <div class="app-card">
    <h3>Gaming Manager</h3>
    <div class="pkg">linxira-gaming-manager</div>
    <p>User-level game library &amp; compatibility workspace: Steam library discovery, import non-Steam .exe, pinned UMU/Wine runners, restic backups, catalog-bound.</p>
    <span class="tag">GUI</span>
  </div>
</div>

<h2>Recovery &amp; diagnostics</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Recovery Diagnostics</h3>
    <div class="pkg">linxira-recovery-diagnostics</div>
    <p>Read-only recovery diagnostics &amp; repair planning: pacman-lock diagnosis, live-chroot readiness checks. Snapshot/rollback/repair ops currently apply-backend-not-ready.</p>
    <span class="tag">GUI</span>
  </div>
  <div class="app-card">
    <h3>Completion Agent</h3>
    <div class="pkg">linxira-completion-agent</div>
    <p>First-boot completion flow: binds installer receipt, shows deferred install items. Rejects bad hand-offs; AUR/Flatpak always deferred; reviewed items only.</p>
    <span class="tag">GUI</span><span class="tag">autostart</span>
  </div>
</div>

<h2>System components</h2>
<div class="app-grid">
  <div class="app-card">
    <h3>Artwork</h3>
    <div class="pkg">linxira-artwork</div>
    <p>Official art assets: logo, wallpapers, icons, Plymouth boot animation, welcome banners. Brand color spec &amp; SVG sources.</p>
    <span class="tag">assets</span>
  </div>
  <div class="app-card">
    <h3>Hooks</h3>
    <div class="pkg">linxira-hooks</div>
    <p>System-recognized pacman hooks: os-release / lsb-release / reboot-required / plymouth-initramfs with helper scripts.</p>
    <span class="tag">pacman</span>
  </div>
  <div class="app-card">
    <h3>Keyring</h3>
    <div class="pkg">linxira-keyring</div>
    <p>Linxira package signing public keyring: <code>/usr/share/keyrings/linxira.gpg</code>; auto-added and locally trusted via pacman-key on install.</p>
    <span class="tag">signing</span>
  </div>
</div>

<h2>Design principles</h2>
<ul style="color:#94a3b8; margin:0.5rem 0 1rem 1.5rem;">
  <li><strong>Read-only first</strong>: detectors and diagnostics are read-only; mutations go through a controlled backend.</li>
  <li><strong>Catalog-bound</strong>: GUIs only read stable IDs from the catalog — never accept arbitrary arguments/commands/paths.</li>
  <li><strong>Planned transactions</strong>: plan → confirm → apply, with persistent receipts.</li>
  <li><strong>Signed repository</strong>: every official package is GPG-signed and verified on install.</li>
</ul>
