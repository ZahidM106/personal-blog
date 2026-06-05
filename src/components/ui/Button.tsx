import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@utils/cn';

interface Props {
  children:  React.ReactNode;
  href?:     string;
  variant?:  'primary' | 'outline' | 'ghost';
  size?:     'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  onClick?:  () => void;
}

const variants = {
  primary: 'bg-gradient-neon text-white shadow-glow-cyan hover:shadow-[0_0_40px_rgba(0,229,255,0.35)]',
  outline: 'border border-white/20 text-text-primary hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/5',
  ghost:   'text-text-secondary hover:text-text-primary hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children, href, variant = 'primary', size = 'md', className, external, onClick,
}: Props) {
  const ref          = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const shouldReduce = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x    = (e.clientX - rect.left - rect.width  / 2) * 0.28;
    const y    = (e.clientY - rect.top  - rect.height / 2) * 0.28;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const baseClass = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
    'transition-all duration-200 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-base',
    variants[variant],
    sizes[size],
    className,
  );

  const motionProps = {
    ref,
    animate:    shouldReduce ? undefined : { x: pos.x, y: pos.y },
    transition: { type: 'spring', stiffness: 350, damping: 25 },
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    whileTap:   shouldReduce ? undefined : { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a
        {...(motionProps as any)}
        href={href}
        className={baseClass}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...(motionProps as any)}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </motion.button>
  );
}
