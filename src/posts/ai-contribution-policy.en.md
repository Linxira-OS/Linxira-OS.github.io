---
title: "Our AI Contribution Policy: We Encourage AI Code — Disclose Every Model and Agent You Used"
date: 2026-10-07
tag: announcement
lang: en
desc: "Linxira OS is built with AI tools — we encourage AI contributions and require honesty. External contributors must disclose every model and every agent tool actually used. We apply five-tier review depth based on model capability (referencing the Artificial Analysis Intelligence Index), with deliberate adjustments. Organization members with AGENTS.md trust chains are exempt."
---

# Our AI Contribution Policy: We Encourage AI Code — Disclose Every Model and Agent You Used

> 2026-10-07 · Position statement

## Where we start

Linxira OS itself embraces agent tools and AI tooling — this distribution's
build scripts, installer fixes, release pipeline, documentation, and tests
were substantially produced by AI agents. **We encourage AI-assisted code
contributions, and we want you to use the best tools available.**

But "use the best" presupposes that **we know what you used**.

## Why we require disclosure

Code quality varies enormously across models. Only with honest disclosure
of **every model, every agent tool, and the runtime environment** actually
used can we:

1. **Assess the general quality band of the code**
2. **Decide review depth** — line-by-line human review vs. AI-assisted
   verification
3. **Build a trust profile** — repeated high-quality contributions earn
   faster review lanes

## Six rules

### 1. We encourage AI contributions — use them well

Not "tolerate" but "encourage". Use the best models, the best agent tools.
AI is part of this project.

### 2. External contributors: full disclosure required

**Anyone outside the organization** who submits a PR must disclose
**every model and every agent tool actually used** — used two, report two;
switched mid-stream, report that too.

- **All models used**: e.g., GLM-5.1, Claude Opus 4.5, GPT-5.1
- **All agent tools used**: e.g., OMP/zeta-c, Claude Code, Cursor
- **Runtime environment**: what system you developed on

Format example:
```
AI Disclosure:
- Models: GLM-5.1 (max), Claude Sonnet 4.5
- Agents: zeta-c (OMP), Claude Code
- Runtime: Linxira WSL (Arch Linux)
```

### 3. Honesty is the floor

**Report what you actually used.** Faking disclosure is an order of
magnitude worse than using a weak model — false disclosure means instant
PR rejection; repeated offenses mean a ban.

### 4. Five-tier review by model capability

Referencing the [Artificial Analysis Intelligence
Index](https://artificialanalysis.ai), with our deliberate adjustments:

| Tier | Models | Review method |
|---|---|---|
| **S** | Claude Opus 4.5 (max), Claude Sonnet 4.5 (max), Astra GPT-6, Gemini 4, GPT-5.1, Muse Spark 1.3 (max), GLM-5.3 (max) | AI-assisted review + sampled human |
| **A** | **All DeepSeek V4 models** (elevated one tier), Gemini 3 Flash, Gemini 3 Flash (high), Kimi K2.5 (max), Mistral Large 3 | Full AI review + human on critical paths |
| **B** | **Grok 4.7 (middle tier)**, **MiMo-V2.5-Pro (lowered)**, DeepSeek V4 (high), Mistral Large 4 Preview | Full human review |
| **C** | **Step 5 Preview (lowered)**, Luna 27B 27B (high), Qwen 3.8 27B (high), K2.5 32B (medium), MiniMax M3 (medium) | Line-by-line human review |
| **D** (local) | **Only Qwen 3.8 27B accepted** — code from all other locally-deployed small models will not be accepted | Line-by-line human review + additional tests required |

### 5. Organization members: trust-chain exemption

Collaborators who have signed AGENTS.md and are recognized by the
organization are **exempt from per-PR disclosure** — but their AGENTS.md
must declare the agent toolchain in use.

### 6. Tests are the ticket, regardless of pedigree

Whatever model wrote the code: behavior changes ship with tests that can
fail; release-pipeline changes run the full chain locally. Model tier
affects **review method**, not **testing standards**.

## This is not a barrier — it's an accelerator

- **S/A-tier model PRs** → fast lane (AI review + sampled human), merging
  faster
- **Knowing the quality band** → maintainers spend human attention where it
  matters most
- **Empirical data** → "which models work well in which contexts" feeds
  back into our own toolchain choices

---

*Linxira OS project team. Drafted by GLM-5.1 (max), adjudicated and
finalized by humans.*
