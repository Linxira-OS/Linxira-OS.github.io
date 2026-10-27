---
title: "Laptops"
section: guide
order: 9
---

# Laptops

Laptops add four problem classes: firmware, thermals, input devices, and display switching.

## 1. Update firmware first

```bash
fwupdmgr refresh
fwupdmgr get-updates
sudo fwupdmgr update
```


Plug in power; never close the lid during a BIOS/EC update.

## 2. Touchpad and gestures

System Settings → Input Devices covers tap-to-click, two-finger scrolling, three/four-finger gestures, and disable-while-typing. Configuration lives in `~/.config/kcminputrc`.

## 3. Brightness

```bash
ls /sys/class/backlight/          # amdgpu_bl0 / intel_backlight / nvidia_0
brightnessctl -d amdgpu_bl0 get
```


If the keys do nothing, check whether a backlight driver is loaded.

## 4. External displays

```bash
kscreen-doctor -o
kscreen-doctor output.HDMI-1.mode.2560x1440@60
```


When docking with the lid closed, set "When laptop lid is closed" to **do nothing**, otherwise the machine suspends.

## 5. Heat

```bash
sensors
```


Sustained 90°C+ usually means a single core is pegged; `power-saver` drops temperatures noticeably.

## 6. Hybrid graphics

```bash
linxira-config gpu status
lspci -k | grep -A3 VGA
```


Do not install NVIDIA's runfile installer — it conflicts with the DKMS packages from the repository.

## 7. Troubleshooting

| Symptom | Check first |
|---|---|
| Lid close does not suspend | Power Management settings; `systemd-inhibit --list` |
| Artifacts after resume | GPU driver vs kernel; check `linxira-config timeshift status` |
| Brightness keys dead | Is `/sys/class/backlight/` empty? |
| Wi-Fi drops | `linxira-config net diag` |
| Fast battery drain | `powerprofilesctl get`; any indexing jobs running |

See [Power & Battery Care](/en/docs/power/) for deeper policy.
