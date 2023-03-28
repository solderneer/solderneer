import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("posts");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/posts/${post.slug}/`,
    })),
  });
}
