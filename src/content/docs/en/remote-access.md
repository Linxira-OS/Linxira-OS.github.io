---
title: "Remote Access"
section: guide
order: 7
---

<a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to docs</a>
<h1>Remote access: SSH</h1>
<p>Linxira OS ships an OpenSSH server and the <code>linxira-config</code> SSH tooling. This page turns a Linxira machine into a remotely reachable server and spells out the privilege and risk of each step.</p>

<div class="warn">⚠️ The SSH subcommands are still being finished and <strong>may have defects</strong> — port changes plus firewall sync, and merging with existing config, in particular. Make sure root and daily-user passwords are strong before enabling anything, and verify <code>/etc/ssh/sshd_config.d/</code> by hand before exposing the host to the internet.</div>

<h2>0. Which commands need sudo</h2>
<table>
<tr><th>Command</th><th>sudo</th><th>Notes</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>No</td><td>Read-only</td></tr>
<tr><td><code>linxira-config ssh key …</code></td><td>No</td><td>Writes your <code>~/.ssh</code></td></tr>
<tr><td><code>linxira-config ssh authorized …</code></td><td>No</td><td>Writes your <code>~/.ssh/authorized_keys</code></td></tr>
<tr><td><code>linxira-config ssh on / off / port</code></td><td><strong>Yes</strong></td><td>Edits system config and controls sshd</td></tr>
<tr><td><code>linxira-config security ufw …</code></td><td><strong>Yes</strong></td><td>Changes firewall rules</td></tr>
</table>
<p><code>linxira-config</code> does not elevate itself; without sudo, root-only subcommands fail and say so.</p>

<h2>1. Enable SSH</h2>
<p>Check the current state first:</p>

```
linxira-config ssh status
```

<p>Example output:</p>

```
SSH Status
  Service state:        inactive
  Service startup:      disabled
  Port:                 22
  Root login:           prohibit-password
  Password authentication: yes
  Connect:              ssh user@192.168.1.100 -p 22
```

<div class="step">
<div class="step-num">1</div>
<div class="step-body">
<p><strong>Persistent enable</strong> (starts at boot):</p>

```
sudo linxira-config ssh on
```

<p><code>on</code> installs openssh, writes <code>PasswordAuthentication yes</code>, enables and starts sshd, and opens the current port when UFW is active.</p>

<p><strong>Temporary</strong> (this boot only, useful for one-off debugging):</p>

```
sudo systemctl start sshd
sudo systemctl stop sshd
```

<p>If UFW is enabled, allow the SSH port:</p>

```
sudo ufw allow 22/tcp
```

</div>
</div>

<div class="step">
<div class="step-num">2</div>
<div class="step-body">
<p><strong>Confirm</strong>:</p>

```
linxira-config ssh status
```

</div>
</div>

<h2>2. Connect from another machine</h2>
<p>For a first connection these two options skip the interactive fingerprint prompt and time out after 8 seconds:</p>

```
ssh -o StrictHostKeyChecking=accept-new -o ConnectTimeout=8 user@IP
```

<p>Windows 10/11 ships <code>ssh</code>; run the same command in PowerShell. Get the IP from <code>ip -4 addr show</code> or <code>linxira-config ssh status</code>.</p>

<h2>3. Generate a key pair (client)</h2>
<p>On the <strong>client</strong> (the machine you connect from), generate an Ed25519 pair — far safer than password login. No sudo needed:</p>

```
linxira-config ssh key generate
linxira-config ssh key list
linxira-config ssh key show
linxira-config ssh key fingerprint
```

<h2>4. Authorize the key (server)</h2>
<p>On the <strong>server</strong> (the Linxira machine), add the client's public key to <code>authorized_keys</code>. No sudo needed either — it writes the current user's <code>~/.ssh/authorized_keys</code>.</p>

<div class="step">
<div class="step-num">1</div>
<div class="step-body">
<p>On the client, run <code>linxira-config ssh key show</code> and copy the whole line (<code>ssh-ed25519 AAAA... linxira@hostname</code>).</p>
</div>
</div>
<div class="step">
<div class="step-num">2</div>
<div class="step-body">
<p>On the server, pass that line as the argument:</p>

```
linxira-config ssh authorized add "ssh-ed25519 AAAA... linxira@hostname"
```

<p><code>authorized add</code> accepts a <strong>plain public-key string</strong> only — no file paths, and no entries with <code>command=</code> or <code>environment=</code> options. That restriction is deliberate.</p>

