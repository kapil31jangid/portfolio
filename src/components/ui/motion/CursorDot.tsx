import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useHoverCapable } from './useHoverCapable';

const SIZE = 10;
const GROWN_SCALE = 2.1;

/** Anything that reads as clickable gets the enlarged dot. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

/**
 * A small accent dot that trails the pointer and swells over interactive
 * elements — the cursor treatment from the reference site.
 *
 * The native cursor is deliberately left visible. Hiding it means the dot
 * becomes the only pointer, and any failure to keep up with the real cursor
 * turns into a usability bug rather than a decoration that lags.
 *
 * Inert on touch and under reduced motion, and gated here rather than on
 * `MotionConfig` because these are MotionValues written straight to `style`,
 * which `reducedMotion="user"` does not reach.
 */
export function CursorDot() {
  const prefersReduced = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = canHover && !prefersReduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const follow = { stiffness: 420, damping: 34, mass: 0.4 };
  const sx = useSpring(x, follow);
  const sy = useSpring(y, follow);
  const sScale = useSpring(scale, { stiffness: 300, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      scale.set(target?.closest(INTERACTIVE) ? GROWN_SCALE : 1);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enabled, x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full"
      style={{
        x: sx,
        y: sy,
        scale: sScale,
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        background: 'var(--t-accent-main)',
        boxShadow: '0 0 12px var(--t-accent-main)',
      }}
    />
  );
}
