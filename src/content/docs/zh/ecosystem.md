---
title: "软件生态"
section: guide
order: 1
---

<a href="/zh/docs/" style="color:var(--t-brand); text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← 返回文档</a>
<h1>软件生态</h1>
<p>Linxira OS 的软件生态由 <strong>107 个精选应用</strong>组成，按 14 个分类组织，全部通过 <strong>catalog v3 审查流程</strong>（许可证/来源/可用性分级）。可用应用通过 <code>pacman</code> 从官方签名仓库 <a href="https://github.com/Linxira-OS/linxira-packages/tree/main/x86_64" target="_blank">[linxira]</a> 安装；带 <span class="tag rec">推荐</span> 标记的是项目维护者推荐的常用应用；<span class="tag prop">专有</span> 标记只表示该软件的<b>许可证非开源</b>（按 catalog 的 license 分级，如 Steam、WPS Office），与它由谁开发无关，安装时需接受其许可协议。</p>
<p style="color:var(--t-text-muted);font-size:0.9rem;">本清单由 <code>scripts/gen-ecosystem-docs.mjs</code> 从 catalog v3 生成，卡片的数量与分类计数都取自同一份数据；改目录请看 <a href="/zh/docs/ecosystem/">catalog 说明</a>，不要手改这里的卡片。</p>
<h2>网络与浏览器 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(4)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Firefox 浏览器</h3>
<div class="pkg">firefox</div>
<p>注重隐私的通用网页浏览器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Chromium 浏览器</h3>
<div class="pkg">chromium</div>
<p>开源 Chromium 网页浏览器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Brave 浏览器</h3>
<div class="pkg">brave-bin</div>
<p>第三方 Chromium 系浏览器候选。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Nyxt</h3>
<div class="pkg">nyxt</div>
<p>可编程的极客浏览器。</p>

</div>
</div>
<h2>邮件与通信 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(6)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Thunderbird 邮件</h3>
<div class="pkg">thunderbird</div>
<p>邮件、日历与联系人客户端。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Element</h3>
<div class="pkg">element-desktop</div>
<p>Matrix 通信客户端。</p>

</div>
<div class="app-card">
<h3>Signal Desktop</h3>
<div class="pkg">signal-desktop</div>
<p>Signal 加密通信桌面客户端。</p>

</div>
<div class="app-card">
<h3>Telegram Desktop</h3>
<div class="pkg">telegram-desktop</div>
<p>Telegram 消息桌面客户端。</p>

</div>
<div class="app-card">
<h3>Neochat</h3>
<div class="pkg">neochat</div>
<p>Matrix 协议聊天客户端。</p>

</div>
<div class="app-card">
<h3>Fractal</h3>
<div class="pkg">fractal</div>
<p>GNOME Matrix 聊天客户端。</p>

</div>
</div>
<h2>办公 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(10)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>LibreOffice</h3>
<div class="pkg">libreoffice-fresh</div>
<p>用于文档、表格和演示的开放办公套件。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>LibreOffice 维护版</h3>
<div class="pkg">libreoffice-still</div>
<p>稳定维护版办公套件，文档/表格/演示。</p>

</div>
<div class="app-card">
<h3>Calligra 套件</h3>
<div class="pkg">calligra</div>
<p>KDE 办公与图形套件。</p>

</div>
<div class="app-card">
<h3>ONLYOFFICE 桌面编辑器</h3>
<div class="pkg">onlyoffice-bin</div>
<p>第三方办公套件候选。</p>
<span class="tag rec">推荐</span>
<span class="tag prop">专有</span>

</div>
<div class="app-card">
<h3>WPS Office</h3>
<div class="pkg">wps-office</div>
<p>等待法律与来源审查的专有 AUR 办公候选，绝不预装。</p>
<span class="tag prop">专有</span>

