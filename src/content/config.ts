import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const bluesky = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/bluesky" }),
  schema: z.object({
    date: z.string(),
    followersCount: z.number(),
    followsCount: z.number(),
  }),
});

export const collections = {
  bluesky,
};
