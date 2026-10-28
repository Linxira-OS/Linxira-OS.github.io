---
title: "电源与电池养护"
section: guide
order: 8
---

# 电源与电池养护

Linxira OS 自带 `power-profiles-daemon`，由 KDE Plasma 的电源管理界面驱动。默认没有装 `tlp`，两套调频器不要叠加使用。

## 当前状态

```bash
linxira-config power status    # 查看电源设置摘要
powerprofilesctl get           # 当前电源配置：performance / balanced / power-saver
powerprofilesctl list          # 可用配置与各自的驱动
```

`linxira-config power` 的写操作（休眠、挂起策略变更）目前**处于禁用状态**，等待事务化后端；需要改策略请用系统设置 → 电源管理。

## 三档性能配置怎么选

| 配置 | 适用 | 代价 |
|---|---|---|
| `power-saver` | 移动办公、写文档、纯终端 | 编译与推理明显变慢 |
| `balanced` | 日常默认 | 无明显代价 |
| `performance` | 插电编译、跑基准、长任务 | 风扇与温度上升，续航腰斩 |

```bash
powerprofilesctl set power-saver
powerprofilesctl set balanced
```

笔记本建议：插电时 `balanced`，拔电自动切 `power-saver`（系统设置里可绑定）。

## 电池养护

锂电池长期满电存放会加速老化。是否可设充电上限取决于固件是否暴露接口：

```bash
ls /sys/class/power_supply/BAT*/charge_control_end_threshold
cat /sys/class/power_supply/BAT0/charge_control_end_threshold
```

存在该文件时，写入百分比即可（需要 root）：

```bash
echo 80 | sudo tee /sys/class/power_supply/BAT0/charge_control_end_threshold
```

该值重启后通常由固件保留；若丢失，需要写成 udev 规则或 systemd 单元。

### 如果这台机器不支持

**不要绕过去。** 没有 `charge_control_end_threshold` 意味着固件没暴露这个接口，此时：

- 写入 sysfs 会直接报错，或写进一个被内核忽略的假文件，**看起来成功、实际无效**；
- 用 `modprobe` 参数、EC 直写、第三方脚本强行打开阈值，是拿电池管理芯片冒险 —— 轻则无效，重则充不满、校准错乱，甚至损伤电芯。

正确做法只有两条：

1. **去 BIOS/厂商工具里找**。部分机型（联想、华硕、戴尔）在固件设置里有「电池养护/充电上限」，那是厂商实现的，安全。
2. **没有就用行为管理代替**：长期插电时把电量维持在 40–80%，避免整夜满电高温；高温比满电更伤电池，先把散热做好。

判断是否支持，一条命令就够：

```bash
ls /sys/class/power_supply/BAT*/charge_control_end_threshold 2>/dev/null || echo "不支持，别设了"
```

## 查看耗电来源

```bash
upower -i "$(upower -e | grep BAT)"   # 电量、放电速率、健康度
```

`upower` 随桌面环境安装；若命令不存在，用 KDE 电源管理面板查看。持续高放电但 CPU 空闲时，先查：

```bash
linxira-config status      # 快速总览
linxira-config net diag    # 网络异常重连也会耗电
```

## 休眠（suspend-then-hibernate）

需要 swap ≥ 内存。检查：

```bash
swapon --show
free -h
```

swap 小于物理内存时不要把休眠设为默认，否则恢复会丢数据。启用前先手动验证一次：

```bash
systemctl hibernate
```

能正常恢复再改 `/etc/systemd/sleep.conf`。

## 与更新、快照的关系

- 长任务前先 `linxira-config timeshift status`，确认有可用快照。
- 电池低于 20% 时不要跑内核更新（`pacman -Syu` 中断会留下半装状态）。
