import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PageLoadSequenceProps {
  /** Callback when sequence completes */
  onComplete?: () => void;
  /** Minimum duration to show loader (ms) */
  minDuration?: number;
}

export function PageLoadSequence({ onComplete, minDuration = 1200 }: PageLoadSequenceProps) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      onComplete?.();
      return;
    }

    let frame = 0;
    const animate = () => {
      frame += 1;
      setProgress(Math.min(frame / 60, 1));
      if (frame < 60) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [prefersReduced, minDuration, onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={false}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
        style={{ background: 'var(--t-bg-primary)' }}
        role="status"
        aria-label="Loading portfolio"
      >
        {/* Central expanding ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        >
          <div className="w-24 h-24 rounded-full border-2" style={{ borderColor: 'var(--t-accent-main)' }} />
        </motion.div>

        {/* Progress ring */}
        <motion.svg
          className="w-32 h-32 -rotate-90"
          viewBox="0 0 128 128"
        >
          <motion.circle
            className="fill-none stroke-current"
            style={{ strokeWidth: 4, stroke: 'var(--t-accent-main)', strokeDasharray: 380, strokeDashoffset: 380 }}
            cx="64" cy="64" r="60"
            animate={{ strokeDashoffset: 380 * (1 - progress) }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </motion.svg>

        {/* Loading text */}
        <motion.p
          className="font-code text-xs font-bold uppercase tracking-widest mt-10"
          style={{ color: 'var(--t-text-muted)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          INITIALIZING NEURAL INTERFACE
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-px overflow-hidden"
          style={{ background: 'var(--t-hairline)' }}
        >
          <motion.div
            className="h-full origin-left"
            style={{ background: 'linear-gradient(90deg, var(--t-accent-main), var(--t-accent-cool))' }}
            animate={{ scaleX: progress }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Mouse trail effect - decorative cursor followers
export function MouseTrail() {
  const prefersReduced = useReducedMotion();
  const [trails, setTrails] = useState<Array<{x: number; y: number; id: number; life: number}>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReduced) return;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setTrails(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() + Math.random(), life: 1 }
      ]);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    const animate = () => {
      setTrails(prev => prev
        .map(t => ({ ...t, life: t.life - 0.03 }))
        .filter(t => t.life > 0)
      );
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReduced]);

  if (prefersReduced || trails.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[199]" aria-hidden="true">
      {trails.map(trail => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            width: 6,
            height: 6,
            background: 'var(--t-accent-main)',
            opacity: trail.life * 0.6,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: trail.life * 0.6 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}


 
