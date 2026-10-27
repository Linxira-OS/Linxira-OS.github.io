---
title: "Desktop Environments"
section: guide
order: 5
---

<h1>Desktop environments and software selection</h1>
<p>The installer's software step is driven by catalog v3 and offers <strong>four desktop profiles</strong>. Pick exactly one:</p>

<table>
<tr><th>Profile</th><th>catalog id</th><th>Notes</th></tr>
<tr><td><strong>KDE Plasma</strong> (default)</td><td><code>desktop-plasma</code></td><td>Full desktop, ready out of the box</td></tr>
<tr><td><strong>COSMIC</strong></td><td><code>desktop-cosmic</code></td><td>System76's Rust-native desktop</td></tr>
<tr><td><strong>Headless (full toolset)</strong></td><td><code>desktop-server</code></td><td>Terminal only, keeps browser/containers/diagnostics</td></tr>
<tr><td><strong>Headless (minimal)</strong></td><td><code>desktop-server-minimal</code></td><td>Terminal only, Arch baseline</td></tr>
</table>

<h2>KDE Plasma</h2>
<p>The default recommendation: Bluetooth, Wi-Fi, printing, SDDM and the full graphical stack work immediately. The Plasma configuration is reviewed and suits workstation use that mixes daily work with research compute.</p>

<h2>COSMIC</h2>
<p>COSMIC is System76's Wayland-native desktop written in Rust and ships as a <strong>first-class desktop</strong>, on par with Plasma. Its packages are included on the ISO, so selecting it during installation needs no network; the package set matches catalog's <code>desktop-cosmic</code> entry.</p>
<p>Its terminal is <code>cosmic-term</code>. Since config-hub 2.6.2, linxira-update 0.1.10 and crash-watch 0.1.3, Linxira's terminal dispatch chain is compatible with <code>cosmic-term</code> and no longer crashes on the unsupported <code>-e</code> flag.</p>

<h2>The two headless profiles</h2>
<p>Neither installs a desktop, display manager or graphical stack; both boot to a <strong>plain terminal</strong> (tty login). They differ in how many tools they keep:</p>
<ul>
<li><strong>Full toolset</strong> (<code>desktop-server</code>): keeps a browser, terminal tools, container runtime, driver detection and diagnostic commands. Good for a server you still want to debug on.</li>
<li><strong>Minimal</strong> (<code>desktop-server-minimal</code>): core system plus Linxira management tools only, aligned with an Arch baseline install and lowest memory use.</li>
</ul>

<h2>Inspecting a profile</h2>
<p>These are read-only queries and do <strong>not</strong> need sudo:</p>

```
linxira-config catalog bundle list
linxira-config catalog bundle show desktop-cosmic
linxira-config catalog bundle show desktop-server-minimal
```

<p>The output lists the packages in that profile and their state. During installation, <code>linxirapacstrap</code> installs the selected set from the ISO's offline packages, so no network is used.</p>

<h2>Adding another desktop later</h2>
<p>The install-time choice <strong>locks nothing</strong>. COSMIC's packages are already on the ISO, so you can complete it with pacman:</p>

```
sudo pacman -S --needed cosmic-session cosmic-comp cosmic-term cosmic-files cosmic-applets
sudo systemctl enable --now cosmic-greeter
```

<p>Plasma works the same way:</p>

```
sudo pacman -S --needed plasma-desktop sddm
sudo systemctl enable --now sddm
```

<p>Any other Arch-supported desktop (GNOME, for example) also works, but its packages come from the online repositories:</p>

```
sudo pacman -S --needed gnome gdm
sudo systemctl enable --now gdm
```

<div class="note">
<p>With several display managers installed, only the last one you <code>enable</code> starts at boot. <code>systemctl disable</code> the old one first to avoid a confusing login screen.</p>
</div>

<h2>Switching between desktop and headless</h2>
<p>Every install ships a headless mode switch built on standard systemd targets: the desktop costs nothing and memory goes to compute. These commands <strong>need sudo</strong>:</p>

```
sudo linxira-config headless on now
sudo linxira-config headless off now
linxira-config headless status
```

<p><code>status</code> is read-only and needs no sudo; <code>on now</code> / <code>off now</code> switch the running target and must be elevated.</p>

<div class="note">
<p>Note: headless profiles still include a few general tools (browser, terminal utilities, containers, depending on the profile). Actual desktop components (Plasma / COSMIC / SDDM / file managers) only appear when you pick that desktop profile or install one yourself.</p>
</div>
