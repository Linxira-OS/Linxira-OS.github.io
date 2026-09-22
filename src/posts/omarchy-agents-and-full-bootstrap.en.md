---
title: "What Omarchy Teaches Us: Agent Permissions, Monthly Cadence and Full Bootstrap"
date: 2026-09-22
tag: technical
lang: en
desc: "DHH's Omarchy proves the pull of Arch plus AI workflows. Comparing its temporary-sudo agent model with our scoped user-group design, monthly rolling cadence, online-install auto-upgrade and the full-bootstrap roadmap."
---

# What Omarchy Teaches Us: Agent Permissions, Monthly Cadence and Full Bootstrap

> 2026-09-22. Omarchy — DHH's (creator of Rails) Arch + Hyprland distribution — has built a remarkable community and ecosystem in a few months, earning the label "Agentic Linux Distro". It deserves serious study; and after studying it, our own path is easier to explain.

## What Omarchy gets right

- **A complete out-of-the-box experience**: upstream is Arch, delivered as a tuned keyboard-first desktop — not a pile of parts.
- **Embracing AI workflows**: a dozen or so AI coding agents pre-wired, with official AGENTS.md guidance, making "install the OS, then put agents to work" the default reality.
- **Community speed**: from release to ecosystem in a remarkably short time. "Stay rational about it" was right — and the growth still outperformed expectations.

All of this validates a direction: **AI agents are the new entry point to the desktop**. Linxira cares about the same direction — but we take a different road.

## The design split: where do agent permissions come from

Omarchy's answer is "agents just work": temporary sudo elevation, operating directly on the real system. Fast — but the agent shares one permission set with the main user, blurring both the boundary of action and the granularity of audit.

Linxira's road is **a dedicated user and group for agents**: within its own group, an agent holds exactly the scope its duties require (scoped capability) — installing packages, managing services, touching specific directories — without full root and without entangling the main user's identity. A desktop supercomputer runs long agent jobs and schedules compute; permissions must be **auditable, revocable, and enumerable**. This is our next design focus, and when it lands we will publish the permission matrix.

## Cadence: monthly rolling is the economic optimum

CachyOS ships a kernel build every month. One rolling cycle per month is the most economical balance between time cost and stability: more frequent exhausts packaging and QA; sparser lets security fixes pile up. Linxira agrees — offline images are rebuilt monthly, with the signed repository delivering increments in between.

## Online installs should yield the latest

A natural question: image packages are frozen at build day — why should a network-connected user still update manually after installing? From the next image, when a mirror is reachable the installer runs **one full upgrade on the target right after pacstrap** — what gets installed is current; offline or failed, it silently keeps the image version and `linxira-update` catches up at first boot. Our curated software comes from official repositories, not AUR user packages, so the rolling-breakage risk is already low; this step makes "installed means current" the default.

## Full bootstrap: replacing the borrowed base

The long-term direction is **full Linux bootstrap development**. Two in-house toolchains are on the road: **Bio SDK** (a local-first bioinformatics toolchain) is usable, waiting on packaging integration into the mainline; **Zeta** is in a large-scale refactor — upstream core-level updates and vulnerability fixes land constantly, and tracking them is its normal state. Bootstrap is not a whim; it is the necessary path to pulling the root of trust back into our own hands, layer by layer.

The signed repository (see our earlier post) solves "trustworthy delivery"; bootstrap solves "trustworthy construction". Together they are the complete supply-chain answer.
