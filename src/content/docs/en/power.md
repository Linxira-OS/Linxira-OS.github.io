---
title: "Power & Battery Care"
section: guide
order: 8
---

# Power & Battery Care

Linxira OS ships `power-profiles-daemon`, driven by the KDE Plasma power panel. `tlp` is **not** installed — do not stack two governors.

## Check current state

```bash
linxira-config power status
powerprofilesctl get
powerprofilesctl list
```

- `linxira-config power status` — power settings summary
- `powerprofilesctl get` — performance / balanced / power-saver
- `powerprofilesctl list` — available profiles and drivers


Write actions under `linxira-config power` (suspend/hibernate policy changes) are **disabled** pending the transactional backend; use System Settings → Power Management instead.

## Which profile

| Profile | Use | Cost |
|---|---|---|
| `power-saver` | Travel, writing, terminal work | Noticeably slower builds |
| `balanced` | Daily default | None |
| `performance` | Compiles, benchmarks, long jobs on AC | Fan noise, half the battery life |

```bash
powerprofilesctl set power-saver
```


## Battery health

Whether you can cap charging depends on firmware exposure:

```bash
ls /sys/class/power_supply/BAT*/charge_control_end_threshold
```


If the file exists (root required):

```bash
echo 80 | sudo tee /sys/class/power_supply/BAT0/charge_control_end_threshold
```


Most firmware keeps the value across reboots; if not, persist it with a udev rule.

### If the machine does not support it

**Do not force it.** A missing `charge_control_end_threshold` means the firmware does not expose it:

- Writing to sysfs fails outright — or writes to a file the kernel ignores, so it *looks* successful but does nothing;
- Forcing thresholds via `modprobe` options, direct EC writes, or third-party scripts gambles with the battery controller — at best it does nothing, at worst it breaks calibration or damages cells.

Two correct options only:

1. **Look in BIOS / vendor tools.** Many Lenovo, ASUS, and Dell machines expose a battery-care or charge-limit setting in firmware. That implementation is vendor-supported and safe.
2. **If there is none, manage behaviour instead:** keep the charge between 40–80% when on AC for long periods, avoid all-night full charge at high temperature. Heat damages cells more than state of charge does — fix cooling first.

One command tells you whether it is supported:

```bash
ls /sys/class/power_supply/BAT*/charge_control_end_threshold 2>/dev/null || echo "unsupported — leave it alone"
```


## What is draining the battery

```bash
upower -i "$(upower -e | grep BAT)"
```

- `upower -i "$(upower -e | grep BAT)"` — charge, discharge rate, health


## Hibernate

Requires swap ≥ RAM:

```bash
swapon --show
free -h
```


Test manually with `systemctl hibernate` before making it the default.

## Related

- Take a snapshot before long jobs: `linxira-config timeshift status`
- Do not run `pacman -Syu` below 20% battery — an interrupted update leaves a half-installed system.
