/**
 * 从正文里压出一段适合 <meta name="description"> 的摘要。
 *
 * 文档页的文案都在 Markdown 正文里，手写第二份摘要必然漂移；
 * 这里取正文第一段有意义的文字，剥掉标签/代码块，压到 150 字以内。
 */
export function summarize(source: string | undefined, max = 150, fallback = ''): string {
  if (!source) return fallback;

  const text = source
    // HTML 块（docs 里有大量手写 HTML）
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    // 链接/图片语法留下文字
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // 行内代码与残留标签
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    // Markdown 结构符号
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^[>\-\*\+]\s*/gm, '')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return fallback;
  if (text.length <= max) return text;

  // 尽量切在句末标点或空格处，避免半句
  const slice = text.slice(0, max);
  const cut = Math.max(
    slice.lastIndexOf('。'),
    slice.lastIndexOf('！'),
    slice.lastIndexOf('？'),
    slice.lastIndexOf('. '),
    slice.lastIndexOf('；'),
    slice.lastIndexOf(' ')
  );
  const head = cut > max * 0.55 ? slice.slice(0, cut) : slice;
  return head.replace(/[\s,，.。;；:：]+$/, '') + '…';
}
