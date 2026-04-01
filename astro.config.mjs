import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://sagarjethi.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
