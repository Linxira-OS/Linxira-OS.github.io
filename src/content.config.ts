import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 文档内容集合 —— /docs/ 的全部页面来源。
 * 文件路径即路由：src/content/docs/<lang>/<slug>.md(x) -> /<lang>/docs/<slug>/
 * 索引页用 <lang>/index.md(x) -> /<lang>/docs/
 *
 * section 决定侧栏分组与顺序；order 决定组内顺序（小在前）。
 */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.enum(['start', 'guide', 'apps', 'developer', 'reference']),
    order: z.number().default(0),
  }),
});

export const collections = { docs };
