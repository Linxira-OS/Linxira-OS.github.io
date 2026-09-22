---
title: "Changelog: Fixing the Fork's Systemic Pain"
date: 2026-09-22
tag: announcement
lang: en
desc: "linxira-update 0.1.3, Welcome 1.0.4 and installer fixes in the next image: ownership misdetection, COSMIC gray tiles, dark mode, CN mirrors and Flathub preseeding — plus the last layer of third-party distro dependency removed."
---

# Changelog: Fixing the Fork's Systemic Pain

> 2026-09-22. This round of fixes spans the update tool, the Welcome app and the installer, all exposed by real installation testing. Versions involved: `linxira-update 0.1.3`, `linxira-welcome 1.0.4`, and the next install image (installer changes already merged to main).

## Where forking hurts

Linxira OS is forked from an Arch base. In the first month after the fork, hidden assumptions inherited from upstream started blowing up one by one — the kind of problems that only surface when you watch "someone else" install the system for the first time.

### 1. The update tool false-flagging "unable to determine ownership"

`pacman -Qmq` returns 1 even when there are **no foreign packages**. The old code treated "empty set" as "detection failure" — so the cleaner your `[linxira]` repository setup (which is exactly the end state we want), the harder the update tool failed. Fixed: only exit codes ≥ 2 count as failure. The same batch adds: check timeout raised from 30s to 120s (downloading full databases on CN networks routinely exceeds 30 seconds — "slow" was being misread as "stuck"), and one automatic retry when `checkupdates` hits a transient download failure.

### 2. Package name ≠ binary name: three gray tiles on COSMIC

Arch's `cosmic-terminal` package installs a binary called **`/usr/bin/cosmic-term`**. The Welcome app's "Terminal" and "Config CLI" tiles were checking a path that does not exist, so both stayed gray on COSMIC; the `linxira-update --launch` terminal fallback chain also fell through all three candidates — "click, nothing happens". The "System Settings" tile was hard-coded to KDE's `systemsettings`. All three fixed with per-desktop candidate fallbacks (`cosmic-term` → `konsole` → `xterm`; `cosmic-settings` → `systemsettings`).

### 3. Dark mode that follows the desktop

Qt has no platform-theme plugin on COSMIC, so a dark desktop got a blinding white window. Welcome 1.0.4 now reads the freedesktop `color-scheme` portal (`org.freedesktop.appearance`) and applies a Fusion dark palette — highlight in our brand teal — when dark is preferred.

### 4. Installer: localized mirrors + server path unblocked

- **Chinese installs get CN mirrors first**: when the install language is Chinese, the target's mirrorlist is written directly with Tsinghua/USTC/Aliyun/NJU mirrors instead of relying on reflector's global ranking — "reachable" is not "fast", and foreign mirrors have dragged first updates into timeouts. Non-Chinese installs keep the original behavior.
- **Flathub CN mirror preseeded**: `/etc/flatpak/remotes.d` gets a SJTU-mirror Flathub definition, so cosmic-store works out of the box (`dl.flathub.org` is effectively unreachable from CN).
- **sddm / cronie demoted to non-mandatory**: server and minimal installs no longer hard-fail when individual service names change.

## Removing third-party distro repository dependencies

The hidden dependencies inherited at fork time are going to zero: the packaging CI's `check-boundaries.sh` has always banned CachyOS / AUR / Seafoam sources in PKGBUILDs; the install image contains only the **official Arch repositories plus the signed `[linxira]` repository**, with kernels being official `linux` / `linux-lts` — no third-party distro build artifacts at all. What remains are a few "parameter reference" comments (zram, sysctl tuning values) — homage, not dependency.

## What's next

The next step is **full Linux bootstrap development**: using our own toolchain (Bio SDK, Zeta) to progressively replace the borrowed base with layers we fully control. See today's companion post "What Omarchy Teaches Us".
