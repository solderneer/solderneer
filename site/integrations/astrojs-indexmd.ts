import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import fs from "fs/promises";
import cheerio from "cheerio";

// Datatype to represent a link in d3.js
interface Link {
  source: string;
  target: string;
}

// Datatype to represent a node in d3.js
interface Node {
  id: string;
  name: string;
}

// The final exported JSON
interface Index {
  forwardLinks: Record<string, Link[]>; // All the links going out of each node
  backLinks: Record<string, Link[]>; // All the links coming into each node
  links: Link[]; // All the links
  nodes: Record<string, Node>; // All the nodes
}

function findLinksInHTML(source: string, html: string): [Link[], Node] {
  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Find all anchor tags inside markdown blocks
  const links: Link[] = [];

  $(".md-block a").each((_, element) => {
    let link = $(element).attr("href");
    if (link) {
      // Filter out external links
      link = link.replace(/^\/+/, "");
      const regex = /^notes\//;
      if (source === link) {
        // The source and dest are the and and we can skip it
      } else {
        if (regex.test(link)) {
          links.push({
            source: source,
            target: link, // Have to do this weird thing so it's consistently formatted
          });
        }
      }
    }
  });
  return [links, { id: source, name: $("#title").text().trim() }];
}

function groupLinksBySource(list: Link[]): Record<string, Link[]> {
  const groupedElements: Record<string, Link[]> = {};

  for (const item of list) {
    if (groupedElements[item.source]) {
      groupedElements[item.source].push(item);
    } else {
      groupedElements[item.source] = [item];
    }
  }

  return groupedElements;
}

function groupLinksByDestination(list: Link[]): Record<string, Link[]> {
  const groupedElements: Record<string, Link[]> = {};

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
        let linkList: Link[] = [];
        let nodeMap: Record<string, Node> = {};
        const regex = /^notes\//;
        for (const page of pages) {
          // Remove trailing slash in page.pathname
          const source = page.pathname.slice(0, -1);
          if (!regex.test(source)) continue;

          const filePath = fileURLToPath(new URL(source + "/index.html", dir));

          const data = await fs.readFile(filePath, { encoding: "utf-8" });
          const [links, node] = findLinksInHTML(source, data);
          linkList = [...linkList, ...links];
          console.log(node);
          nodeMap[source] = node;
        }

        const index: Index = {
          forwardLinks: groupLinksBySource(linkList),
          backLinks: groupLinksByDestination(linkList),
          links: linkList,
          nodes: nodeMap,
        };

        console.log(index);

        const indexJson = JSON.stringify(index);
        const writePath = fileURLToPath(new URL("mdindex.json", dir));

        try {
          await fs.writeFile(writePath, indexJson, "utf-8");
        } catch (err) {
          console.error("Error writing JSON file:", err);
        }
      },
    },
  };
};

export default createPlugin;
