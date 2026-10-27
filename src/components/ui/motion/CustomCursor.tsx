import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CustomCursorProps {
  className?: string;
  /** Elements matching these selectors will trigger the hover state. */
  hoverSelectors?: string[];
}

/**
 * A custom cursor that follows the pointer and scales up when hovering
 * interactive elements. Hides the native cursor. Inert under reduced motion
 * and on touch devices.
 */
export function CustomCursor({
  className,
  hoverSelectors = ['a', 'button', '[role="button"]', '.Magnetic', '.magnetic', 'input', 'select'],
}: CustomCursorProps) {
  const prefersReduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = 'none';

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleDown = () => setClicked(true);
    const handleUp = () => setClicked(false);

    // Hover detection via a transparent overlay hit-test approach:
    // check the element under the pointer on each move.
    let hoverFrame = 0;
    const checkHover = () => {
      const el = document.elementFromPoint(pos.x, pos.y);
      const matches = el ? hoverSelectors.some(sel => el.matches(sel) || el.closest(sel)) : false;
      setHovered(matches);
      hoverFrame = requestAnimationFrame(checkHover);
    };
    hoverFrame = requestAnimationFrame(checkHover);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseleave', () => setHovered(false));

    return () => {
      cancelAnimationFrame(hoverFrame);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseleave', () => setHovered(false));
      document.body.style.cursor = '';
    };
  }, [prefersReduced, hoverSelectors, pos.x, pos.y]);

  if (prefersReduced) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] ${className ?? ''}`}
      style={{
        left: pos.x - 8,
        top: pos.y - 8,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'var(--t-accent-main)',
        boxShadow: '0 0 16px var(--t-accent-main)',
        transform: hovered ? 'scale(1.8)' : clicked ? 'scale(0.6)' : 'scale(1)',
      }}
      animate={{}}
      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.4 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: 'var(--t-accent-main)', opacity: hovered ? 0 : 0.5 }}
        animate={{ scale: hovered ? 2.2 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.4 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
