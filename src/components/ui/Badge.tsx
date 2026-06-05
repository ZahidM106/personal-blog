import { cn } from '@utils/cn';

interface Props {
  label:     string;
  variant?:  'default' | 'cyan' | 'violet' | 'magenta';
  className?: string;
}

const variants = {
  default: 'bg-white/5   border-white/10   text-text-secondary hover:border-white/20',
  cyan:    'bg-neon-cyan/8   border-neon-cyan/20   text-neon-cyan',
  violet:  'bg-neon-violet/8 border-neon-violet/20 text-neon-violet',
  magenta: 'bg-neon-magenta/8 border-neon-magenta/20 text-neon-magenta',
} as const;

export default function Badge({ label, variant = 'default', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-colors duration-200',
        variants[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
