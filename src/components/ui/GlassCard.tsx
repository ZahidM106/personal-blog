import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@utils/cn';

interface Props {
  children:  React.ReactNode;
  className?: string;
  hover?:    boolean;
  glow?:     'none' | 'cyan' | 'violet' | 'magenta';
  as?:       'div' | 'article' | 'section';
}

const glowClasses = {
  none:    '',
  cyan:    'hover:shadow-glow-cyan',
  violet:  'hover:shadow-glow-violet',
  magenta: 'hover:shadow-glow-magenta',
};

export default function GlassCard({
  children, className, hover = true, glow = 'cyan', as: Tag = 'div',
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={hover && !reduce ? { y: -4, scale: 1.005 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('glass', glowClasses[glow], className)}
    >
      {children}
    </motion.div>
  );
}
