import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import indexmd from "./integrations/astrojs-indexmd";

import { SITE_BASEURL } from "./src/consts";

// Remark
import { wikiLinkPlugin } from "remark-wiki-link-plus";
import { remarkReadingTime, remarkWordCount } from "./remarkPlugins.mjs";

const wikiLinkOptions = {
  hrefTemplate: (permalink) => `/notes/${permalink}`,
  pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkWordCount,
      [wikiLinkPlugin, wikiLinkOptions],
    ],
    extendDefaultPlugins: true,
  },
  site: SITE_BASEURL,
  integrations: [mdx(), sitemap(), tailwind(), indexmd()],
});
