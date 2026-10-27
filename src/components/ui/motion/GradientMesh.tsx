import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GradientMeshProps {
  className?: string; style?: React.CSSProperties;
  theme?: 'accent' | 'cool' | 'mixed';
  intensity?: number; animate?: boolean; blur?: number;
}

const GRADIENTS = {
  accent: [
    'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255,74,28,0.15), transparent)',
    'radial-gradient(ellipse 60% 80% at 80% 70%, rgba(255,122,82,0.12), transparent)',
    'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(226,60,18,0.08), transparent)',
  ],
  cool: [
    'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(91,91,240,0.15), transparent)',
    'radial-gradient(ellipse 60% 80% at 80% 70%, rgba(123,123,255,0.12), transparent)',
    'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(58,58,196,0.08), transparent)',
  ],
  mixed: [
    'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255,74,28,0.15), transparent)',
    'radial-gradient(ellipse 60% 80% at 80% 70%, rgba(123,123,255,0.12), transparent)',
    'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(91,91,240,0.1), transparent)',
    'radial-gradient(ellipse 70% 40% at 10% 80%, rgba(255,122,82,0.1), transparent)',
    'radial-gradient(ellipse 50% 90% at 90% 20%, rgba(58,58,196,0.08), transparent)',
  ],
};

export function GradientMesh({
  className, style, theme = 'mixed', intensity = 1,
  animate = true, blur = 80,
}: GradientMeshProps) {
  const prefersReduced = useReducedMotion();
  const gradients = GRADIENTS[theme];
  const layerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (prefersReduced || !animate) return;
    const layers = layerRefs.current.filter(Boolean);
    if (!layers.length) return;

    const animations = layers.map((layer, i) => {
      const duration = 15 + i * 3;
      return layer.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        { transform: 'translate(-5%, -3%) scale(1.05) rotate(2deg)' },
        { transform: 'translate(3%, 5%) scale(0.98) rotate(-1deg)' },
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
      ], { duration: duration * 1000, iterations: Infinity, easing: 'ease-in-out' });
    });

    return () => animations.forEach(a => a.cancel());
  }, [prefersReduced, animate, theme]);

  if (prefersReduced) {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className ?? ''}`} style={style} aria-hidden="true">
        {gradients.map((g, i) => (
          <motion.div key={i} className="absolute inset-0" style={{ background: g, filter: `blur(${blur}px)`, opacity: intensity }} />
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 pointer-events-none ${className ?? ''}`} style={style} aria-hidden="true">
      {gradients.map((g, i) => (
        <motion.div
          key={i}
          ref={el => { if (el) layerRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ background: g, filter: `blur(${blur}px)`, opacity: intensity }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: i * 0.3, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
