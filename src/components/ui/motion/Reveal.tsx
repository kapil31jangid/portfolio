import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

export interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Scales the travel distance; 1 is the default 28-32px. */
  distance?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
}

/**
 * Scroll-triggered entrance. Replaces the hand-rolled
 * `initial/whileInView/viewport` triple that every section repeated.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 1,
  className,
  style,
  once = true,
}: RevealProps) {
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: offset.x * distance, y: offset.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each child. */
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Parent for sequenced children. Pair with `StaggerItem` — the child inherits
 * the `hidden`/`show` variant names from this parent, so no prop wiring is needed.
 */
export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.05,
  delay = 0.05,
  once = true,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A single sequenced child. Always renders a `div` — inside a flex container
 * (where every chip row on this site lives) that lays out identically to the
 * `span` it replaces, and it keeps one prop type instead of a union.
 */
export function StaggerItem({ children, className, style }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 380, damping: 30, mass: 0.7 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
