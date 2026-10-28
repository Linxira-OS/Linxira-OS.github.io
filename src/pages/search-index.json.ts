import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const raws = import.meta.glob("../content/docs/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#123;/g, "{")
    .replace(/&#125;/g, "}")
    .replace(/&#x3C;/g, "<")
    .replace(/&#x3E;/g, ">");

const clean = (raw: string): string =>
  raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) return "";
      let l = line.replace(/<[^>]+>/g, " ");
      l = l.replace(/^\s*#{1,6}\s*/, "");
      l = l.replace(/^\s*[-*+]\s+/, "");
      l = l.replace(/^\s*\d+\.\s+/, "");
      l = l.replace(/\*\*([^*]+)\*\*/g, "$1");
      l = l.replace(/`([^`]+)`/g, "$1");
      l = l.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
      l = l.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
      l = decode(l);
      return l.trim().startsWith("←") ? "" : l;
    })
    .join("\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();

const headings = (raw: string): string[] => {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const out: string[] = [];
  for (const m of body.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    out.push(decode(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
  }
  for (const m of body.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    out.push(decode(m[2].replace(/`/g, "")).trim());
  }
  return [...new Set(out.filter(Boolean))];
};

const SECTION_LABELS: Record<string, Record<string, string>> = {
  zh: {
    start: "开始",
    guide: "用户指南",
    apps: "应用与硬件",
    developer: "开发者",
    reference: "参考",
  },
  en: {
    start: "Getting Started",
    guide: "User Guide",
    apps: "Apps & Hardware",
    developer: "Developer",
    reference: "Reference",
  },
};

export const GET: APIRoute = async () => {
  const rawById = new Map<string, string>();
  for (const [p, v] of Object.entries(raws)) {
    const id = p.replace("../content/docs/", "").replace(/\.(md|mdx)$/i, "").replace(/(^|\/)index$/, "");
    rawById.set(id, v);
  }

  const entries = await getCollection("docs");
  const items = entries.map((entry) => {
    const lang = entry.id.split("/")[0];
    const slug =
      entry.id === lang
        ? ""
        : entry.id
            .slice(lang.length + 1)
            .replace(/\.(md|mdx)$/i, "")
            .replace(/(^|\/)index$/, "");
    const raw = rawById.get(entry.id) ?? "";
    const section = entry.data.section ?? "";
    return {
      u: `/${lang}/docs/${slug ? `${slug}/` : ""}`,
      l: lang,
      t: entry.data.title,
      s: SECTION_LABELS[lang]?.[section] ?? section,
      h: headings(raw),
      x: clean(raw).slice(0, 12000),
    };
  });

  return new Response(JSON.stringify(items), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
