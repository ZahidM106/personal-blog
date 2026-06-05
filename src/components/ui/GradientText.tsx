import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@utils/cn';

interface Props {
  children:  React.ReactNode;
  as?:       'span' | 'h1' | 'h2' | 'h3' | 'p';
  animate?:  boolean;
  className?: string;
}

export default function GradientText({ children, as: Tag = 'span', animate = true, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <Tag
      className={cn(
        'gradient-text',
        animate && !reduce ? 'bg-[length:200%_auto] animate-gradient-shift' : '',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
