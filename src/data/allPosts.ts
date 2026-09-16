// 合并后的博客列表：Markdown 直投文章（src/posts/）+ 旧手写文章注册表（data/blog.ts）。
// 消费方（首页「最新动态」、博客列表页）统一调用 getAllPosts()。
// 新增文章：直接在 src/posts/ 放 <slug>.zh.md 与 <slug>.en.md（frontmatter 见现有文件），
// 不要改本文件；data/blog.ts 仅用于 2026-09 之前的手写旧文。
import { blogPosts, type BlogPost } from './blog';

const mdModules = import.meta.glob('../posts/*.md', { eager: true });

type LangText = { title: string; desc: string };

export async function getAllPosts(): Promise<BlogPost[]> {
  const bySlug = new Map<
    string,
    { date?: string; tag?: BlogPost['tag']; zh?: LangText; en?: LangText }
  >();
  for (const [path, mod] of Object.entries(mdModules) as [string, any][]) {
    const fname = path.split('/').pop()!;
    const slug = fname.replace(/\.(zh|en)\.md$/, '');
    const lang = fname.endsWith('.zh.md') ? 'zh' : 'en';
    const e = bySlug.get(slug) ?? {};
    e.date = new Date(mod.frontmatter.date).toISOString().slice(0, 10);
    e.tag = mod.frontmatter.tag ?? 'technical';
    e[lang] = { title: mod.frontmatter.title, desc: mod.frontmatter.desc };
    bySlug.set(slug, e);
  }

  const fromMd: BlogPost[] = [...bySlug.entries()].map(([slug, e]) => ({
    slug,
    date: e.date!,
    tag: e.tag ?? 'technical',
    zh: e.zh ?? e.en!,
    en: e.en ?? e.zh!,
  }));

  // 旧手写文章仍走注册表；若某篇已迁为 md，则注册表条目让位
  const legacy = blogPosts.filter((p) => !bySlug.has(p.slug));

  return [...fromMd, ...legacy].sort((a, b) => b.date.localeCompare(a.date));
}
