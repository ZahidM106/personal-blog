import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site  = (context.site ?? 'https://zahidm106.netlify.app').toString().replace(/\/$/, '');
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const staticPages = [
    { url: '/',          priority: '1.0', changefreq: 'weekly'  },
    { url: '/blog/',     priority: '0.9', changefreq: 'daily'   },
    { url: '/about/',    priority: '0.8', changefreq: 'monthly' },
    { url: '/projects/', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact/',  priority: '0.6', changefreq: 'yearly'  },
  ];

  const postPages = posts
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .map(p => ({
      url:        `/blog/${p.slug}/`,
      priority:   '0.7',
      changefreq: 'monthly',
      lastmod:    (p.data.updatedDate ?? p.data.publishDate).toISOString().split('T')[0],
    }));

  const allPages = [...staticPages, ...postPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(p => `  <url>
    <loc>${site}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${'lastmod' in p ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
  </url>`)
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
