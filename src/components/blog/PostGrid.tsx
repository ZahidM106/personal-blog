import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GlassCard from '@components/ui/GlassCard';
import Badge from '@components/ui/Badge';
import { formatDate } from '@utils/formatDate';

interface Post {
  slug:        string;
  title:       string;
  description: string;
  publishDate: string;   // ISO string (serialised from Date)
  tags:        string[];
  readingTime: number;
  featured:    boolean;
}

interface Props {
  posts: Post[];
}

// Deterministic gradient per post based on first char
const GRADS = [
  'from-neon-cyan/15 to-neon-violet/15',
  'from-neon-violet/15 to-neon-magenta/15',
  'from-neon-magenta/15 to-neon-cyan/15',
];

export default function PostGrid({ posts }: Props) {
  const [query,  setQuery]  = useState('');
  const [active, setActive] = useState<string>('All');
  const reduce = useReducedMotion();

  // Collect all unique tags
  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(posts.flatMap(p => p.tags))).sort()],
    [posts],
  );

  // Filter
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter(p => {
      const matchTag   = active === 'All' || p.tags.includes(active);
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [posts, query, active]);

  return (
    <div>
      {/* ── Search + filter bar ────────────────────────────────────────── */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="search"
            placeholder="Search posts…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-neon-cyan/40 focus:bg-neon-cyan/5 transition-colors"
            aria-label="Search blog posts"
          />
        </div>
      </div>

      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by tag">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`tag-pill cursor-pointer transition-all ${
              active === tag
                ? 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10'
                : ''
            }`}
            aria-pressed={active === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-text-muted mb-8" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        {active !== 'All' ? ` tagged "${active}"` : ''}
        {query ? ` matching "${query}"` : ''}
      </p>

      {/* ── Post grid ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((post, i) => {
            const grad = GRADS[post.title.charCodeAt(0) % GRADS.length];
            return (
              <motion.div
                key={post.slug}
                layout
                initial={reduce ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <GlassCard className="h-full flex flex-col overflow-hidden group" glow="cyan">
                  {/* Colour strip */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${grad} flex-shrink-0`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map(t => <Badge key={t} label={t} />)}
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-semibold text-lg text-text-primary leading-snug mb-3 group-hover:text-neon-cyan transition-colors line-clamp-2">
                      <a href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded">
                        {post.title}
                      </a>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.07] text-xs text-text-muted">
                      <time dateTime={post.publishDate}>
                        {formatDate(new Date(post.publishDate))}
                      </time>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-text-muted py-16"
        >
          No posts found. Try a different search or tag.
        </motion.p>
      )}
    </div>
  );
}
