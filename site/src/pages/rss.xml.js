import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

// Strip MDX-specific syntax that markdown-it can't handle
function cleanMdxContent(content) {
  return content
    // Remove import statements
    .replace(/^import\s+.*?;?\s*$/gm, '')
    // Remove self-closing JSX components: <Component ... />
    .replace(/<[A-Z][A-Za-z]*\s+[^>]*\/>/g, '')
    // Remove JSX components with children: <Component ...>...</Component>
    .replace(/<([A-Z][A-Za-z]*)[^>]*>[\s\S]*?<\/\1>/g, '')
    // Remove any remaining self-closing JSX tags without attributes
    .replace(/<[A-Z][A-Za-z]*\s*\/>/g, '')
    // Remove wiki-links [[note-slug]] or [[note-slug|display text]]
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, slug, text) => text || slug.replace(/-/g, ' '))
    // Clean up excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET(context) {
  const notes = await getCollection("notes");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    image: "/pfp-min.png",
    items: notes
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()) // Sort latest first
      .slice(0, 20) //Get first 20
      .map((note) => ({
        title: note.data.title,
        pubDate: note.data.pubDate,
        description: note.data.description,
        content: sanitizeHtml(parser.render(cleanMdxContent(note.body))),
        link: `/notes/${note.slug}/`,
      })),
  });
}
