import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface EnergyBurstProps {
  /** Trigger the burst (increment to fire) */
  trigger: number;
  /** Position as percentage (0-100) relative to parent */
  xPercent?: number; yPercent?: number;
  /** Burst color theme */
  theme?: 'accent' | 'cool' | 'white';
  /** Max radius of the burst */
  maxRadius?: number;
  /** Number of rings */
  rings?: number;
  /** Duration in seconds */
  duration?: number;
  className?: string; style?: React.CSSProperties;
}

const THEME_COLORS = {
  accent: ['rgba(255,74,28,0.6)', 'rgba(255,122,82,0.4)', 'rgba(255,170,122,0.2)'],
  cool: ['rgba(91,91,240,0.6)', 'rgba(123,123,255,0.4)', 'rgba(155,155,255,0.2)'],
  white: ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'],
};

export function EnergyBurst({
  trigger, xPercent = 50, yPercent = 50, theme = 'accent',
  maxRadius = 300, rings = 3, duration = 0.8,
  className, style,
}: EnergyBurstProps) {
  const prefersReduced = useReducedMotion();
  const colors = THEME_COLORS[theme];
  const burstRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;
    burstRef.current = trigger;
  }, [trigger, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {burstRef.current > 0 && (
        <motion.div
          key={trigger}
          className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
          style={{ zIndex: 0, ...style }}
          aria-hidden="true"
        >
          {Array.from({ length: rings }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                border: `2px solid ${colors[i % colors.length]}`,
                left: `${xPercent}%`, top: `${yPercent}%`,
                transform: 'translate(-50%, -50%)',
                width: maxRadius * 2, height: maxRadius * 2,
                marginLeft: -maxRadius, marginTop: -maxRadius,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration, delay: i * 0.05, ease: 'easeOut' }}
            />
          ))}
          {/* Central flash */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
              left: `${xPercent}%`, top: `${yPercent}%`,
              transform: 'translate(-50%, -50%)',
              width: 120, height: 120,
              marginLeft: -60, marginTop: -60,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: duration * 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
