import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { useHoverCapable } from './useHoverCapable';

const SPOTLIGHT_SIZE = 420;

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the corners. Keep small — large values blur text. */
  intensity?: number;
  /** Cursor-following glow that tracks the pointer. */
  spotlight?: boolean;
  style?: CSSProperties;
}

/**
 * Tilts its children toward the pointer in 3D, with an optional glow that
 * tracks the cursor.
 *
 * Both effects are inert on touch devices and under reduced motion. The
 * spotlight is moved with `transform` rather than by rewriting `background`
 * on every pointermove, so it stays on the compositor instead of repainting
 * a large panel on every frame.
 */
export function TiltCard({
  children,
  className,
  intensity = 4,
  spotlight = true,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const canHover = useHoverCapable();
  const tiltEnabled = canHover && !prefersReduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tilt = { stiffness: 180, damping: 22, mass: 0.6 };
  const springX = useSpring(rawX, tilt);
  const springY = useSpring(rawY, tilt);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const ratioX = (event.clientX - rect.left) / rect.width;
    const ratioY = (event.clientY - rect.top) / rect.height;

    if (tiltEnabled) {
      rawX.set(ratioX - 0.5);
      rawY.set(ratioY - 0.5);
    }
    if (canHover) {
      spotX.set(ratioX * rect.width - SPOTLIGHT_SIZE / 2);
      spotY.set(ratioY * rect.height - SPOTLIGHT_SIZE / 2);
    }
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      className={`group/tilt relative ${className ?? ''}`}
      style={{ perspective: 1000, ...style }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div className="relative" style={{ rotateX, rotateY }}>
        {spotlight && canHover && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
              style={{
                x: spotX,
                y: spotY,
                background: 'radial-gradient(circle, var(--t-aura-gold) 0%, transparent 65%)',
              }}
            />
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}

export interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element follows. */
  strength?: number;
}

/**
 * Pulls its children a fraction of the way toward the cursor while hovered,
 * then springs back on leave. Inert on touch and under reduced motion.
 *
 * The ref sits on a static outer wrapper and only the inner element moves.
 * Measuring the element that is itself being translated would feed its own
 * displacement back into the next pointer sample and make it drift.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = canHover && !prefersReduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 260, damping: 20, mass: 0.5 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      className={className ?? 'inline-flex'}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
