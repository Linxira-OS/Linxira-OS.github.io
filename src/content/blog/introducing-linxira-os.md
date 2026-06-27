---
title: "Introducing Linxira OS"
title_zh: "Linxira OS 介绍"
date: 2026-06-27
description: "What is Linxira OS, who is it for, and why we built it."
description_zh: "Linxira OS 是什么，为谁而建，为什么要做这个项目。"
lang: "en"
---

# Introducing Linxira OS

**Linxira OS** is an independent Linux distribution built for scientific computing and AI development.

## What is Linxira OS?

Linxira OS is a desktop Linux distribution based on Linux Mint (Ubuntu LTS ecosystem). It comes with KDE Plasma desktop and a carefully curated set of development and scientific tools pre-installed.

The name "Linxira" combines "Linux" with a unique identifier — it is not affiliated with any existing Linux distribution or hardware project.

## Who is it for?

Linxira OS targets three primary audiences:

### 1. Researchers & Scientists

- Bioinformaticians who need bioconda, Nextflow, and common sequencing tools
- Physicists and chemists who need Python scientific stacks
- Anyone who needs LaTeX for paper writing

### 2. Developers

- Full-stack developers who want mise for language version management
- Rust, Go, Node.js, Python developers who want a ready-to-go environment
- AI/ML engineers who need CUDA, PyTorch, and local LLM support

### 3. Students

- Computer science students who want a modern Linux desktop
- Science students who need both GUI and terminal tools
- Anyone learning Linux who wants a well-configured system

## Design Philosophy

### Layered Architecture

We believe in separating concerns:

- **Base Layer**: Linux Mint provides stability and hardware compatibility
- **Platform Layer**: Linxira tools provide cross-ecosource management
- **Reproducibility Layer**: mise + Miniforge + Distrobox for portable environments
- **Domain Layer**: Scientific and development tools delivered through profiles

### Not Everything in One ISO

We deliberately avoid stuffing every scientific tool into the base ISO. Instead:

- Core ISO includes essential tools and package managers
- Heavy scientific tools are available through workflow templates
- Users can customize their environment with `linxira-config`

### Stable Host, Rolling Environments

The host system (Linux Mint) provides stability. Development environments can be rolled forward through:

- mise for language versions
- Miniforge for Python/conda packages
- Distrobox for containerized Arch Linux

## Key Features

| Feature | Description |
|---------|-------------|
| KDE Plasma Desktop | Modern, customizable desktop environment |
| btrfs + Timeshift | System snapshots for easy rollback |
| mise | Multi-language version manager |
| Miniforge3 | Scientific computing with bioconda |
| Distrobox | Run other distros in containers |
| OpenCode | AI coding assistant |
| Linxira Config Hub | Cross-ecosource configuration tool |

## Brand Identity

Our visual identity is built around the **prism** concept — representing the spectrum of scientific disciplines:

- **Teal** (#14b8a6) — Physics, Biology
- **Indigo** (#6366f1) — Chemistry, Computing
- **Violet** (#8b5cf6) — Spectrum endpoints

The single-character **L** mark features geometric angles and light refraction elements, distinct from other Linux distribution logos.

## What's Next?

We are currently working on:

1. **v1.0 release** — Stable desktop ISO with all core features
2. **Workflow templates** — Pre-configured environments for science, development, and AI
3. **Config Hub** — GUI + CLI tool for managing sources and services

Follow our progress on [GitHub](https://github.com/Linxira-OS).

---

*This is the first post in our blog. Stay tuned for updates on releases, features, and technical deep-dives.*
