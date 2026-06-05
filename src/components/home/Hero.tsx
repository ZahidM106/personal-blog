import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ParticleField from '@components/canvas/ParticleField';
import Button from '@components/ui/Button';

// ── Text scramble hook ──────────────────────────────────────────────────────
const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function useTextScramble(text: string, startDelay = 400) {
  const [output, setOutput] = useState('');
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setOutput(text); return; }

    let frame   = 0;
    let rafId:  number;
    let timeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      const progress = frame / (text.length * 3);
      const revealed = Math.floor(frame / 3);
      setOutput(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(''),
      );
      frame++;
      if (revealed < text.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        setOutput(text); // lock final
      }
    };

    timeout = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [text, reduce, startDelay]);

  return output;
}

// ── Stagger variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ── Component ───────────────────────────────────────────────────────────────
export default function Hero() {
  const name     = useTextScramble('ZAHID MEHMOOD', 600);
  const reduce   = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base"
      aria-label="Hero section"
    >
      {/* Particle canvas background */}
      <ParticleField />

      {/* Radial gradient bloom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(124,58,237,0.12) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(0,229,255,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
            Accounting &amp; Finance · Writing to Share
          </span>
        </motion.div>

        {/* Scrambled name */}
        <motion.div variants={itemVariants}>
          <h1
            className="font-display font-bold tracking-tight mb-2"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1.05 }}
            aria-label="Zahid Mehmood"
          >
            <span
              className="gradient-text"
              aria-hidden={name !== 'ZAHID MEHMOOD'}
            >
              {name}
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed text-balance"
        >
          UAE &amp; UK tax compliance, bookkeeping software, and management accounting —
          written from{' '}
          <span className="text-text-primary font-medium">two years of real client work</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/blog" variant="primary" size="lg">
            Read the Blog
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
          <Button href="/about" variant="outline" size="lg">
            About Me
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { label: 'CGPA (BS)',        value: '3.80' },
            { label: 'CIMA Exemptions',  value: '15'   },
            { label: 'Years Experience', value: '2+'   },
            { label: 'Jurisdictions',    value: '3'    },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-display font-bold text-3xl gradient-text mb-1">{value}</div>
              <div className="text-xs text-text-muted uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-neon-cyan/40 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
