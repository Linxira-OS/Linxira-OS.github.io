---
title: "Drivers"
section: apps
order: 1
---

<a href="/en/docs/" style="color:#20B8B0; text-decoration:none; display:inline-block; margin-bottom:1.5rem;">← Back to docs</a>
<h1>Drivers &amp; Hardware Setup (lhwd)</h1>
<p><code>lhwd</code> (Linxira Hardware Detection) is the hardware detection and driver
configuration tool of Linxira OS. It identifies GPUs, NICs, virtual machines and other
hardware, then installs the best-matching driver profile. It is provided by the
<code>linxira-hwd-detector</code> package, a full port of CHWD 1.23.0.</p>

<h2>Quick setup</h2>
<p>Two equivalent ways:</p>
<ol>
<li><strong>Graphical</strong>: open "Hardware and Drivers" (Linxira Hardware Driver Manager) and click auto-configure.</li>
<li><strong>Terminal</strong>: run <code>sudo lhwd -a</code> to detect all hardware and install matching driver profiles.</li>
</ol>

```
sudo lhwd -a
```


<div class="note">
<strong>Kernel note</strong>: Linxira ships the generic Arch Linux kernels
(<code>linux</code> / <code>linux-lts</code>). No custom kernel builds are performed;
new-hardware support arrives through regular kernel and firmware updates.
</div>

<h2>Command reference</h2>
<table>
<tr><th>Command</th><th>Description</th></tr>
<tr><td><code>lhwd --list</code></td><td>List profiles available for detected hardware</td></tr>
<tr><td><code>lhwd --list-installed</code></td><td>List installed profiles</td></tr>
<tr><td><code>lhwd --list-all</code></td><td>List all profiles</td></tr>
<tr><td><code>lhwd -a</code></td><td>Auto-configure: detect hardware and install the best match</td></tr>
<tr><td><code>lhwd -i &lt;profile&gt;</code></td><td>Install a driver profile</td></tr>
<tr><td><code>lhwd -r &lt;profile&gt;</code></td><td>Remove a driver profile</td></tr>
<tr><td><code>lhwd --check &lt;profile&gt;</code></td><td>Check profile status</td></tr>
</table>
<p>Profile data ships in <code>/var/lib/chwd/db/</code> (graphics, network, handhelds,
USB fingerprint, ...), matching the upstream layout.</p>

<h2>Read-only detection report</h2>
<p>Calling <code>linxira-hwd-detector</code> without arguments emits a versioned JSON
hardware report (PCI / DMI / CPU evidence plus stable profile IDs), consumed by the
Hardware Driver Manager and diagnostics. Zero side effects:</p>

```
linxira-hwd-detector
```


<h2>License</h2>
<p><code>linxira-hwd-detector</code> is a fork of CHWD 1.23.0, licensed
GPL-3.0-only. Upstream provenance, Linxira changes and naming notes are documented
in <code>UPSTREAM.md</code> in the repository.</p>
