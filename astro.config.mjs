import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://linxira-os.github.io',
  server: { port: 4321, host: true },
  integrations: [mdx()],
  markdown: {
    // 代码块要跟着站点主题走：Shiki 同时产出浅色/深色两套 token 颜色
    // （每个 span 上写 --shiki-light/--shiki-dark），由 linxira-components.css
    // 按 html[data-theme] 选用。只配单主题的话，浅色主题下会出现
    // 深色底 + 深色字，代码根本读不出来。
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: false,
    },
  },
});
