import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://solderneer.github.io',
  base: '/solderneer',
  integrations: [mdx(), sitemap(), tailwind()]
});
