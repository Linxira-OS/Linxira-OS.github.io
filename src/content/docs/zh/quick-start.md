---
title: "快速开始"
section: start
order: 3
---

<h1>快速开始</h1>
<p class="note">第一次用 Linux？先看 <a href="/zh/docs/newbie/">新手向导</a>——终端基础、查资料与中文环境。</p>
<p>安装完成后的第一步：启用签名仓库、安装常用软件、开始使用。</p>

<h2>1. 启用官方签名仓库 [linxira]</h2>
<p>Linxira 官方自研软件托管在签名仓库 <a href="https://linxira-os.github.io/linxira-packages/x86_64" target="_blank">[linxira]</a>。安装系统后会自动配置；若需手动添加，编辑 <code>/etc/pacman.conf</code> 追加：</p>

```
[linxira]
Server = https://linxira-os.github.io/linxira-packages/x86_64
SigLevel = Required DatabaseOptional
```


<h3>导入并信任签名密钥</h3>
<p>安装 <code>linxira-keyring</code> 包会自动完成密钥导入与本地信任：</p>

```
sudo pacman-key --init
sudo pacman -Sy linxira-keyring
```

<p>安装 <code>linxira-keyring</code> 后 pacman 自动导入并信任发布密钥；密钥指纹不在网站上公布。</p>

<h2>2. 更新系统</h2>

```
sudo pacman -Syu
```

<p>检查与更新由 <code>linxira-update</code> 自动完成（每小时自动检查、每个 pacman 事务前自动快照，可选全自动更新）；手动方式、快照与 GRUB 回滚详见 <a href="/zh/docs/updates/">系统更新与快照回滚</a>。</p>

<h2>3. 安装软件</h2>
<p>常用软件可从 <a href="/zh/docs/ecosystem/">软件生态</a> 选择（93 个精选应用），也可直接通过 pacman 安装：</p>

```
sudo pacman -S firefox libreoffice-fresh vlc
```


<h2>4. 配置镜像源（可选）</h2>
<p>使用 <code>linxira-config</code> 管理各语言生态的镜像源，支持自动测速：</p>

```
linxira-config mirror pip auto
linxira-config mirror arch list
linxira-config mirror npm auto
```

- `linxira-config mirror pip auto` — 自动选最快的 PyPI 源
- `linxira-config mirror arch list` — 查看 Arch 源
- `linxira-config mirror npm auto` — 自动选最快的 npm 源（国内直连 npmjs.org 较慢，建议先执行）


<h2>5. 开启远程访问（可选）</h2>
<p>把系统变成服务器：</p>

```
sudo linxira-config ssh on
linxira-config ssh key generate
linxira-config ssh key show
# 确认公钥已加入服务器并验证可用后：
sudo linxira-config ssh harden
```

<p>详见 <a href="/zh/docs/remote-access/">远程访问（SSH）</a>。</p>

<h2>6. AI 工具一键安装（可选）</h2>
<p>先切换 npm 源再安装会快很多：</p>

```
linxira-config mirror npm auto
```

<p>然后选择要安装的 AI 编码代理（按需执行，均为 npm 官方包）：</p>

```
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
npm i -g @xai-official/grok@latest
npm i -g opencode-ai@latest
npm i -g openclaw@latest
```

- `npm i -g @anthropic-ai/claude-code@latest` — Claude Code
- `npm i -g @openai/codex@latest` — Codex
- `npm i -g @google/gemini-cli@latest` — Gemini CLI
- `npm i -g @xai-official/grok@latest` — Grok Build
- `npm i -g opencode-ai@latest` — OpenCode
- `npm i -g openclaw@latest` — OpenClaw

<p>其他终端代理：Hermes 用 <code>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code>（国内镜像 <code>res1.hermesagent.org.cn</code>）；Pi / OMP 用 <code>curl -fsSL https://omp.sh/install | sh</code>。</p>
