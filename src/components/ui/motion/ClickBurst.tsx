import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { EnergyBurst } from './EnergyBurst';

interface BurstParticle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; color: string;
  life: number; maxLife: number;
}

interface ClickBurstProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'accent' | 'cool' | 'white';
  maxRadius?: number;
  rings?: number;
  particleCount?: number;
  disabled?: boolean;
}

const BURST_COLORS = {
  accent: ['#FF4A1C', '#FF6B3D', '#FF8A5C', '#E23C12'],
  cool: ['#5B5BF0', '#7B7BFF', '#9B9BFF', '#3A3AC4'],
  white: ['#FFFFFF', '#F5F3EF', '#E4E1DA', '#C9C7C3'],
};

/**
 * Wraps an element so clicking it fires an EnergyBurst at the click point and
 * spawns a localized particle explosion. Inert under reduced motion.
 */
export function ClickBurst({
  children,
  className,
  theme = 'accent',
  maxRadius = 260,
  rings = 5,
  particleCount = 24,
  disabled = false,
}: ClickBurstProps) {
  const prefersReduced = useReducedMotion();
  const colors = BURST_COLORS[theme];
  const [burst, setBurst] = useState(0);
  const [burstPos, setBurstPos] = useState({ x: 50, y: 50 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<BurstParticle[]>([]);

  const startLoop = () => {
    if (animRef.current !== null) return;
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) { animRef.current = null; return; }
      const ctx = canvas.getContext('2d');
      if (!ctx) { animRef.current = null; return; }
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      let alive = 0;
      for (const p of particles) {
        if (p.life >= p.maxLife) continue;
        alive++;
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.92; p.vy *= 0.92;
        p.life++;
        const o = p.opacity * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${o})`).replace('rgb', 'rgba');
        ctx.fill();
      }
      if (alive === 0) {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = null;
        return;
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (prefersReduced || disabled) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBurstPos({ x, y });
    setBurst(b => b + 1);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = (maxRadius * 2) * dpr;
    canvas.height = (maxRadius * 2) * dpr;
    canvas.style.width = `${maxRadius * 2}px`;
    canvas.style.height = `${maxRadius * 2}px`;
    ctx.scale(dpr, dpr);

    const cx = maxRadius; const cy = maxRadius;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16,
      radius: Math.random() * 4 + 2,
      opacity: 0.85,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0, maxLife: Math.random() * 35 + 15,
    }));
    startLoop();
  };

  if (prefersReduced) {
    return (
      <div className={className} onClick={disabled ? undefined : handleClick} ref={wrapperRef}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      ref={wrapperRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      <EnergyBurst
        trigger={burst}
        xPercent={burstPos.x}
        yPercent={burstPos.y}
        theme={theme}
        maxRadius={maxRadius}
        rings={rings}
        duration={0.9}
        className="pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          left: burstPos.x,
          top: burstPos.y,
          transform: 'translate(-50%, -50%)',
          width: maxRadius * 2,
          height: maxRadius * 2,
          marginLeft: -maxRadius,
          marginTop: -maxRadius,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
