---
title: "Our AI Contribution Policy: Between Linus's Line and the Desktop Bans"
date: 2026-10-07
tag: announcement
lang: en
desc: "Kernel land accepts AI code (correct style, proven stability); KDE/GNOME/COSMIC explicitly ban AI submissions. Our position: AI is a tool, not an author — humans own responsibility, everything is traceable, tests are the ticket. Five rules, enforcement mechanisms, and full disclosure: this distro is itself built in deep AI collaboration."
---

# Our AI Contribution Policy: Between Linus's Line and the Desktop Bans

> 2026-10-07 · Position statement

## The map of the dispute

**Kernel land (Linus's position)**: doesn't care who — or what — wrote the
code. If the style is right, the stability is proven, and a maintainer can
stomach reading it, AI-generated code carries no original sin. The kernel's
bar has always been "code quality + a maintainer willing to put their name
on it", not "pedigree".

**Desktop communities (KDE / GNOME / COSMIC et al.)**: explicitly ban AI
submissions. The reasoning is understandable — desktop codebases are large
and tightly coupled, UX decisions need human judgment, and floods of
AI-written "looks right" patches drown maintainer review bandwidth and
dilute design consistency.

Both positions are coherent — because they constrain **different things**:
the kernel constrains *code*; the desktops constrain *review bandwidth and
design coherence*.

## Our situation is more particular than either

Linxira doesn't pretend to neutrality: **this distribution is itself a
product of deep AI collaboration** — build scripts, installer fixes, the
release pipeline, documentation, tests — much of the work was done by AI
agents, with humans making directional decisions, adjudicating, and
accepting. If we declared "no AI submissions", we would be lying; if we
declared "AI, submit freely", we would be suicidal.

So our policy answers exactly one question: **where does responsibility
live?**

## Five rules

1. **The human is the author; the AI is a tool.** Every commit's
   author/committer must be a person who can answer for it. AI drafts,
   humans review and commit — the chain of accountability terminates at a
   human.

2. **Traceability over deniability.** Commit messages honestly describe
   *what* and *why*. We do not require declaring "this patch was
   AI-generated" — but claiming "fully hand-written" when it was not is
   **forbidden**. Lying is an order of magnitude worse than using AI.

3. **Tests and verification are the ticket, not decoration.** Whoever (or
   whatever) wrote the code: behavior changes ship with tests that can
   fail; release-pipeline changes run the full chain locally before push.
   The kernel's "proven stable" bar is our bar.

4. **Review bandwidth is a commons.** Mass AI patches must not drown human
   maintainers — one PR, one topic; don't change ten things at once;
   firehose PRs get rejected outright.

5. **Design decisions belong to humans.** UX, architectural direction,
   API shape — humans adjudicate. AI may draft proposals; it may not
   choose for the community.

## Enforcement (not slogans)

| Mechanism | What it does |
|---|---|
| CI gates | Every repo's CI must be green to merge — red means the code isn't finished, whoever wrote it |
| Release-pipeline gates | Version-consistency checks, build verification, signature validation — already in place, still tightening |
| PR conventions | Commit messages explain *why*; single-topic diffs; changes readable by a human in one pass |
| AGENTS.md | Binding rules of conduct for AI agents working in a repo (deployed across our repos) |

## Why not a ban

The core pain behind the desktop bans is review bandwidth drowning in
noise — but that is the result of **missing rules**, not an original sin
of AI. We build the gate on **responsibility and verification**:

- You wrote 2,000 lines with AI? Fine — as long as tests cover it, the
  diff is readable, and you can vouch for every line.
- You hand-wrote 10 lines but broke the release pipeline? Also rejected —
  we judge results, not pedigree.

One sentence: **we ban irresponsible commits, not responsible use of
tools.**

---

*The Linxira OS project team. This post was drafted by AI, adjudicated and
finalized by humans — per rules 1 and 2.*
