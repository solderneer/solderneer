import { defineCollection, z } from "astro:content";
import { hasDuplicate } from "../utils";
import tagsJson from "./_tags.json";

const validTags = new Set<string>(Object.keys(tagsJson));

function validateTags(tags: string[]): boolean {
  // Check if there are any tag duplicates
  if (hasDuplicate(tags)) return false;

  for (const str of tags) {
    if (!validTags.has(str)) {
      return false;
    }
  }

  return true;
}

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emoji: z.string(),
    description: z.string().optional(),
    originalPost: z.string().optional(),
    heroImage: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).refine((tags) => validateTags(tags), {
      message: "Invalid tags",
    }),
  }),
});

export const collections = { notes };
