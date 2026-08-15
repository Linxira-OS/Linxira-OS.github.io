// ===== Data =====
const capabilities = [
  {id:'sequence.stats.v1',name:'序列统计',nameEn:'Sequence Stats',desc:'序列数、长度分布、GC含量、N50',descEn:'Count, length, GC%, N50',cat:'序列',catEn:'Sequence',icon:'📊'},
  {id:'sequence.kmer.count.v1',name:'K-mer 计数',nameEn:'K-mer Count',desc:'k-mer 频率统计',descEn:'K-mer frequency',cat:'序列',catEn:'Sequence',icon:'🔢'},
  {id:'sequence.extract.v1',name:'序列提取',nameEn:'Sequence Extract',desc:'按 ID 或区域提取序列',descEn:'Extract by ID/region',cat:'序列',catEn:'Sequence',icon:'✂️'},
  {id:'sequence.translate.v1',name:'序列翻译',nameEn:'Translate',desc:'核苷酸翻译为蛋白质',descEn:'Nucleotide to protein',cat:'序列',catEn:'Sequence',icon:'🔄'},
  {id:'sequence.reverse-complement.v1',name:'反向互补',nameEn:'Reverse Complement',desc:'获取反向互补序列',descEn:'Reverse complement',cat:'序列',catEn:'Sequence',icon:'🔁'},
  {id:'fastq.qc.v1',name:'FASTQ 质控',nameEn:'FASTQ QC',desc:'质量分数分布、碱基含量',descEn:'Quality scores, base content',cat:'FASTQ',catEn:'FASTQ',icon:'✅'},
  {id:'fastq.trim.v1',name:'FASTQ 修剪',nameEn:'FASTQ Trim',desc:'按质量分数修剪读段',descEn:'Trim by quality',cat:'FASTQ',catEn:'FASTQ',icon:'🔪'},
  {id:'fastq.adapter.v1',name:'接头去除',nameEn:'Adapter Removal',desc:'检测并去除测序接头',descEn:'Detect & remove adapters',cat:'FASTQ',catEn:'FASTQ',icon:'🧹'},
  {id:'fastq.deduplicate.v1',name:'去重',nameEn:'Deduplicate',desc:'去除 PCR 重复',descEn:'Remove PCR duplicates',cat:'FASTQ',catEn:'FASTQ',icon:'📋'},
  {id:'alignment.qc.v1',name:'比对 QC',nameEn:'Alignment QC',desc:'SAM/BAM 比对质量统计',descEn:'SAM/BAM quality stats',cat:'比对',catEn:'Alignment',icon:'📐'},
  {id:'annotation.gxf.stats.v1',name:'注释统计',nameEn:'Annotation Stats',desc:'GFF3/GTF 基因注释统计',descEn:'GFF3/GTF gene stats',cat:'注释',catEn:'Annotation',icon:'📝'},
  {id:'annotation.gene-position.v1',name:'基因位置表',nameEn:'Gene Position',desc:'提取基因位置信息',descEn:'Extract gene positions',cat:'注释',catEn:'Annotation',icon:'📍'},
  {id:'variant.stats.v1',name:'变异统计',nameEn:'Variant Stats',desc:'VCF 变异位点统计',descEn:'VCF variant statistics',cat:'变异',catEn:'Variant',icon:'🧬'},
  {id:'variant.filter.v1',name:'变异过滤',nameEn:'Variant Filter',desc:'按条件过滤变异',descEn:'Filter by criteria',cat:'变异',catEn:'Variant',icon:'🔍'},
  {id:'interval.intersect.v1',name:'区间交集',nameEn:'Interval Intersect',desc:'BED 区间交集运算',descEn:'BED interval intersect',cat:'区间',catEn:'Interval',icon:'🎯'},
  {id:'expression.matrix.qc.v1',name:'表达矩阵 QC',nameEn:'Expression QC',desc:'表达矩阵质量检查',descEn:'Matrix quality check',cat:'表达',catEn:'Expression',icon:'📈'},
  {id:'expression.differential.v1',name:'差异表达',nameEn:'Differential Expression',desc:'DESeq2 差异表达分析',descEn:'DESeq2 differential analysis',cat:'表达',catEn:'Expression',icon:'📉'},
  {id:'expression.pca.v1',name:'PCA 分析',nameEn:'PCA',desc:'主成分分析',descEn:'Principal component analysis',cat:'表达',catEn:'Expression',icon:'📊'},
  {id:'enrichment.go.v1',name:'GO 富集',nameEn:'GO Enrichment',desc:'Gene Ontology 富集分析',descEn:'GO enrichment analysis',cat:'富集',catEn:'Enrichment',icon:'🎓'},
  {id:'enrichment.kegg.v1',name:'KEGG 富集',nameEn:'KEGG Enrichment',desc:'KEGG 通路富集分析',descEn:'KEGG pathway enrichment',cat:'富集',catEn:'Enrichment',icon:'🗺️'},
  {id:'enrichment.gsea.v1',name:'GSEA',nameEn:'GSEA',desc:'基因集富集分析',descEn:'Gene set enrichment analysis',cat:'富集',catEn:'Enrichment',icon:'📊'},
  {id:'phylogeny.tree.visualize.v1',name:'系统发育树',nameEn:'Tree Visualize',desc:'Newick 树渲染为 SVG',descEn:'Newick tree to SVG',cat:'系统发育',catEn:'Phylogeny',icon:'🌳'},
  {id:'structure.pdb.summary.v1',name:'PDB 摘要',nameEn:'PDB Summary',desc:'PDB 结构摘要信息',descEn:'PDB structure summary',cat:'结构',catEn:'Structure',icon:'🔬'},
  {id:'structure.mmcif.summary.v1',name:'mmCIF 摘要',nameEn:'mmCIF Summary',desc:'mmCIF 结构摘要',descEn:'mmCIF structure summary',cat:'结构',catEn:'Structure',icon:'🔬'},
  {id:'structure.superpose.v1',name:'结构叠加',nameEn:'Superpose',desc:'蛋白质结构叠加',descEn:'Protein superposition',cat:'结构',catEn:'Structure',icon:'🔄'},
  {id:'set.venn.v1',name:'Venn 图',nameEn:'Venn Diagram',desc:'韦恩图分析',descEn:'Venn diagram analysis',cat:'集合',catEn:'Set',icon:'🔵'},
  {id:'set.upset.v1',name:'UpSet 图',nameEn:'UpSet Plot',desc:'UpSet 交集可视化',descEn:'UpSet intersection plot',cat:'集合',catEn:'Set',icon:'📊'},
  {id:'protein.properties.v1',name:'蛋白质性质',nameEn:'Protein Properties',desc:'物理化学性质计算',descEn:'Physicochemical properties',cat:'蛋白质',catEn:'Protein',icon:'🧪'},
  {id:'comparative.dotplot.v1',name:'点图',nameEn:'Dotplot',desc:'k-mer 基因组点图',descEn:'K-mer genome dotplot',cat:'比较基因组',catEn:'Comparative',icon:'🔲'},
  {id:'rna.secondary-structure.v1',name:'RNA 二级结构',nameEn:'RNA 2nd Structure',desc:'RNAfold 二级结构预测',descEn:'RNAfold prediction',cat:'RNA',catEn:'RNA',icon:'🧬'},
];

// ===== Language =====
let currentLang = window.BIOSDK_LANG || 'zh';

// ===== Page Navigation =====
function switchPage(page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = document.querySelector(`[data-page="${page}"]`);
  if (navEl) navEl.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-'+page);
  if (target) {
    target.classList.add('active');
    if (page === 'home') renderCapGrid();
    if (page === 'workbench') switchWorkbenchTab('w-import');
    if (page === 'structure') {
      hbScene(hbCurrent);
      if (!mdlInitDone) { mdlInitDone = true; initMdl(); }
      else if (mdlViewer) { setTimeout(() => { mdlViewer.resize(); mdlViewer.render(); }, 60); }
    }
  }
}

// ===== Workbench Tabs =====
function switchWorkbenchTab(tab) {
  document.querySelectorAll('#page-workbench .tab').forEach(t => t.classList.remove('active'));
  const tabEl = document.querySelector(`#page-workbench [data-tab="${tab}"]`);
  if (tabEl) tabEl.classList.add('active');
  document.querySelectorAll('.wb-page').forEach(p => p.classList.remove('active'));
  const wbPage = document.getElementById('wb-'+tab);
  if (wbPage) {
    wbPage.classList.add('active');
    if (tab === 'w-analyze') renderAnalyzeCapGrid();
    if (tab === 'w-import') renderSimFiles();
  }
}

// ===== Attach nav click handlers =====
document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', () => switchPage(el.dataset.page));
});
document.querySelectorAll('#page-workbench .tab').forEach(el => {
  el.addEventListener('click', () => switchWorkbenchTab(el.dataset.tab));
});

// ===== Render Capability Grid =====
function renderCapGrid() {
  const grid = document.getElementById('cap-grid');
  if (!grid) return;
  const isZh = currentLang === 'zh';
  grid.innerHTML = capabilities.map(c => `
    <div class="cap-card animate-in" onclick="switchPage('workbench');setTimeout(()=>{ if(!simFile) switchWorkbenchTab('w-import'); else switchWorkbenchTab('w-analyze'); },100)">
      <span class="cap-badge">v1</span>
      <div class="cap-icon">${c.icon}</div>
      <div class="cap-name">${isZh ? c.name : c.nameEn}</div>
      <div class="cap-id">${c.id}</div>
      <div class="cap-desc">${isZh ? c.desc : c.descEn}</div>
    </div>
  `).join('');
}

function renderAnalyzeCapGrid() {
  const grid = document.getElementById('analyze-cap-grid');
  if (!grid) return;
  const isZh = currentLang === 'zh';
  const caps = simFile ? simFiles.find(f => f.id === simFile.id).caps : [];
  const desc = document.getElementById('sim-analyze-desc');
  if (desc) {
    desc.textContent = simFile
      ? (isZh ? '根据「已导入文件 ' : 'Matched to imported file ') + simFile.name + (isZh ? '」的格式自动匹配以下能力（Web 演示为模拟子集），点击卡片开始模拟运行。' : ' format. Click a capability to run (simulated subset).')
      : (isZh ? '尚未导入文件——请先进入「1 导入」选择示例文件。' : 'No file imported — go to "1 Import" and pick a sample file.');
  }
  if (!simFile) { grid.innerHTML = ''; return; }
  grid.innerHTML = caps.map(cid => {
    const c = capabilities.find(x => x.id === cid); if (!c) return '';
    return `
    <div class="cap-card animate-in" onclick="runSimAnalysis('${cid}')">
      <span class="cap-badge">v1</span>
      <div class="cap-icon">${c.icon}</div>
      <div class="cap-name">${isZh ? c.name : c.nameEn}</div>
      <div class="cap-id">${c.id}</div>
      <div class="cap-desc">${isZh ? c.desc : c.descEn}</div>
    </div>
  `;
  }).join('');
}