</div>
<div class="app-card">
<h3>AI 办公套件（Office 替代）</h3>
<div class="pkg">genoffice-bin</div>
<p>AI 原生办公套件：文档/表格/幻灯片/PDF/HTML/Markdown 六个编辑器 + 内置 AI 面板，另带 `genoffice` CLI 与 agent 技能；自带 API Key。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>文字处理（Word 类）</h3>
<div class="pkg">wordcraft-bin</div>
<p>纯 Rust 净室重写（Word 类）：读写 .docx，含样式、表格与修订。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>电子表格（Excel 类）</h3>
<div class="pkg">gridcraft-bin</div>
<p>纯 Rust 净室电子表格（Excel 类）：读写 .xlsx 与 CSV/TSV，含公式与图表。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>演示文稿（PowerPoint 类）</h3>
<div class="pkg">deckcraft-bin</div>
<p>纯 Rust 净室重写（PowerPoint 类）：.pptx 版式、演讲者备注与放映模式。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Apache OpenOffice</h3>
<div class="pkg">openoffice-bin</div>
<p>经典开源办公套件（Writer/Calc/Impress/Base/Draw/Math），上游二进制分发包，安装到 /opt/openoffice4。</p>
<span class="tag rec">推荐</span>

</div>
</div>
<h2>文档与阅读 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(8)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Okular</h3>
<div class="pkg">okular</div>
<p>KDE 文档与 PDF 阅读器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Ghostwriter</h3>
<div class="pkg">ghostwriter</div>
<p>无干扰 Markdown 编辑器。</p>

</div>
<div class="app-card">
<h3>Evince</h3>
<div class="pkg">evince</div>
<p>GNOME 文档阅读器，PDF/漫画/Djvu。</p>

</div>
<div class="app-card">
<h3>Foliate</h3>
<div class="pkg">foliate</div>
<p>支持常见开放格式的电子书阅读器。</p>

</div>
<div class="app-card">
<h3>Zathura</h3>
<div class="pkg">zathura</div>
<p>极简键盘驱动的 PDF 阅读器。</p>

</div>
<div class="app-card">
<h3>Calibre</h3>
<div class="pkg">calibre</div>
<p>电子书书库、转换与阅读套件。</p>

</div>
<div class="app-card">
<h3>Pandoc</h3>
<div class="pkg">pandoc</div>
<p>通用文档格式转换器，支持 Markdown/Word/PDF/HTML 等。</p>

</div>
<div class="app-card">
<h3>PDF 阅读与编辑（Acrobat 类）</h3>
<div class="pkg">pdfcraft-bin</div>
<p>纯 Rust 开源 PDF 阅读与编辑（Acrobat 类）：批注、表单与页面操作，另含 CLI 转换器。</p>
<span class="tag rec">推荐</span>

</div>
</div>
<h2>密码与个人数据 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(4)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>KeePassXC</h3>
<div class="pkg">keepassxc</div>
<p>本地加密密码管理器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Bitwarden</h3>
<div class="pkg">bitwarden</div>
<p>开源密码管理器。</p>

</div>
<div class="app-card">
<h3>Seahorse</h3>
<div class="pkg">seahorse</div>
<p>GNOME 密码与加密密钥管理器。</p>

</div>
<div class="app-card">
<h3>VeraCrypt</h3>
<div class="pkg">veracrypt</div>
<p>磁盘加密工具。</p>

</div>
</div>
<h2>图形、摄影与 CAD <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(16)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Krita</h3>
<div class="pkg">krita</div>
<p>数字绘画与插画应用。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>GIMP</h3>
<div class="pkg">gimp</div>
<p>位图编辑与处理工具。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Nomacs</h3>
<div class="pkg">nomacs</div>
<p>轻量图片查看器。</p>

</div>
<div class="app-card">
<h3>Inkscape</h3>
<div class="pkg">inkscape</div>
<p>矢量插画与 SVG 编辑器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Shotwell</h3>
<div class="pkg">shotwell</div>
<p>GNOME 照片管理器。</p>

</div>
<div class="app-card">
<h3>digiKam</h3>
<div class="pkg">digikam</div>
<p>专业照片管理与编辑。</p>

