# 常见问题

## Linxira OS 和 LinxISA 有什么关系？

**没有关系**。Linxira OS 是一个基于 Debian 的标准 x86-64 Linux 发行版，与 LinxISA 指令集架构无关。两个项目名称中的 "Linx" 前缀纯属巧合。

## ISO 装好后怎么无法联网？

检查网络驱动。部分无线网卡可能需要非自由固件：

```bash
# 安装非自由固件
sudo apt install firmware-linux firmware-linux-nonfree
```

## 可以安装其他桌面环境吗？

可以。安装后运行：

```bash
sudo apt install <desktop-package>
```

可用选项：`kde-plasma-desktop`、`xfce4`、`lxqt`、`cinnamon` 等。

## 如何在 Windows/Mac 上制作启动盘？

推荐 **Rufus**（Windows）或 **balenaEtcher**（全平台）。

## 如何报告问题？

在 [GitHub 仓库](https://github.com/Linxira-OS/linxira-os) 提交 Issue。
