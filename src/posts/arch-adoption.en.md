---
title: "Putting Linxira on an Existing Arch: From ISO to In-Place Adoption"
date: 2026-09-27
tag: technical
lang: en
desc: "Linxira's base is upstream Arch, so can we go the other way — turn a machine that already runs Arch into Linxira with a single command? This post sorts out which layers are cheap, which one actually bites, and how we intend to do it (and what we explicitly will not)."
---

# Putting Linxira on an Existing Arch: From ISO to In-Place Adoption

> 2026-09-27 · A roadmap discussion piece, not a release announcement. Apart from the established facts, everything here is planned, unimplemented, and unscheduled.

## TL;DR

Yes, but the layers are not equally easy. `[linxira]` is an ordinary pacman repository and the Linxira package layer is ordinary packages — getting those onto any pacman-based system costs almost nothing. The one layer that genuinely bites is **bootloader and snapshot policy** (GRUB / `grub-bfrfsd` / Timeshift), because it is the only step that can leave a machine unable to boot.

So what we intend to build is not "another installer". It is the same transaction model the install path already implements, exposed through a command-line entry point — with an explicitly bounded support matrix. Probe what can be probed, refuse what cannot be met, and never convert halfway.

## The premise is real: a pure-Arch baseline already exists

This is not marketing copy; it is a product concept already in the tree. The baseline we ship for "Server · pure-Arch minimal install" is thirteen packages:

```
base  btrfs-progs  curl  efibootmgr  grub
linux  linux-firmware  linux-headers  linux-lts  linux-lts-headers
networkmanager  openssh  sudo
```

Its stated intent, in the file's own comment: it carries no Linxira toolchain, no desktop pipeline, no `[linxira]` repository and no keyring — **leaving the desktop or components to the user**.

In other words, "pure upstream Arch as the base, then layer Linxira on top" has already been exercised once, inside the ISO. What is missing is the entry point: today you can only pick it during installation, not on a machine that is already running.

## Linxira minus Arch is four layers

Whether an Arch derivative can be adopted comes down to what each of these four layers costs:

| Layer | What it is | Cost of moving it onto another Arch |
|---|---|---|
| `[linxira]` signed repository | An ordinary pacman repository | **Zero** — any pacman-based system can add it |
| Linxira package layer | Ordinary Arch packages | Low; dependencies are already declared |
| Desktop and session wiring | Configuration plus packages | **Medium** — where the conflicts concentrate |
| Boot and snapshot policy | Bootloader plus btrfs assumptions | **High** — the only layer that can brick the boot |

The first three are, in essence, "installing software". The fourth is not: it changes how the machine *starts*.

## Vanilla Arch: the easy case, but do not underestimate the bootloader

Installing the packages is close to free. Three things actually need design.

**The bootloader.** Our snapshot story is bound to GRUB and `grub-bfrfsd`: a kernel upgrade still leaves a bootable snapshot, and Timeshift snapshots can be written into the boot menu. (One detail must be preserved here — GRUB's string ordering puts `linux-lts` ahead of `linux`, so the default kernel is pinned by an explicit `GRUB_TOP_LEVEL` rather than by menu order.) If the target system uses systemd-boot, adoption means installing GRUB and changing the default boot entry. **This is the only step in the whole flow that can leave a machine unable to boot**, so it has to be a separate confirmation rather than something that happens quietly inside a batch install.

**The filesystem.** You need btrfs subvolumes plus `grub-btrfsd` for bootable snapshots. On ext4, or on a different btrfs layout, the Timeshift-and-bootable-snapshot story is degraded. We lean toward supporting btrfs + GRUB only in the first iteration and refusing everything else explicitly — a degraded snapshot capability described with the words "we support it" is more dangerous than a clear refusal.

**Desktop conflicts.** We have already hit and fixed several of these: COSMIC's session file is `cosmic.desktop` rather than what the name suggests, the baseline drops `xdg-desktop-portal-kde` to avoid pulling in its closure, and COSMIC needs to ship `vulkan-swrast` so a GPU-less VM still has Vulkan. The hard rule that falls out of that is: **install the new desktop, verify it, and only then remove the old one.** Get the order wrong and the user is locked out.

## Other Arch derivatives: probe, don't assume

"Arch derivative" is not one thing; it is several. The honest approach is to probe first and then decide, rather than claiming support for all of Arch:

- **Those that track upstream pacman semantics** (for example, branches that sync upstream): workable, but you still have to probe held packages, repository priority, and whether a desktop environment is already present.
- **Those with their own tooling** (custom package-manager wrappers or build layouts): this stops being a "can we" question and becomes a sharp rise in maintenance cost.
- **Things that call themselves Arch but do not run pacman underneath**: that is a different product and should not be lumped in.

So the probe step stays read-only, and it **reports and refuses**: current bootloader, filesystem type and subvolume layout, present desktop/session, held packages, free disk. If the conditions hold, proceed; if not, refuse with the reason. Never convert halfway.

## How we intend to do it: not a second installer

The key decision is to reuse the transaction backend that already exists. Every action in the system that modifies the machine goes through one shape: compute a plan, show it to the user, let the user confirm, execute as root, leave a verifiable receipt behind, and re-check for drift between planning and execution. The installation path and the adoption path share that implementation, so dry-run, receipts and failure recovery are all one implementation rather than two similar-looking ones that drift apart.

At the command line that would look roughly like:

```
linxira-adopt --dry-run      # produce a plan: add repo / install packages / desktop add-remove / bootloader (separate, optional) / policy changes
linxira-adopt --apply <plan> # execute through the transaction backend
```

Read-only probing first, plan second, execution last. **The bootloader step is always a separate entry in the plan, and requires its own confirmation.**

### Three invariants we will not bend

1. **Bootloader changes are confirmed separately**, and carry their own recovery path (create a Timeshift snapshot first, or rely on a `grub-btrfsd` snapshot).
2. **Never remove the old desktop first.** The new desktop is installed and validated before removal is even discussed.
3. **Idempotent and resumable throughout.** After an interruption, re-running must continue from the detection step rather than starting over. This has been implemented once already elsewhere, and can be copied.

### One obstacle that already exists

The post-install validator currently **pins exact versions** of installed packages (for example, it requires `linxira-components` at one specific `version-pkgrel`). On the installation path that is a feature: it guarantees the system you ship is the one you tested. On somebody else's machine, whatever is installed is whatever was installed. Adoption mode has to relax the check to "at least", or drive an upgrade to a supported version first.

That is a product decision to be made explicitly, not an implementation detail.

## Two things to decide

- **Do we support adoption on non-btrfs systems?** Snapshots are one of this product's main selling points, and they degrade noticeably on ext4. We lean toward: btrfs + GRUB only for the first iteration, everything else explicitly refused.
- **Does adoption include replacing the desktop?** Adding the Linxira stack to a headless server system is far lower risk; replacing a desktop raises both the value and the risk by an order of magnitude.

We will not start implementing before those two are settled. The point of this post is to fix the boundaries first — **an adoption tool that refuses is far more useful than one that works everywhere and occasionally locks people out of their own machines.**

## Related

- Roadmap entry: [Roadmap](/en/roadmap/) — listed as planned
- The pure-Arch baseline and the current state of the install path: [Linxira OS Today: From a Mint Prototype to Direct Arch](/en/blog/direct-arch-transition/)
