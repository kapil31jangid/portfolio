import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { motionTokens } from '../../../lib/motion-tokens';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x: number; y: number }> = motionTokens.reveal.offsets;

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
  delay = motionTokens.reveal.defaultDelay,
  duration = motionTokens.reveal.defaultDuration,
  distance = motionTokens.reveal.defaultDistance,
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
      viewport={{ once, margin: motionTokens.reveal.viewportMargin }}
      transition={{ duration, delay, ease: motionTokens.reveal.defaultEase }}
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
  stagger = motionTokens.stagger.groupStagger,
  delay = motionTokens.stagger.groupDelay,
  once = true,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: motionTokens.reveal.viewportMargin }}
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
        hidden: motionTokens.stagger.itemHidden,
        show: {
          ...motionTokens.stagger.itemShow,
          transition: motionTokens.stagger.itemSpring,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
