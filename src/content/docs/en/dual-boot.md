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

## Clock skew across dual boot

CMOS holds exactly one timestamp, and the two systems interpret it differently: Windows treats the RTC as **local time**, Linux treats it as **UTC**. Every switch flips it — whichever OS boots first rewrites the RTC under its own assumption, the next one reads it under the other assumption, so both operating systems and the BIOS value drift by the offset (8 hours in CST). Windows Fast Startup makes it worse by restoring a stale time from the hibernation image.

Recommended fix: make both systems treat the RTC as UTC.

Windows (administrator CMD or PowerShell):

```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1 /f
w32tm /resync
```

- Keep the Windows time zone as `(UTC+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi`
- Disable Fast Startup so hibernation does not restore an old clock: `powercfg /h off`

Linux (Arch / Linxira):

```
timedatectl set-ntp true
sudo hwclock --systohc --utc
timedatectl
```

- Expect `RTC in local TZ: no`, with `RTC time` in UTC and `Local time` eight hours ahead
- With NTP enabled on both sides, each boot resynchronizes and drift no longer accumulates

Avoid `sudo timedatectl set-local-rtc 1 --adjust-system-clock`: it makes Linux read the RTC as local time too, which breaks across time zones and DST, and `timedatectl` keeps warning about it.

Only a clock that resets after full power loss points to a dead CMOS battery. Drift caused by switching operating systems is purely a convention mismatch — apply the steps above.

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
