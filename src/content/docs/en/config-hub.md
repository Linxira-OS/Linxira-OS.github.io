---
title: "Config Hub"
section: guide
order: 3
---

<a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to docs</a>
<h1>Config Hub CLI (linxira-config)</h1>
<p><code>linxira-config</code> is the command-line entry point for <b>config-hub</b>: SSH, mirrors, diagnostic logs, environment variables, software stacks, workspace guard and security posture — one command per action. Running <code>linxira-config</code> with no arguments opens a pure-bash numeric menu (TUI) whose items map one-to-one to the subcommands.</p>
<div class="note">📌 This page documents <b>config-hub 2.6.2</b>. Any subcommand accepts <code>--json</code> for machine-readable output (workspace-guard, ssh status, net diag and mirror list all support it), which makes it easy to consume from scripts and AI assistants.</div>

<div class="note">🔑 <strong>Privilege rules</strong>: subcommands that need root (<code>ssh on/off/port</code>, <code>workspace-guard enable/disable</code>, <code>security ufw …</code>, <code>headless on/off</code>, and <code>mirror arch auto</code> when it writes system sources) must be prefixed with <code>sudo</code>. <code>linxira-config</code> never elevates itself and fails immediately without sudo. Read-only queries (<code>status</code> / <code>list</code> / <code>show</code> / <code>diag</code>) need no sudo.</div>

<h2 id="logs">Diagnostic logs: collect and upload</h2>
<p>When an install fails, an update misbehaves, or something is just wrong, start here: collect local diagnostics and get back a shareable short link.</p>

```
linxira-config logs collect
linxira-config logs upload
linxira-config logs upload some-file
```

<table>
<tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>logs collect</code></td><td>Writes a bundle to <code>~/linxira-logs/linxira-logs-*.txt</code></td></tr>
<tr><td><code>logs upload</code></td><td>Uploads the newest bundle and prints a short link</td></tr>
<tr><td><code>logs upload &lt;file&gt;</code></td><td>Uploads a specific file</td></tr>
</table>

<p>The bundle covers system and disk overview, installed linxira packages, failed units, the <b>full installer log</b> (/tmp/linxira-installer.log plus Calamares session logs), pacman.log and this boot's error journal. Uploads fall back across <b>paste.rs → termbin → dpaste</b>, so one of them is reachable from most networks; the returned link can go straight to a maintainer or an AI assistant.</p>

<h2 id="ssh">SSH remote access</h2>
<p>Turn the machine into a remotely manageable server. Enabling, disabling and changing the port edit system config and control sshd, so they <strong>require sudo</strong>; keys and authorizations only touch your home directory.</p>

```
sudo linxira-config ssh on
linxira-config ssh status
sudo linxira-config ssh off
sudo linxira-config ssh port 2222
linxira-config ssh status --json
```

<table>
<tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>ssh on</code></td><td>Installs openssh, enables and starts sshd, opens the port when UFW is active</td></tr>
<tr><td><code>ssh status</code></td><td>Service state and connection details (IP / port)</td></tr>
<tr><td><code>ssh off</code></td><td>Stops and disables sshd</td></tr>
<tr><td><code>ssh port &lt;n&gt;</code></td><td>Changes the listening port (remember to allow it in the firewall)</td></tr>
</table>

<p>Key management (Ed25519, no sudo needed):</p>

```
linxira-config ssh key generate [name]
linxira-config ssh key list
linxira-config ssh key show [name]
linxira-config ssh key fingerprint [name]
linxira-config ssh key remove [name] --yes
linxira-config ssh authorized add "<public-key>"
linxira-config ssh authorized list
linxira-config ssh authorized remove <fingerprint> --yes
```

<p>Note: <code>authorized add</code> accepts a plain public-key string (not a file path) with no options, and key paths are refused if they are symlinks.</p>

<div class="warn">⚠️ The SSH subcommands are still being finished and may have defects. Make sure account passwords are strong before enabling, and after any change verify <code>/etc/ssh/sshd_config.d/</code> and the effective config from <code>sudo sshd -T</code> by hand.</div>

<p>See the <a href="/en/docs/remote-access/">remote access guide</a> for a step-by-step walkthrough including key login and hardening.</p>

<h2 id="env">Environment variables</h2>
<p>Machine-wide variables live in <code>/etc/profile.d/linxira-env.sh</code> and survive reboots:</p>

```
linxira-config env list
linxira-config env set KEY value
linxira-config env get KEY
linxira-config env unset KEY
```

