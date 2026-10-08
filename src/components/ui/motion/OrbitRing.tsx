import { motion, useReducedMotion } from 'framer-motion';

export interface OrbitRingProps {
  /** Positioning and size come from the caller; defaults to filling its parent. */
  className?: string;
  /** Seconds for one revolution. */
  duration?: number;
  /** X-axis tilt in degrees. 0 is a flat circle; higher opens it into an ellipse. */
  tilt?: number;
}

/**
 * A hairline ring in perspective with a glowing dot travelling around it —
 * the orbit that circles the mark on the reference site.
 *
 * A plain spinning ring reads as static, because a uniform circle looks the
 * same at every angle. The travelling dot is what actually communicates the
 * motion, so the ring itself stays still and only the dot's carrier rotates.
 */
export function OrbitRing({ className, duration = 14, tilt = 72 }: OrbitRingProps) {
  const prefersReduced = useReducedMotion();

  return (
    <span className={`pointer-events-none ${className ?? 'absolute inset-0'}`} aria-hidden="true">
      <span className="absolute inset-0" style={{ perspective: 700 }}>
        <span
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}
        >
          <span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: 'var(--t-hairline)' }}
          />
          <motion.span
            className="absolute inset-0"
            animate={prefersReduced ? undefined : { rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <span
              className="absolute left-1/2 top-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'var(--t-accent-main)',
                boxShadow: '0 0 12px var(--t-accent-main)',
              }}
            />
          </motion.span>
        </span>
      </span>
    </span>
  );
}
