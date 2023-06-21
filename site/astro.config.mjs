import { fileURLToPath } from "node:url";
import fs from "fs";
import path from "node:path";

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import indexmd from "./integrations/astrojs-indexmd";

import { SITE_BASEURL } from "./src/consts";

// Remark
import wikiLinkPlugin from "@portaljs/remark-wiki-link";
import { remarkReadingTime, remarkWordCount } from "./remarkPlugins.mjs";
import remarkMath from "remark-math";

// Rehype
import rehypeKatex from "rehype-katex";

// Get all the valid note slugs to generate valid permalinks
// Invalid links have a "new" class attached
const absolutePath = path.resolve("./src/content/notes");
let permalinks = [];

try {
  const files = fs.readdirSync(absolutePath);
  permalinks = files.map((filename) => filename.slice(0, -3));
} catch (error) {
  console.error("Error reading directory:", error);
}

const wikiLinkOptions = {
  hrefTemplate: (permalink) => `/notes/${permalink}`,
  permalinks: permalinks,
  pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkWordCount,
      [wikiLinkPlugin, wikiLinkOptions],
    ],
    rehypePlugins: [rehypeKatex],
    extendDefaultPlugins: true,
  },
  site: SITE_BASEURL,
  integrations: [mdx(), sitemap(), tailwind(), indexmd()],
});
