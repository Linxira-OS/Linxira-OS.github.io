---
title: "笔记本使用"
section: guide
order: 9
---

# 笔记本使用

笔记本比台式机多出四类问题：固件、热、输入设备、显示切换。这份清单按「装完系统先做什么」排序。

## 1. 先更新固件

系统自带 `fwupd`，这是唯一推荐的固件更新通道（不要在 Linux 里刷厂商 Windows 工具）：

```bash
fwupdmgr refresh
fwupdmgr get-updates
sudo fwupdmgr update
```

更新 BIOS/EC 时**必须插电**，过程中不要合盖。更新后重启一次再继续。

## 2. 触摸板与手势

KDE Plasma 的输入设备面板支持：

- 点按即点击、双指滚动
- 三指/四指手势（工作区切换、窗口概览）
- 打字时禁用触摸板

配置写在 `~/.config/kcminputrc`，会随 dotfiles 一起备份。

## 3. 屏幕亮度与背光

```bash
ls /sys/class/backlight/          # 通常为 amdgpu_bl0 / intel_backlight / nvidia_0
brightnessctl -d amdgpu_bl0 get   # 读当前亮度百分比
```

亮度键不工作时，先确认内核是否加载了对应 backlight 驱动；不要直接手写 `bl_power`。

## 4. 外接显示器

```bash
kscreen-doctor -o                 # 列出所有输出与模式
kscreen-doctor output.HDMI-1.mode.2560x1440@60
```

合盖外接时，在系统设置 → 电源管理里把「合盖时」设为**不采取任何操作**，否则会直接休眠。

## 5. 热与风扇

```bash
sensors                           # 需要 lm_sensors
```

持续 90°C 以上先查是不是单核跑满（`top` 按 1 展开每核）。`power-saver` 配置能显著降温。

## 6. 独显与混合显卡

```bash
linxira-config gpu status         # 驱动与切换状态
lspci -k | grep -A3 VGA           # 确认内核驱动
```

不要手动装 NVIDIA 官方 runfile —— 会与仓库里的 DKMS 包冲突。

## 7. 常见故障对照

| 现象 | 先查 |
|---|---|
| 合盖不休眠 | 系统设置 → 电源管理 → 合盖行为；`systemd-inhibit --list` |
| 休眠后花屏 | 显卡驱动与内核版本；先 `linxira-config timeshift status` |
| 亮度键无效 | `/sys/class/backlight/` 是否为空 |
| Wi-Fi 断流 | `linxira-config net diag` |
| 电量掉得快 | `powerprofilesctl get`；是否有索引服务在跑 |

需要更细的电源策略见[电源与电池养护](/zh/docs/power/)。
