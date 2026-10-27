import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; color: string;
  life: number; maxLife: number;
}

interface ParticleFieldProps {
  className?: string; style?: React.CSSProperties;
  count?: number; theme?: 'accent'|'cool'|'warm'|'mixed';
  sizeRange?: [number, number]; speed?: number;
  interactive?: boolean; connectDistance?: number; blur?: boolean;
}

const THEME_COLORS = {
  accent: ['#FF4A1C','#FF6B3D','#FF8A5C','#E23C12'],
  cool: ['#5B5BF0','#7B7BFF','#9B9BFF','#3A3AC4'],
  warm: ['#FF4A1C','#FF7A52','#FFA87A','#E23C12'],
  mixed: ['#FF4A1C','#5B5BF0','#FF8A5C','#7B7BFF','#FF4A1C','#5B5BF0'],
};

export function ParticleField({
  className, style, count = 60, theme = 'accent',
  sizeRange = [1, 3], speed = 1, interactive = true,
  connectDistance = 140, blur = false,
}: ParticleFieldProps) {
 

const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const colors = THEME_COLORS[theme];

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const initParticles = () => { particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5 * speed, vy: (Math.random() - 0.5) * 0.5 * speed,
      radius: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0, maxLife: Math.random() * 200 + 100,
    })); };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`; ctx.scale(dpr, dpr);
      }
      initParticles();
    };

    resize(); window.addEventListener('resize', resize);

    if (interactive) {
      const handleMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
        mouseRef.current = { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
      };
      canvas.addEventListener('mousemove', handleMove);
      canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -9999, y: -9999 }; });
    }

    const animate = () => {
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr; const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      if (connectDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              const opacity = (1 - dist / connectDistance) * 0.15;
              ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(255, 74, 28, ${opacity})`; ctx.lineWidth = 0.5; ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        if (interactive) {
          const dx = mouseRef.current.x - p.x; const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 0.5;
            p.vx -= (dx / dist) * force; p.vy -= (dy / dist) * force;
          }
        }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.vy *= 0.99;
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;
        p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * width; p.y = Math.random() * height;
          p.vx = (Math.random() - 0.5) * 0.5 * speed; p.vy = (Math.random() - 0.5) * 0.5 * speed;
          p.life = 0; p.maxLife = Math.random() * 200 + 100;
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }
        const pulseOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.life * 0.03));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (blur) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          gradient.addColorStop(0, p.color.replace(')', `, ${pulseOpacity})`).replace('rgb','rgba'));
          gradient.addColorStop(1, p.color.replace(')', ', 0)').replace('rgb','rgba'));
          ctx.fillStyle = gradient; ctx.fill();
        } else {
          ctx.fillStyle = p.color.replace(')', `, ${pulseOpacity})`).replace('rgb','rgba'); ctx.fill();
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener('resize', resize); if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [prefersReduced, count, theme, sizeRange, speed, interactive, connectDistance, blur, colors]);

  if (prefersReduced) return null;

  return (
    <motion.canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className ?? ''}`}
      style={{ zIndex: 0, ...style }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} />
  );
}