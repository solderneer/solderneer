import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const notes = await getCollection("notes");
  const sortedNotes = notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const totalNotes = sortedNotes.length;
  const notesData = await Promise.all(
    sortedNotes.map(async (note, index) => {
      const { remarkPluginFrontmatter } = await note.render();
      return {
        slug: note.slug,
        title: note.data.title,
        pubDate: note.data.pubDate.toISOString(),
        tags: note.data.tags,
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