// ===== Simulated Chart Builders（模拟结果图表） =====
function svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
function svgText(x, y, txt, attrs) {
  const t = svgEl('text', Object.assign({ x, y, 'text-anchor': 'middle', 'font-size': '8', style: 'fill:var(--text-dim)' }, attrs || {}));
  t.textContent = txt;
  return t;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function renderQc(hostEl) {
  const host = hostEl || document.getElementById('qc-host'); if (!host) return;
  const data = [[1, 30], [20, 32], [40, 36], [60, 38], [80, 40], [100, 42], [120, 38], [140, 32]];
  const base = 150;
  data.forEach((d, i) => {
    const cx = 55 + i * 23, x = cx - 8, h = d[1];
    const y = base - h, med = base - h / 2;
    const g = svgEl('g', {});
    const box = svgEl('rect', { x, y, width: '16', height: h, rx: '2', style: 'fill:var(--brand-teal);opacity:0.28;stroke:var(--brand-teal);stroke-width:1' });
    box.appendChild(svgEl('animate', { attributeName: 'height', from: '0', to: h, dur: '0.5s', begin: (0.08 + i * 0.06) + 's', fill: 'freeze' }));
    box.appendChild(svgEl('animate', { attributeName: 'y', from: base, to: y, dur: '0.5s', begin: (0.08 + i * 0.06) + 's', fill: 'freeze' }));
    g.appendChild(box);
    g.appendChild(svgEl('line', { x1: x, y1: med, x2: x + 16, y2: med, style: 'stroke:var(--brand-teal)', 'stroke-width': '1.5' }));
    g.appendChild(svgEl('line', { x1: cx, y1: y - 8, x2: cx, y2: base + 8, style: 'stroke:var(--text-dim)', 'stroke-width': '0.8', opacity: '0.7' }));
    g.appendChild(svgEl('line', { x1: cx - 6, y1: y - 8, x2: cx + 6, y2: y - 8, style: 'stroke:var(--text-dim)', 'stroke-width': '0.8', opacity: '0.7' }));
    g.appendChild(svgEl('line', { x1: cx - 6, y1: base + 8, x2: cx + 6, y2: base + 8, style: 'stroke:var(--text-dim)', 'stroke-width': '0.8', opacity: '0.7' }));
    g.appendChild(svgText(cx, 172, String(d[0]), { 'font-size': '7' }));
    host.appendChild(g);
  });
  host.appendChild(svgText(140, 12, 'base quality (Phred)', { 'font-size': '7' }));
}
function renderKegg(hostEl) {
  const host = hostEl || document.getElementById('kegg-host'); if (!host) return;
  const data = [['IL-17 signaling', 8.9], ['Cytokine-cytokine receptor', 7.2], ['NF-\u03baB signaling', 5.8], ['TNF signaling', 4.1], ['Toll-like receptor', 2.9], ['Apoptosis', 2.2]];
  const x0 = 100;
  host.appendChild(svgEl('line', { x1: x0, y1: 18, x2: x0, y2: 186, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgText(180, 12, '-log10(padj)', { 'font-size': '7' }));
  data.forEach((d, i) => {
    const y = 24 + i * 28, w = Math.round(d[1] * 16), h = 14;
    const rect = svgEl('rect', { x: x0, y, width: w, height: h, rx: '3', style: 'fill:var(--brand-teal);opacity:0.75' });
    rect.appendChild(svgEl('animate', { attributeName: 'width', from: '0', to: w, dur: '0.7s', begin: (0.1 + i * 0.1) + 's', fill: 'freeze' }));
    host.appendChild(rect);
    host.appendChild(svgText(x0 - 6, y + 11, d[0], { 'text-anchor': 'end', 'font-size': '7' }));
    host.appendChild(svgText(x0 + w + 4, y + 11, d[1].toFixed(1), { 'text-anchor': 'start', 'font-size': '7', style: 'fill:var(--brand-teal)' }));
  });
}
function renderVolcano(hostEl) {
  const host = hostEl || document.getElementById('volcano-host'); if (!host) return;
  const isZh = currentLang === 'zh';
  host.appendChild(svgEl('rect', { width: '260', height: '200', style: 'fill:var(--chart-bg)' }));
  host.appendChild(svgEl('line', { x1: 40, y1: 160, x2: 240, y2: 160, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgEl('line', { x1: 130, y1: 20, x2: 130, y2: 180, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  [100, 160].forEach(x => host.appendChild(svgEl('line', { x1: x, y1: 20, x2: x, y2: 160, style: 'stroke:var(--text-dim)', 'stroke-width': '0.5', 'stroke-dasharray': '3,3', opacity: '0.5' })));
  host.appendChild(svgEl('line', { x1: 40, y1: 154, x2: 240, y2: 154, style: 'stroke:var(--text-dim)', 'stroke-width': '0.5', 'stroke-dasharray': '3,3', opacity: '0.5' }));
  host.appendChild(svgText(235, 175, 'log2FC', { 'text-anchor': 'end' }));
  host.appendChild(svgText(136, 15, '-log10(padj)', { 'text-anchor': 'start' }));
  const rng = mulberry32(20260814);
  for (let i = 0; i < 120; i++) {
    const fc = (rng() * 2 - 1) * 3.1;
    const p = Math.pow(10, -(0.4 + Math.abs(fc) * 1.15 + rng() * 1.9));
    const x = Math.max(44, Math.min(216, 130 + fc * 30));
    const y = 170 - Math.min(142, -Math.log10(p) * 11);
    const sig = Math.abs(fc) > 1 && p < 0.05;
    const c = svgEl('circle', { cx: x, cy: y, r: sig ? 2.6 : 1.7, fill: sig ? (fc > 0 ? '#AE3939' : '#207456') : '#9D9D9D', opacity: sig ? '0.95' : '0.5' });
    c.style.animation = 'fadeIn 0.6s ease-out both';
    c.style.animationDelay = (i * 18) + 'ms';
    host.appendChild(c);
  }
  const legend = [[52, '#AE3939', isZh ? '上调' : 'Up'], [112, '#207456', isZh ? '下调' : 'Down'], [176, '#9D9D9D', 'NS']];
  legend.forEach(l => {
    host.appendChild(svgEl('rect', { x: l[0] - 14, y: 178, width: '8', height: '8', rx: '1', fill: l[1] }));
    host.appendChild(svgText(l[0] - 1, 186, l[2], { 'text-anchor': 'start', 'font-size': '7' }));
  });
}
function renderGsea(hostEl) {
  const host = hostEl || document.getElementById('gsea-host'); if (!host) return;
  host.appendChild(svgEl('rect', { width: '260', height: '200', style: 'fill:var(--chart-bg)' }));
  host.appendChild(svgEl('line', { x1: 20, y1: 150, x2: 238, y2: 150, style: 'stroke:var(--text-dim)', 'stroke-width': '0.8', 'stroke-dasharray': '4,3', opacity: '0.5' }));
  host.appendChild(svgEl('rect', { x: 176, y: 38, width: '62', height: '112', style: 'fill:var(--brand-teal);opacity:0.07' }));
  const path = svgEl('path', {
    d: 'M20,150 L40,147 L60,150 L80,139 L100,143 L120,128 L140,134 L160,110 L180,86 L200,72 L220,52 L238,38',
    pathLength: '1', 'stroke-dasharray': '1', 'stroke-dashoffset': '1',
    style: 'stroke:var(--brand-teal)', 'stroke-width': '1.8', fill: 'none',
  });
  path.style.animation = 'drawLine 2.5s ease-out 0.2s forwards';
  host.appendChild(path);
  const dot = svgEl('circle', { cx: 238, cy: 38, r: '3', style: 'fill:var(--brand-teal)' });
  dot.style.animation = 'pulse 1.2s ease-in-out infinite';
  host.appendChild(dot);
  host.appendChild(svgText(52, 26, 'ES 0.68', { 'text-anchor': 'start', style: 'fill:var(--brand-teal)', 'font-size': '10', 'font-weight': '700' }));
  host.appendChild(svgText(130, 178, 'NES 1.92  ·  FDR 0.003', { 'font-size': '7' }));
  host.appendChild(svgText(24, 168, 'rank \u2192', { 'text-anchor': 'start', 'font-size': '6' }));
}
function renderKmer(hostEl) {
  const host = hostEl || document.getElementById('kmer-host'); if (!host) return;  const data = [['AAAAA', 4120], ['TTTTT', 3987], ['GCGCG', 2451], ['ATATA', 1890], ['CGCGC', 1532], ['AATTG', 1204], ['GATCA', 987], ['TTAAG', 876]];
  const base = 160, max = data[0][1];
  host.appendChild(svgEl('line', { x1: 40, y1: base, x2: 240, y2: base, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  [53, 105].forEach(gy => host.appendChild(svgEl('line', { x1: 40, y1: gy, x2: 240, y2: gy, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5', opacity: '0.6' })));
  host.appendChild(svgText(34, 57, '4k', { 'text-anchor': 'end', 'font-size': '7' }));
  host.appendChild(svgText(34, 109, '2k', { 'text-anchor': 'end', 'font-size': '7' }));
  host.appendChild(svgText(34, 164, '0', { 'text-anchor': 'end', 'font-size': '7' }));
  data.forEach((d, i) => {
    const h = Math.round(d[1] / max * 110), x = 42 + i * 24, y = base - h;
    const rect = svgEl('rect', { x, y, width: '16', height: h, rx: '2', style: 'fill:var(--brand-teal);opacity:0.8' });
    rect.appendChild(svgEl('animate', { attributeName: 'height', from: '0', to: h, dur: '0.6s', begin: (0.08 + i * 0.07) + 's', fill: 'freeze' }));
    rect.appendChild(svgEl('animate', { attributeName: 'y', from: base, to: y, dur: '0.6s', begin: (0.08 + i * 0.07) + 's', fill: 'freeze' }));
    host.appendChild(rect);
    host.appendChild(svgText(x + 8, y - 4, (d[1] / 1000).toFixed(1) + 'k', { 'font-size': '6' }));
    host.appendChild(svgText(x + 8, 176, d[0], { 'font-size': '6' }));
  });
}
function renderMotif(hostEl) {
  const host = hostEl || document.getElementById('motif-host'); if (!host) return;
  const cols = [
    { A: 0.55, C: 0.15, G: 0.2, T: 0.1 }, { A: 0.3, C: 0.5, G: 0.1, T: 0.1 },
    { A: 0.1, C: 0.15, G: 0.65, T: 0.1 }, { A: 0.2, C: 0.2, G: 0.15, T: 0.45 },
    { A: 0.7, C: 0.1, G: 0.1, T: 0.1 }, { A: 0.15, C: 0.25, G: 0.5, T: 0.1 },
  ];
  const colors = { A: '#207456', C: '#31679E', G: '#B06818', T: '#AE3939' };
  const base = 170, scale = 110;
  host.appendChild(svgEl('line', { x1: 28, y1: base, x2: 232, y2: base, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgText(24, base - scale / 2 + 3, '0.5', { 'text-anchor': 'end', 'font-size': '7' }));
  host.appendChild(svgText(24, base - scale + 3, '1.0', { 'text-anchor': 'end', 'font-size': '7' }));
  cols.forEach((col, i) => {
    const x = 30 + i * 32, w = 26;
    let yAcc = base;
    Object.keys(col).sort((a, b) => col[b] - col[a]).forEach((nt, k) => {
      const h = Math.round(col[nt] * scale);
      yAcc -= h;
      const rect = svgEl('rect', { x, y: yAcc, width: w, height: Math.max(3, h), fill: colors[nt], opacity: '0.85' });
      rect.style.animation = 'barGrow ' + (0.5 + k * 0.12) + 's ease-out both';
      rect.style.transformBox = 'fill-box';
      rect.style.transformOrigin = 'center bottom';
      rect.style.animationDelay = (i * 0.1) + 's';
      host.appendChild(rect);
      const t = svgText(x + w / 2, yAcc + h / 2 + 2.5, nt, { 'font-size': '9', 'font-weight': '700', style: 'fill:#fff' });
      t.style.animation = 'fadeIn .4s ease-out both';
      t.style.animationDelay = (i * 0.1 + 0.3) + 's';
      host.appendChild(t);
    });
    host.appendChild(svgText(x + w / 2, 184, String(i + 1), { 'font-size': '7' }));
  });
  host.appendChild(svgText(130, 15, 'binding-site motif (JASPAR MA0139.1)', { 'font-size': '7' }));
}
function renderKaKs(hostEl) {
  const host = hostEl || document.getElementById('kaks-host'); if (!host) return;
  const rng = mulberry32(777);
  host.appendChild(svgEl('line', { x1: 40, y1: 150, x2: 240, y2: 150, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgEl('line', { x1: 40, y1: 50, x2: 40, y2: 150, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  // Ka/Ks=1 参考线
  host.appendChild(svgEl('line', { x1: 40, y1: 150, x2: 240, y2: 62, style: 'stroke:var(--text-dim)', 'stroke-width': '0.7', 'stroke-dasharray': '4,3', opacity: '0.5' }));
  host.appendChild(svgText(238, 58, 'Ka/Ks = 1', { 'text-anchor': 'end', 'font-size': '6.5' }));
  host.appendChild(svgText(235, 166, 'Ka (nonsynonymous)', { 'text-anchor': 'end', 'font-size': '7' }));
  host.appendChild(svgText(14, 55, 'Ks', { 'text-anchor': 'middle', 'font-size': '7' }));
  for (let i = 0; i < 42; i++) {
    const ka = rng() * 2.1, ks = rng() * 1.6;
    const x = 40 + ka * 95, y = 150 - ks * 62;
    const ratio = ka / Math.max(ks, 0.02);
    const col = ratio > 1 ? '#AE3939' : (ratio < 0.5 ? '#31679E' : '#9D9D9D');
    const c = svgEl('circle', { cx: x, cy: y, r: ratio > 1 ? 2.6 : 1.9, fill: col, opacity: ratio > 1 ? '0.95' : '0.6' });
    c.style.animation = 'fadeIn .5s ease-out both';
    c.style.animationDelay = (i * 20) + 'ms';
    host.appendChild(c);
  }
  const isZh = currentLang === 'zh';
  host.appendChild(svgEl('rect', { x: 15, y: 172, width: '7', height: '7', rx: '1', fill: '#AE3939' }));
  host.appendChild(svgText(25, 179, isZh ? '正选择 (Ka/Ks>1)' : 'Positive (Ka/Ks>1)', { 'text-anchor': 'start', 'font-size': '7' }));
  host.appendChild(svgEl('rect', { x: 105, y: 172, width: '7', height: '7', rx: '1', fill: '#31679E' }));
  host.appendChild(svgText(115, 179, isZh ? '纯化选择' : 'Purifying', { 'text-anchor': 'start', 'font-size': '7' }));
  host.appendChild(svgEl('rect', { x: 178, y: 172, width: '7', height: '7', rx: '1', fill: '#9D9D9D' }));
  host.appendChild(svgText(188, 179, isZh ? '中性' : 'Neutral', { 'text-anchor': 'start', 'font-size': '7' }));
}

// ===== Simulated Workbench（数据工作台模拟流程） =====
const simFiles = [
  { id:'reads', name:'reads.fastq.gz', icon:'🧬', meta:'Homo sapiens WGS · FASTQ · 356 MB · 2,481,532 reads',
    summary: { format:'FASTQ', read_count:'2,481,532', total_bases:'372,229,800', mean_length:'150 bp', gc_percent:'48.2%', q30_percent:'93.7%' },
    caps:['fastq.qc.v1','fastq.trim.v1','fastq.adapter.v1'] },
  { id:'genome', name:'genome_sim.fa', icon:'🧬', meta:'Escherichia coli K-12 · FASTA · 48 MB · 16,204 sequences',
    summary: { format:'FASTA', sequence_count:'16,204', total_bases:'2,430,600', mean_length:'150 bp', gc_percent:'50.1%', n50:'150 bp' },
    caps:['sequence.stats.v1','sequence.kmer.count.v1','sequence.translate.v1'] },
  { id:'variants', name:'variants_sim.vcf', icon:'🧬', meta:'Homo sapiens chr1 · VCF v4.2 · 9.2 MB · 128,450 variants',
    summary: { format:'VCF', variant_count:'128,450', snp_count:'108,231', indel_count:'20,219', ts_tv_ratio:'1.99', samples:'1' },
    caps:['variant.stats.v1','variant.filter.v1'] },
  { id:'expression', name:'expression_matrix.tsv', icon:'📈', meta:'Arabidopsis thaliana · TSV · 2.1 MB · 18,752 genes × 6 samples',
    summary: { format:'TSV', genes:'18,752', samples:'6', mean_expression:'1,284.6', zero_genes:'412', cv_median:'0.86' },
    caps:['expression.pca.v1','expression.differential.v1','enrichment.kegg.v1'] },
];
let simFile = null, simCap = null;
function renderSimFiles() {
  const grid = document.getElementById('sim-file-grid'); if (!grid) return;
  grid.innerHTML = simFiles.map((f, i) => `
    <div class="sim-file animate-in ${simFile && simFile.id === f.id ? 'selected' : ''}" onclick="selectSimFile(${i})">
      <div class="sf-ico">${f.icon}</div>
      <div class="sf-name">${f.name}</div>
      <div class="sf-meta">${f.meta}</div>
      <div class="sf-check">✓</div>
    </div>`).join('');
}
function selectSimFile(i) {
  const f = simFiles[i]; simFile = f; simCap = null;
  document.querySelectorAll('.sim-file').forEach((el, idx) => el.classList.toggle('selected', idx === i));
  renderSimInspect(f);
  setTimeout(() => switchWorkbenchTab('w-inspect'), 750);
}
function renderSimInspect(f) {
  const host = document.getElementById('sim-inspect'); if (!host) return;
  const rows = Object.entries(f.summary).map(([k, v]) => `
    <div class="stat-card"><div class="stat-value" style="font-size:1rem">${v}</div><div class="stat-label" style="font-family:var(--font-mono);font-size:0.625rem">${k}</div></div>`).join('');
  host.innerHTML = `<div class="card">
      <div class="card-title">✓ ${f.icon} <span style="font-family:var(--font-mono);color:var(--brand-teal)">${f.name}</span></div>
      <div class="stat-row" style="margin-bottom:0">${rows}</div>
    </div>`;
}
const simResults = {
  'fastq.qc.v1': { chart: 'qc', json: `{
  <span style="color:var(--brand-teal)">"read_count"</span>: 2481532,
  <span style="color:var(--brand-teal)">"total_bases"</span>: 372229800,
  <span style="color:var(--brand-teal)">"mean_length"</span>: 150.0,
  <span style="color:var(--brand-teal)">"gc_percent"</span>: 48.2,
  <span style="color:var(--brand-teal)">"q30_percent"</span>: 93.7,
  <span style="color:var(--brand-teal)">"status"</span>: "ok"
}` },
  'fastq.trim.v1': { chart: null, json: `{
  <span style="color:var(--brand-teal)">"reads_in"</span>: 2481532,
  <span style="color:var(--brand-teal)">"reads_out"</span>: 2456717,
  <span style="color:var(--brand-teal)">"trimmed_percent"</span>: 96.1,
  <span style="color:var(--brand-teal)">"mean_trimmed_bases"</span>: 8.4,
  <span style="color:var(--brand-teal)">"quality_threshold"</span>: 20
}` },
  'fastq.adapter.v1': { chart: null, json: `{
  <span style="color:var(--brand-teal)">"reads_scanned"</span>: 2481532,
  <span style="color:var(--brand-teal)">"adapter_found_percent"</span>: 0.4,
  <span style="color:var(--brand-teal)">"adapters_removed"</span>: 9926,
  <span style="color:var(--brand-teal)">"detected_adapters"</span>: ["Illumina TruSeq", "Nextera"],
  <span style="color:var(--brand-teal)">"mean_adapter_bases"</span>: 12.2
}` },
  'sequence.stats.v1': { chart: null, json: `{
  <span style="color:var(--brand-teal)">"sequence_count"</span>: 16204,
  <span style="color:var(--brand-teal)">"total_bases"</span>: 2430600,
  <span style="color:var(--brand-teal)">"mean_length"</span>: 150.0,
  <span style="color:var(--brand-teal)">"n50"</span>: 150,
  <span style="color:var(--brand-teal)">"gc_percent"</span>: 50.1
}` },
  'sequence.kmer.count.v1': { chart: 'kmer', json: `{
  <span style="color:var(--brand-teal)">"k"</span>: 5,
  <span style="color:var(--brand-teal)">"distinct_kmers"</span>: 9312,
  <span style="color:var(--brand-teal)">"total_kmers"</span>: 120000,
  <span style="color:var(--brand-teal)">"top_kmer_count"</span>: 4120
}` },
  'sequence.translate.v1': { chart: null, json: `{
  <span style="color:var(--brand-teal)">"sequences"</span>: 16204,
  <span style="color:var(--brand-teal)">"translated"</span>: 16204,
  <span style="color:var(--brand-teal)">"mean_protein_length"</span>: 49.7,
  <span style="color:var(--brand-teal)">"stop_codon_count"</span>: 0,
  <span style="color:var(--brand-teal)">"table"</span>: "Standard"
}` },
  'variant.stats.v1': { chart: 'pie', json: `{
  <span style="color:var(--brand-teal)">"variant_count"</span>: 128450,
  <span style="color:var(--brand-teal)">"snp_count"</span>: 108231,
  <span style="color:var(--brand-teal)">"indel_count"</span>: 20219,
  <span style="color:var(--brand-teal)">"ts_tv_ratio"</span>: 1.99,
  <span style="color:var(--brand-teal)">"heterozygosity"</span>: 0.0012
}` },
  'variant.filter.v1': { chart: null, json: `{
  <span style="color:var(--brand-teal)">"input_variants"</span>: 128450,
  <span style="color:var(--brand-teal)">"passed"</span>: 119862,
  <span style="color:var(--brand-teal)">"filtered"</span>: 8588,
  <span style="color:var(--brand-teal)">"filters"</span>: {
    <span style="color:var(--brand-teal)">"QUAL >= 30"</span>: 6120,
    <span style="color:var(--brand-teal)">"DP >= 10"</span>: 2110,
    <span style="color:var(--brand-teal)">"AF >= 0.05"</span>: 358
  }
}` },
  'expression.pca.v1': { chart: 'pca', json: `{
  <span style="color:var(--brand-teal)">"variance_explained"</span>: [42.3, 18.7, 9.1],
  <span style="color:var(--brand-teal)">"samples"</span>: 6,
  <span style="color:var(--brand-teal)">"groups"</span>: ["WT", "KO"],
  <span style="color:var(--brand-teal)">"status"</span>: "ok"
}` },
  'expression.differential.v1': { chart: 'volcano', json: `{
  <span style="color:var(--brand-teal)">"comparison"</span>: "KO_vs_WT",
  <span style="color:var(--brand-teal)">"upregulated"</span>: 842,
  <span style="color:var(--brand-teal)">"downregulated"</span>: 691,
  <span style="color:var(--brand-teal)">"significant_padj_005"</span>: 1533,
  <span style="color:var(--brand-teal)">"shrinkage"</span>: "apeglm"
}` },
  'enrichment.kegg.v1': { chart: 'kegg', json: `{
  <span style="color:var(--brand-teal)">"analysis_type"</span>: "kegg",
  <span style="color:var(--brand-teal)">"significant_count"</span>: 23,
  <span style="color:var(--brand-teal)">"top_pathway"</span>: "ko04630 IL-17 signaling",
  <span style="color:var(--brand-teal)">"p_adjusted"</span>: 1.2e-8
}` },
};
function wbNext(tab) { switchWorkbenchTab(tab); }
function wbRestart() {
  simFile = null; simCap = null;
  const grid = document.getElementById('analyze-cap-grid');
  if (grid) grid.innerHTML = '';
  const result = document.getElementById('sim-result');
  if (result) result.innerHTML = '';
  renderSimFiles();
  switchWorkbenchTab('w-import');
}
function runSimAnalysis(cid) {
  simCap = cid;
  const host = document.getElementById('sim-result'); if (!host) return;
  if (!simFile) { switchWorkbenchTab('w-import'); return; }
  switchWorkbenchTab('w-results');
  const isZh = currentLang === 'zh';
  const f = simFile;
  host.innerHTML = `<div class="card">
      <div class="card-title"><span class="env-dot" style="display:inline-block;vertical-align:middle;margin-right:0.5rem"></span>${isZh ? '正在运行' : 'Running'} <span style="font-family:var(--font-mono);color:var(--brand-teal)">${cid}</span></div>
      <div class="runlog-body" id="sim-run-log" style="padding:0.5rem 0"></div>
      <div class="rl-bar"><i id="sim-run-bar"></i></div>
    </div>`;
  const log = document.getElementById('sim-run-log');
  const bar = document.getElementById('sim-run-bar');
  const t0 = Date.now();
  const steps = [
    isZh ? '读取 ' + f.name + '…' : 'Reading ' + f.name + '…',
    isZh ? '调用 ' + cid + ' 分析引擎…' : 'Invoking ' + cid + ' engine…',
    isZh ? '生成结果与图表…' : 'Rendering results & charts…',
  ];
  let i = 0;
  const t = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(t);
      renderSimResult(cid);
      return;
    }
    const prev = log.querySelector('.rl-glyph.run');
    if (prev) { prev.textContent = '\u2713'; prev.classList.remove('run'); prev.classList.add('ok'); }
    const div = document.createElement('div');
    div.innerHTML = '<span class="rl-time">[' + fmtT(t0) + ']</span> <span class="rl-glyph run">●</span> <span class="rl-msg"></span>';
    div.querySelector('.rl-msg').textContent = steps[i];
    log.appendChild(div); log.scrollTop = log.scrollHeight;
    bar.style.width = Math.min(100, Math.round((i + 1) / steps.length * 100)) + '%';
    i++;
  }, 500);
}
function renderSimResult(cid) {
  const host = document.getElementById('sim-result'); if (!host) return;
  const isZh = currentLang === 'zh';
  const r = simResults[cid]; if (!r) return;
  host.innerHTML = `<div class="card">
      <div class="card-title">✓ ${isZh ? '完成' : 'Done'} <span style="font-family:var(--font-mono);color:var(--brand-teal)">${cid}</span></div>
      <div class="demo-result" style="margin-top:0.75rem">
        <div class="chart-box" style="min-height:150px"><svg id="sim-chart-host" viewBox="0 0 260 200" width="100%" style="max-width:300px"></svg></div>
        <pre class="demo-json">${r.json}</pre>
      </div>
    </div>`;
  if (r.chart) renderResultChart(r.chart, document.getElementById('sim-chart-host'));
  host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function renderResultChart(type, host) {
  if (!host) return;
  if (type === 'qc') renderQc(host);
  else if (type === 'kegg') renderKegg(host);
  else if (type === 'volcano') renderVolcano(host);
  else if (type === 'gsea') renderGsea(host);
  else if (type === 'kmer') renderKmer(host);
  else if (type === 'pca') renderPca(host);
  else if (type === 'pie') renderPie(host);
  else if (type === 'motif') renderMotif(host);
  else if (type === 'kaks') renderKaKs(host);
}
function renderPca(host) {
  host.appendChild(svgEl('rect', { width: '260', height: '200', style: 'fill:var(--chart-bg)' }));
  host.appendChild(svgEl('line', { x1: 40, y1: 160, x2: 240, y2: 160, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgEl('line', { x1: 130, y1: 20, x2: 130, y2: 180, style: 'stroke:var(--chart-grid)', 'stroke-width': '0.5' }));
  host.appendChild(svgText(235, 175, 'PC1', { 'text-anchor': 'end' }));
  host.appendChild(svgText(135, 15, 'PC2'));
  const wt = [[90, 100], [80, 110], [85, 90], [75, 95], [70, 105], [95, 108], [82, 82], [88, 78], [68, 100], [100, 95]];
  const ko = [[170, 70], [180, 60], [175, 80], [185, 75], [190, 65], [165, 72], [178, 88], [188, 82], [172, 92], [195, 70]];
  wt.forEach((p, i) => { const c = svgEl('circle', { cx: p[0], cy: p[1], r: '4', fill: '#20B8B0', opacity: '0.8' }); c.style.animation = 'fadeIn .5s ease-out both'; c.style.animationDelay = (i * 0.1) + 's'; host.appendChild(c); });
  ko.forEach((p, i) => { const c = svgEl('circle', { cx: p[0], cy: p[1], r: '4', fill: '#AE3939', opacity: '0.8' }); c.style.animation = 'fadeIn .5s ease-out both'; c.style.animationDelay = (i * 0.1) + 's'; host.appendChild(c); });
  host.appendChild(svgEl('ellipse', { cx: '83', cy: '99', rx: '12', ry: '14', fill: 'none', stroke: '#20B8B0', 'stroke-width': '0.8', opacity: '0.4' }));
  host.appendChild(svgEl('ellipse', { cx: '178', cy: '71', rx: '12', ry: '14', fill: 'none', stroke: '#AE3939', 'stroke-width': '0.8', opacity: '0.4' }));
  const isZh = currentLang === 'zh';
  host.appendChild(svgEl('rect', { x: 50, y: 170, width: '8', height: '8', fill: '#20B8B0', rx: '1' }));
  host.appendChild(svgText(62, 179, isZh ? 'WT 对照' : 'WT', { 'text-anchor': 'start', 'font-size': '8' }));
  host.appendChild(svgEl('rect', { x: 120, y: 170, width: '8', height: '8', fill: '#AE3939', rx: '1' }));
  host.appendChild(svgText(132, 179, isZh ? 'KO 敲除' : 'KO', { 'text-anchor': 'start', 'font-size': '8' }));
}
function solidPie(host, data, cx, cy, r) {
  let start = 0;
  const total = data.reduce((s, d) => s + d[1], 0);
  data.forEach((d, i) => {
    const end = start + (d[1] / total) * 360;
    const sA = (start - 90) * Math.PI / 180;
    const eA = (end - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(sA), y1 = cy + r * Math.sin(sA);
    const x2 = cx + r * Math.cos(eA), y2 = cy + r * Math.sin(eA);
    const large = (end - start) > 180 ? 1 : 0;
    const p = svgEl('path', {
      d: 'M' + cx + ',' + cy + ' L' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x2.toFixed(2) + ',' + y2.toFixed(2) + ' Z',
      fill: d[2], opacity: '0.92',
    });
    p.style.animation = 'fadeIn .4s ease-out both';
    p.style.animationDelay = (i * 0.12) + 's';
    host.appendChild(p);
    start = end;
  });
  host.appendChild(svgEl('circle', { cx, cy, r: r * 0.62, fill: 'var(--chart-bg)' }));
}
function renderPie(hostEl) {
  const host = hostEl || document.getElementById('vpie-host');
  if (!host) return;
  const data = [['SNP', 45, '#20B8B0'], ['INS', 20, '#31679E'], ['DEL', 18, '#AE3939'], ['MNP', 10, '#B06818'], ['Other', 7, '#6B4EA0']];
  solidPie(host, data, 120, 92, 58);
  host.appendChild(svgText(120, 86, '128,450', { 'font-size': '12', 'font-weight': '700', style: 'fill:var(--text)' }));
  host.appendChild(svgText(120, 101, 'variants', { 'font-size': '7' }));
  data.forEach((d, i) => {
    const ly = 158 + i * 8;
    host.appendChild(svgEl('rect', { x: 15, y: ly, width: '7', height: '7', rx: '1', fill: d[2] }));
    host.appendChild(svgText(25, ly + 6, d[0] + ' ' + d[1] + '%', { 'text-anchor': 'start', 'font-size': '7' }));
  });
}

// ===== 图表变体（同一能力的多种可视化） =====
const demoVariants = {
  'phylogeny.tree.visualize.v1': [
    { id: 'rect', zh: '矩形', en: 'Rectangular', clone: true },
    { id: 'radial', zh: '圆形', en: 'Circular', build: 'treeRadial' },
  ],
  'expression.clustered-heatmap.v1': [
    { id: 'clust', zh: '聚类热图', en: 'Clustered', clone: true },
    { id: 'corr', zh: '相关性', en: 'Correlation', build: 'heatCorr' },
  ],
  'comparative.dotplot.v1': [
    { id: 'dot', zh: '点图', en: 'Dotplot', clone: true },
    { id: 'density', zh: '密度视图', en: 'Density', build: 'dotDensity' },
  ],
};
// ===== 系统发育树（二分树 · 真实简化拓扑） =====
// 拓扑：((Xenopus, (Danio, ((Rattus, Mus), (Macaca, (Pongo, (Gorilla, (Pan, Homo))))))))
const SP_TREE = {
  name: 'root',
  children: [
    { name: 'Xenopus laevis' },
    { name: 'Euteleostomi', children: [
      { name: 'Danio rerio' },
      { name: 'Amniota', children: [
        { name: 'Rodentia', children: [
          { name: 'Rattus norvegicus' },
          { name: 'Mus musculus' },
        ] },
        { name: 'Euarchontoglires', children: [
          { name: 'Primates', children: [
            { name: 'Macaca mulatta' },
            { name: 'Hominoidea', children: [
              { name: 'Pongo abelii' },
              { name: 'Hominidae', children: [
                { name: 'Gorilla gorilla' },
                { name: 'Homininae', children: [
                  { name: 'Pan troglodytes' },
                  { name: 'Homo sapiens' },
                ] },
              ] },
            ] },
          ] },
        ] },
      ] },
    ] },
  ],
};
function layoutTree(root, leafStart, leafStep, rootX, xStep) {
  let idx = 0, maxDepth = 0;
  function walk(n, depth) {
    n._depth = depth;
    maxDepth = Math.max(maxDepth, depth);
    if (!n.children || !n.children.length) {
      n._y = leafStart + idx * leafStep;
      n._x = rootX + depth * xStep;
      n._leaf = true;
      idx++;
      return;
    }
    n.children.forEach(c => walk(c, depth + 1));
    n._y = n.children.reduce((s, c) => s + c._y, 0) / n.children.length;
    n._x = rootX + depth * xStep;
  }
  walk(root, 0);
  return maxDepth;
}
function collectLeaves(node, arr) {
  if (node._leaf) { arr.push(node); return; }
  node.children.forEach(c => collectLeaves(c, arr));
}
function renderTreeRect(hostEl) {
  const host = hostEl || document.getElementById('tree-host');
  if (!host) return;
  layoutTree(SP_TREE, 12, 21, 16, 22);
  host.appendChild(svgEl('line', { x1: 6, y1: SP_TREE._y, x2: SP_TREE._x, y2: SP_TREE._y, style: 'stroke:var(--brand-teal)', 'stroke-width': '1.5' }));
  (function draw(n) {
    if (!n.children) return;
    n.children.forEach(c => {
      host.appendChild(svgEl('line', { x1: c._x, y1: c._y, x2: n._x, y2: c._y, style: 'stroke:var(--brand-teal)', 'stroke-width': '1.5' }));
      host.appendChild(svgEl('line', { x1: n._x, y1: c._y, x2: n._x, y2: n._y, style: 'stroke:var(--brand-teal)', 'stroke-width': '1.5' }));
      draw(c);
    });
  })(SP_TREE);
  (function leaf(n) {
    if (n._leaf) {
      host.appendChild(svgEl('circle', { cx: n._x, cy: n._y, r: '2.5', fill: '#20B8B0' }));
      host.appendChild(svgText(n._x + 5, n._y + 3, n.name, { 'text-anchor': 'start', 'font-size': '7.5' }));
      return;
    }
    n.children.forEach(leaf);
  })(SP_TREE);
}
function renderTreeRadial(hostEl) {
  const host = hostEl || document.getElementById('tree-radial-host');
  if (!host) return;
  host.setAttribute('viewBox', '0 0 340 340');
  const cx = 170, cy = 170, rRoot = 18, rStep = 15;
  layoutTree(SP_TREE, 0, 1, 0, 1);
  const leaves = [];
  collectLeaves(SP_TREE, leaves);
  leaves.forEach((lf, i) => { lf._angle = -90 + (i / leaves.length) * 360; });
  (function ang(n) {
    if (n._leaf) return n._angle;
    n.children.forEach(ang);
    n._angle = n.children.reduce((s, c) => s + c._angle, 0) / n.children.length;
    return n._angle;
  })(SP_TREE);
  (function rad(n, r) {
    n._r = r;
    if (n.children) n.children.forEach(c => rad(c, r + rStep));
  })(SP_TREE, rRoot);
  host.appendChild(svgEl('circle', { cx, cy, r: rRoot + 9 * rStep, fill: 'none', style: 'stroke:var(--chart-grid)', 'stroke-width': '0.8', 'stroke-dasharray': '3,3' }));
  (function edges(n) {
    if (n._leaf) return;
    n.children.forEach(c => {
      const x1 = cx + Math.cos(n._angle * Math.PI / 180) * n._r;
      const y1 = cy + Math.sin(n._angle * Math.PI / 180) * n._r;
      const x2 = cx + Math.cos(c._angle * Math.PI / 180) * c._r;
      const y2 = cy + Math.sin(c._angle * Math.PI / 180) * c._r;
      host.appendChild(svgEl('line', { x1, y1, x2, y2, style: 'stroke:var(--brand-teal)', 'stroke-width': '1.4' }));
      edges(c);
    });
  })(SP_TREE);
  leaves.forEach(lf => {
    const x = cx + Math.cos(lf._angle * Math.PI / 180) * lf._r;
    const y = cy + Math.sin(lf._angle * Math.PI / 180) * lf._r;
    host.appendChild(svgEl('circle', { cx: x, cy: y, r: '2.5', fill: '#20B8B0' }));
    const tx = cx + Math.cos(lf._angle * Math.PI / 180) * (lf._r + 8);
    const ty = cy + Math.sin(lf._angle * Math.PI / 180) * (lf._r + 8);
    host.appendChild(svgText(tx, ty + 2.5, lf.name, { 'font-size': '7', 'text-anchor': tx < cx ? 'end' : 'start' }));
  });
  host.appendChild(svgEl('circle', { cx, cy, r: '4', fill: '#20B8B0' }));
}
const variantBuilders = {
  treeRadial: renderTreeRadial,
  heatCorr(host) {
    host.setAttribute('viewBox', '0 0 260 200');
    const n = 6, cell = 26, x0 = 30, y0 = 20;
    const rng = mulberry32(42);
    const m = [];
    for (let i = 0; i < n; i++) { m[i] = []; for (let j = 0; j < n; j++) m[i][j] = 0; }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const v = 0.25 + rng() * 0.7; m[i][j] = v; m[j][i] = v; }
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const c = svgEl('rect', { x: x0 + j * cell, y: y0 + i * cell, width: cell - 2, height: cell - 2, rx: '2', style: 'fill:var(--brand-teal)', opacity: (i === j ? 0.95 : 0.12 + m[i][j] * 0.75).toFixed(2) });
      c.style.animation = 'fadeIn .4s ease-out both';
      c.style.animationDelay = ((i * n + j) * 8) + 'ms';
      host.appendChild(c);
    }
    const labels = ['WT_1', 'WT_2', 'WT_3', 'KO_1', 'KO_2', 'KO_3'];
    labels.forEach((l, i) => {
      host.appendChild(svgText(x0 + i * cell + cell / 2, y0 + n * cell + 12, l, { 'font-size': '6.5' }));
      host.appendChild(svgText(x0 - 4, y0 + i * cell + cell / 2 + 2, l, { 'text-anchor': 'end', 'font-size': '6.5' }));
    });
    host.appendChild(svgText(x0 + n * cell / 2, 12, 'sample correlation (Pearson)', { 'font-size': '7' }));
  },
  dotDensity(host) {
    host.setAttribute('viewBox', '0 0 260 200');
    const rng = mulberry32(2026);
    for (let i = 0; i < 130; i++) {
      const t = rng();
      let x, y;
      if (t < 0.7) { const p = rng(); x = 25 + p * 210; y = 20 + p * 160; }
      else { const p = rng(); x = 25 + p * 210; y = 20 + (1 - p) * 160; }
      const j = (rng() - 0.5) * 14;
      const c = svgEl('circle', { cx: x + j, cy: y + j, r: '1.4', fill: '#20B8B0', opacity: '0.65' });
      c.style.animation = 'fadeIn .5s ease-out both';
      c.style.animationDelay = (i * 6) + 'ms';
      host.appendChild(c);
    }
    host.appendChild(svgText(130, 188, '130k k-mer matches · Homo sapiens vs Mus musculus chr1', { 'font-size': '6.5' }));
  },
};
let demoChartSource = null;
function showDemoVariant(capId, vi) {
  try {
    const box = document.querySelector('#demo-result .chart-box'); if (!box) return;
    document.querySelectorAll('.dv-btn').forEach((b, i) => b.classList.toggle('active', i === vi));
    renderVariantChart(capId, vi, box);
  } catch (e) {
    const box = document.querySelector('#demo-result .chart-box');
    if (box) box.innerHTML = '<div style="padding:1rem;color:var(--accent-red);font-size:0.75rem">⚠ 变体渲染失败</div>';
  }
}
function renderVariantChart(capId, vi, box) {
  try {
    box.innerHTML = '';
    const v = (demoVariants[capId] || [])[vi];
    if (!v) {
      if (demoChartSource) box.appendChild(demoChartSource.cloneNode(true));
      return;
    }
    if (v.clone && demoChartSource) {
      box.appendChild(demoChartSource.cloneNode(true));
    } else if (v.build && variantBuilders[v.build]) {
      const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      host.setAttribute('width', '100%');
      host.setAttribute('style', 'height:auto');
      variantBuilders[v.build](host);
      box.appendChild(host);
    }
  } catch (e) {
    box.innerHTML = '<div style="padding:1rem;color:var(--accent-red);font-size:0.75rem">⚠ 变体渲染失败</div>';
  }
}

// ===== Demo Modal（示例流程播放器） =====
const demoDetails = {
  'comparative.dotplot.v1': { file: 'Homo sapiens chr1 vs Mus musculus chr1', logZh: ['读取参考基因组 chr1 (248 Mb)', '构建 k-mer 索引 (k=25)', '生成点图矩阵 4,096 × 4,096'], logEn: ['Reading reference genome chr1 (248 Mb)', 'Building k-mer index (k=25)', 'Rendering dotplot 4,096 × 4,096'], json: `{
  <span style="color:var(--brand-teal)">"query"</span>: "genomeA.chr1",
  <span style="color:var(--brand-teal)">"reference"</span>: "genomeB.chr1",
  <span style="color:var(--brand-teal)">"k"</span>: 25,
  <span style="color:var(--brand-teal)">"matches"</span>: 1892043,
  <span style="color:var(--brand-teal)">"syntenic_blocks"</span>: 14
}` },
  'phylogeny.tree.visualize.v1': { file: '9 vertebrate species · primates.nwk', logZh: ['解析 Newick 树 (9 taxa)', '计算分支长度', '渲染 SVG 树图'], logEn: ['Parsing Newick tree (9 taxa)', 'Computing branch lengths', 'Rendering SVG tree'], json: `{
  <span style="color:var(--brand-teal)">"taxa"</span>: 9,
  <span style="color:var(--brand-teal)">"format"</span>: "newick",
  <span style="color:var(--brand-teal)">"rooted"</span>: true,
  <span style="color:var(--brand-teal)">"tree_height"</span>: 0.42
}` },
  'expression.clustered-heatmap.v1': { file: 'Homo sapiens · expression_matrix.tsv', logZh: ['读取 18,752 × 6 表达矩阵', 'Z-score 标准化', '层次聚类 + 热图渲染'], logEn: ['Reading 18,752 × 6 matrix', 'Z-score normalization', 'Hierarchical clustering + heatmap'], json: `{
  <span style="color:var(--brand-teal)">"genes"</span>: 18752,
  <span style="color:var(--brand-teal)">"samples"</span>: 6,
  <span style="color:var(--brand-teal)">"distance"</span>: "euclidean",
  <span style="color:var(--brand-teal)">"linkage"</span>: "ward.D2",
  <span style="color:var(--brand-teal)">"clusters"</span>: 4
}` },
  'expression.pca.v1': { file: 'Arabidopsis thaliana · expression_matrix.tsv', logZh: ['读取表达矩阵 (18,752 × 6)', '中心化 + 缩放', 'PCA 计算 PC1 42.3% · PC2 18.7%'], logEn: ['Reading matrix (18,752 × 6)', 'Centering & scaling', 'PCA: PC1 42.3% · PC2 18.7%'], json: `{
  <span style="color:var(--brand-teal)">"variance_explained"</span>: [42.3, 18.7, 9.1],
  <span style="color:var(--brand-teal)">"samples"</span>: 6,
  <span style="color:var(--brand-teal)">"groups"</span>: ["WT", "KO"]
}` },
  'variant.stats.v1': { file: 'Homo sapiens chr1 · variants_sim.vcf', logZh: ['解析 VCF (128,450 位点)', '统计变异类型与转换/颠换', '计算杂合度'], logEn: ['Parsing VCF (128,450 sites)', 'Counting variant types & ts/tv', 'Computing heterozygosity'], json: `{
  <span style="color:var(--brand-teal)">"variant_count"</span>: 128450,
  <span style="color:var(--brand-teal)">"ts_tv_ratio"</span>: 1.99,
  <span style="color:var(--brand-teal)">"heterozygosity"</span>: 0.0012
}` },
  'rna.secondary-structure.v1': { file: 'Homo sapiens · hsa-miR-21-5p', logZh: ['读取 RNA 序列 (92 nt)', 'RNAfold 最小自由能折叠', '输出 MFE 结构 + 能量'], logEn: ['Reading RNA (92 nt)', 'RNAfold MFE folding', 'Output structure + energy'], json: `{
  <span style="color:var(--brand-teal)">"length"</span>: 92,
  <span style="color:var(--brand-teal)">"mfe"</span>: -12.40,
  <span style="color:var(--brand-teal)">"energy_unit"</span>: "kcal/mol",
  <span style="color:var(--brand-teal)">"stems"</span>: 3
}` },
  'fastq.qc.v1': { file: 'Homo sapiens WGS · reads.fastq.gz', logZh: ['解压并读取 FASTQ (2,481,532 reads)', '逐碱基质量统计', '生成 QC 摘要与箱线图'], logEn: ['Reading FASTQ (2,481,532 reads)', 'Per-base quality statistics', 'QC summary + boxplot'], json: `{
  <span style="color:var(--brand-teal)">"read_count"</span>: 2481532,
  <span style="color:var(--brand-teal)">"q30_percent"</span>: 93.7,
  <span style="color:var(--brand-teal)">"gc_percent"</span>: 48.2
}` },
  'enrichment.kegg.v1': { file: 'Homo sapiens · 1,533 DEGs', logZh: ['读取 1,533 个差异基因', 'KEGG 通路注释映射 (142 通路)', '超几何检验 + FDR 校正'], logEn: ['Reading 1,533 DEGs', 'KEGG mapping (142 pathways)', 'Hypergeometric test + FDR'], json: `{
  <span style="color:var(--brand-teal)">"significant_count"</span>: 23,
  <span style="color:var(--brand-teal)">"top_pathway"</span>: "ko04630",
  <span style="color:var(--brand-teal)">"p_adjusted"</span>: 1.2e-8
}` },
  'expression.differential.v1': { file: 'Homo sapiens · KO_vs_WT matrix', logZh: ['构建 DESeq2 计数矩阵', '估算离散度 + apeglm 收缩', '差异检验 842 上调 / 691 下调'], logEn: ['Building DESeq2 count matrix', 'Dispersion + apeglm shrinkage', 'Testing: 842 up / 691 down'], json: `{
  <span style="color:var(--brand-teal)">"upregulated"</span>: 842,
  <span style="color:var(--brand-teal)">"downregulated"</span>: 691,
  <span style="color:var(--brand-teal)">"padj_005"</span>: 1533
}` },
  'enrichment.gsea.v1': { file: 'Homo sapiens · ranked gene list', logZh: ['读取排序基因列表 (18,752)', '随机置换 1,000 次', '计算 ES 0.68 · NES 1.92'], logEn: ['Reading ranked list (18,752)', '1,000 permutations', 'ES 0.68 · NES 1.92'], json: `{
  <span style="color:var(--brand-teal)">"gene_set"</span>: "HALLMARK_OXIDATIVE_PHOS",
  <span style="color:var(--brand-teal)">"es"</span>: 0.68,
  <span style="color:var(--brand-teal)">"nes"</span>: 1.92,
  <span style="color:var(--brand-teal)">"fdr"</span>: 0.003
}` },
  'sequence.kmer.count.v1': { file: 'Escherichia coli K-12 · genome_sim.fa', logZh: ['扫描 16,204 条序列', '统计 5-mer 频数 (9,312 种)', '输出 Top-kmer 图表'], logEn: ['Scanning 16,204 sequences', 'Counting 5-mers (9,312 types)', 'Top k-mer chart'], json: `{
  <span style="color:var(--brand-teal)">"k"</span>: 5,
  <span style="color:var(--brand-teal)">"distinct_kmers"</span>: 9312,
  <span style="color:var(--brand-teal)">"top"</span>: {<span style="color:var(--brand-teal)">"AAAAA"</span>: 4120}
}` },
  'sequence.motif.logo.v1': { file: 'Homo sapiens · TFBS motif (JASPAR MA0139.1)', logZh: ['读取 1,204 条结合位点序列', '构建位置权重矩阵 PWM', '绘制序列 logo'], logEn: ['Reading 1,204 binding-site sequences', 'Building position weight matrix', 'Rendering sequence logo'], json: `{
  <span style="color:var(--brand-teal)">"motif_id"</span>: "MA0139.1",
  <span style="color:var(--brand-teal)">"sites"</span>: 1204,
  <span style="color:var(--brand-teal)">"width"</span>: 6,
  <span style="color:var(--brand-teal)">"consensus"</span>: "AGC[A/G]T"
}` },
  'comparative.kaks.v1': { file: 'Homo sapiens vs Pan troglodytes · orthologs', logZh: ['比对 1,842 个直系同源基因', '计算 Ka / Ks', '标注正选择基因 (14)'], logEn: ['Aligning 1,842 orthologs', 'Computing Ka / Ks', 'Flagging positive selection (14)'], json: `{
  <span style="color:var(--brand-teal)">"ortholog_pairs"</span>: 1842,
  <span style="color:var(--brand-teal)">"positive_selection"</span>: 14,
  <span style="color:var(--brand-teal)">"median_ka_ks"</span>: 0.21,
  <span style="color:var(--brand-teal)">"top_gene"</span>: "FOXP2 (Ka/Ks 1.42)"
}` },
};
function openDemo(el) {
  const capId = el.querySelector('.gallery-item-header span').textContent.trim();
  const d = demoDetails[capId]; if (!d) return;
  const isZh = currentLang === 'zh';
  const modal = document.getElementById('demo-modal');
  const body = document.getElementById('demo-modal-body');
  demoChartSource = el.querySelector('.gallery-item-body svg');
  document.getElementById('demo-modal-title').textContent = capId;
  body.innerHTML = `
    <div class="demo-flow">
      <div class="demo-flow-node done"><span class="df-ico">📄</span><div><div class="df-label">${isZh ? '输入文件' : 'Input'}</div><div style="font-size:0.8rem;font-family:var(--font-mono)">${d.file}</div></div></div>
      <span class="demo-flow-arrow">→</span>
      <div class="demo-flow-node running" id="df-cap"><span class="df-ico">⚙️</span><div><div class="df-label">${isZh ? '分析能力' : 'Capability'}</div><div style="font-size:0.8rem;font-family:var(--font-mono)">${capId}</div></div></div>
      <span class="demo-flow-arrow">→</span>
      <div class="demo-flow-node" id="df-out"><span class="df-ico">📊</span><div><div class="df-label">${isZh ? '输出结果' : 'Output'}</div><div style="font-size:0.8rem">JSON + Chart</div></div></div>
    </div>
    <div class="runlog-body" id="demo-log" style="padding:0.4rem 0;max-height:150px"></div>
    <div class="demo-result" id="demo-result" style="display:none;margin-top:0.75rem">
      <div class="chart-box"></div>
      <pre class="demo-json"></pre>
    </div>`;
  modal.classList.add('open');
  const log = document.getElementById('demo-log');
  const t0 = Date.now();
  const lines = isZh ? d.logZh : d.logEn;
  let i = 0;
  const t = setInterval(() => {
    if (i >= lines.length) {
      clearInterval(t);
      const dfCap = document.getElementById('df-cap');
      dfCap.classList.remove('running'); dfCap.classList.add('done');
      const dfOut = document.getElementById('df-out');
      dfOut.classList.add('running');
      const res = document.getElementById('demo-result');
      const variants = demoVariants[capId] || null;
      res.innerHTML = `
        <div>
          ${variants ? `<div class="demo-variants">${variants.map((v, vi) => `<button class="dv-btn${vi === 0 ? ' active' : ''}" onclick="showDemoVariant('${capId}', ${vi})">${isZh ? v.zh : v.en}</button>`).join('')}</div>` : ''}
          <div class="chart-box"></div>
        </div>
        <pre class="demo-json">${d.json}</pre>`;
      res.style.display = 'grid';
      renderVariantChart(capId, 0, res.querySelector('.chart-box'));
      setTimeout(() => dfOut.classList.remove('running'), 400);
      return;
    }
    const div = document.createElement('div');
    div.innerHTML = '<span class="rl-time">[' + fmtT(t0) + ']</span> <span class="rl-glyph run">●</span> <span class="rl-msg"></span>';
    div.querySelector('.rl-msg').textContent = lines[i];
    log.appendChild(div); log.scrollTop = log.scrollHeight;
    i++;
  }, 520);
}
function closeDemo() { document.getElementById('demo-modal').classList.remove('open'); }

// ===== Report Preview（报告子窗口预览） =====
function closeReport() { document.getElementById('report-modal').classList.remove('open'); }
const rpFigTypes = ['pie', 'qc', 'volcano', 'kegg', 'kmer', 'gsea', 'pca', 'motif'];
const rpFigNames = { pie: 'variant types', qc: 'QC boxplot', volcano: 'volcano', kegg: 'KEGG', kmer: 'k-mer', gsea: 'GSEA', pca: 'PCA', motif: 'motif logo' };
function openReportPreview(type) {
  const modal = document.getElementById('report-modal');
  const body = document.getElementById('report-modal-body');
  const title = document.getElementById('report-modal-title');
  const isZh = currentLang === 'zh';
  const file = { html: 'report.html', pdf: 'report.pdf', json: 'report.json', figures: 'figures/' }[type];
  title.textContent = file;
  const hbStat = '<div class="rp-stats">' +
    '<div class="rp-stat"><b>2,481,532</b><span>' + (isZh ? '读段' : 'reads') + '</span></div>' +
    '<div class="rp-stat"><b>93.7%</b><span>Q30</span></div>' +
    '<div class="rp-stat"><b>48.2%</b><span>GC</span></div>' +
    '<div class="rp-stat"><b>32.4×</b><span>' + (isZh ? '深度' : 'depth') + '</span></div>' +
    '<div class="rp-stat"><b>128,450</b><span>' + (isZh ? '变异位点' : 'variants') + '</span></div></div>';
  const hbTable = '<table><thead><tr><th>' + (isZh ? '变异类型' : 'Type') + '</th><th>' + (isZh ? '数量' : 'Count') + '</th><th>%</th></tr></thead><tbody>' +
    '<tr><td>SNP</td><td>108,231</td><td>45%</td></tr>' +
    '<tr><td>InDel</td><td>20,219</td><td>18%</td></tr>' +
    '<tr><td>ts/tv</td><td colspan="2">1.99</td></tr></tbody></table>';
  const figCap = (n, zh) => '<div style="font-size:0.68rem;color:#5A6570;margin-bottom:0.3rem">' + (isZh ? zh : 'Fig ' + n + ' · ' + rpFigNames[rpFigTypes[n]]) + '</div>';
  const figBox = (id) => '<div class="rp-fig" style="height:170px;padding:0.5rem"><svg id="' + id + '" viewBox="0 0 260 200" width="100%" style="max-width:340px;height:auto;display:block;margin:0 auto"></svg></div>';
  const paper = '--chart-bg:#F7F9FB;--chart-grid:#E2E6EC;--text-dim:#5A6570;--text:#1F1F1F';
  let content = '';
  if (type === 'html') {
    content = `<div class="rp-page" style="${paper}">
      <h3>${isZh ? 'WES 变异分析报告' : 'WES Variant Analysis Report'}</h3>
      <div class="rp-sub">Homo sapiens · GRCh38 · ${isZh ? '样本' : 'sample'} reads.fastq.gz · linxira-bio v0.1.0</div>
      ${hbStat}
      ${figCap(0, '图 1 · 变异类型分布')}
      ${figBox('rp-pie')}
      ${hbTable}
      ${figCap(1, '图 2 · 碱基质量分布')}
      ${figBox('rp-qc')}
      <div class="rp-foot"><span>${isZh ? '生成于' : 'Generated'} 2026-08-14 10:04</span><span>Linxira Bio SDK</span></div>
    </div>`;
  } else if (type === 'pdf') {
    content = `<div class="rp-page" style="max-width:600px;${paper}">
      <h3 style="text-align:center">${isZh ? '全外显子组测序变异分析报告' : 'Whole-Exome Sequencing Variant Report'}</h3>
      <div class="rp-sub" style="text-align:center">${isZh ? '样本' : 'Sample'}: WES-01 · Homo sapiens (GRCh38) · linxira-bio v0.1.0</div>
      <p><b>${isZh ? '摘要' : 'Abstract'}:</b> ${isZh ? '本报告基于 2,481,532 条双端读段，比对率 97.2%，平均深度 32.4×。共检出 128,450 个变异位点（108,231 SNP / 20,219 InDel），ts/tv 1.99。' : '2,481,532 paired-end reads, 97.2% mapped, 32.4× mean depth. 128,450 variants called (108,231 SNPs / 20,219 InDels), ts/tv 1.99.'}</p>
      ${hbStat}
      ${hbTable}
      ${figCap(0, '图 1 · 变异类型分布')}
      ${figBox('rp-pie')}
      <div class="rp-foot"><span>Linxira Bio SDK · AGPL-3.0</span><span>2026-08-14</span></div>
    </div>`;
  } else if (type === 'json') {
    content = `<pre class="demo-json" style="max-height:56vh;font-size:0.7rem">{<span style="color:var(--brand-teal)">"schema_version"</span>: "1",
  <span style="color:var(--brand-teal)">"job_id"</span>: "w20260814-1004-001",
  <span style="color:var(--brand-teal)">"sample"</span>: "WES-01",
  <span style="color:var(--brand-teal)">"reference"</span>: "GRCh38",
  <span style="color:var(--brand-teal)">"qc"</span>: {<span style="color:var(--brand-teal)">"read_count"</span>: 2481532, <span style="color:var(--brand-teal)">"q30"</span>: 93.7, <span style="color:var(--brand-teal)">"gc"</span>: 48.2},
  <span style="color:var(--brand-teal)">"alignment"</span>: {<span style="color:var(--brand-teal)">"mapped_percent"</span>: 97.2, <span style="color:var(--brand-teal)">"mean_depth"</span>: 32.4},
  <span style="color:var(--brand-teal)">"variants"</span>: {
    <span style="color:var(--brand-teal)">"total"</span>: 128450, <span style="color:var(--brand-teal)">"snp"</span>: 108231, <span style="color:var(--brand-teal)">"indel"</span>: 20219,
    <span style="color:var(--brand-teal)">"ts_tv"</span>: 1.99, <span style="color:var(--brand-teal)">"pathogenic"</span>: 3
  },
  <span style="color:var(--brand-teal)">"annotations"</span>: {<span style="color:var(--brand-teal)">"dbSNP_matched"</span>: 121204, <span style="color:var(--brand-teal)">"clinvar_pathogenic"</span>: 3},
  <span style="color:var(--brand-teal)">"status"</span>: "ok"
}</pre>`;
  } else {
    content = `<div style="font-size:0.78rem;color:var(--text-dim);margin-bottom:0.75rem">${isZh ? '点击缩略图查看大图' : 'Click a thumbnail to enlarge'}</div><div class="rp-figs">` +
      rpFigTypes.map((t, i) => `<div class="rp-figcell" onclick="zoomFigure(${i})" style="cursor:pointer" title="${rpFigNames[t]}"><svg id="rp-fig-${i}" viewBox="0 0 260 200" width="100%" height="100%"></svg></div>`).join('') + '</div>';
  }
  body.innerHTML = content;
  modal.classList.add('open');
  if (type === 'html' || type === 'pdf') {
    renderPie(document.getElementById('rp-pie'));
    if (type === 'html') renderQc(document.getElementById('rp-qc'));
  } else if (type === 'figures') {
    rpFigTypes.forEach((t, i) => renderResultChart(t, document.getElementById('rp-fig-' + i)));
  }
}
function zoomFigure(i) {
  const body = document.getElementById('report-modal-body');
  const isZh = currentLang === 'zh';
  const t = rpFigTypes[i];
  body.innerHTML = `<div style="text-align:center">
    <button class="env-check-btn" style="margin-bottom:0.75rem" onclick="openReportPreview('figures')">← ${isZh ? '返回图集' : 'back to figures'}</button>
    <div class="chart-box" style="max-width:520px;margin:0 auto;padding:1rem"><svg id="zoom-host" viewBox="0 0 260 200" width="100%"></svg></div>
    <div style="margin-top:0.6rem;color:var(--text-dim);font-size:0.75rem;font-family:var(--font-mono)">figures/fig${String(i + 1).padStart(2, '0')}.svg · ${rpFigNames[t]}</div>
  </div>`;
  renderResultChart(t, document.getElementById('zoom-host'));
}

// ===== Hemoglobin 模拟（结构查看器） =====
const hbNotes = {
  o2: {
    zh: '氧气结合：O₂ 与血红素 Fe²⁺ 配位结合，血红蛋白由 T 态（脱氧、暗红）转为 R 态（氧合、鲜红），亚基间协同效应使氧亲和力随饱和度升高（氧解离曲线呈 S 形）。',
    en: 'Oxygen binding: O₂ coordinates to heme Fe²⁺, switching hemoglobin from T state (deoxy, dark red) to R state (oxy, bright red). Cooperativity yields a sigmoid oxygen-dissociation curve.',
    badge: { zh: '氧合 · R 态', en: 'Oxygenated · R state' }, alert: false
  },
  co: {
    zh: '一氧化碳结合：CO 同样与 Fe²⁺ 配位结合，但结合后极难解离，形成樱桃红色的碳氧血红蛋白（COHb），使血红蛋白彻底丧失携氧能力。',
    en: 'CO binding: CO coordinates to Fe²⁺ but dissociates very slowly, forming cherry-red carboxyhemoglobin (COHb) that cannot carry oxygen.',
    badge: { zh: '碳氧血红蛋白 COHb', en: 'Carboxyhemoglobin' }, alert: true
  },
  compete: {
    zh: 'CO 竞争结合：CO 对 Fe²⁺ 的亲和力约为 O₂ 的 200 倍。即使血红素已结合 O₂，CO 也会将其置换下来，导致组织供氧下降——吸烟者体内 COHb 可达 5–10%。',
    en: 'CO competition: CO binds Fe²⁺ ~200× tighter than O₂. Even on oxyhemoglobin, CO displaces O₂, starving tissues — smokers can carry 5–10% COHb.',
    badge: { zh: 'CO 置换 O₂ ⚠', en: 'CO displaces O₂ ⚠' }, alert: true
  },
};
let hbCurrent = 'o2';
function hbScene(type) {
  hbCurrent = type;
  document.querySelectorAll('.hb-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('hb-btn-' + type); if (btn) btn.classList.add('active');
  const svg = document.getElementById('hb-scene-svg');
  if (svg) svg.innerHTML = hbSceneSVG(type);
  const note = document.getElementById('hb-note');
  const badge = document.getElementById('hb-state-badge');
  if (note) note.innerHTML = hbNotes[type][currentLang === 'zh' ? 'zh' : 'en'];
  if (badge) { badge.textContent = hbNotes[type].badge[currentLang === 'zh' ? 'zh' : 'en']; badge.classList.toggle('alert', hbNotes[type].alert); }
}
function hbSceneSVG(type) {
  const base = `
  <rect width="420" height="260" style="fill:var(--chart-bg)" rx="10"/>
  <ellipse cx="210" cy="130" rx="118" ry="86" fill="var(--brand-dark)" opacity="0.16"/>
  <ellipse cx="210" cy="130" rx="118" ry="86" fill="none" style="stroke:var(--border)" stroke-width="0.8"/>
  <circle cx="196" cy="130" r="4" fill="#6B4EA0"/><circle cx="224" cy="130" r="4" fill="#6B4EA0"/>
  <circle cx="210" cy="116" r="4" fill="#6B4EA0"/><circle cx="210" cy="144" r="4" fill="#6B4EA0"/>
  <circle cx="210" cy="130" r="9" fill="#B06818" stroke="#8A4F10" stroke-width="1"/>
  <circle cx="210" cy="130" r="3" fill="#F5D9A8"/>
  <line x1="210" y1="139" x2="210" y2="192" stroke="#9D9D9D" stroke-width="1.5"/>
  <circle cx="210" cy="192" r="4" fill="#9D9D9D"/>
  <text x="216" y="196" fill="#9D9D9D" font-size="9">His93 (α)</text>
  <text x="210" y="28" text-anchor="middle" style="fill:var(--text-dim)" font-size="11">Heme b · Fe²⁺ pocket</text>`;
  if (type === 'o2') {
    return base + `
  <g>
    <animateTransform attributeName="transform" type="translate" from="55,40" to="210,105" dur="1.8s" fill="freeze"/>
    <circle cx="-5.5" cy="0" r="7" fill="#E23C3C"/><circle cx="5.5" cy="0" r="7" fill="#F27070"/>
    <text x="0" y="-11" text-anchor="middle" fill="#E23C3C" font-size="11" font-weight="700">O₂</text>
  </g>
  <circle cx="210" cy="130" r="18" fill="none" stroke="#E23C3C" stroke-width="1.5" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0.25;0.8;0" dur="1.1s" begin="1.7s" repeatCount="indefinite"/>
  </circle>
  <text x="210" y="72" text-anchor="middle" fill="#E23C3C" font-size="12" font-weight="700" opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="1.7s" fill="freeze"/>
  </text>${currentLang === 'zh' ? '氧合血红蛋白 · 鲜红色' : 'Oxyhemoglobin · bright red'}`;
  }
  if (type === 'co') {
    return base + `
  <g>
    <animateTransform attributeName="transform" type="translate" from="365,45" to="214,102" dur="1.8s" fill="freeze"/>
    <circle cx="-6" cy="0" r="7" fill="#3A3A3A"/><circle cx="6" cy="0" r="7" fill="#D0D0D0"/>
    <text x="0" y="-11" text-anchor="middle" fill="#8A8A8A" font-size="11" font-weight="700">CO</text>
  </g>
  <circle cx="210" cy="130" r="18" fill="none" stroke="#8A8A8A" stroke-width="1.5" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0.25;0.8;0" dur="1.1s" begin="1.7s" repeatCount="indefinite"/>
  </circle>
  <text x="210" y="72" text-anchor="middle" fill="#D0D0D0" font-size="12" font-weight="700" opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="1.7s" fill="freeze"/>
  </text>${currentLang === 'zh' ? '碳氧血红蛋白 COHb · 樱桃红' : 'Carboxyhemoglobin · cherry red'}`;
  }
  return base + `
  <g>
    <animateTransform attributeName="transform" type="translate" from="210,105" to="340,175" dur="1.1s" begin="1.5s" fill="freeze"/>
    <circle cx="-5.5" cy="0" r="7" fill="#E23C3C"/><circle cx="5.5" cy="0" r="7" fill="#F27070"/>
    <text x="0" y="-11" text-anchor="middle" fill="#E23C3C" font-size="11" font-weight="700">O₂</text>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" from="365,45" to="214,102" dur="1.4s" begin="0.3s" fill="freeze"/>
    <circle cx="-6" cy="0" r="7" fill="#3A3A3A"/><circle cx="6" cy="0" r="7" fill="#D0D0D0"/>
    <text x="0" y="-11" text-anchor="middle" fill="#8A8A8A" font-size="11" font-weight="700">CO</text>
  </g>
  <circle cx="210" cy="130" r="20" fill="none" stroke="#AE3939" stroke-width="1.8" opacity="0">
    <animate attributeName="opacity" values="0;0.9;0.3;0.9;0" dur="0.9s" begin="2.6s" repeatCount="indefinite"/>
  </circle>
  <text x="210" y="60" text-anchor="middle" fill="#AE3939" font-size="12" font-weight="700" opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="2.7s" fill="freeze"/>
  </text>${currentLang === 'zh' ? 'CO 亲和力 ≈ O₂ × 200 · 组织缺氧 ⚠' : 'CO affinity ≈ 200× O₂ · tissue hypoxia ⚠'}`;
}

// ===== Environment re-check（环境重检动画） =====
const envSteps = [
  { zh: '检测操作系统与架构 — Windows 11 · x86_64', en: 'Detecting OS & arch — Windows 11 · x86_64' },
  { zh: '检测 Rust 工具链 — rustc 1.97.1 ✓', en: 'Checking Rust toolchain — rustc 1.97.1 ✓' },
  { zh: '检测 Python — 3.10.11 ✓ (Biopython 1.85 · NumPy 2.2.4)', en: 'Checking Python — 3.10.11 ✓ (Biopython 1.85 · NumPy 2.2.4)' },
  { zh: '检测 R — 4.6.1 ✓ (DESeq2 ≥1.52 · WGCNA)', en: 'Checking R — 4.6.1 ✓ (DESeq2 ≥1.52 · WGCNA)' },
  { zh: '检测 Java — 21.0.10 ✓', en: 'Checking Java — 21.0.10 ✓' },
  { zh: '检测可选工具 — samtools ✗ · docker ✗（回退内置实现）', en: 'Checking optional tools — samtools ✗ · docker ✗ (built-in fallback)' },
];
function recheckEnv() {
  const log = document.getElementById('env-log'); if (!log) return;
  const isZh = currentLang === 'zh';
  document.getElementById('env-state-text').textContent = isZh ? '检测中…' : 'Checking…';
  log.innerHTML = '';
  const t0 = Date.now();
  let i = 0;
  const t = setInterval(() => {
    if (i >= envSteps.length) {
      clearInterval(t);
      document.getElementById('env-state-text').textContent = isZh ? '检测完成' : 'Detection complete';
      const d = document.createElement('div');
      d.innerHTML = '<span class="rl-time">[' + fmtT(t0) + ']</span> <span class="rl-glyph ok">✓</span> <span class="rl-msg" style="color:var(--accent-green)">' + (isZh ? '环境就绪 — 4/4 核心运行时可用' : 'Environment ready — 4/4 core runtimes OK') + '</span>';
      log.appendChild(d);
      return;
    }
    const prev = log.querySelector('.rl-glyph.run');
    if (prev) { prev.textContent = '\u2713'; prev.classList.remove('run'); prev.classList.add('ok'); }
    const div = document.createElement('div');
    div.innerHTML = '<span class="rl-time">[' + fmtT(t0) + ']</span> <span class="rl-glyph run">●</span> <span class="rl-msg"></span>';
    div.querySelector('.rl-msg').textContent = (isZh ? envSteps[i].zh : envSteps[i].en);
    log.appendChild(div); log.scrollTop = log.scrollHeight;
    i++;
  }, 380);
}

// ===== Doc categories（文档分类） =====
const docCats = [
  ['📊', '序列操作', 'Sequence', '9'], ['✅', 'FASTQ 质控', 'FASTQ QC', '6'], ['📐', '比对', 'Alignment', '2'],
  ['📝', '注释', 'Annotation', '4'], ['🧬', '变异', 'Variant', '6'], ['🎯', '区间', 'Interval', '3'],
  ['📈', '表达', 'Expression', '5'], ['🎓', '富集', 'Enrichment', '6'], ['🌳', '系统发育', 'Phylogeny', '3'],
  ['🔬', '结构', 'Structure', '5'], ['🔵', '集合', 'Set', '2'], ['🧪', '蛋白质', 'Protein', '4'],
  ['🔲', '比较基因组', 'Comparative', '3'], ['🧬', 'RNA', 'RNA', '2'],
];
function renderDocCats() {
  const host = document.getElementById('doc-cats'); if (!host) return;
  const isZh = currentLang === 'zh';
  host.innerHTML = docCats.map(c => `
    <a class="doc-cat animate-in" href="https://github.com/Linxira-OS/linxira-bio-sdk/tree/main/docs/capabilities" target="_blank">
      <span class="dc-ico">${c[0]}</span>
      <div><div class="dc-name">${isZh ? c[1] : c[2]}</div><div class="dc-count">${c[3]} ${isZh ? '篇文档' : 'docs'}</div></div>
    </a>`).join('');
}

// ===== AI Assistant（模拟 Agent 对话） =====
let aiBusy = false;
const aiScenarios = [
  {
    q: '帮我检查一下 reads.fastq.gz 的测序质量',
    channel: 'mcp', channelIco: '🤖',
    tool: '{"tool": "linxira-bio", "capability": "fastq.qc.v1",\n "input": {"file": "reads.fastq.gz"}}',
    planZh: '好的，我来分析这份人类全基因组测序数据（Homo sapiens WGS）。计划：通过 MCP 通道调用本地工具 fastq.qc.v1 做质量评估。',
    planEn: 'Sure — analyzing this human WGS dataset (Homo sapiens). Plan: call local tool fastq.qc.v1 via the MCP channel for quality assessment.',
    logZh: ['MCP 连接本地引擎 linxira-bio:fastq.qc.v1', '读取 2,481,532 条读段', '计算碱基质量与 GC 含量'],
    logEn: ['MCP connected to local engine linxira-bio:fastq.qc.v1', 'Reading 2,481,532 reads', 'Computing base quality & GC content'],
    chart: 'qc', json: `{
  <span style="color:var(--brand-teal)">"read_count"</span>: 2481532,
  <span style="color:var(--brand-teal)">"q30_percent"</span>: 93.7,
  <span style="color:var(--brand-teal)">"gc_percent"</span>: 48.2
}`,
    sumZh: '质量很好：Q30 达 93.7%，GC 含量 48.2%，平均长度 150 bp，无接头污染迹象，可直接进入下游比对。',
    sumEn: 'Quality is high: Q30 93.7%, GC 48.2%, mean length 150 bp, no adapter contamination — ready for alignment.',
  },
  {
    q: '比较 WT 和 KO 组的差异表达基因',
    channel: 'sdk', channelIco: '🐍',
    tool: `import linxira_bio as lb

res = lb.expression.differential(
    matrix="expression_matrix.tsv",
    design={"WT": ["WT_1", "WT_2", "WT_3"],
            "KO": ["KO_1", "KO_2", "KO_3"]},
    method="deseq2",
    shrink="apeglm",
)`,
    planZh: '这是拟南芥（Arabidopsis thaliana）的表达矩阵。计划：通过 Python SDK 调用 DESeq2 工作流做差异表达分析，并用 apeglm 收缩效应量。',
    planEn: 'This is an Arabidopsis thaliana expression matrix. Plan: run the DESeq2 workflow via the Python SDK with apeglm shrinkage.',
    logZh: ['SDK 加载 Rust 核心引擎', '构建 DESeq2 计数矩阵 (18,752 × 6)', '离散度估计 + 差异检验'],
    logEn: ['SDK loading Rust core engine', 'Building DESeq2 count matrix (18,752 × 6)', 'Dispersion estimation + differential testing'],
    chart: 'volcano', json: `{
  <span style="color:var(--brand-teal)">"upregulated"</span>: 842,
  <span style="color:var(--brand-teal)">"downregulated"</span>: 691,
  <span style="color:var(--brand-teal)">"padj_005"</span>: 1533
}`,
    sumZh: '共 1,533 个显著差异基因（padj<0.05）：842 个上调、691 个下调。KEGG 富集显示 IL-17 与 NF-κB 信号通路显著富集。',
    sumEn: '1,533 significant DEGs (padj<0.05): 842 up, 691 down. KEGG enrichment highlights IL-17 and NF-κB pathways.',
  },
  {
    q: '统计 variants_sim.vcf 的变异类型分布',
    channel: 'cli', channelIco: '⌨️',
    tool: 'linxira-bio variant stats variants_sim.vcf --json\n\n# output streamed to stdout, JSON machine-readable',
    planZh: '这是人类 1 号染色体（Homo sapiens chr1）的变异文件。计划：通过 CLI 通道调用 variant.stats.v1 统计变异类型与 ts/tv。',
    planEn: 'This is a Homo sapiens chr1 VCF. Plan: call variant.stats.v1 via the CLI channel for type counts and ts/tv.',
    logZh: ['CLI 启动 linxira-bio (Rust 引擎)', '解析 VCF 128,450 位点', '统计变异类型与转换/颠换'],
    logEn: ['CLI starting linxira-bio (Rust engine)', 'Parsing VCF: 128,450 sites', 'Counting variant types & ts/tv'],
    chart: 'pie', json: `{
  <span style="color:var(--brand-teal)">"variant_count"</span>: 128450,
  <span style="color:var(--brand-teal)">"ts_tv_ratio"</span>: 1.99,
  <span style="color:var(--brand-teal)">"heterozygosity"</span>: 0.0012
}`,
    sumZh: '共 128,450 个变异：SNP 占 45%（108,231），ts/tv 比值 1.99，杂合度 0.0012，数据质量良好。',
    sumEn: '128,450 variants total: SNPs 45% (108,231), ts/tv 1.99, heterozygosity 0.0012 — clean dataset.',
  },
];
function playAI(i) {
  if (aiBusy) return;
  const s = aiScenarios[i]; if (!s) return;
  aiBusy = true;
  const chat = document.getElementById('ai-chat'); if (!chat) return;
  const isZh = currentLang === 'zh';
  document.querySelectorAll('.ai-chip').forEach(c => { if (c.onclick && c.onclick.toString().includes('playAI')) c.disabled = true; });
  const T = ms => new Promise(r => setTimeout(r, ms));
  function msg(role, html) { const d = document.createElement('div'); d.className = 'ai-msg ' + role; d.innerHTML = html; chat.appendChild(d); chat.scrollTop = chat.scrollHeight; return d; }
  (async () => {
    msg('user', `<div class="ai-avatar">🧑</div><div class="ai-bubble">${s.q}</div>`);
    await T(650);
    const bot = msg('bot', `<div class="ai-avatar">🤖</div><div class="ai-bubble"><span class="ai-typing"><i></i><i></i><i></i></span></div>`);
    await T(1350);
    const bubble = bot.querySelector('.ai-bubble');
    bubble.innerHTML = (isZh ? s.planZh : s.planEn) + `
      <div class="ai-tool">
        <div class="ai-tool-head"><span>${s.channelIco} linxira-bio · ${isZh ? '工具调用' : 'tool call'}</span><span class="ai-channel ${s.channel}">${s.channel.toUpperCase()}</span></div>
        <pre>${s.tool}</pre>
      </div>
      <div class="runlog-body ai-log" style="padding:0.3rem 0"></div>
      <div class="rl-bar"><i class="ai-bar"></i></div>
      <div class="ai-result" style="display:none"></div>
      <div class="ai-summary" style="display:none"></div>`;
    const log = bubble.querySelector('.ai-log');
    const bar = bubble.querySelector('.ai-bar');
    const t0 = Date.now();
    const lines = isZh ? s.logZh : s.logEn;
    for (let k = 0; k < lines.length; k++) {
      await T(500);
      const prev = log.querySelector('.rl-glyph.run');
      if (prev) { prev.textContent = '\u2713'; prev.classList.remove('run'); prev.classList.add('ok'); }
      const div = document.createElement('div');
      div.innerHTML = '<span class="rl-time">[' + fmtT(t0) + ']</span> <span class="rl-glyph run">●</span> <span class="rl-msg"></span>';
      div.querySelector('.rl-msg').textContent = lines[k];
      log.appendChild(div); log.scrollTop = log.scrollHeight;
      bar.style.width = Math.round((k + 1) / lines.length * 100) + '%';
    }
    await T(450);
    const res = bubble.querySelector('.ai-result');
    res.style.display = 'block';
    res.innerHTML = `<div class="demo-result" style="grid-template-columns:1fr 1fr">
        <div class="chart-box" style="min-height:140px"><svg class="ai-chart-host" viewBox="0 0 260 200" width="100%" style="max-width:300px"></svg></div>
        <pre class="demo-json">${s.json}</pre>
      </div>`;
    if (s.chart) renderResultChart(s.chart, res.querySelector('.ai-chart-host'));
    await T(500);
    const sum = bubble.querySelector('.ai-summary');
    sum.style.display = 'block';
    sum.innerHTML = '<b>' + (isZh ? '结论：' : 'Conclusion: ') + '</b>' + (isZh ? s.sumZh : s.sumEn);
    chat.scrollTop = chat.scrollHeight;
    aiBusy = false;
    document.querySelectorAll('.ai-chip').forEach(c => { if (c.onclick && c.onclick.toString().includes('playAI')) c.disabled = false; });
  })();
}
function clearAI() {
  const chat = document.getElementById('ai-chat'); if (!chat) return;
  chat.innerHTML = '';
}

// ===== Real 3D Structures（3Dmol.js · 本地优先 + 多 CDN 兜底，不阻塞页面） =====
let mdlViewer = null, mdlCur = 'hho', mdlInitDone = false, insTimer = null, mdlLibPromise = null;
function loadMdlLib() {
  if (window.$3Dmol) return Promise.resolve(true);
  if (mdlLibPromise) return mdlLibPromise;
  const urls = [
    '/bio-sdk/lib/3Dmol-min.js',
    'https://cdn.jsdelivr.net/npm/3dmol@2.4.1/build/3Dmol-min.js',
    'https://unpkg.com/3dmol@2.4.1/build/3Dmol-min.js',
    'https://cdn.bootcdn.net/ajax/libs/3Dmol.js/2.4.1/3Dmol-min.js',
    'https://cdn.staticfile.org/3Dmol.js/2.4.1/3Dmol-min.js',
  ];
  mdlLibPromise = new Promise(resolve => {
    let i = 0;
    const tryNext = () => {
      if (i >= urls.length) return resolve(false);
      const s = document.createElement('script');
      s.src = urls[i++];
      s.onload = () => resolve(!!window.$3Dmol);
      s.onerror = () => tryNext();
      s.onabort = () => tryNext();
      document.head.appendChild(s);
    };
    tryNext();
  });
  return mdlLibPromise;
}
function initMdl() {
  const el = document.getElementById('mdl-viewer');
  if (!el) return;
  const isZh = currentLang === 'zh';
  el.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-dim);font-size:0.85rem">⏳ ' + (isZh ? '加载 3D 渲染引擎…' : 'Loading 3D rendering engine…') + '</div>';
  loadMdlLib().then(ok => {
    if (!ok) {
      el.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-dim);font-size:0.85rem">⚠ ' + (isZh ? '3D 引擎加载失败（网络受限），SVG 机制动画不受影响。' : 'Failed to load 3D engine (network restricted); SVG animations unaffected.') + '</div>';
      return;
    }
    renderMdl();
  });
}
function renderMdl() {
  const el = document.getElementById('mdl-viewer');
  const note = document.getElementById('mdl-note');
  if (!el || typeof $3Dmol === 'undefined') return;
  const isZh = currentLang === 'zh';
  clearInterval(insTimer);
  el.innerHTML = '';
  mdlViewer = $3Dmol.createViewer(el, { width: '100%', height: 380, backgroundColor: '#101417' });
  const file = mdlCur === 'hho' ? '1hho.pdb' : '4ins.pdb';
  fetch('/bio-sdk/structures/' + file).then(r => r.text()).then(data => {
    mdlViewer.addModel(data, 'pdb');
    mdlViewer.setStyle({}, { cartoon: { colorscheme: 'chain' } });
    if (mdlCur === 'hho') {
      mdlViewer.setStyle({ hetflag: true }, { stick: { radius: 0.28, color: '#C97A2E' }, sphere: { radius: 0.9, color: '#C97A2E' } });
      note.innerHTML = '<b>1HHO</b> — ' + (isZh ? '人血红蛋白（Homo sapiens）α₂β₂ 四聚体；橙色为 4 个血红素辅基（Fe²⁺），即上方动画中的结合位点。' : 'Human hemoglobin (Homo sapiens) α₂β₂ tetramer; orange = 4 heme groups (Fe²⁺) — the binding sites animated above.');
    } else {
      mdlViewer.setStyle({ resn: 'CYS' }, { stick: { radius: 0.22, color: '#E8C33A' } });
      mdlViewer.setStyle({ chain: ['A', 'C'], resi: '1,2,3,4,5,19,21' }, { sphere: { radius: 0.7, color: '#20B8B0' } });
      mdlViewer.setStyle({ chain: ['B', 'D'], resi: '24,25,26,12,16' }, { sphere: { radius: 0.7, color: '#E23C3C' } });
      note.innerHTML = '<b>4INS</b> — ' + (isZh ? '牛胰岛素（Bos taurus）A/B 双链（晶体含 2 个分子）；黄色 = 3 个二硫键；青色 = A 链 N 端受体结合区，红色 = B 链 C 端 β-折叠结合区。下方结合位点闪烁动画。' : 'Bovine insulin (Bos taurus), 2 molecules in crystal; yellow = 3 disulfide bonds; cyan = A-chain N-terminal receptor-binding region; red = B-chain C-terminal β-strand binding region. Binding sites flash below.');
      mdlViewer.spin('y', 0.6);
      let on = false;
      insTimer = setInterval(() => {
        if (!mdlViewer || mdlCur !== 'ins') { clearInterval(insTimer); return; }
        on = !on;
        mdlViewer.setStyle({ chain: ['A', 'C'], resi: '1,2,3,4,5,19,21' }, { sphere: { radius: 0.7, color: on ? '#4DD4CC' : '#20B8B0' } });
        mdlViewer.setStyle({ chain: ['B', 'D'], resi: '24,25,26,12,16' }, { sphere: { radius: 0.7, color: on ? '#F27070' : '#E23C3C' } });
        mdlViewer.render();
      }, 900);
    }
    mdlViewer.zoomTo();
    if (mdlCur === 'hho') mdlViewer.spin('y', 1.2);
    mdlViewer.render();
    setTimeout(() => { if (mdlViewer) { mdlViewer.resize(); mdlViewer.render(); } }, 80);
  }).catch(() => {
    el.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-dim)">⚠ PDB 文件加载失败</div>';
  });
}
function mdlSwitch(type) {
  mdlCur = type;
  document.querySelectorAll('.mdl-tab').forEach(t => t.classList.toggle('active', t.dataset.mdl === type));
  initMdl();
}

// ===== Gallery 可点击角标 =====
function tagGallery() {
  document.querySelectorAll('.gallery-item').forEach(el => {
    if (el.querySelector('.gi-tag')) return;
    const capId = el.querySelector('.gallery-item-header span').textContent.trim();
    const v = demoVariants[capId];
    const tag = document.createElement('span');
    tag.className = 'gi-tag' + (v ? ' gi-var' : '');
    tag.textContent = (currentLang === 'zh' ? '▶ 查看流程' : '▶ view flow') + (v ? ' · ' + v.length + (currentLang === 'zh' ? ' 变体' : ' variants') : '');
    el.appendChild(tag);
  });
}

// ===== Simulated Run Log（模拟运行日志动画） =====
const runLogSteps = [
  { zh: '启动本地分析运行时 (linxira-bio v0.1.0)', en: 'Starting local analysis runtime (linxira-bio v0.1.0)' },
  { zh: '检测工具链：rustc 1.97.1 · Python 3.10 · R 4.6.1 · Java 21', en: 'Detecting toolchain: rustc 1.97.1 · Python 3.10 · R 4.6.1 · Java 21' },
  { zh: '读取 WES 样本 reads.fastq.gz（Homo sapiens · 2,481,532 条读段）', en: 'Reading WES sample reads.fastq.gz (Homo sapiens · 2,481,532 reads)' },
  { zh: 'fastq.qc.v1 质控完成 — Q30 93.7% · GC 48.2%', en: 'fastq.qc.v1 QC done — Q30 93.7% · GC 48.2%' },
  { zh: 'fastq.adapter.v1 接头去除 — 0.4% 读段含接头', en: 'fastq.adapter.v1 adapter removal — 0.4% reads with adapters' },
  { zh: '比对参考基因组 GRCh38 — 97.2% 比对率 · 32.4× 平均深度', en: 'Aligned to GRCh38 — 97.2% mapped · 32.4× mean depth' },
  { zh: 'variant.stats.v1 变异检测 — 128,450 位点 · ts/tv 1.99', en: 'variant.stats.v1 variants — 128,450 sites · ts/tv 1.99' },
  { zh: '注释 108,231 SNP · 20,219 InDel（dbSNP / ClinVar 比对）', en: 'Annotating 108,231 SNPs · 20,219 InDels (dbSNP / ClinVar)' },
  { zh: 'enrichment.kegg.v1 通路富集 — 23 条显著通路', en: 'enrichment.kegg.v1 — 23 significant pathways' },
  { zh: '生成报告 → report/（PDF · HTML · JSON）', en: 'Writing report → report/ (PDF · HTML · JSON)' },
];
let runTimer = null, runIdx = 0, runT0 = 0;
function fmtT(t0) {
  const s = ((Date.now() - t0) / 1000).toFixed(1);
  return '00:' + (s.length < 4 ? '0' + s : s);
}
// ===== Pipeline 状态联动（日志进度 → 节点高亮） =====
const pipeStageForLog = [0, 0, 0, 1, 2, 3, 4, 5, 5, 6];
function setPipeStage(stage) {
  document.querySelectorAll('.pipe-step').forEach((el, i) => {
    el.classList.remove('running', 'done');
    if (i < stage) el.classList.add('done');
    else if (i === stage) el.classList.add('running');
  });
}
function startRunLog() {
  const out = document.getElementById('runlog-output');
  const bar = document.getElementById('runlog-bar');
  if (!out || !bar) return;
  clearInterval(runTimer);
  runIdx = 0; runT0 = Date.now();
  out.innerHTML = '';
  bar.style.width = '0%';
  setPipeStage(0);
  const isZh = currentLang === 'zh';
  runTimer = setInterval(() => {
    if (runIdx >= runLogSteps.length) {
      clearInterval(runTimer);
      setPipeStage(7);
      return;
    }
    setPipeStage(pipeStageForLog[runIdx]);
    const prev = out.querySelector('.rl-glyph.run');
    if (prev) { prev.textContent = '\u2713'; prev.classList.remove('run'); prev.classList.add('ok'); }
    const div = document.createElement('div');
    div.innerHTML = '<span class="rl-time">[' + fmtT(runT0) + ']</span> <span class="rl-glyph run">\u25CF</span> <span class="rl-msg"></span>';
    div.querySelector('.rl-msg').textContent = isZh ? runLogSteps[runIdx].zh : runLogSteps[runIdx].en;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    bar.style.width = Math.min(100, Math.round((runIdx + 1) / runLogSteps.length * 100)) + '%';
    runIdx++;
  }, 520);
}
function restartRunLog() { startRunLog(); }

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderCapGrid();
  renderQc(); renderKegg(); renderVolcano(); renderGsea(); renderKmer(); renderMotif(); renderKaKs();
  renderTreeRect(); renderPie();
  renderSimFiles();
  renderDocCats();
  tagGallery();
  hbScene('o2');
  startRunLog();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1'; });
  }, {threshold:0.1});
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
