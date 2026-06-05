import { defineCollection, z } from 'astro:content';

// ── Blog posts ────────────────────────────────────────────────────────────────
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags:        z.array(z.string()).default([]),
    cover:       z.string().optional(),
    coverAlt:    z.string().optional(),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
    readingTime: z.number().optional(), // auto-computed if omitted
  }),
});

export const collections = { posts };
