---
title: "Near-term plan: validate on Ubuntu interim releases until the next LTS"
date: 2026-11-10
tag: announcement
lang: en
desc: "Linxira will not wait for an Ubuntu LTS in 2027. Instead we will ship short-term validation images on 26.10 / 27.04 / 27.10 to validate the apt backend, drivers, desktop and exit model. The next LTS is 28.04. Arch remains the current mainline. NixOS is not a product line: Zeta already has Nix builds, and upstream Nix in a container is enough."
---

# Near-term plan: validate on Ubuntu interim releases until the next LTS

> 2026-11-10 · Announcement

## The short version

- **Arch x86_64 remains the current mainline**: rolling updates, a planned monthly ISO snapshot, and removing `linxira-*` returns you to vanilla Arch.
- **The Ubuntu line starts with short-term validation images**: 26.10 (kernel 7.3) first, then 27.04 / 27.10 if needed, until the next LTS (28.04).
- **These images are not long-term products**: they have a 9-month lifetime and exist to validate our apt backend, catalog mapping, desktop, drivers and the “exit” story.
- **NixOS is not a product line**: Zeta already has Nix builds; use upstream Nix in a container. We do not need to maintain a NixOS configuration.

## Why interim first

Ubuntu LTS releases arrive every two years:

| Version | Date | Type | Support |
|---|---|---|---|
| 26.04 LTS | 2026-04-23 | LTS | Standard security to 2031-05, ESM to 2036 |
| 26.10 | 2026-10 | interim | 9 months, ends 2027-07 |
| 27.04 | 2027-04-22 | interim | 9 months |
| 27.10 | 2027-10 | interim | 9 months |
| **28.04** | **2028-04** | **next LTS** | — |

There is no LTS in 2027. Waiting for one means waiting until 2028-04. Until then, interim releases are the only way to get kernel 7.3 and newer drivers.

### Validation window and decision points

- **Now – 2027-02**: 26.10 validation images. Validate whether 7.3 actually helps the target workloads, plus the apt backend, Chinese GPU drivers, KDE and containers.
- **2027-02-18 (26.04.2)**: if HWE brings 7.3 and the hardware validation passes, move the long-term baseline to 26.04 LTS.
- **2027-02 – 2027-07**: if 26.04.2 does not have 7.3, or a specific machine needs a newer kernel, continue on 27.04. 26.10 must be migrated or retired before its EOL in 2027-07.
- **2028-04**: 28.04 LTS becomes the next long-term baseline.

## Three lines, three promises

| Line | Base | Role | Cadence | Exit | Status |
|---|---|---|---|---|---|
| **Arch x86_64** | Arch Linux | Primary development machine; also inference | Rolling; planned monthly ISO snapshot | Remove `linxira-*`, return to vanilla Arch | Current mainline |
| **Ubuntu interim validation** | 26.10 / 27.04 / 27.10 | Validate apt backend, desktop, drivers, ARM allowlist | Follows Ubuntu interims, 9 months | Reimage; layer removable | In validation |
| **Ubuntu LTS (future)** | 26.04 LTS or 28.04 LTS | Inference, scientific computing, Chinese GPUs | LTS point releases + upstream security | Removable derivative, not a rolling exit | Pending |

Validation images will be labelled **“validation build, not long-term support, EOL date”**, kept out of the support matrix and given no long-term promise.

## NixOS: not a product line

Earlier we discussed a “NixOS configuration + VM reference”. The simpler conclusion:

- Zeta already provides Nix builds; install Zeta from upstream Nix inside a container or VM when needed.
- We do not need to maintain a NixOS configuration, flake or distribution promise.
- NixOS mirrors are unreliable in China and it is not a sensible product entry point for ordinary users.

So: **Nix is a tool for building/running Zeta, not a fourth Linxira product line.**

## China network and mirrors

- **Arch**: the best mirror coverage in China (TUNA, USTC, Aliyun and others); the monthly ISO is planned for GitCode / domestic object storage.
- **Ubuntu**: the official archive has Chinese mirrors (TUNA, USTC, Aliyun, Huawei Cloud and others); apt and ISOs can be served domestically. The installer will offer a domestic mirror option.
- **Chinese GPUs**: Moore Threads, Ascend and similar vendors ship drivers and toolchains mainly for Ubuntu. That is the practical reason for the Ubuntu validation line.
- **DGX Spark / N1X**: NVIDIA DGX OS is based on Ubuntu 26.04 LTS ARM64, but image downloads may be account- or network-gated. Support is an allowlist, not generic ARM.

## The boundaries we keep

1. **Thin and removable**: on Arch, removing every `linxira-*` package leaves a working vanilla Arch. Ubuntu validation images keep the layer removable too.
2. **Common software only**: no sponsor bloat, no strange system-level components. Every catalog item carries source, license and trust level.
3. **Conservative supply chain**: AUR is off by default on Arch; unreviewed PPAs are off by default on Ubuntu; vendor debs are reviewed and republished in our signed repository; `curl | sh` is not recommended.
4. **No home-grown kernel**: Arch uses the official latest kernel; Ubuntu uses HWE or vendor kernels. No v3 / CachyOS-derived kernel until a complete automation pipeline exists.
5. **AI is optional**: no agent auto-runs by default. Crash Watch performs zero-token triage; analysis starts only when the user clicks, stays local, read-only, and is never uploaded.

## What happens next

- Publish the 26.10 validation image (labelled validation build, EOL 2027-07).
- Validate the apt backend and catalog mapping on 26.04 LTS in parallel, ahead of the 2027-02 decision.
- Keep the Arch mainline moving toward the monthly ISO snapshot and an exit test.
