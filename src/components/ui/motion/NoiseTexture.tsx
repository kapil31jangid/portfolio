import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface NoiseTextureProps {
  className?: string; style?: React.CSSProperties;
  /** Noise opacity (0-1) */
  opacity?: number;
  /** Animation speed */
  speed?: number;
  /** Grain size - larger = bigger grain */
  scale?: number;
}

/**
 * CSS-based film grain / noise texture.
 * Uses a generated SVG noise pattern as background-image with CSS animation.
 * Much more performant and reliable than canvas.
 */
export function NoiseTexture({
  className, style, opacity = 0.03, speed = 1, scale = 1,
}: NoiseTextureProps) {
  const prefersReduced = useReducedMotion();
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const el = noiseRef.current;
    if (!el) return;

    // Generate SVG noise pattern once
    const generateNoiseSVG = (size = 256) => {
      const cells = [];
      const cellSize = Math.max(1, Math.floor(size / 16));
      for (let y = 0; y < size; y += cellSize) {
        for (let x = 0; x < size; x += cellSize) {
          const gray = Math.floor(Math.random() * 256);
          cells.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="rgb(${gray},${gray},${gray})"/>`);
        }
      }
      return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>${cells.join('')}</svg>`;
    };

    const noiseDataUrl = generateNoiseSVG(256);
    
    // Apply as CSS background
    el.style.backgroundImage = `url("${noiseDataUrl}")`;
    el.style.backgroundRepeat = 'repeat';
    el.style.backgroundSize = `${256 * scale}px ${256 * scale}px`;
    el.style.opacity = String(opacity);
    el.style.mixBlendMode = 'overlay';
    el.style.pointerEvents = 'none';
    el.style.position = 'absolute';
    el.style.inset = '0';
    el.style.zIndex = '2';

    if (!prefersReduced && speed > 0) {
      // Animate via CSS transform for GPU acceleration
      el.style.animation = `noise-shift ${20 / speed}s linear infinite`;
    }

    // Inject keyframes if not already present
    if (!document.getElementById('noise-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'noise-keyframes';
      styleSheet.textContent = `
        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2%, 1%); }
          50% { transform: translate(1%, -1%); }
          75% { transform: translate(2%, 2%); }
          100% { transform: translate(0, 0); }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    return () => {
      el.style.animation = '';
    };
  }, [prefersReduced, opacity, speed, scale]);

  if (prefersReduced) return null;

  return (
    <div
      ref={noiseRef}
      className={`fixed inset-0 pointer-events-none ${className ?? ''}`}
      style={{ ...style }}
      aria-hidden="true"
    />
  );
}
