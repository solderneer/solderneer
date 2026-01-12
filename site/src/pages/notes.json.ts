import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import tagsJson from "../content/_tags.json";

export const GET: APIRoute = async () => {
  const notes = await getCollection("notes");
  const sortedNotes = notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const totalNotes = sortedNotes.length;
  const notesData = await Promise.all(
    sortedNotes.map(async (note, index) => {
      const { remarkPluginFrontmatter } = await note.render();
      // Format tags as "code name" for display
      const formattedTags = note.data.tags.map((code: string) =>
        `${code} ${tagsJson[code as keyof typeof tagsJson]?.name || ''}`
      );
      return {
        slug: note.slug,
        title: note.data.title,
        pubDate: note.data.pubDate.toISOString(),
        tags: formattedTags,
        wordCount: remarkPluginFrontmatter.wordCount,
        minutesRead: remarkPluginFrontmatter.minutesRead,
        refNum: totalNotes - index,
      };
    })
  );

  return new Response(JSON.stringify(notesData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
