---
title: "Config Hub"
section: guide
order: 3
---

      <a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to docs</a>
      <h1>Config Hub CLI (linxira-config)</h1>
      <p><code>linxira-config</code> is the command-line entry to the <b>Config Hub</b>: SSH, mirrors, diagnostic logs, environment variables, software stacks, workspace guard and security posture — one command per action. Running <code>linxira-config</code> with no arguments opens a pure-bash numbered menu (TUI); every menu item maps 1:1 to a CLI subcommand.</p>
      <div class="note">📌 This page matches <b>config-hub 2.5.2</b>. Append <code>--json</code> to any subcommand for machine-readable output (workspace-guard / ssh status / net diag / mirror list all support it) — handy for scripts and AI assistants.</div>

      <h2 id="logs">Diagnostic logs: collect &amp; upload in one shot</h2>
      <p>When an install fails, updates misbehave or anything looks odd, this is always step one — collect local diagnostics and get a shareable short link back:</p>
      <pre><code>linxira-config logs collect          # gathered into ~/linxira-logs/linxira-logs-*.txt
linxira-config logs upload           # uploads the newest bundle, prints a link
linxira-config logs upload some-file # upload a specific file</code></pre>
      <p>The bundle covers: system &amp; disk overview, installed linxira packages, failed units, the <b>full installer log</b> (/tmp/linxira-installer.log and the Calamares session log), pacman.log and this boot's error log. Uploads fall through <b>paste.rs → termbin → dpaste</b> automatically (reachable both in and outside China) and return a link you can hand to a maintainer or an AI assistant.</p>

      <h2 id="ssh">SSH remote access</h2>
      <p>Turn the machine into a remotely manageable server with one command:</p>
      <pre><code>linxira-config ssh on                # enable &amp; start sshd (works in passwordless sudo sessions too)
linxira-config ssh status            # service status &amp; connection info (IP / port)
linxira-config ssh off               # disable remote SSH
linxira-config ssh port 2222         # change the port
linxira-config ssh status --json     # machine-readable</code></pre>
      <p>Key management (Ed25519):</p>
      <pre><code>linxira-config ssh key generate [name]           # generate a key pair
linxira-config ssh key list / show / fingerprint  # inspect
linxira-config ssh authorized add &lt;pubkey&gt;        # authorize a public key
linxira-config ssh authorized list / remove       # manage the allowlist</code></pre>
      <p>Step-by-step tutorial (incl. key login) lives in the <a href="/en/docs/remote-access/">Remote Access guide</a>. Note: <code>authorized add</code> only accepts plain public keys without options; key paths reject symlinks.</p>

      <h2 id="env">Environment variables</h2>
      <p>Machine-wide variables live in <code>/etc/profile.d/linxira-env.sh</code> and survive reboots:</p>
      <pre><code>linxira-config env list              # list all
linxira-config env set KEY value     # write
linxira-config env get KEY           # read
linxira-config env unset KEY         # remove</code></pre>

      <h2 id="stack">Software stacks</h2>
      <p>One-shot research stacks (bridged to the linxira-component-manager transactional backend):</p>
      <pre><code>linxira-config stack list            # available stacks: scientific, office, dev…
linxira-config stack status          # installation state
linxira-config stack install &lt;id&gt;    # install one stack
linxira-config stack tui             # terminal UI</code></pre>

      <h2 id="workspace-guard">Workspace guard</h2>
      <p>Takes an independent recovery point of your workspace every 30 minutes (.git included) so accidental deletions roll back:</p>
      <pre><code>linxira-config workspace-guard status            # config &amp; timer state (--json works)
sudo linxira-config workspace-guard enable       # pick a disk, create the ext4 store, register &amp; start
sudo linxira-config workspace-guard disable      # stop the timer (keeps every recovery point)
linxira-config workspace-guard handbook          # print the AI-readable handbook manifest</code></pre>
      <p>Day-to-day snapshot operations: <code>linxira-components guard &lt;status|list|snapshot|restore&gt;</code>.</p>

      <h2 id="mirror">Mirror management</h2>
      <p>Six source families: Arch, npm, PyPI, AUR, Go modules and Flatpak:</p>
      <pre><code>linxira-config mirror arch list              # list candidate mirrors
linxira-config mirror arch speed             # measure all
linxira-config mirror arch auto              # pick the fastest
linxira-config mirror pip set tsinghua       # switch by name (npm/pip/aur/go are user-scoped)
linxira-config mirror flatpak set &lt;id|url&gt;   # pin a Flatpak remote
linxira-config mirror arch reset             # back to official
linxira-config mirror arch list --json       # machine-readable</code></pre>
      <p>Miniforge channels are managed separately and restricted to the vetted <code>conda-forge</code> and <code>bioconda</code>: <code>conda channels list|add|remove|reset</code>.</p>

      <h2 id="catalog">Catalog queries (read-only)</h2>
      <p>Query the vetted software catalog. Commands take catalog IDs (not package names):</p>
      <pre><code>linxira-config catalog software --all
linxira-config catalog software --status drifted
linxira-config catalog component list
linxira-config catalog bundle show kde-plasma
linxira-config catalog software show firefox</code></pre>
      <p>By default only <code>installed / partial / external / pending / drifted / reboot-required</code> show; <code>--all</code> adds <code>not-installed</code>.</p>

      <h2 id="netsec">Network &amp; security</h2>
      <pre><code>linxira-config net diag              # full network diagnostics (--json works)
linxira-config net dns               # current DNS servers
linxira-config net dns set 1.1.1.1   # set DNS
linxira-config security status       # posture overview (UFW/SSH/fail2ban/KVM)
linxira-config security ufw allow 22 # allow a TCP port
linxira-config runtime status        # runtime &amp; package-manager status</code></pre>

      <h2 id="misc">Miscellaneous</h2>
      <pre><code>linxira-config timeshift status      # Timeshift snapshots (enable/disable/status)
linxira-config headless on           # headless: next boot skips the desktop, all RAM for compute
linxira-config info / status         # system info / quick status summary
linxira-config tui                   # numbered menu (same capabilities)</code></pre>
      <p><code>rdp</code>, <code>virt kvm-on/docker-on</code>, <code>security harden</code> and <code>power</code> mutations are intentionally <b>pending the transactional backend</b> (status queries work) — by design: every mutation must go through the rollback-safe transactional channel.</p>

      <p>Bugs and feature requests go to the <a href="https://github.com/Linxira-OS/linxira-config-hub" target="_blank">linxira-config-hub repository</a>.</p>
