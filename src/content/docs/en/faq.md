---
title: "FAQ"
section: reference
order: 1
---

<h1>Frequently Asked Questions</h1>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">What is Linxira OS?</h2>
<div class="answer" style="display:none;">
<p>Linxira OS is an independent desktop distribution built directly on Arch Linux, aiming for a turnkey workstation experience: KDE Plasma desktop, official Arch repositories, a signed first-party repository, and a reviewed software ecosystem. It has no affiliation with Arch Linux.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">Is the current version usable?</h2>
<div class="answer" style="display:none;">
<p>The current image (2026-10-26) ships crash watch with the <code>diagnose-crash</code> skill; desktops are limited to Plasma and COSMIC. Arch is a rolling release, so old images are not retained — get the current build from the <a href="/en/download/" style="color:#20B8B0;">download page</a> and verify its SHA-256.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">How do I install software?</h2>
<div class="answer" style="display:none;">
<p>The system ships with <a href="/en/docs/apps/">Shelly</a>, a graphical package manager; you can also use <code>pacman</code> directly. See the <a href="/en/docs/ecosystem/">Software Ecosystem</a> for 92 curated applications. First-party software installs from the signed <code>[linxira]</code> repository.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">Why is some software not listed?</h2>
<div class="answer" style="display:none;">
<p>The ecosystem passes catalog v3 review with three tiers: license, source, and availability. AUR/Flathub-sourced and proprietary software require explicit review; sensitive categories (e.g. proxy tools) are policy-locked. Items are released automatically once review passes.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">How do I configure mirrors?</h2>
<div class="answer" style="display:none;">
<p>Use <code>linxira-config mirror &lt;ecosystem&gt; auto</code> to auto-pick the fastest mirror (Arch/npm/PyPI/AUR/Go/Flatpak), e.g. <code>linxira-config mirror pip auto</code>.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">How do I access the system remotely?</h2>
<div class="answer" style="display:none;">
<p>Run <code>linxira-config ssh on</code> to enable sshd, then <code>linxira-config ssh key add</code> to authorize keys. Full guide in <a href="/en/docs/remote-access/">Remote Access (SSH)</a>.</p>
</div>

<h2 onclick="this.classList.toggle('open'); this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';">How can I contribute?</h2>
<div class="answer" style="display:none;">
<p>All first-party repositories are open source on <a href="https://github.com/Linxira-OS" target="_blank">GitHub</a>. Everything is rebuildable from source (PKGBUILDs pin commit + sha256); see <a href="/en/docs/building/">Build ISO</a> and <a href="/en/docs/contributing/">Contributing</a>.</p>
</div>
