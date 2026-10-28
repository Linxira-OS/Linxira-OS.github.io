import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://linxira-os.github.io',
  server: { port: 4321, host: true },
  integrations: [mdx()],
});
