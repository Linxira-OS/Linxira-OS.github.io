---
title: "双系统"
section: guide
order: 11
---

# 与 Windows 双系统

## 装之前必须做的三件事

1. **关闭 Windows 快速启动**（控制面板 → 电源选项 → 选择电源按钮的功能 → 取消「启用快速启动」）。
开着快速启动时 NTFS 处于半休眠，Linux 挂载会拒绝写，甚至损坏分区。
2. **挂起 BitLocker**。装完再恢复，否则会要求恢复密钥：

```powershell
   manage-bde -status
   manage-bde -protectors -disable C: -RebootCount 2
```

3. **腾出未分配空间**（不是新建 NTFS 分区）。用磁盘管理压缩卷，留至少 40 GB。

## 分区怎么分

| 场景 | ESP | 根分区 |
|---|---|---|
| 已有 Windows ESP（通常 100 MB） | **复用**，GRUB 能装进 100 MB | 新建 ext4 |
| 独立盘安装 | 新建 512 MB（GRUB）或 1 GB（systemd-boot/rEFInd） | 新建 ext4 |

安装器默认 GRUB，正是为了能在 100 MB 的 Windows ESP 里共存。

## 引导器选择

- **GRUB**：装完 `grub-mkconfig` 会通过 os-prober 自动加 Windows 条目，无需手动配置。
- **systemd-boot**：不会自动加 Windows 条目，需手写 `/boot/loader/entries/windows.conf`：

```
title   Windows
efi     /EFI/Microsoft/Boot/bootmgfw.efi
```


- **rEFInd**：自动扫描，装上就能看到 Windows。

## 双系统时间差 8 小时

CMOS 里只有一份时间，两个系统对它的解释不同：Windows 默认把 RTC 当**本地时间**，Linux 默认当 **UTC**。每切换一次启动，先起的那边按自己的解释改写 RTC，后起的那边再按另一种解释读，于是两边系统的显示时间和 BIOS 里的值都来回漂 8 小时。Windows 的「快速启动」还会从休眠镜像恢复旧时间，让漂移更明显。

推荐做法：让两边统一按 UTC 解释 RTC。

Windows（管理员 CMD 或 PowerShell）：

```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /t REG_DWORD /d 1 /f
w32tm /resync
```

- 时区仍保持 `(UTC+08:00) 北京，重庆，香港特别行政区，乌鲁木齐`
- 关闭快速启动，避免休眠恢复带回旧时间：`powercfg /h off`

Linux（Arch / Linxira）：

```
timedatectl set-ntp true
sudo hwclock --systohc --utc
timedatectl
```

- 期望输出含 `RTC in local TZ: no`，`RTC time` 是 UTC，`Local time` 比它大 8 小时
- 两边都开 NTP 后，切换系统会各自同步一次，不再累积漂移

不建议 `sudo timedatectl set-local-rtc 1 --adjust-system-clock`：它让 Linux 也按本地时间解释 RTC，跨时区或夏令时会错，`timedatectl` 也会持续告警。

只有「关机断电后时间归零」才是主板 CMOS 电池没电；切换系统才漂属于解释不一致，按上面改即可。

## 共享磁盘用什么文件系统

- **NTFS**：Linux 内核自带 `ntfs3`（5.15+），可正常读写，双系统共享数据盘首选。挂载前确认 Windows 已完全关机，关闭「快速启动」。
- **exFAT**：移动硬盘、U 盘，两边都原生支持。
- **ReFS**：Windows 专有（Dev Drive、存储空间），Linux **没有驱动，无法挂载**。
- 不要从 Linux 挂载 Windows 的系统盘 `C:`，休眠状态下更容易损坏文件系统。

完整对照表见 [维护、信任与软件安全](/zh/docs/maintenance-security/)。

## 装完之后

```bash
sudo os-prober
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

- `sudo os-prober` — 确认能看到 Windows


若 os-prober 返回空：确认 Windows 分区已挂载（`lsblk -f`），并检查 `/etc/default/grub` 里 `GRUB_DISABLE_OS_PROBER=false`。

## 常见坑

| 现象 | 原因 | 处理 |
|---|---|---|
| 直接进 Windows，没有菜单 | BootOrder 里 Windows 在前 | `sudo efibootmgr -o ...` 调整 |
| 进 Linux 后 Windows 要恢复密钥 | BitLocker 未挂起 | 用恢复密钥解锁后重新挂起 |
| 挂载 Windows 分区报 dirty | 快速启动未关 | 回 Windows 正常关机一次 |
| 装完 Windows 更新后菜单消失 | Windows 重置了引导项 | 用 live 介质 `grub-install` 重建 |

更多引导器细节见 [UEFI 与固件](/zh/docs/uefi/)。
