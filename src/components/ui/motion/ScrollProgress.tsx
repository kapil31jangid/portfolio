import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * A 2px accent line pinned to the top of the viewport that fills as you scroll.
 *
 * Purely decorative (aria-hidden) — it duplicates information the scrollbar
 * already conveys, so it must not add noise for screen readers.
 *
 * Sits at z-70, above the navbar (z-50) and the mobile drawer (z-60).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Under reduced motion the bar still has to report position — it stands in
  // for a scrollbar — so it tracks scroll 1:1 instead of easing behind it.
  const progress = prefersReduced ? scrollYProgress : smoothed;

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 pointer-events-none" aria-hidden="true">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX: progress, background: 'var(--t-accent-main)' }}
      />
    </div>
  );
}
