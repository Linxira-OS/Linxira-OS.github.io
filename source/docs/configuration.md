# 系统配置

## 安全更新

Linxira OS 默认启用**自动安全更新**，每周检查并安装 Debian 安全公告的更新。您可以通过以下命令手动触发：

```bash
sudo unattended-upgrade
```

## 添加软件源

```bash
# Debian 标准源已预配，如需添加第三方源
sudo apt-add-repository <ppa-url>
```

## 桌面环境切换

安装时选择桌面，也可后期安装：

```bash
# 安装 KDE
sudo apt install kde-plasma-desktop

# 安装 XFCE
sudo apt install xfce4
```

## 科学工具

预装工具位于系统 `PATH` 中，直接终端调用。

### Jupyter

```bash
jupyter notebook
```

### R 语言

```bash
R
```

### Octave

```bash
octave
```
