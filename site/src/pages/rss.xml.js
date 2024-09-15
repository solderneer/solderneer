import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const notes = await getCollection("notes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    image: "/main-art.jpeg",
    items: notes
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()) // Sort latest first
      .slice(0, 20) //Get first 20
      .map((note) => ({
        title: note.data.title,
        pubDate: note.data.pubDate,
        description: note.data.description,
        content: sanitizeHtml(parser.render(note.body)),
        link: `/notes/${note.slug}/`,
      })),
  });
}
