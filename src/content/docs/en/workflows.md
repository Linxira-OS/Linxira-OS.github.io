---
title: "Workflow Templates"
section: guide
order: 2
---

<h1>Workstation Profiles</h1>
<p>Linxira catalog v2 is the shared source for profile choices in Welcome, Calamares, and Config Hub, and for Shelly recommendation links. List the profiles available on your installed release with <code>linxira-config workflow help</code>.</p>
<h2>Scientific computing</h2>

```
linxira-config workflow science
```

<p>R, Octave, Gnuplot, ParaView, JupyterLab, NumPy, SciPy, Matplotlib, and pandas.</p>
<h2>Software development</h2>

```
linxira-config workflow developer
```

<p>Build tools, Git, CMake, Code, Rust, Go, Node.js, npm, Python, and pip.</p>
<h2>AI and containers</h2>

```
linxira-config workflow ai
linxira-config workflow containers
```

<p>The AI profile provides JupyterLab, PyTorch, and scikit-learn. Vendor GPU stacks remain an explicit hardware-specific decision. Podman and Distrobox keep fixed projects isolated from the rolling host.</p>
<h2>Bioinformatics</h2>

```
linxira-config workflow bioinformatics
```

<p>This installs Apptainer for reviewed, version-pinned workflow containers. Linxira does not present unreviewed AUR recipes as official bioinformatics packages.</p>
<h2>Deployment boundary</h2>
<p>Linxira targets personal scientific workstations and desktop compute. It is not recommended for large enterprise rolling-server fleets. Use fixed container images or another isolated environment for reproducible server-like development.</p>
