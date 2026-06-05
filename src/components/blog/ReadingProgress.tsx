import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const update = () => {
      const article  = document.querySelector('article');
      const scrolled = window.scrollY;
      const total    = (article?.offsetHeight ?? document.body.scrollHeight) - window.innerHeight;
      setProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
    >
      <div
        className="h-full bg-gradient-neon transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