</div>
<div class="app-card">
<h3>Darktable</h3>
<div class="pkg">darktable</div>
<p>摄影工作流与 RAW 显影工具。</p>

</div>
<div class="app-card">
<h3>Blender</h3>
<div class="pkg">blender</div>
<p>三维建模、动画与渲染套件。</p>

</div>
<div class="app-card">
<h3>FreeCAD</h3>
<div class="pkg">freecad</div>
<p>参数化三维 CAD 应用。</p>

</div>
<div class="app-card">
<h3>Scribus</h3>
<div class="pkg">scribus</div>
<p>桌面出版与页面布局应用。</p>

</div>
<div class="app-card">
<h3>图像编辑（Photoshop 类）</h3>
<div class="pkg">photocraft-bin</div>
<p>纯 Rust 开源位图编辑器（Photoshop 类）：图层、蒙版、调整图层、文字与画笔；可读写分层 PSD/PSB。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>无损修图（Lightroom 类）</h3>
<div class="pkg">lightcraft-bin</div>
<p>纯 Rust 无损修图（Lightroom 类）：挑图、RAW 显影与批量导出。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>矢量绘图（Illustrator 类）</h3>
<div class="pkg">vectorcraft-bin</div>
<p>纯 Rust 开源矢量绘图（Illustrator 类）：形状图层、渐变填充、虚线描边与 SVG。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>排版与版面（InDesign 类）</h3>
<div class="pkg">designcraft-bin</div>
<p>纯 Rust 版面设计编辑器（InDesign 类）：主页、文本框与 PDF 导出。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>界面设计与原型（Figma 类）</h3>
<div class="pkg">figcraft</div>
<p>纯 Rust 界面设计与原型（Figma 类）：无限画布、组件与交付标注。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>CAD 制图（AutoCAD 类）</h3>
<div class="pkg">cadcraft-bin</div>
<p>纯 Rust CAD 制图（AutoCAD 类）：参数化 2D/3D 建模。</p>
<span class="tag rec">推荐</span>

</div>
</div>
<h2>视频与音频创作 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(7)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Kdenlive</h3>
<div class="pkg">kdenlive</div>
<p>非线性视频编辑器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>OBS Studio</h3>
<div class="pkg">obs-studio</div>
<p>屏幕录制与直播工作室。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Audacity</h3>
<div class="pkg">audacity</div>
<p>多轨音频编辑与录制工具。</p>

</div>
<div class="app-card">
<h3>HandBrake</h3>
<div class="pkg">handbrake</div>
<p>视频转码工具。</p>

</div>
<div class="app-card">
<h3>视频剪辑（Premiere 类）</h3>
<div class="pkg">filmcraft-bin</div>
<p>纯 Rust 开源非线性剪辑（Premiere 类）：时间线、多机位、调色与音频，含交付导出。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>视觉特效（After Effects 类）</h3>
<div class="pkg">effectcraft-bin</div>
<p>纯 Rust 动态图形与合成（After Effects 类）：关键帧、跟踪、蒙版与渲染队列。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>音频工作站（Pro Tools 类）</h3>
<div class="pkg">soundcraft-bin</div>
<p>纯 Rust 开源数字音频工作站（Pro Tools 类）：多轨录制、编辑与混音。</p>
<span class="tag rec">推荐</span>

</div>
</div>
<h2>媒体播放 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(6)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>VLC</h3>
<div class="pkg">vlc</div>
<p>跨平台媒体播放器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Celluloid</h3>
<div class="pkg">celluloid</div>
<p>GNOME 视频播放器（mpv 前端）。</p>

</div>
<div class="app-card">
<h3>Haruna</h3>
<div class="pkg">haruna</div>
<p>基于 mpv 的 KDE 媒体播放器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Totem</h3>
<div class="pkg">totem</div>
<p>GNOME 默认视频播放器。</p>

</div>
<div class="app-card">
<h3>GNOME Music</h3>
<div class="pkg">gnome-music</div>
<p>GNOME 音乐播放器。</p>

