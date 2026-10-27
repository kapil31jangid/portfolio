import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface TextShatterProps {
  children: ReactNode;
  className?: string; style?: CSSProperties;
  /** Trigger the shatter (increment to fire) */
  trigger?: number;
  /** Shatter direction */
  direction?: 'explode' | 'implode' | 'scatter';
  /** Animation duration */
  duration?: number;
  /** Delay before shatter */
  delay?: number;
  /** Stagger between characters */
  stagger?: number;
}

interface ShatterCharProps {
  char: string; index: number; total: number;
  direction: 'explode' | 'implode' | 'scatter';
  duration: number; delay: number; stagger: number;
  trigger: number;
  style?: CSSProperties;
}

function ShatterChar({ char, index, total, direction, duration, delay, stagger, trigger, style }: ShatterCharProps) {
  const charDelay = delay + index * stagger;
  const angle = (index / total) * Math.PI * 2;
  const distance = 100 + Math.random() * 200;
  
  const variants = {
    hidden: { opacity: 0 },
    intact: { 
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      transition: { duration: 0.01 }
    },
    shattered: {
      opacity: 0,
      x: direction === 'explode' ? Math.cos(angle) * distance : 
         direction === 'implode' ? -Math.cos(angle) * distance :
         (Math.random() - 0.5) * distance * 2,
      y: direction === 'explode' ? Math.sin(angle) * distance :
         direction === 'implode' ? -Math.sin(angle) * distance :
         (Math.random() - 0.5) * distance * 2,
      rotate: (Math.random() - 0.5) * 720,
      scale: direction === 'implode' ? 2 : 0.3,
      transition: { duration, ease: [0.4, 0, 1, 1] as const }
    }
  };

  return (
    <motion.span
      style={{ display: 'inline-block', ...style }}
      initial="hidden"
      animate={trigger ? 'shattered' : 'intact'}
      variants={variants}
      transition={{ delay: charDelay }}
    >
      {char}
    </motion.span>
  );
}

export function TextShatter({
  children, className, style, trigger = 0,
  direction = 'explode', duration = 0.8, delay = 0, stagger = 0.02,
}: TextShatterProps) {
  const text = typeof children === 'string' ? children : String(children);
  const chars = text.split('');

  return (
    <span className={className} style={style} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => (
          <ShatterChar
            key={`${char}-${i}`}
            char={char === ' ' ? '\u00A0' : char}
            index={i} total={chars.length}
            direction={direction} duration={duration} delay={delay} stagger={stagger}
            trigger={trigger}
          />
        ))}
      </span>
    </span>
  );
}
