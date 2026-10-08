import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export interface TypewriterProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds before typing begins. */
  startDelay?: number;
  /** `mount` starts immediately; `inView` waits for scroll (default). */
  trigger?: 'inView' | 'mount';
  /** Blinking terminal caret after the text. */
  caret?: boolean;
}

/**
 * Reveals `text` one character at a time behind a blinking caret.
 *
 * The full string is always present in an `sr-only` span, so assistive tech
 * and search engines read the finished line rather than a half-typed one.
 */
export function Typewriter({
  text,
  className,
  style,
  speed = 45,
  startDelay = 0,
  trigger = 'inView',
  caret = true,
}: TypewriterProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const started = trigger === 'mount' || inView;

  // Seeded from the reduced-motion preference so the common case paints the
  // finished string on the first frame instead of flashing empty, then filling.
  const [count, setCount] = useState(() => (prefersReduced ? text.length : 0));

  useEffect(() => {
    if (prefersReduced) {
      setCount(text.length);
      return;
    }
    if (!started) return;

    let typed = 0;
    let timer = 0;

    const step = () => {
      typed += 1;
      setCount(typed);
      if (typed < text.length) timer = window.setTimeout(step, speed);
    };

    timer = window.setTimeout(step, startDelay);
    return () => window.clearTimeout(timer);
  }, [started, prefersReduced, text, speed, startDelay]);

  return (
    <span ref={ref} className={className} style={style}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {caret ? <span className="caret" /> : null}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
