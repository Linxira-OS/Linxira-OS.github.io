---
title: "Beginner Guide"
section: start
order: 1
---

<h1>Beginner's Guide</h1>
<p>First time using Linux? Start here — terminal basics, where to look things up, the Chinese environment, and choosing a desktop.</p>

<h2>What is Linxira</h2>
<p>Linxira is a desktop supercomputer built on Arch Linux: it ships with the KDE Plasma desktop and is ready to use right after installation. You don't need to understand distribution concepts — think of it as a Linux computer with research software preconfigured.</p>

<h2>Terminal Basics</h2>
<p>Opening a terminal: KDE application menu → Terminal (Konsole), or press <code>Ctrl+Alt+T</code>.</p>
<p>The most useful commands:</p>
<table class="keylist">
<thead>
<tr><th>Command</th><th>What it does</th></tr>
</thead>
<tbody>
<tr><td><code>pwd</code></td><td>Show the current directory</td></tr>
<tr><td><code>ls</code></td><td>List files in the current directory</td></tr>
<tr><td><code>cd 目录名</code></td><td>Change into a directory</td></tr>
<tr><td><code>sudo 命令</code></td><td>Run a command as administrator (asks for your password the first time; nothing is shown while typing)</td></tr>
<tr><td><code>sudo pacman -Syu</code></td><td>Update the whole system</td></tr>
<tr><td><code>sudo pacman -Ss 关键词</code></td><td>Search for software</td></tr>
<tr><td><code>sudo pacman -S 包名</code></td><td>Install software</td></tr>
<tr><td><code>sudo pacman -Rns 包名</code></td><td>Remove software</td></tr>
<tr><td><code>man 命令</code></td><td>Read the manual for a command (press q to quit)</td></tr>
</tbody>
</table>
<p>Got an error? Terminal output is in English — copy the error message into a search box. Almost every problem has been seen before and has an answer online.</p>

<h2>Where to Look Things Up: the Arch Wiki</h2>
<p>The Arch Wiki is the official Arch documentation, maintained by Linux users worldwide. Since Linxira is based on Arch, its answers apply directly. Open <a href="https://wiki.archlinux.org/" target="_blank">https://wiki.archlinux.org/</a> and use the search box on the page.</p>
<p>Want it in Chinese? Pick 「中文（简体）」 from the language menu in the top-left corner; the entry URL then gets a <code>(简体中文)</code> suffix. For example, the Chinese Pacman entry: <a href="https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)" target="_blank">https://wiki.archlinux.org/title/Pacman_(简体中文)</a>.</p>
<p>Quick reference of common entries:</p>
<table class="keylist">
<thead>
<tr><th>Topic</th><th>Entry to search for</th></tr>
</thead>
<tbody>
<tr><td>Installing software</td><td>Pacman</td></tr>
<tr><td>Desktop</td><td>KDE</td></tr>
<tr><td>Input methods</td><td>Fcitx5</td></tr>
<tr><td>Chinese environment</td><td>Localization / 简体中文</td></tr>
<tr><td>Graphics</td><td>NVIDIA / AMDGPU</td></tr>
<tr><td>Audio</td><td>PipeWire</td></tr>
<tr><td>Networking</td><td>Network configuration</td></tr>
<tr><td>Boot &amp; recovery</td><td>GRUB / Btrfs</td></tr>
<tr><td>System backup</td><td>Timeshift</td></tr>
</tbody>
</table>
<p>Other official entry points: the site navigation on the home page — Download / Docs / Ecosystem / Roadmap / Blog — and the GitHub organization at <a href="https://github.com/Linxira-OS" target="_blank">https://github.com/Linxira-OS</a>.</p>

<h2>Chinese Environment</h2>
<p>Chose Chinese during installation → language, locale (<code>zh_CN.UTF-8</code>) and the Fcitx5 input method are already configured. Nothing to do.</p>
<p>Installed in English and want Chinese: KDE System Settings → Regional Settings / Language → Add 「简体中文」→ drag it to the top of the list → log out and back in. If some apps stay in English, install their language packs:</p>

```
sudo pacman -S firefox-i18n-zh-cn libreoffice-still-zh-cn
```

<p>Chinese input method not working? Troubleshoot in three steps:</p>
<p class="term-item"><strong>1) Make sure it is installed</strong> — run <code>sudo pacman -S fcitx5 fcitx5-chinese-addons fcitx5-configtool</code>.</p>
<p class="term-item"><strong>2) Enable Pinyin</strong> — System Settings → Input Method → Add Input Method → choose「拼音（Pinyin）」. The input method switch shortcut is <code>Ctrl+Space</code>.</p>
<p class="term-item"><strong>3) Still broken? Check the diagnostic report</strong> — run <code>fcitx5-diagnose | head -n 100</code> and paste the output to a community or search engine. Linxira uses Fcitx5 system-wide — do not install other frameworks such as ibus alongside it, to avoid conflicts.</p>
<p>If you installed a non-KDE desktop yourself (e.g. GNOME) and the input method does not take effect, write these three lines to <code>~/.xprofile</code> and restart your session:</p>

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

<p>If the locale is not taking effect (the <code>locale</code> command output looks wrong): run <code>sudo nano /etc/locale.gen</code>, uncomment the <code>zh_CN.UTF-8 UTF-8</code> line, then run <code>sudo locale-gen</code>.</p>

<h2>Choosing a Desktop Environment</h2>
<p>The default desktop is KDE Plasma. During installation you choose between KDE Plasma and Server (no desktop). You can install any other desktop (Plasma, GNOME, and more) yourself at any time. "Headless mode" only turns the desktop off temporarily to free memory for compute — it is not a desktop switch. See <a href="/en/docs/desktop/">Desktop &amp; Server Mode</a>.</p>
