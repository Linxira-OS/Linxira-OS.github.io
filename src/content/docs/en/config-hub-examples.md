---
title: "linxira-config Cookbook"
section: guide
order: 4
---

# linxira-config cookbook

Organised by "what you want to do". Every command is copy-pasteable.

## Discover

```bash
linxira-config help
linxira-config status
linxira-config info
linxira-config capabilities
```

- `linxira-config help` — full command list
- `linxira-config status` — one-screen summary
- `linxira-config info` — hardware and system info
- `linxira-config capabilities` — machine-readable manifest (for agents)


## Package sources

```bash
linxira-config mirror arch list
linxira-config mirror arch speed tuna
linxira-config mirror arch auto
linxira-config source
```


User-scoped sources:

```bash
linxira-config mirror npm auto
linxira-config mirror pip set tuna
linxira-config mirror aur list
linxira-config mirror go set official
```


## Remote access

```bash
linxira-config ssh on
linxira-config ssh status
linxira-config ssh port 2222
linxira-config ssh key generate work
linxira-config ssh key fingerprint work
linxira-config ssh authorized add "ssh-ed25519 AAAA..."
```


`rdp` and `vnc` are **disabled**: xrdp is not in the signed repositories yet and the per-user TigerVNC policy is undecided.

## Network

```bash
linxira-config net diag
linxira-config net dns
linxira-config net dns set 1.1.1.1
```


`net dns set` writes `/etc/resolv.conf` directly; NetworkManager may overwrite it on reconnect.

## Security

```bash
linxira-config security status
linxira-config security ufw on
linxira-config security ufw allow 22
linxira-config security ufw status
```


`security harden` is disabled pending the transactional backend.

## Snapshots and workspace guard

```bash
linxira-config timeshift status
sudo linxira-config timeshift enable
linxira-config workspace-guard status
sudo linxira-config workspace-guard enable
linxira-config workspace-guard handbook
```


## Catalog (read-only)

```bash
linxira-config catalog software --all
linxira-config catalog component list
linxira-config catalog bundle show science
```


Installing goes through `linxira-components` — the only entry point with a transaction plan.

## Runtimes and toolchains

```bash
linxira-config runtime status
linxira-config conda channels list
linxira-config conda channels add bioconda
linxira-config gpu status
linxira-config stack list
```


## Environment variables

```bash
linxira-config env list
linxira-config env set OMP_NUM_THREADS 8
linxira-config env get OMP_NUM_THREADS
linxira-config env unset OMP_NUM_THREADS
```


Written to `/etc/profile.d/linxira-env.sh`, system-wide.

## Diagnostics

```bash
linxira-config logs collect
linxira-config logs upload
```


Run `collect` before filing an issue — far more useful than a screenshot.

## Interactive menu

```bash
linxira-config tui
```
