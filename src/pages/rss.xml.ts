import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title:       'Zahid Mehmood — Accounting & Finance Blog',
    description: 'Practical articles on UAE & UK taxation, bookkeeping software, and management accounting.',
    site:        context.site ?? 'https://zahidmehmood.dev',
    items:       sorted.map(p => ({
      title:       p.data.title,
      description: p.data.description,
      link:        `/blog/${p.slug}/`,
      pubDate:     p.data.publishDate,
    })),
    customData:  '<language>en-us</language>',
  });
}
