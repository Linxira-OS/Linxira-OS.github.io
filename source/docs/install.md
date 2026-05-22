# 安装指南

## 下载 ISO

从 [下载页面](/download/) 获取 Linxira OS ISO 镜像。

## 制作启动 U 盘

```bash
# 确认 U 盘设备（请勿写错！）
lsblk

# 写入 ISO
sudo dd if=linxira.iso of=/dev/sdX bs=4M status=progress
sync
```

> 将 `/dev/sdX` 替换为你的 U 盘设备路径。

## 启动安装

1. 插入 U 盘并重启
2. 进入 BIOS/UEFI 引导菜单，选择 U 盘启动
3. 选择 **Live Desktop** 体验，或 **Install** 开始安装
4. 安装过程中可选择：
   - **GNOME** — 默认桌面
   - **KDE Plasma** — 可定制桌面  
   - **XFCE** — 轻量级桌面
5. 使用 **Calamares** 安装器完成分区和系统配置

## 安装后配置

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装更多工具
sudo apt install -y <package-name>
```
