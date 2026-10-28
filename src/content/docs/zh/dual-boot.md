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

## 时间差 8 小时

Windows 用本地时间，Linux 默认 UTC。二选一：

```bash
# 让 Linux 跟随 Windows 的本地时间
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```

或在 Windows 注册表里把 `RealTimeIsUniversal` 设为 1（推荐，保持 UTC）。

## 装完之后

```bash
sudo os-prober                 # 确认能看到 Windows
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

若 os-prober 返回空：确认 Windows 分区已挂载（`lsblk -f`），并检查 `/etc/default/grub` 里 `GRUB_DISABLE_OS_PROBER=false`。

## 常见坑

| 现象 | 原因 | 处理 |
|---|---|---|
| 直接进 Windows，没有菜单 | BootOrder 里 Windows 在前 | `sudo efibootmgr -o ...` 调整 |
| 进 Linux 后 Windows 要恢复密钥 | BitLocker 未挂起 | 用恢复密钥解锁后重新挂起 |
| 挂载 Windows 分区报 dirty | 快速启动未关 | 回 Windows 正常关机一次 |
| 装完 Windows 更新后菜单消失 | Windows 重置了引导项 | 用 live 介质 `grub-install` 重建 |

更多引导器细节见 [UEFI 与固件](/zh/docs/uefi/)。
