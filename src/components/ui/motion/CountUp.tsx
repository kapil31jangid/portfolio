import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type CSSProperties } from 'react';

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  /** Zero-pad to this many digits — the site renders indices as 01…07. */
  pad?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Counts from `from` to `to` the first time it scrolls into view.
 *
 * Writes to `textContent` through `useMotionValueEvent` rather than rendering
 * the motion value as a child or holding it in state, so a 1s count-up costs
 * zero React re-renders.
 */
export function CountUp({ to, from = 0, duration = 1.1, pad = 0, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();
  const count = useMotionValue(from);

  const format = (value: number) => {
    const rounded = Math.round(value);
    return pad ? String(rounded).padStart(pad, '0') : String(rounded);
  };

  useMotionValueEvent(count, 'change', (value) => {
    if (ref.current) ref.current.textContent = format(value);
  });

  useEffect(() => {
    if (!inView) return;

    if (prefersReduced) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, prefersReduced, count, to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {format(from)}
    </span>
  );
}