</div>
</div>
<div class="step">
<div class="step-num">3</div>
<div class="step-body">
<p><strong>List what is authorized</strong>:</p>

```
linxira-config ssh authorized list
```

</div>
</div>

<div class="note">💡 If both machines run linxira-config you can also move the public-key string over a USB stick or a trusted chat. The transfer path must be trustworthy.</div>

<h2>5. Connect from the client</h2>
<p>The <code>Connect:</code> line of <code>linxira-config ssh status</code> gives you the address and port:</p>

```
ssh user@server-ip
```

<p>The first connection asks you to confirm the host fingerprint; type <code>yes</code>.</p>

<h3>LAN / internet</h3>
<ul>
<li><strong>Same LAN</strong>: use the private IP directly, no extra setup.</li>
<li><strong>Across networks / internet</strong>: forward a port on the router, or use Tailscale / ZeroTier so port 22 is never exposed.</li>
<li><strong>Hostname</strong>: on the same LAN, <code>ssh user@hostname.local</code> works with mDNS.</li>
</ul>

<h2>6. Hardening</h2>
<p>Do at least the first two before treating the machine as a public server:</p>
<ul>
<li><strong>Key-only login</strong>: verify a key works, then set <code>PasswordAuthentication no</code> in <code>/etc/ssh/sshd_config.d/</code> and <code>sudo systemctl restart sshd</code>.</li>
<li><strong>No root login</strong>: the default is <code>PermitRootLogin prohibit-password</code>; set it to <code>no</code> for internet-facing hosts.</li>
<li><strong>Check effective config</strong>: <code>sudo sshd -T | grep -E '^(port|permitrootlogin|passwordauthentication)'</code>.</li>
<li><strong>Enable UFW</strong>: <code>sudo ufw enable</code>, then allow only the ports you need.</li>
<li><strong>fail2ban</strong> (optional): <code>sudo pacman -S fail2ban</code>.</li>
<li><strong>Change the port</strong> (optional): <code>sudo linxira-config ssh port 2222</code>, and allow the new port too.</li>
</ul>

<div class="warn">⚠️ Before exposing anything to the internet, confirm key auth works with password login disabled, and keep one logged-in session open for rollback. <code>ssh authorized add</code> refuses keys with options by design.</div>

<h2>7. Disable and clean up</h2>

```
sudo systemctl disable --now sshd
linxira-config ssh authorized list
linxira-config ssh authorized remove SHA256:xxxx --yes
linxira-config ssh key remove work-laptop --yes
```

<h2>Command reference</h2>
<table>
<tr><th>Command</th><th>Purpose</th><th>sudo</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>Service state, port, connection hint</td><td>No</td></tr>
<tr><td><code>linxira-config ssh on</code></td><td>Install and enable sshd</td><td>Yes</td></tr>
<tr><td><code>linxira-config ssh off</code></td><td>Stop and disable sshd</td><td>Yes</td></tr>
<tr><td><code>linxira-config ssh port &lt;n&gt;</code></td><td>Change the listening port</td><td>Yes</td></tr>
<tr><td><code>linxira-config ssh key generate [name]</code></td><td>Generate an Ed25519 pair</td><td>No</td></tr>
<tr><td><code>linxira-config ssh key list</code></td><td>List local public keys</td><td>No</td></tr>
<tr><td><code>linxira-config ssh key show [name]</code></td><td>Print the public key</td><td>No</td></tr>
<tr><td><code>linxira-config ssh key fingerprint [name]</code></td><td>Print the fingerprint</td><td>No</td></tr>
<tr><td><code>linxira-config ssh key remove &lt;name&gt; --yes</code></td><td>Delete a key pair</td><td>No</td></tr>
<tr><td><code>linxira-config ssh authorized list</code></td><td>List authorized keys</td><td>No</td></tr>
<tr><td><code>linxira-config ssh authorized add &lt;key-string&gt;</code></td><td>Authorize one plain key</td><td>No</td></tr>
<tr><td><code>linxira-config ssh authorized remove &lt;fp&gt; --yes</code></td><td>Remove by fingerprint</td><td>No</td></tr>
</table>

<p>More configuration and diagnostics (mirrors, network diagnostics, security status) live in the <a href="/en/docs/config-hub/">Config Hub documentation</a>.</p>
