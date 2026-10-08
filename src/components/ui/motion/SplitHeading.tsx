import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

export interface SplitHeadingProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Split granularity. `char` gives the manga-style cascade. */
  by?: 'char' | 'word';
  /** Seconds between each unit. */
  stagger?: number;
  delay?: number;
  /** `mount` plays immediately (hero); `inView` waits for scroll (default). */
  trigger?: 'inView' | 'mount';
}

/**
 * Renders `text` as individually animated characters or words.
 *
 * Renders a `span` on purpose: callers keep their existing `h1`/`h2`/`h3`, so
 * every `#section h3.font-manga` override in index.css keeps applying.
 *
 * The visible text is duplicated in an `sr-only` span and the animated copy is
 * `aria-hidden`, so assistive tech reads one clean string instead of a stream
 * of single letters. (`aria-label` on a roleless span is poorly supported.)
 */
export function SplitHeading({
  text,
  className,
  style,
  by = 'char',
  stagger = 0.028,
  delay = 0,
  trigger = 'inView',
}: SplitHeadingProps) {
  const words = text.split(' ');

  const content = (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block">
          {(by === 'char' ? Array.from(word) : [word]).map((unit, unitIndex) => (
            <motion.span
              key={`${unit}-${unitIndex}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: '0.5em', rotate: -8, scale: 0.85 },
                show: {
                  opacity: 1,
                  y: '0em',
                  rotate: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 420, damping: 26, mass: 0.6 },
                },
              }}
            >
              {unit}
            </motion.span>
          ))}
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
