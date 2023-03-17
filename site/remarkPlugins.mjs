import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

export function remarkWordCount() {
  return function (tree, { data }) {
    let textOnPage = toString(tree);
    textOnPage = textOnPage.trim();
    const words = textOnPage.split(/\s+/);
    data.astro.frontmatter.wordCount = words.length;
  };
}
