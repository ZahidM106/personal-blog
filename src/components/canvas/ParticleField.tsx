import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number; alphaDir: number;
  colorIdx: number; // 0=cyan, 1=violet, 2=magenta
}

// Neon RGB values
const COLORS = ['0,229,255', '124,58,237', '236,72,153'] as const;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      const count = Math.max(40, Math.floor((canvas.width * canvas.height) / 14000));
      // Bias: ~65% cyan, 25% violet, 10% magenta
      particles = Array.from({ length: count }, () => ({
        x:        Math.random() * canvas.width,
        y:        Math.random() * canvas.height,
        vx:       (Math.random() - 0.5) * 0.22,
        vy:       (Math.random() - 0.5) * 0.22,
        radius:   Math.random() * 1.6 + 0.4,
        alpha:    Math.random() * 0.5 + 0.15,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        colorIdx: Math.random() < 0.65 ? 0 : Math.random() < 0.75 ? 1 : 2,
      }));
    };

    const MAX_DIST = 110;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines first (behind dots)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${a})`;
            ctx.lineWidth   = 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Twinkle
        p.alpha += 0.004 * p.alphaDir;
        if (p.alpha > 0.75 || p.alpha < 0.08) p.alphaDir *= -1;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Glow corona
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        g.addColorStop(0,   `rgba(${COLORS[p.colorIdx]},${p.alpha})`);
        g.addColorStop(0.5, `rgba(${COLORS[p.colorIdx]},${p.alpha * 0.3})`);
        g.addColorStop(1,   `rgba(${COLORS[p.colorIdx]},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS[p.colorIdx]},${Math.min(p.alpha * 2, 1)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
