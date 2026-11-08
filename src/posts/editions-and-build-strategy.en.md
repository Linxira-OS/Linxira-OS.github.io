---
title: "Editions preview: the boundaries between Arch, Ubuntu and NixOS"
date: 2026-11-08
tag: announcement
lang: en
desc: "Linxira plans to bring the same removable layer to three bases: Arch keeps rolling updates and an easy exit, Ubuntu targets inference machines and Chinese GPUs, and NixOS is a reproducible VM reference. This post sets out the scope, cadence, China network constraints and explicit non-promises."
---

# Editions preview: the boundaries between Arch, Ubuntu and NixOS

> 2026-11-08 · Announcement

## Why we are saying this now

Linxira has never been about building yet another distribution. It is a **removable layer on top of an upstream distribution**: catalog, transaction plan/confirm/receipt, signed repository, configuration entry points, update notifications, crash watch and welcome.

We are now preparing to put that layer on more than one base. The reason is simple: a developer workstation, a scientific-computing desktop, a Chinese-GPU inference box and an ARM local-LLM machine do not need the same base. Rather than forcing everyone onto Arch, we should state the boundaries.

## Three editions, three promises

| Edition | Base | Role | Cadence | Exit | Status |
|---|---|---|---|---|---|
| **Arch x86_64** | Arch Linux | Primary development machine; also usable for inference | Rolling; planned monthly ISO snapshot | Remove `linxira-*` and you are back on vanilla Arch; exit any time | Current mainline |
| **Ubuntu x86_64 / ARM64** | Ubuntu 26.04 LTS | Inference, scientific computing, Chinese GPUs; ARM for DGX Spark, N1X and similar | LTS point releases + upstream security; HWE kernels at point releases | A removable derivative layer, but **not** the same “rolling exit” as Arch | Under research |
| **NixOS** | NixOS (VM / container) | Reproducible reference environment, benchmarks, toolchains | Pinned flake; updated on demand | Configuration and flake only; no distribution promise | Experimental, no SLA |

## Ubuntu in 2027: there is no 2027 LTS

Let us settle the timeline:

- Ubuntu 26.04 LTS: released 2026-04-23, standard security maintenance until **2031-05**, ESM until 2036.
- Ubuntu 26.10: released 2026-10, only 9 months of support, **ends 2027-07**.
- Ubuntu 27.04 “Tenacious T-Rex”: **2027-04-22**, still a 9-month interim.
- Ubuntu 27.10: October 2027, still an interim.
- The next LTS is **28.04 (April 2028)**.

So there is no “wait until July 2027 for a long-term release” option. If the goal is **LTS + kernel 7.3**, the right milestone is **26.04.2 (2027-02-18)**: following Ubuntu's HWE cadence, it should bring the 26.10 7.3 kernel into 26.04 LTS (check the Ubuntu release notes for the final word). If you cannot wait, the only option is a transitional 26.10 image with a 9-month lifetime.

## China network reality

This constraint has to be stated up front:

- **Arch**: the best mirror coverage in China (TUNA, USTC, Aliyun and others); `linxira-config` already selects mirrors. The planned monthly ISO will be hosted on GitCode / domestic object storage, not on a foreign endpoint.
- **Ubuntu**: the official archive has Chinese mirrors (TUNA, USTC, Aliyun, Huawei Cloud and others); both apt and ISOs can be served domestically. The installer will offer a domestic mirror option. For most users, Ubuntu is not harder to install than Arch.
- **NixOS**: TUNA, USTC and SJTU provide nix-channels and binary-cache mirrors, but coverage and stability are not guaranteed. Until that is reliable, **NixOS remains an experimental VM reference with no absolute promise**, and is not recommended as a daily-driver system for ordinary users.
- **Chinese GPUs**: Moore Threads, Ascend and similar vendors ship their drivers and toolchains mainly for Ubuntu. That is a practical reason for the Ubuntu edition, not a preference.
- **DGX Spark / N1X**: NVIDIA's DGX OS is based on Ubuntu 26.04 LTS ARM64, but image downloads may be account- or network-gated. This edition will support a short hardware allowlist, not generic ARM.

## The boundaries we keep

1. **Thin and removable**: on Arch, removing every `linxira-*` package leaves a working vanilla Arch. The Ubuntu edition keeps the layer removable too, but it is not a rolling distribution, so the exit semantics differ.
2. **Common software only**: no sponsor bloat, no strange system-level components. Every catalog item carries source, license and trust level.
3. **Conservative supply chain**: AUR is off by default on Arch; unreviewed PPAs are off by default on Ubuntu; vendor debs are reviewed and republished in our signed repository; `curl | sh` is not the recommended path.
4. **No home-grown kernel**: Arch uses the official latest kernel; Ubuntu uses HWE or vendor kernels. Until a complete automation pipeline exists, we will not build v3 or CachyOS-derived kernels.
5. **AI is optional**: no agent auto-runs by default. Crash Watch performs zero-token triage; analysis starts only when the user clicks, stays local, read-only, and is never uploaded.

## What happens next

- **Ubuntu**: first research 26.04 LTS + 7.3 HWE, Chinese GPU drivers and the DGX Spark / N1X allowlist. No release date is promised until that research is done.
- **NixOS**: flake / VM configuration only, as a reproducible reference environment, not a distribution.
- **Arch**: keep the current mainline and move toward the monthly ISO snapshot and an exit test.

This is not a plan to support everything. It is a plan to state each edition's promise clearly: **Arch for rolling freedom, Ubuntu for inference and vendor hardware, NixOS for reproducibility.**
