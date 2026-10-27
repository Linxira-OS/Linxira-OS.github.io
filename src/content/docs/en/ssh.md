---
title: "SSH Quick Setup"
section: guide
order: 13
---

# SSH quick setup

<div class="warn">⚠️ Status: the SSH subcommands are still being finished and <strong>may have defects</strong> — especially around changing the port and keeping firewall rules in sync, and around merging with existing config. Make sure the root and daily-user passwords are strong before enabling anything, and do not expose SSH to the internet before hardening. After setup, verify the real contents of <code>/etc/ssh/sshd_config.d/</code> by hand rather than trusting a single command.</div>

`linxira-config ssh` bundles "install openssh, enable sshd, open the port, manage keys" behind one entry point, but each command has different privilege requirements.

## Which commands need sudo

<table>
<tr><th>Command</th><th>sudo required</th><th>Why</th></tr>
<tr><td><code>linxira-config ssh status</code></td><td>No</td><td>Read-only query</td></tr>
<tr><td><code>linxira-config ssh key …</code></td><td>No</td><td>Writes only your <code>~/.ssh</code></td></tr>
<tr><td><code>linxira-config ssh authorized …</code></td><td>No</td><td>Writes only your <code>~/.ssh/authorized_keys</code></td></tr>
<tr><td><code>linxira-config ssh on / off / port</code></td><td><strong>Yes</strong></td><td>Edits <code>/etc/ssh/sshd_config.d/</code> and controls sshd</td></tr>
<tr><td><code>linxira-config security ufw …</code></td><td><strong>Yes</strong></td><td>Changes firewall rules</td></tr>
<tr><td><code>linxira-config net diag</code></td><td>No</td><td>Read-only diagnostics</td></tr>
</table>

<p><code>linxira-config</code> <strong>never elevates itself</strong>: root-only subcommands fail under a normal user and tell you to use sudo.</p>

## Enable and disable

```
sudo linxira-config ssh on
linxira-config ssh status
sudo linxira-config ssh off
```

<p><code>on</code> installs openssh, writes <code>PasswordAuthentication yes</code>, enables and starts sshd, and opens the current port if UFW is already enabled.</p>

## Change the port

```
sudo linxira-config ssh port 2222
linxira-config ssh status
sudo linxira-config security ufw allow 2222
```

<p>You must open the new port in the firewall or connections will be dropped; skip that step when UFW is not enabled. Test locally with <code>ssh user@127.0.0.1 -p 2222</code> before dropping your existing session.</p>

## Keys

<p>These run as the <strong>current user</strong> and need no sudo. Private keys land in <code>~/.ssh/</code> with permissions handled for you.</p>

```
linxira-config ssh key generate work
linxira-config ssh key list
linxira-config ssh key show work
linxira-config ssh key fingerprint work
linxira-config ssh key remove work --yes
```

## Authorize a public key

```
linxira-config ssh authorized list
linxira-config ssh authorized add "ssh-ed25519 AAAA... user@host"
linxira-config ssh authorized remove SHA256:xxxx --yes
```

<p><code>authorized add</code> accepts exactly <strong>one plain public-key string</strong> (not a file path) and rejects entries carrying options such as <code>command=</code> or <code>environment=</code>. That is deliberate. Run it once per key.</p>

## Root and password safety

<p>The default is <code>PermitRootLogin prohibit-password</code>: root may log in with keys only, never with a password. Do <strong>not</strong> change it to <code>yes</code> unless you fully understand the consequences.</p>

<p>Do daily work as a normal user with sudo, not as root. Check the effective configuration (read-only, but reading system config needs sudo):</p>

```
sudo sshd -T | grep -E '^(port|permitrootlogin|passwordauthentication)'
```

<p>To disable password logins entirely, first add your key to <code>authorized_keys</code> and prove it works, then drop a config fragment:</p>

```
sudo tee /etc/ssh/sshd_config.d/99-linxira-hardening.conf > /dev/null <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF
sudo systemctl restart sshd
```

<p><strong>Keep your current session open</strong> after the restart, verify a new connection from another terminal, and only then log out.</p>

<div class="note">
<p>Account password strength still matters: sudo, local login, and any SSH path where password auth is still on depend on it. Optional hardening: <code>sudo pacman -S fail2ban</code> and enable <code>fail2ban.service</code> to cut down brute-force attempts.</p>
</div>

## Connect from another machine

```
ssh user@192.168.1.100 -p 22
```

<p>The <code>Connect:</code> line from <code>ssh status</code> gives you the address and port directly.</p>

## When it will not connect

1. `linxira-config ssh status` — is the service running, and on which port?
2. `linxira-config security ufw status` — is the port allowed?
3. `linxira-config net diag` — is the local network stack healthy?
4. `sudo sshd -T | grep -E '^(port|listenaddress)'` — what is sshd actually bound to?

## Security boundaries

- `ssh on` starts the system-wide sshd and applies to every account
- Before exposing to the internet, switch to key-only auth and consider a non-default port or a Tailscale / ZeroTier mesh
- RDP / VNC are not available yet (xrdp is not in the signed repositories); use SSH + X11 forwarding or another approach

## Related

- Full remote-access walkthrough: [Remote access](/en/docs/remote-access/)
- Firewall and security: [linxira-config recipes](/en/docs/config-hub-examples/)
