import { useEffect, useState } from 'react';
import { cn } from '@utils/cn';

interface Heading {
  depth: number;
  slug:  string;
  text:  string;
}

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [active, setActive] = useState<string>('');

  // Filter to h2 and h3 only
  const toc = headings.filter(h => h.depth === 2 || h.depth === 3);

  useEffect(() => {
    if (toc.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the topmost visible heading
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActive(topmost.target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 },
    );

    toc.forEach(h => {
      const el = document.getElementById(h.slug);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
        On this page
      </p>
      <ul className="space-y-1">
        {toc.map(h => (
          <li key={h.slug} style={{ paddingLeft: h.depth === 3 ? '1rem' : '0' }}>
            <a
              href={`#${h.slug}`}
              className={cn(
                'block text-sm py-1 transition-colors duration-150 leading-snug link-underline',
                active === h.slug
                  ? 'text-neon-cyan font-medium'
                  : 'text-text-muted hover:text-text-secondary',
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