<h2 id="stack">Software stacks</h2>
<p>One-shot scientific software stacks, bridging the linxira-component-manager transactional backend:</p>

```
linxira-config stack list
linxira-config stack status
linxira-config stack install <id>
linxira-config stack tui
```

<h2 id="workspace-guard">Workspace guard</h2>
<p>Takes an independent recovery point of your workspace every 30 minutes (including .git), so accidental deletions can be rolled back. Enabling and disabling need sudo; queries do not:</p>

```
linxira-config workspace-guard status
sudo linxira-config workspace-guard enable
sudo linxira-config workspace-guard disable
linxira-config workspace-guard handbook
```

<p>Day-to-day recovery points use <code>linxira-components guard &lt;status|list|snapshot|restore&gt;</code>.</p>

<h2 id="mirror">Mirror management</h2>
<p>Covers six source families: Arch, npm, PyPI, AUR, Go modules and Flatpak.</p>

```
linxira-config mirror arch list
linxira-config mirror arch speed
sudo linxira-config mirror arch auto
linxira-config mirror pip set tsinghua
linxira-config mirror flatpak set <id|url>
sudo linxira-config mirror arch reset
linxira-config mirror arch list --json
```

<table>
<tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>mirror arch list</code></td><td>Lists candidate mirrors</td></tr>
<tr><td><code>mirror arch speed</code></td><td>Benchmarks them all</td></tr>
<tr><td><code>mirror arch auto</code></td><td>Picks the fastest and writes system sources (sudo)</td></tr>
<tr><td><code>mirror pip set &lt;name&gt;</code></td><td>Switches by name (npm/pip/aur/go are user-level)</td></tr>
<tr><td><code>mirror flatpak set &lt;id|url&gt;</code></td><td>Points Flatpak at a specific remote</td></tr>
<tr><td><code>mirror arch reset</code></td><td>Restores the official mirrors (sudo)</td></tr>
</table>

<p>Miniforge channels are managed separately and limited to the reviewed <code>conda-forge</code> and <code>bioconda</code>: <code>conda channels list|add|remove|reset</code>.</p>

<h2 id="catalog">Catalog queries (read-only)</h2>
<p>Inspect the reviewed software catalog. Commands take catalog IDs, not package names, and are all read-only (no sudo):</p>

```
linxira-config catalog software --all
linxira-config catalog software --status drifted
linxira-config catalog component list
linxira-config catalog bundle list
linxira-config catalog bundle show desktop-plasma
linxira-config catalog bundle show desktop-cosmic
linxira-config catalog software show firefox
```

<p>By default it shows <code>installed / partial / external / pending / drifted / reboot-required</code>; <code>--all</code> adds <code>not-installed</code>. Desktop profile IDs are <code>desktop-plasma</code>, <code>desktop-cosmic</code>, <code>desktop-server</code> and <code>desktop-server-minimal</code> — see <a href="/en/docs/desktop/">Desktop environments</a>.</p>

<h2 id="netsec">Network and security</h2>

```
linxira-config net diag
linxira-config net dns
linxira-config net dns set 223.5.5.5
linxira-config security status
sudo linxira-config security ufw allow 22
linxira-config runtime status
```

<table>
<tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>net diag</code></td><td>Full network diagnostics (<code>--json</code> supported)</td></tr>
<tr><td><code>net dns</code> / <code>net dns set &lt;ip&gt;</code></td><td>Read / set DNS</td></tr>
<tr><td><code>security status</code></td><td>Security overview (UFW/SSH/fail2ban/KVM)</td></tr>
<tr><td><code>security ufw allow &lt;port&gt;</code></td><td>Allow one TCP port (sudo)</td></tr>
<tr><td><code>runtime status</code></td><td>Runtime and package-manager state</td></tr>
</table>

<h2 id="misc">Miscellaneous</h2>

```
linxira-config timeshift status
sudo linxira-config headless on
linxira-config headless status
linxira-config info
linxira-config status
linxira-config tui
```

<p>Write operations for <code>rdp</code>, <code>virt kvm-on/docker-on</code>, <code>security harden</code> and <code>power</code> currently <b>wait for the transactional backend</b> (queries work). That is deliberate: every mutating action must go through the rollback-capable channel.</p>

<p>Bugs and feature requests: <a href="https://github.com/Linxira-OS/linxira-config-hub" target="_blank">linxira-config-hub</a>.</p>
