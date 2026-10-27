import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MorphingBlobProps {
  className?: string; style?: React.CSSProperties;
  /** Blob color */
  color?: string;
  /** Size in pixels */
  size?: number;
  /** Morphing speed */
  speed?: number;
  /** Border radius variation (0-1) */
  complexity?: number;
  /** Enable mouse following */
  followMouse?: boolean;
  /** Blur amount */
  blur?: number;
  /** Opacity */
  opacity?: number;
}

function generateBlobPath(cx: number, cy: number, radius: number, complexity: number, time: number): string {
  const points = 8 + Math.floor(complexity * 8);
  let path = '';
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const noise = Math.sin(angle * 3 + time * 0.5) * 0.3 +
                  Math.cos(angle * 5 + time * 0.3) * 0.2 +
                  Math.sin(angle * 7 + time * 0.7) * 0.15;
    const r = radius * (1 + noise * complexity);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) path += `M ${x} ${y}`;
    else path += ` L ${x} ${y}`;
  }
  return path + ' Z';
}

export function MorphingBlob({
  className, style, color = 'rgba(255,74,28,0.15)',
  size = 300, speed = 1, complexity = 0.6,
  followMouse = false, blur = 60, opacity = 1,
}: MorphingBlobProps) {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    resize(); window.addEventListener('resize', resize);

    if (followMouse) {
      const handleMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouseRef.current = { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
      };
      canvas.addEventListener('mousemove', handleMove);
    }

    const animate = () => {
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr; const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.008 * speed;
      const cx = followMouse ? mouseRef.current.x : width / 2;
      const cy = followMouse ? mouseRef.current.y : height / 2;

      const path = generateBlobPath(cx, cy, size / 2, complexity, timeRef.current);

      // Draw with blur effect using shadow
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
      const path2D = new Path2D(path);
      ctx.fill(path2D);
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener('resize', resize); if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [prefersReduced, color, size, speed, complexity, followMouse, blur, opacity]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className ?? ''}`}
      style={{ zIndex: 0, ...style }}
      aria-hidden="true"
    />
  );
}