</div>
<div class="app-card">
<h3>MPV</h3>
<div class="pkg">mpv</div>
<p>简洁的键盘驱动媒体播放器。</p>

</div>
</div>
<h2>文件与同步工具 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(7)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Syncthing</h3>
<div class="pkg">syncthing</div>
<p>点对点文件同步。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Nautilus</h3>
<div class="pkg">nautilus</div>
<p>GNOME 文件管理器。</p>

</div>
<div class="app-card">
<h3>Nextcloud 桌面客户端</h3>
<div class="pkg">nextcloud-client</div>
<p>Nextcloud 桌面同步客户端。</p>

</div>
<div class="app-card">
<h3>Thunar</h3>
<div class="pkg">thunar</div>
<p>轻量 Xfce 文件管理器。</p>

</div>
<div class="app-card">
<h3>Syncthing GTK</h3>
<div class="pkg">syncthing-gtk</div>
<p>Syncthing 图形界面。</p>

</div>
<div class="app-card">
<h3>FileZilla</h3>
<div class="pkg">filezilla</div>
<p>FTP/SFTP 图形客户端。</p>

</div>
<div class="app-card">
<h3>LocalSend</h3>
<div class="pkg">localsend</div>
<p>局域网文件共享应用。</p>

</div>
</div>
<h2>开发应用 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(9)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Kate</h3>
<div class="pkg">kate</div>
<p>高级文本与代码编辑器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Code - OSS</h3>
<div class="pkg">code</div>
<p>Visual Studio Code 编辑器的开源构建。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>gitg</h3>
<div class="pkg">gitg</div>
<p>GNOME Git 图形客户端。</p>

</div>
<div class="app-card">
<h3>Zed</h3>
<div class="pkg">zed</div>
<p>由 Atom 与 Tree-sitter 原班人马打造的高性能多人协作代码编辑器，基于 Rust 编写并采用 GPU 加速渲染。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Geany</h3>
<div class="pkg">geany</div>
<p>轻量程序员编辑器。</p>

</div>
<div class="app-card">
<h3>KDiff3</h3>
<div class="pkg">kdiff3</div>
<p>文件与目录比较合并工具。</p>

</div>
<div class="app-card">
<h3>Meld</h3>
<div class="pkg">meld</div>
<p>可视化文件与版本控制比较工具。</p>

</div>
<div class="app-card">
<h3>DBeaver Community</h3>
<div class="pkg">dbeaver</div>
<p>跨数据库管理与查询工具。</p>

</div>
<div class="app-card">
<h3>DB Browser for SQLite</h3>
<div class="pkg">sqlitebrowser</div>
<p>图形化 SQLite 数据库浏览器。</p>

</div>
</div>
<h2>教育与地理 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(6)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Stellarium</h3>
<div class="pkg">stellarium</div>
<p>交互式桌面天文馆。</p>

</div>
<div class="app-card">
<h3>Marble</h3>
<div class="pkg">marble</div>
<p>KDE 虚拟地球与地图应用。</p>

</div>
<div class="app-card">
<h3>QGIS</h3>
<div class="pkg">qgis</div>
<p>桌面地理信息系统。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Stellarium Web</h3>
<div class="pkg">stellarium-web</div>
<p>在线天文馆。</p>

</div>
<div class="app-card">
<h3>GCompris</h3>
<div class="pkg">gcompris</div>
<p>儿童教育软件套件。</p>

</div>
<div class="app-card">
<h3>KWordQuiz</h3>
<div class="pkg">kwordquiz</div>
<p>KDE 词汇学习工具。</p>

</div>
</div>
<h2>科学桌面应用 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(9)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>GNU Octave</h3>
<div class="pkg">octave</div>
<p>交互式数值计算环境。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>ParaView</h3>
<div class="pkg">paraview</div>
<p>科学数据分析与可视化应用。</p>

</div>
<div class="app-card">
<h3>Veusz</h3>
<div class="pkg">veusz</div>
<p>科学绘图应用。</p>

