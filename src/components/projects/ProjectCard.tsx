import { motion, useReducedMotion } from 'framer-motion';
import Badge from '@components/ui/Badge';
import type { Project } from '@data/projects';

interface Props {
  project: Project;
  index:   number;
}

export default function ProjectCard({ project, index }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="glass flex flex-col gap-4 p-6 h-full group"
    >
      {/* Icon + title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-3xl flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
            aria-hidden="true"
          >
            {project.icon}
          </span>
          <div>
            <h3
              className="font-display font-semibold text-lg text-text-primary leading-snug group-hover:transition-colors"
              style={{ '--hover-color': project.accent } as React.CSSProperties}
            >
              {project.title}
            </h3>
            {project.wip && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-neon-magenta/70">
                In progress
              </span>
            )}
          </div>
        </div>

        {/* External links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(t => <Badge key={t} label={t} />)}
      </div>

      {/* Accent bottom bar */}
      <div
        className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
