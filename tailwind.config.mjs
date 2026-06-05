import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // ── Color design tokens ──────────────────────────────────────
      colors: {
        base:    '#06080F',   // near-black canvas
        surface: '#0C0E1A',   // slightly elevated
        card:    '#0F1120',   // glass card base
        border: {
          dim: 'rgba(255,255,255,0.07)',
          mid: 'rgba(255,255,255,0.12)',
        },
        neon: {
          cyan:    '#00E5FF',
          violet:  '#7C3AED',
          magenta: '#EC4899',
        },
        text: {
          primary:   '#EEF2FF',
          secondary: '#8892B4',
          muted:     '#4B5680',
        },
      },

      // ── Typography ───────────────────────────────────────────────
      fontFamily: {
        display: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        sans:    ['Inter',         ...defaultTheme.fontFamily.sans],
        mono:    ['JetBrains Mono',...defaultTheme.fontFamily.mono],
      },

      // ── Gradients ────────────────────────────────────────────────
      backgroundImage: {
        'gradient-neon':
          'linear-gradient(135deg, #00E5FF 0%, #7C3AED 50%, #EC4899 100%)',
        'gradient-neon-r':
          'linear-gradient(135deg, #EC4899 0%, #7C3AED 50%, #00E5FF 100%)',
        'gradient-subtle':
          'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(124,58,237,0.08) 50%, rgba(236,72,153,0.08) 100%)',
        'gradient-surface':
          'linear-gradient(180deg, #0C0E1A 0%, #06080F 100%)',
      },

      // ── Animations ───────────────────────────────────────────────
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float':          'float 6s ease-in-out infinite',
        'pulse-glow':     'pulse-glow 2.5s ease-in-out infinite',
        'spin-slow':      'spin-slow 30s linear infinite',
        'fade-up':        'fade-up 0.6s ease forwards',
        'grain':          'grain 0.4s steps(2) infinite',
      },

      keyframes: {
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.5' },
          '50%':     { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'grain': {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%':     { transform: 'translate(-2%,-3%)' },
          '50%':     { transform: 'translate(3%,2%)' },
          '75%':     { transform: 'translate(-1%,4%)' },
        },
      },

      // ── Misc ─────────────────────────────────────────────────────
      boxShadow: {
        'glow-cyan':    '0 0 30px rgba(0,229,255,0.25),  0 0 80px rgba(0,229,255,0.08)',
        'glow-violet':  '0 0 30px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.08)',
        'glow-magenta': '0 0 30px rgba(236,72,153,0.25), 0 0 80px rgba(236,72,153,0.08)',
        'card':         '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
