---
title: "Package Sources"
section: guide
order: 12
---

# Package sources

System, language, and AUR sources are switched separately. `linxira-config mirror` probes and selects; you never edit `/etc/pacman.conf` by hand.

## See what is active

```bash
linxira-config source
linxira-config mirror arch list
```

## System sources (Arch)

```bash
linxira-config mirror arch auto        # probe all candidates, pick the fastest
linxira-config mirror arch speed tuna
linxira-config mirror arch set ustc
linxira-config mirror arch reset       # back to the official geo mirror
sudo pacman -Syu
```

`linxira-config` writes `/etc/pacman.d/mirrorlist` — back it up if you have customised it.

## Language and toolchain sources (user scope)

No root required:

```bash
linxira-config mirror npm auto
linxira-config mirror pip set tuna
linxira-config mirror go set official
```

| Type | File | Affects |
|---|---|---|
| `npm` | `~/.npmrc` | `npm install` |
| `pip` | `~/.config/pip/pip.conf` | `pip install` |
| `go` | `~/.config/go/env` | `go get` |

## AUR

```bash
linxira-config mirror aur list
linxira-config mirror aur set https://aur.tuna.tsinghua.edu.cn
linxira-config mirror aur reset
```

Only https URLs are accepted. Builds still go through `yay`/`paru`; only the Git remote changes.

## Flatpak

```bash
linxira-config mirror flatpak list
linxira-config mirror flatpak set flathub
```

## When not to use `auto`

- A private mirror exists → `set`
- Probe results are unstable → pin a nearby mirror
- Corporate networks allow specific domains only → `set`

If the first sync fails after switching, run `linxira-config net diag` then `mirror arch speed <id>`. Do not repeatedly `reset`.

## Related

- Installed packages: [Package Managers](/en/docs/package-managers/)
