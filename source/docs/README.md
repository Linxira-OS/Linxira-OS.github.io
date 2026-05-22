# Linxira OS 文档

> 基于 Debian 13 Trixie 的科学计算 Linux 发行版

---

## 📖 Linxira OS 专属内容

- [安装指南](install.md)
- [系统配置](configuration.md)
- [预装工具](tools.md)
- [常见问题](faq.md)

---

## 🌐 Linux 通用知识

以下 Wiki 汇集了几乎所有 Linux 问题的解决方案，优先级从前到后：

### ArchWiki（最推荐）

[archlinux.org](https://wiki.archlinux.org) 是所有 Linux 发行版中最完整、最权威的知识库。虽然面向 Arch Linux，但绝大多数条目（系统管理、硬件驱动、软件配置）**完全适用于 Debian/Ubuntu 系**。

常用条目快速跳转：

| 分类 | ArchWiki 链接 |
|------|---------------|
| 系统安装 | [Installation guide](https://wiki.archlinux.org/title/Installation_guide) |
| 桌面环境 | [GNOME](https://wiki.archlinux.org/title/GNOME) · [KDE](https://wiki.archlinux.org/title/KDE) · [XFCE](https://wiki.archlinux.org/title/Xfce) |
| 显卡驱动 | [NVIDIA](https://wiki.archlinux.org/title/NVIDIA) · [AMDGPU](https://wiki.archlinux.org/title/AMDGPU) · [Intel](https://wiki.archlinux.org/title/Intel_graphics) |
| 网络配置 | [NetworkManager](https://wiki.archlinux.org/title/NetworkManager) · [WiFi](https://wiki.archlinux.org/title/Network_configuration/Wireless) |
| 音频 | [PulseAudio](https://wiki.archlinux.org/title/PulseAudio) · [PipeWire](https://wiki.archlinux.org/title/PipeWire) |
| 电源管理 | [Power management](https://wiki.archlinux.org/title/Power_management) · [TLP](https://wiki.archlinux.org/title/TLP) |
| 内核参数 | [Kernel parameters](https://wiki.archlinux.org/title/Kernel_parameters) |
| systemd | [systemd](https://wiki.archlinux.org/title/Systemd) · [journalctl](https://wiki.archlinux.org/title/Journal) |

### Debian Wiki

[wiki.debian.org](https://wiki.debian.org) — 官方 Debian 文档，适合 **包管理、安全更新、APT 源配置** 等 Debian 特有内容。

| 分类 | Debian Wiki 链接 |
|------|------------------|
| 安装 | [Installation Guide](https://wiki.debian.org/InstallationGuide) |
| APT | [AptCLI](https://wiki.debian.org/AptCLI) · [SourcesList](https://wiki.debian.org/SourcesList) |
| 安全 | [Security](https://wiki.debian.org/Security) · [UnattendedUpgrades](https://wiki.debian.org/UnattendedUpgrades) |
| 非自由固件 | [Firmware](https://wiki.debian.org/Firmware) |

### Ubuntu Wiki / 社区文档

[help.ubuntu.com](https://help.ubuntu.com) — Debian 系的最佳实践参考，**桌面用户配置教程**尤其丰富。

---

> **原则**：Linux 通用问题先查 **ArchWiki** → **Debian Wiki** → **Ubuntu Community**，我们的 Wiki 只记录 Linxira OS 专属内容。
