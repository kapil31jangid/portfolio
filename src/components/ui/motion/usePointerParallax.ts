import { useEffect, type RefObject } from 'react';
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion';
import { useHoverCapable } from './useHoverCapable';

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export interface PointerParallaxOptions {
  /** Multiplier on the normalized -1..1 output. Default 1. */
  strength?: number;
  stiffness?: number;
  damping?: number;
}

export interface PointerParallax {
  /** Smoothed pointer offset from the element centre, normalized to -1..1. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** False on touch devices and when the OS requests reduced motion. */
  enabled: boolean;
}

/**
 * Tracks the pointer across an element and returns spring-smoothed offsets
 * normalized to -1..1, where (0, 0) is the element's centre.
 *
 * Consumers scale these with `useTransform` to whatever travel they want,
 * which keeps this hook layout-agnostic and reusable at any depth.
 *
 * Takes the element ref rather than creating one, so the caller can reuse it
 * for anything else it needs (a `useScroll` target, for instance). Returning a
 * ref alongside the motion values also makes oxlint mark the whole result
 * object as ref-like and flag every property read on it during render.
 *
 * Returns zeros unless the device has a fine pointer AND reduced motion is off.
 * That guard has to live here rather than on `MotionConfig`: these values are
 * written straight to `style` rather than driven by an `animate` prop, so
 * `reducedMotion="user"` does not reach them.
 */
export function usePointerParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { strength = 1, stiffness = 120, damping = 20 }: PointerParallaxOptions = {},
): PointerParallax {
  const prefersReduced = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = canHover && !prefersReduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.4 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.4 });

  useEffect(() => {
    const element = ref.current;

    if (!element || !enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      rawX.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1) * strength);
      rawY.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1) * strength);
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    element.addEventListener('pointermove', handleMove);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', reset);
    };
  }, [ref, enabled, strength, rawX, rawY]);

  return { x, y, enabled };
}
