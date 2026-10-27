---
title: "UEFI 与固件"
section: guide
order: 10
---

# UEFI 与固件

## 安装器里的三种引导器

安装时「系统引导」这一步是必选项，三者的真实差异：

| 引导器 | ESP 需求 | 多系统 | 安全启动 | 适合 |
|---|---|---|---|---|
| **GRUB**（默认） | 512 MB | 自动检测 Windows 与其它 Linux（os-prober） | 支持（shim） | 绝大多数机器，尤其 Windows 双系统 |
| systemd-boot | ≥ 1 GB | Windows 需手动加条目 | 不支持 | MSI 主板等 GRUB 出问题的机器 |
| rEFInd | ≥ 1 GB | 自动扫描所有系统与内核 | 不支持 | 多系统且想要图形菜单 |

内核与 initramfs 对 systemd-boot / rEFInd 是**直接放进 ESP** 的，所以这两种对 ESP 容量要求更高。GRUB 只把引导器放进去，内核留在 `/boot`。

## 安装器的一个刻意选择

`bootloader.conf` 里 `installEFIFallback: false`：安装器**不写** `\EFI\BOOT\BOOTX64.EFI`。

原因是共用 Windows 的 ESP 时，覆盖通用回退文件会让固件在 NVRAM 丢失后启动到错误目标。代价是：如果主板 NVRAM 被清空，需要手动重建条目。独立盘安装且需要兜底时，可自行复制：

```bash
sudo mkdir -p /boot/efi/EFI/BOOT
sudo cp /boot/efi/EFI/linxira/grubx64.efi /boot/efi/EFI/BOOT/BOOTX64.EFI
```


## 查看与调整启动顺序

```bash
efibootmgr                    # 列出条目与当前 BootOrder
sudo efibootmgr -o 0002,0001  # 调整顺序
sudo efibootmgr -b 0003 -B    # 删除某条目
```


systemd-boot 用 `bootctl`：

```bash
bootctl status
sudo bootctl set-default linxira-*
```


`efibootmgr` 只对 UEFI 有效；`BootCurrent` 显示本次从哪条启动。

## 固件更新

```bash
fwupdmgr refresh
fwupdmgr get-devices
sudo fwupdmgr update
```


固件更新必须插电、不能断电。部分机型需要先关闭 BIOS 里的「BIOS 写保护」。

## 安全启动

- GRUB 路径支持 shim，可保持 Secure Boot 开启
- systemd-boot 与 rEFInd 需要先关闭 Secure Boot
- 签名密钥不匹配时系统仍能启动，但部分内核模块会被拒绝加载

## 进固件设置

```bash
systemctl reboot --firmware-setup
```


比反复按 Del/F2 可靠；不支持时会直接重启。