</div>
<div class="app-card">
<h3>LabPlot</h3>
<div class="pkg">labplot</div>
<p>用于科学数据绘图与分析的 KDE 应用。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>Cantor</h3>
<div class="pkg">cantor</div>
<p>面向数学与科学计算引擎的 KDE 工作表前端。</p>

</div>
<div class="app-card">
<h3>RKWard</h3>
<div class="pkg">rkward</div>
<p>带图形化分析流程的 R 统计 IDE。</p>

</div>
<div class="app-card">
<h3>Spyder</h3>
<div class="pkg">spyder</div>
<p>用于交互式分析的科学 Python IDE。</p>

</div>
<div class="app-card">
<h3>SageMath</h3>
<div class="pkg">sagemath</div>
<p>用于代数与数论的大型综合数学系统。</p>

</div>
<div class="app-card">
<h3>Linxira 生物计算套件</h3>
<div class="pkg">linxira-bio-sdk</div>
<p>本地优先生信计算套件：Rust 引擎 + CLI/UI，数据不出本机；含转录组定量与可复现基准管线。</p>

</div>
</div>
<h2>游戏 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(6)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>Steam</h3>
<div class="pkg">steam</div>
<p>仅在明确确认 Steam 条款后安装的 Valve 游戏商店与启动器。</p>
<span class="tag rec">推荐</span>
<span class="tag prop">专有</span>

</div>
<div class="app-card">
<h3>Lutris</h3>
<div class="pkg">lutris</div>
<p>开放的游戏库与兼容层前端。</p>

</div>
<div class="app-card">
<h3>Wine</h3>
<div class="pkg">wine</div>
<p>Windows 应用兼容层。</p>

</div>
<div class="app-card">
<h3>GameHub</h3>
<div class="pkg">gamehub</div>
<p>统一游戏启动器（Steam/GOG/本地）。</p>

</div>
<div class="app-card">
<h3>Heroic Games Launcher</h3>
<div class="pkg">com.heroicgameslauncher.hgl</div>
<p>通过可选来源交付的第三方游戏商店前端。</p>

</div>
<div class="app-card">
<h3>Bottles</h3>
<div class="pkg">com.usebottles.bottles</div>
<p>来自可选来源的用户级 Wine 环境管理器。</p>

</div>
</div>
<h2>系统工具 <span style="font-size:0.9rem;color:var(--t-text-muted);font-weight:400;">(9)</span></h2>
<div class="app-grid">
<div class="app-card">
<h3>GParted</h3>
<div class="pkg">gparted</div>
<p>图形化磁盘分区编辑器。</p>

</div>
<div class="app-card">
<h3>KDE 分区管理器</h3>
<div class="pkg">partitionmanager</div>
<p>用于存储维护的 KDE 磁盘分区编辑器。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>GNOME 磁盘</h3>
<div class="pkg">gnome-disk-utility</div>
<p>磁盘检查、格式化与 SMART 工具。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>htop</h3>
<div class="pkg">htop</div>
<p>交互式进程查看器。</p>

</div>
<div class="app-card">
<h3>fastfetch</h3>
<div class="pkg">fastfetch</div>
<p>系统信息展示工具。</p>

</div>
<div class="app-card">
<h3>Filelight</h3>
<div class="pkg">filelight</div>
<p>用于查找大文件的 KDE 磁盘占用可视化工具。</p>
<span class="tag rec">推荐</span>

</div>
<div class="app-card">
<h3>KDE Connect</h3>
<div class="pkg">kdeconnect</div>
<p>通过局域网连接手机与桌面。</p>

</div>
<div class="app-card">
<h3>BleachBit</h3>
<div class="pkg">bleachbit</div>
<p>用于清理缓存、临时文件与应用痕迹的工具。</p>

</div>
<div class="app-card">
<h3>Flatseal</h3>
<div class="pkg">com.github.tchx84.Flatseal</div>
<p>Flatpak 权限检查与编辑工具。</p>

</div>
</div>
