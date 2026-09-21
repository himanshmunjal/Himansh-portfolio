import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  /** Number of particles. */
  count?: number;
  /** drift: bounce around the canvas. fall: move downward and wrap. */
  variant?: 'drift' | 'fall';
  colors?: string[];
  /** [min, max] particle radius in px. */
  size?: [number, number];
  /** Max speed in px/frame. */
  speed?: number;
  /** Draw a soft halo behind each particle. */
  glow?: boolean;
  /** Draw lines between particles closer than this many px (0 = off). */
  linkDistance?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  'rgba(168, 85, 247, 0.6)',
  'rgba(236, 72, 153, 0.6)',
  'rgba(59, 130, 246, 0.6)',
];

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
}

/**
 * Ambient particle background. Sizes itself to its parent, only animates while
 * on screen and the tab is visible, and renders nothing for users who prefer
 * reduced motion. Never touches React state, so it causes no re-renders.
 */
const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  count = 25,
  variant = 'drift',
  colors = DEFAULT_COLORS,
  size = [1, 4],
  speed = 0.4,
  glow = true,
  linkDistance = 0,
  className = 'absolute inset-0 w-full h-full pointer-events-none z-0',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let onScreen = false;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: rand(size[0], size[1]),
      vx: variant === 'drift' ? (Math.random() - 0.5) * speed : 0,
      vy: variant === 'drift' ? (Math.random() - 0.5) * speed : rand(0.2, 0.2 + speed),
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const fixed = getComputedStyle(canvas).position === 'fixed';
      width = canvas.width = fixed ? window.innerWidth : parent.clientWidth;
      height = canvas.height = fixed ? window.innerHeight : parent.clientHeight;
      particles = Array.from({ length: count }, spawn);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (variant === 'drift') {
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }

        if (glow) {
          ctx.globalAlpha = 0.18;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (linkDistance > 0) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < linkDistance) {
              ctx.globalAlpha = 0.15 * (1 - dist / linkDistance);
              ctx.strokeStyle = 'rgb(168, 85, 247)';
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    };

    resize();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    document.addEventListener('visibilitychange', sync);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [count, variant, colors, size, speed, glow, linkDistance]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default React.memo(ParticleCanvas);
