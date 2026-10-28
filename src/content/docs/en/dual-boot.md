---
title: "Dual Boot"
section: guide
order: 11
---

# Dual boot with Windows

## Three things to do first

1. **Disable Windows Fast Startup** (Control Panel → Power Options → Choose what the power buttons do).
   With it on, NTFS stays half-hibernated and Linux refuses or corrupts writes.
2. **Suspend BitLocker**:
   ```powershell
   manage-bde -status
   manage-bde -protectors -disable C: -RebootCount 2
   ```
3. **Shrink to unallocated space** (not a new NTFS partition). Leave at least 40 GB.

## Partitioning

| Case | ESP | Root |
|---|---|---|
| Existing Windows ESP (usually 100 MB) | **Reuse it** — GRUB fits | New ext4 |
| Dedicated disk | New 512 MB (GRUB) or 1 GB (systemd-boot/rEFInd) | New ext4 |

GRUB is the installer default precisely so it coexists with a 100 MB Windows ESP.

## Bootloader

- **GRUB**: `grub-mkconfig` adds Windows via os-prober automatically.
- **systemd-boot**: write `/boot/loader/entries/windows.conf` manually:
  ```
  title   Windows
  efi     /EFI/Microsoft/Boot/bootmgfw.efi
  ```
- **rEFInd**: detects Windows on its own.

## Clock skew

```bash
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```

Or set `RealTimeIsUniversal` to 1 in the Windows registry (recommended; keeps UTC).

## After install

```bash
sudo os-prober
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

If os-prober prints nothing, confirm the Windows partition is mounted (`lsblk -f`) and that `/etc/default/grub` has `GRUB_DISABLE_OS_PROBER=false`.

## Common traps

| Symptom | Cause | Fix |
|---|---|---|
| Boots straight into Windows | Windows entry first in BootOrder | `sudo efibootmgr -o ...` |
| BitLocker recovery prompt | BitLocker not suspended | Unlock, then suspend again |
| Mounting Windows fails as dirty | Fast Startup still on | Shut down Windows properly once |
| Menu gone after a Windows update | Windows reset the entry | Rebuild with `grub-install` from live media |

More bootloader detail: [UEFI & Firmware](/en/docs/uefi/).
