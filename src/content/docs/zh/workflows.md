---
title: "工作流模板"
section: guide
order: 2
---

<h1>工作站配置</h1>
<p>Linxira catalog v2 是 Welcome、Calamares 与 Config Hub 配置选项以及 Shelly 推荐链接的共同来源。可通过 <code>linxira-config workflow help</code> 查看当前版本提供的配置。</p>
<h2>科学计算</h2>

```
linxira-config workflow science
```

<p>包括 R、Octave、Gnuplot、ParaView、JupyterLab、NumPy、SciPy、Matplotlib 和 pandas。</p>
<h2>软件开发</h2>

```
linxira-config workflow developer
```

<p>包括构建工具、Git、CMake、Code、Rust、Go、Node.js、npm、Python 和 pip。</p>
<h2>AI 与容器</h2>

```
linxira-config workflow ai
linxira-config workflow containers
```

<p>AI 配置提供 JupyterLab、PyTorch 和 scikit-learn。厂商 GPU 栈仍需根据硬件明确选择。Podman 与 Distrobox 用于隔离固定版本的项目环境。</p>
<h2>生物信息学</h2>

```
linxira-config workflow bioinformatics
```

<p>安装 Apptainer 以运行经过审核、固定版本的工作流容器。Linxira 不会把未审核的 AUR 配方作为官方生信软件包展示。</p>
<h2>部署边界</h2>
<p>Linxira 面向个人科学工作站和桌面计算，不推荐用于大规模企业滚动服务器。可复现的服务器式开发应采用固定容器镜像或其他隔离环境。</p>
