---
title: "Desktop"
section: guide
order: 4
---

  <h1>Desktop &amp; Server Mode</h1>
  <p>At the "Desktop Environment" step you choose one of two: <strong>KDE Plasma</strong> (full desktop) or <strong>Server (no desktop)</strong> (terminal only).</p>

  <h2>KDE Plasma Desktop</h2>
  <p>Recommended by default: a complete KDE Plasma desktop out of the box — Bluetooth, Wi-Fi, printing and the graphical environment all work. The Plasma setup is curated for a workstation that handles both daily use and scientific work.</p>

  <h2>Server (No Desktop) Mode</h2>
  <p>Installing in server mode ships no desktop environment and no display manager. The system boots into a <strong>terminal-only environment</strong> (tty login), exactly like a base Arch Linux install — memory stays fully available for compute. System tools, containers, driver detection and all other capabilities remain intact.</p>

  <h2>Install Any Desktop Environment Later</h2>
  <p>Server mode <strong>locks nothing</strong>. After installation you can install any desktop environment supported by Arch — Plasma, GNOME, or anything else:</p>
  <pre><code>sudo pacman -S plasma-desktop sddm
sudo systemctl enable --now sddm</code></pre>
  <p>GNOME works the same way:</p>
  <pre><code>sudo pacman -S gnome gdm
sudo systemctl enable --now gdm</code></pre>

  <h2>Desktop ⇄ Headless Switching</h2>
  <p>Whichever way you installed, the system ships a headless-mode switch (standard systemd target switching — zero desktop footprint, all RAM for compute):</p>
  <pre><code>linxira-config headless on now    # turn the desktop off immediately (confirm)
linxira-config headless off now   # restore the desktop immediately
linxira-config headless status    # show current mode</code></pre>

  <div class="note">
    <p>Note: the server-mode baseline still includes a few general-purpose tools (browser, terminal utilities, containers); actual desktop components (Plasma, SDDM, file managers) only appear when you choose KDE Plasma or install them yourself.</p>
  </div>
