---
title: "UEFI & Firmware"
section: guide
order: 10
---

# UEFI & Firmware

## Three bootloaders in the installer

| Bootloader | ESP | Multi-boot | Secure Boot | Best for |
|---|---|---|---|---|
| **GRUB** (default) | 512 MB | Auto-detects Windows and other Linux (os-prober) | Yes (shim) | Most machines, especially Windows dual-boot |
| systemd-boot | ≥ 1 GB | Windows entries added manually | No | Boards where GRUB misbehaves (e.g. MSI) |
| rEFInd | ≥ 1 GB | Scans every OS and kernel | No | Multi-boot with a graphical menu |

systemd-boot and rEFInd keep kernels inside the ESP, hence the larger requirement.

## A deliberate installer choice

`bootloader.conf` sets `installEFIFallback: false` — the installer does **not** write `\EFI\BOOT\BOOTX64.EFI`.

Sharing a Windows ESP, overwriting the fallback loader would make firmware boot the wrong target once NVRAM is lost. The trade-off: if NVRAM is wiped, entries must be recreated manually. On a dedicated disk you can copy the fallback yourself:

```bash
sudo mkdir -p /boot/efi/EFI/BOOT
sudo cp /boot/efi/EFI/linxira/grubx64.efi /boot/efi/EFI/BOOT/BOOTX64.EFI
```


## Boot order

```bash
efibootmgr
sudo efibootmgr -o 0002,0001
sudo efibootmgr -b 0003 -B
```

- `efibootmgr` — entries and BootOrder
- `sudo efibootmgr -o 0002,0001` — reorder
- `sudo efibootmgr -b 0003 -B` — delete


For systemd-boot:

```bash
bootctl status
sudo bootctl set-default linxira-*
```


## Firmware updates

```bash
fwupdmgr refresh
fwupdmgr get-devices
sudo fwupdmgr update
```


Requires AC power. Some machines need BIOS write protection disabled first.

## Secure Boot

- GRUB path works via shim with Secure Boot on
- systemd-boot and rEFInd require Secure Boot off
- With mismatched keys the system still boots, but some kernel modules are refused

## Enter firmware setup

```bash
systemctl reboot --firmware-setup
```
