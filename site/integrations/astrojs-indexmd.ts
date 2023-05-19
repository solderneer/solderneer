import type { AstroConfig, AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import fs from "fs/promises";
import cheerio from "cheerio";

interface LinkNode {
  source: string;
  target: string;
  name: string;
}

interface LinkIndex {
  forwardLinks: Record<string, LinkNode[]>;
  backLinks: Record<string, LinkNode[]>;
  allLinks: LinkNode[];
}

function findLinksInHTML(source: string, html: string): LinkNode[] {
  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Find all anchor tags inside markdown blocks
  const links: LinkNode[] = [];
  $(".md-block a").each((_, element) => {
    const link = $(element).attr("href");
    const name = $(element).text();
    if (link) {
      // Filter out external links
      const regex = /^\/[^/]+/;
      if (source === link.substring(1) + "/") {
        // The source and dest are the and and we can skip it
      } else {
        if (regex.test(link)) {
          links.push({
            source: source,
            target: link.substring(1) + "/", // Have to do this weird thing so it's consistently formatted
            name: name,
          });
        }
      }
    }
  });
  return links;
}

function groupLinksBySource(list: LinkNode[]): Record<string, LinkNode[]> {
  const groupedElements: Record<string, LinkNode[]> = {};

  for (const item of list) {
    if (groupedElements[item.source]) {
      groupedElements[item.source].push(item);
    } else {
      groupedElements[item.source] = [item];
    }
  }

  return groupedElements;
}

function groupLinksByDestination(list: LinkNode[]): Record<string, LinkNode[]> {
  const groupedElements: Record<string, LinkNode[]> = {};

  for (const item of list) {
    if (groupedElements[item.target]) {
      groupedElements[item.target].push(item);
    } else {
      groupedElements[item.target] = [item];
    }
  }

  return groupedElements;
}

const createPlugin = (): AstroIntegration => {
  return {
    name: "astrojs-mdindex",
    hooks: {
      "astro:build:done": async ({ dir, routes, pages }) => {
        // For each of the pages, find the file and then find the links in the page
        let linkNodes: LinkNode[] = [];
        for (const page of pages) {
          const filePath = fileURLToPath(
            new URL(page.pathname + "index.html", dir)
          );

          console.log(filePath);

          const data = await fs.readFile(filePath, { encoding: "utf-8" });
          const links = findLinksInHTML(page.pathname, data);
          linkNodes = [...linkNodes, ...links];
        }

        const index: LinkIndex = {
          forwardLinks: groupLinksBySource(linkNodes),
          backLinks: groupLinksByDestination(linkNodes),
          allLinks: linkNodes,
        };

        const indexJson = JSON.stringify(index);
        const writePath = fileURLToPath(new URL("mdindex.json", dir));

        try {
          await fs.writeFile(writePath, indexJson, "utf-8");
        } catch (err) {
          console.error("Error writing JSON file:", err);
        }

        console.log(index);
      },
    },
  };
};

export default createPlugin;
