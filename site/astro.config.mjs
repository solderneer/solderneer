import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { remarkReadingTime, remarkWordCount } from "./remarkPlugins.mjs";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkWordCount],
    extendDefaultPlugins: true,
  },
  site: "https://solderneer.me",
  integrations: [mdx(), sitemap(), tailwind()],
});
