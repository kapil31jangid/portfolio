import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

interface ScrollVelocityProps {
  children: React.ReactNode;
  className?: string; style?: React.CSSProperties;
  /** Multiplier for velocity-based effects */
  intensity?: number;
  /** Minimum velocity to trigger effects */
  threshold?: number;
  /** Smoothing factor */
  smoothing?: number;
}

export function ScrollVelocity({
  children, className, style,
  intensity = 1, threshold = 0.1, smoothing = 0.9,
}: ScrollVelocityProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const velocityRef = useRef(0);
  const lastProgressRef = useRef(0);
  const velocity = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (prefersReduced) return;
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const delta = latest - lastProgressRef.current;
      lastProgressRef.current = latest;
      // Exponential moving average
      velocityRef.current = velocityRef.current * smoothing + delta * (1 - smoothing) * 1000;
      if (Math.abs(velocityRef.current) > threshold) {
        velocity.set(velocityRef.current * intensity);
      } else {
        velocity.set(0);
      }
    });
    return unsubscribe;
  }, [prefersReduced, scrollYProgress, smoothing, threshold, intensity, velocity]);

  if (prefersReduced) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, x: velocity }}
    >
      {children}
    </motion.div>
  );
}

// Velocity-aware wrapper for any component
export function withScrollVelocity<P extends object>(
  Component: React.ComponentType<P>,
  options: { intensity?: number; threshold?: number; axis?: 'x' | 'y' } = {}
) {
  return function VelocityWrapper(props: P) {
    const prefersReduced = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const velocityRef = useRef(0);
    const lastProgressRef = useRef(0);
    const velocity = useSpring(0, { stiffness: 300, damping: 30, mass: 0.5 });
    const { intensity = 1, threshold = 0.1, axis = 'y' } = options;

    useEffect(() => {
      if (prefersReduced) return;
      const unsubscribe = scrollYProgress.onChange((latest) => {
        const delta = latest - lastProgressRef.current;
        lastProgressRef.current = latest;
        velocityRef.current = velocityRef.current * 0.9 + delta * 0.1 * 1000;
        if (Math.abs(velocityRef.current) > threshold) {
          velocity.set(velocityRef.current * intensity);
        } else {
          velocity.set(0);
        }
      });
      return unsubscribe;
    }, [prefersReduced, scrollYProgress, threshold, intensity, velocity]);

    if (prefersReduced) return <Component {...props} />;

    return (
      <motion.div style={{ [axis === 'x' ? 'x' : 'y']: velocity }}>
        <Component {...props} />
      </motion.div>
    );
  };
}
