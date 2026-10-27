import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { motion, useReducedMotion, type MotionProps } from 'framer-motion';

/* ────────────────────────────────────────────
   Animaster Lab — motion system (local implementation)
   Provides ScrollReveal / Stagger / Motion with
   prefers-reduced-motion support.
   ──────────────────────────────────────────── */

interface AnimasterDefaults {
  ease: [number, number, number, number];
  duration: number;
  reduceMotion: boolean;
}

const defaultDefaults: AnimasterDefaults = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
  reduceMotion: true,
};

const AnimasterContext = createContext<AnimasterDefaults>(defaultDefaults);

export function AnimasterProvider({
  children,
  defaults,
}: { children: ReactNode; defaults?: Partial<AnimasterDefaults> }) {
  const merged = {
    ...defaultDefaults,
    ...defaults,
  };
  return <AnimasterContext.Provider value={merged}>{children}</AnimasterContext.Provider>;
}

export function useAnimaster() {
  return useContext(AnimasterContext);
}

/* ── Motion ──
   Wrapper around framer-motion <motion.div> that applies
   Animaster defaults unless overridden. Reduced-motion gated.
   ── */

export interface MotionPropsExtended extends Omit<MotionProps, 'animate' | 'initial' | 'exit' | 'transition'> {
  animate?: any;
  initial?: any;
  exit?: any;
  transition?: any;
}

export function Motion({
  children,
  animate,
  initial,
  exit,
  transition,
  className,
  style,
  ...props
}: MotionPropsExtended & { className?: string; style?: CSSProperties }) {
  const defaults = useAnimaster();
  const prefersReduced = useReducedMotion();

  const anim = prefersReduced ? undefined : animate;
  const init = prefersReduced ? animate : initial ?? animate;
  const trans = prefersReduced ? { duration: 0 } : transition ?? { ease: defaults.ease, duration: defaults.duration };

  return (
    <motion.div
      className={className}
      style={style}
      initial={init}
      animate={anim}
      exit={exit}
      transition={trans}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── ScrollReveal ──
   Scroll-triggered entrance using IntersectionObserver.
   ── */

export interface ScrollRevealProps {
  children: ReactNode;
  once?: boolean;
  threshold?: number;
  margin?: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  once = true,
  threshold = 0.15,
  margin = '-60px',
  delay = 0,
  duration = 0.6,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const defaults = useAnimaster();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: margin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold, margin, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 28,
      }}
      transition={{ duration, delay, ease: defaults.ease }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger ──
   Sequenced children with stagger delay.
   ── */

export interface StaggerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Stagger({
  children,
  delay = 0.08,
  className,
  style,
}: StaggerProps) {
  const childArray = React.Children.toArray(children);
  const defaults = useAnimaster();
  const prefersReduced = useReducedMotion();

  return (
    <div className={className} style={style}>
      {childArray.map((child, i) => {
        const d = prefersReduced ? 0 : delay * i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: defaults.duration, delay: d, ease: defaults.ease }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── MotionConfig ──
   Top-level config (pass-through for API compatibility).
   ── */

export function MotionConfig({
  children,
}: { children: ReactNode }) {
  return <>{children}</>;
}
