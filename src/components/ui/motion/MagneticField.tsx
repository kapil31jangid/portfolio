import { useEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

interface FieldLine {
  angle: number;
  length: number;
  offset: number;
  speed: number;
  opacity: number;
  color: string;
}

interface MagneticFieldProps {
  /** Center position */
  x: number; y: number;
  /** Field radius */
  radius?: number;
  /** Number of field lines */
  lines?: number;
  /** Color theme */
  theme?: 'accent' | 'cool' | 'mixed' | 'white';
  /** Animation speed multiplier */
  speed?: number;
  /** React to mouse proximity */
  interactive?: boolean;
  className?: string; style?: CSSProperties;
}

const THEME_COLORS = {
  accent: ['rgba(255,74,28,0.4)', 'rgba(255,122,82,0.3)', 'rgba(255,170,122,0.2)'],
  cool: ['rgba(91,91,240,0.4)', 'rgba(123,123,255,0.3)', 'rgba(155,155,255,0.2)'],
  mixed: ['rgba(255,74,28,0.4)', 'rgba(123,123,255,0.3)', 'rgba(255,170,122,0.2)', 'rgba(91,91,240,0.25)'],
  white: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'],
};

export function MagneticField({
  x, y, radius = 200, lines = 12, theme = 'accent',
  speed = 1, interactive = true,
  className, style,
}: MagneticFieldProps) {
  const prefersReduced = useReducedMotion();
  const colors = THEME_COLORS[theme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const fieldLinesRef = useRef<FieldLine[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    // Initialize field lines
    const initLines = () => {
      fieldLinesRef.current = Array.from({ length: lines }, (_, i) => ({
        angle: (i / lines) * Math.PI * 2,
        length: radius * (0.3 + Math.random() * 0.7),
        offset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

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
      initLines();
    };

    resize();
    window.addEventListener('resize', resize);

    if (interactive) {
      const handleMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouseRef.current = {
          x: (e.clientX - rect.left) * dpr,
          y: (e.clientY - rect.top) * dpr,
          active: true,
        };
      };
      canvas.addEventListener('mousemove', handleMove);
      canvas.addEventListener('mouseleave', () => { mouseRef.current.active = false; });
    }

    const animate = () => {
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr; const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      const cx = x; const cy = y;
      const lines = fieldLinesRef.current;

      for (const line of lines) {
        line.angle += 0.0005 * line.speed * speed;

        // Mouse influence
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - cx;
          const dy = mouseRef.current.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius * 1.5 && dist > 0) {
            const influence = (1 - dist / (radius * 1.5)) * 0.02;
            const targetAngle = Math.atan2(dy, dx);
            const diff = targetAngle - line.angle;
            line.angle += diff * influence;
          }
        }

        // Draw field line as curved path
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const endX = cx + Math.cos(line.angle) * line.length;
        const endY = cy + Math.sin(line.angle) * line.length;
        const cpX = cx + Math.cos(line.angle + line.offset) * line.length * 0.5;
        const cpY = cy + Math.sin(line.angle + line.offset) * line.length * 0.5;
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.strokeStyle = line.color.replace(')', `, ${line.opacity})`);
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw arrow head
        const arrowSize = 6;
        const arrowAngle = line.angle;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - Math.cos(arrowAngle - 0.5) * arrowSize, endY - Math.sin(arrowAngle - 0.5) * arrowSize);
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - Math.cos(arrowAngle + 0.5) * arrowSize, endY - Math.sin(arrowAngle + 0.5) * arrowSize);
        ctx.strokeStyle = line.color.replace(')', `, ${line.opacity * 0.8})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener('resize', resize); if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [prefersReduced, x, y, radius, lines, theme, speed, interactive, colors]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none ${className ?? ''}`}
      style={{ zIndex: 1, ...style }}
      aria-hidden="true"
    />
  );
}
