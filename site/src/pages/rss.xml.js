import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const letters = await getCollection("letters");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    items: letters
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()) // Sort latest first
      .slice(0, 20) //Get first 20
      .map((letter) => ({
        title: letter.data.title,
        pubDate: letter.data.pubDate,
        description: letter.data.description,
        content: sanitizeHtml(parser.render(letter.body)),
        link: `/letters/${letter.slug}/`,
      })),
  });
}
