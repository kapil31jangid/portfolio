import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

/**
 * Off-screen origins for each character, cycled by index. Deterministic on
 * purpose — a random offset per render would re-scatter the letters on every
 * re-render and make the entrance non-reproducible.
 */
const ORIGINS = [
  { x: -150, y: -50, rotate: -18 },
  { x: 130, y: -95, rotate: 22 },
  { x: -85, y: 95, rotate: 16 },
  { x: 160, y: 70, rotate: -24 },
  { x: 25, y: -140, rotate: -12 },
  { x: -35, y: 130, rotate: 20 },
  { x: 180, y: -25, rotate: 26 },
  { x: -170, y: 35, rotate: -22 },
];

export interface AssembleHeadingProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each character's entrance. */
  stagger?: number;
  delay?: number;
  /** Scales the distance the characters travel. */
  distance?: number;
  /** `mount` plays immediately (hero); `inView` waits for scroll (default). */
  trigger?: 'inView' | 'mount';
}

/**
 * Renders `text` as characters that fly in from scattered off-screen origins
 * and converge into place — the assembly the reference site uses for its logo.
 *
 * Renders a `span` on purpose: callers keep their existing `h1`/`h2`/`h3`, so
 * the per-section heading overrides in index.css keep applying.
 *
 * The visible text is duplicated in an `sr-only` span and the animated copy is
 * `aria-hidden`, so assistive tech reads one clean string rather than a stream
 * of single letters. (`aria-label` on a roleless span is poorly supported.)
 */
export function AssembleHeading({
  text,
  className,
  style,
  stagger = 0.035,
  delay = 0,
  distance = 1,
  trigger = 'inView',
}: AssembleHeadingProps) {
  const words = text.split(' ');

  // A running index across all words, so the origin pattern does not restart
  // at every word boundary and produce a visible repeating cycle.
  let unitIndex = -1;

  const content = (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block">
          {Array.from(word).map((unit, charIndex) => {
            unitIndex += 1;
            const origin = ORIGINS[unitIndex % ORIGINS.length];
            return (
              <motion.span
                key={`${unit}-${charIndex}`}
                className="inline-block"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: origin.x * distance,
                    y: origin.y * distance,
                    rotate: origin.rotate,
                    scale: 0.75,
                  },
                  show: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 240, damping: 24, mass: 0.7 },
                  },
                }}
              >
                {unit}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );

  const variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <span className={className} style={style}>
      <span className="sr-only">{text}</span>
      {trigger === 'mount' ? (
        <motion.span aria-hidden="true" initial="hidden" animate="show" variants={variants}>
          {content}
        </motion.span>
      ) : (
        <motion.span
          aria-hidden="true"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={variants}
        >
          {content}
        </motion.span>
      )}
    </span>
  );
}
