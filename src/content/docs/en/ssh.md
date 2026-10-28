---
title: "SSH Setup"
section: guide
order: 13
---

# SSH setup

`linxira-config ssh` bundles package install, service enablement, port changes, and key management — no manual `sshd_config` editing.

## Turn it on or off

```bash
linxira-config ssh on        # install openssh, enable and start sshd
linxira-config ssh status    # state, port, reachable addresses
linxira-config ssh off
```

`on` also permits password authentication. For key-only access, add your public key first, then disable passwords in `/etc/ssh/sshd_config.d/`.

## Change the port

```bash
linxira-config ssh port 2222
linxira-config security ufw allow 2222
```

Opening the port in the firewall is a separate step; otherwise connections are blocked.

## Keys

```bash
linxira-config ssh key list
linxira-config ssh key generate work
linxira-config ssh key show work
linxira-config ssh key fingerprint work
linxira-config ssh key remove work --yes
```

Private keys live in `~/.ssh/` with permissions managed by the command.

## Authorized keys

```bash
linxira-config ssh authorized list
linxira-config ssh authorized add "ssh-ed25519 AAAA... user@host"
linxira-config ssh authorized remove <fingerprint> --yes
```

Accepts a single public-key string, not a file path.

## Connecting from another machine

```bash
ssh user@<address> -p 2222
```

`ssh status` prints the reachable address and port. If a LAN connection fails:

1. `linxira-config ssh status` — is the daemon running
2. `linxira-config security ufw status` — is the port open
3. `linxira-config net diag` — local network stack

## Security boundaries

- Before exposing to the internet: switch to keys and change the port
- `ssh on` controls the system-wide sshd, affecting every user
- RDP/VNC are unavailable (xrdp is not in the signed repositories)

## Related

- [Remote Access](/en/docs/remote-access/)
- [linxira-config cookbook](/en/docs/config-hub-examples/)
