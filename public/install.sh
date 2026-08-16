#!/bin/sh
# Zeta — Linux 一键安装脚本
# 用法: curl -fsSL https://linxira-os.github.io/install.sh | sh
# 从 GitHub Releases 拉取最新编译二进制，安装到 ~/.local/bin/zeta（root 时为 /usr/local/bin）。
# 仅支持 Linux x64/arm64（含 musl）；macOS 暂未提供构建产物。

set -e

REPO="Linxira-OS/linxira-zeta"
API="https://api.github.com/repos/${REPO}/releases/latest"
VERSION=""
DRY=0

for arg in "$@"; do
	case "$arg" in
		--version=*) VERSION="${arg#--version=}" ;;
		--dry-run) DRY=1 ;;
	esac
done

say() { printf '%s\n' "$*"; }
die() { printf '错误: %s\n' "$*" >&2; exit 1; }

# ---- 平台检测 ----
OS="$(uname -s 2>/dev/null || true)"
ARCH="$(uname -m 2>/dev/null || true)"
case "$OS" in
	Linux) PLAT="linux" ;;
	Darwin) die "暂不支持 macOS：暂无 darwin 构建产物，请改用 npm 安装（npm install -g @linxiraos/zeta）" ;;
	*) die "不支持的平台: $OS（当前仅支持 Linux）" ;;
esac
case "$ARCH" in
	x86_64|amd64) TRIPLE="x64" ;;
	aarch64|arm64) TRIPLE="arm64" ;;
	*) die "不支持的架构: $ARCH" ;;
esac

# musl 检测（仅 Linux）
LIBC=""
if [ "$PLAT" = "linux" ]; then
	case "$(ldd --version 2>/dev/null | head -1)" in
		*musl*) LIBC="musl-" ;;
		*) [ -n "$(ls /lib/ld-musl-* 2>/dev/null | head -1)" ] && LIBC="musl-" ;;
	esac
fi

ASSET="zeta-linux-${LIBC}${TRIPLE}"

# ---- 取版本 ----
if [ -z "$VERSION" ]; then
	say "获取最新版本..."
	VERSION="$(curl -fsSL "$API" | tr -d '\n' | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
	[ -n "$VERSION" ] || die "无法获取最新版本（GitHub API 不可达或触发限流）；可稍后重试，或用 --version=vX.Y.Z 指定版本"
fi
say "版本: $VERSION"

URL="https://github.com/${REPO}/releases/download/${VERSION}/${ASSET}"

# ---- 安装目标 ----
if [ "$(id -u)" = "0" ]; then
	DEST_DIR="/usr/local/bin"
else
	DEST_DIR="$HOME/.local/bin"
fi

if [ "$DRY" = "1" ]; then
	say "[dry-run] 将下载: $URL"
	say "[dry-run] 安装到: $DEST_DIR/zeta"
	exit 0
fi
mkdir -p "$DEST_DIR"
DEST="$DEST_DIR/zeta"

say "下载 $ASSET → $DEST ..."
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
if ! curl -fL --progress-bar -o "$TMP" "$URL"; then
	die "下载失败: $URL（网络受限时请手动从 GitHub Releases 下载）"
fi
chmod +x "$TMP"
mv "$TMP" "$DEST"

say ""
say "安装完成: $DEST"
"$DEST" --version || say "（运行 zeta --version 确认版本）"
say "提示: 确保 $DEST_DIR 在 PATH 中。"
