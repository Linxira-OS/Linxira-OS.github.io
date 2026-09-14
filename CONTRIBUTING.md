# Contributing to the Linxira website

[中文版 / Chinese version](./CONTRIBUTING.zh-CN.md)

This repository is the **single website for the whole Linxira organization**: the main site, the blog, and every product sub-site (`/bio-sdk/`, `/zeta/`). The full structural rules live in [AGENTS.md](./AGENTS.md) — read it before changing anything. This file is the short version of what we expect from a contribution.

## What belongs here

- Articles of any kind — announcements, technical posts, benchmark reports, design notes, series — go to the **blog in this repo**, no matter which product they are about.
- Product landing pages, feature pages and demos go to `src/sites/<product>/`.
- Product **code** never lives here; it stays in the product's own repository, which must remain clean for people who fork or clone it.

## Ground rules

1. **Both languages, always.** Every page and every post ships in Chinese (`zh`) and English (`en`) together. Half-translated contributions are not merged.
2. **Build must pass.** Run `npx astro build` before committing. Nothing that fails the build is merged.
3. **One concern per commit.** Use `<type>(<scope>): <summary>` with `type ∈ feat | fix | docs | refactor | chore` (for example `feat(blog): …`, `refactor(site): …`).
4. **No build artifacts or large binaries.** `dist/`, `node_modules/`, `.astro/` are ignored; do not force-add them or add ISO / package binaries.
5. **Navigation has one source.** Edit `src/components/Navbar.astro` (`navItems` / `products`); never paste a `<nav>` into a page.
6. **Link products by their canonical entry** (`/bio-sdk/`, `/zeta/`), never by a language-specific path.

## Adding a blog post (the most common contribution)

1. Prepend an entry to `src/data/blog.ts` (`slug`, `date`, `tag`, `zh {title, desc}`, `en {title, desc}`).
2. Create `src/pages/zh/blog/<slug>/index.astro`.
3. Create `src/pages/en/blog/<slug>/index.astro`.
4. Copy the structure and `<style>` block of an existing post; escape `<`/`>` inside code blocks as `&lt;`/`&gt;`; avoid bare `{ }` in prose.
5. `npx astro build`, then check both `dist/zh/blog/<slug>/index.html` and `dist/en/blog/<slug>/index.html` exist.

## Working on a product sub-site

- Code lives in `src/sites/<product>/`; routes in `src/pages/<product>/{index, zh/index, en/index}.astro`.
- The sub-site home page must be a proper product landing page (value proposition → trust points → capabilities → call to action). Demos and workbenches are secondary entries.
- Long-form content is written as a blog post and linked from the sub-site, not embedded in it.

## Local development

```bash
npm ci
npm run dev        # http://localhost:4321
npx astro build    # production build → dist/
```

Deployment is automatic: pushing to `master` triggers `.github/workflows/deploy.yml`.

## Licensing of contributions

Blog articles are published under **CC BY 4.0** unless a post states otherwise; by contributing an article you agree to that. Site code follows the repository license.

## AI agents

If you are an AI agent, treat [AGENTS.md](./AGENTS.md) as binding. In particular: never split the site into separate Pages sites or subdomains, never move website files into product repositories, and never skip the build check.
