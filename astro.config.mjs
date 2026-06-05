import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://zahidmehmood.dev',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    // sitemap handled by src/pages/sitemap.xml.ts (avoids @astrojs/sitemap 3.7.x regression)
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  vite: {
    ssr: {
      // keep lenis & gsap out of SSR
      noExternal: ['lenis'],
    },
  },
});
