---
title: "System Components"
section: apps
order: 2
---

# System components

Linxira ships a set of first-party components. They are **part of the system**, not store apps. Organised by "who do I ask when something breaks".

## One-line responsibilities

| Component | Responsibility | Entry point |
|---|---|---|
| `linxira-config` | Configuration hub: mirrors, SSH, network, security, env vars, diagnostics | `linxira-config` / `linxira-config tui` |
| `linxira-components` | **The only** transactional install/remove: plan, confirm, privileged apply, receipt | `linxira-components` |
| `linxira-package-center` | GUI for the catalog and installed state | app menu |
| `linxira-component-manager` | GUI for components and capabilities | app menu |
| `linxira-update` | System updates and tray | tray / `linxira-update` |
| `linxira-welcome` | First-run guidance and status | auto on first login |
| `linxira-crash-watch` | Crash diagnosis and debug workspace | `linxira-crash` |
| `linxira-recovery-diagnostics` | Recovery readiness and repair plans | recovery entry |
| `linxira-kernel-manager` | Kernel policy and boot state | settings |
| `linxira-hardware-driver-manager` | Driver policy, DKMS reports | settings |
| `linxira-hwd-detector` | **Read-only** hardware detection | called by other components |
| `linxira-gaming-manager` | Game library, compatibility launch, user backups | app menu |
| `linxira-completion-agent` | Post-first-online completion plan | automatic/manual |
| `linxira-catalog` | Catalog data (JSON), not a UI | read by others |

## Which one to use

| Goal | Use | Avoid |
|---|---|---|
| Install/remove software | `linxira-components` | `pacman -S` bypassing the transaction record |
| Switch mirrors | `linxira-config mirror` | editing `mirrorlist` |
| Enable SSH | `linxira-config ssh on` | `systemctl enable sshd` |
| System status | `linxira-config status` | — |
| Broken boot | `linxira-recovery-diagnostics` | repeated reboots |
| App crashes | `linxira-crash` / crash window | screenshots only |

## Permission model

- Read-only commands (`status`, `list`, `show`) never need root
- Writes go through `linxira-components`; polkit prompts each time
- Do not call these components' write paths via `sudo`/`su`/`doas`/`run0`

## What runs at login

Only two autostart entries: `linxira-welcome` (first run) and the update tray.
The `linxira-crash-watch` daemon unit is currently **not packaged**, so it does not run by default.

## Related

- Command reference: [linxira-config cookbook](/en/docs/config-hub-examples/)
- Design boundaries: [Wiki project overview](https://linxira-os.github.io/linxira-wiki/项目总览/)
