import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  gap?: number;
  theme?: 'accent' | 'cool' | 'muted';
  style?: React.CSSProperties;
}

/**
 * Infinite horizontal marquee using a spring-driven loop.
 * Measures content width once and animates `x` by that amount on repeat.
 * Inert under reduced motion.
 */
export function Marquee({
  items,
  className,
  speed = 40,
  gap = 64,
  theme = 'accent',
  style,
}: MarqueeProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const colors = {
    accent: 'var(--t-accent-main)',
    cool: 'var(--t-accent-cool)',
    muted: 'var(--t-text-muted)',
  };

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setContentWidth(el.scrollWidth / 2);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, contentWidth]);

  if (prefersReduced || items.length === 0 || contentWidth === 0) {
    return (
      <div className={`flex items-center gap-6 ${className ?? ''}`} style={{ color: colors[theme], ...style }}>
        {items.map((item, i) => (
          <span key={i} className="font-code text-xs font-bold uppercase tracking-widest">
            {item}
          </span>
        ))}
      </div>
    );
  }

  const duration = contentWidth / speed;

  return (
    <div className={`overflow-hidden relative ${className ?? ''}`} style={{ color: colors[theme], ...style }}>
      <div className="relative overflow-hidden" aria-hidden="true">
        <motion.div
          ref={containerRef}
          className={`flex items-center will-change-transform gap-x-${Math.max(gap / 4, 4)}`}
          style={{ width: contentWidth * 2 }}
          animate={{
            x: [0, -contentWidth],
          }}
          transition={{
            repeat: Infinity,
            duration,
            ease: 'linear',
          }}
        >
          {items.map((item, i) => (
            <span key={i} className="font-code text-xs font-bold uppercase tracking-widest whitespace-nowrap shrink-0">
              {item}
            </span>
          ))}
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="font-code text-xs font-bold uppercase tracking-widest whitespace-nowrap shrink-0">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
