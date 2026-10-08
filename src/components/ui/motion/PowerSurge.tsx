import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/theme';

const SURGE_MS = 800;

/**
 * Softly wipes the screen when the theme flips between Light and Dark, so the
 * switch reads as a deliberate transition rather than an instant repaint.
 *
 * Deliberately an overlay rather than a shake applied to a page wrapper: the
 * navbar is `position: fixed`, and a transformed ancestor becomes the
 * containing block for fixed descendants, which would visibly detach it.
 *
 * Driven by context, so `ThemeToggle` needs no knowledge of this, and the
 * localStorage logic in `ThemeContext` is untouched.
 */
export function PowerSurge() {
  const { theme } = useTheme();
  const prefersReduced = useReducedMotion();
  const [surge, setSurge] = useState<number | null>(null);

  // Compared against the previous value rather than using a "first render"
  // flag: StrictMode runs effects twice in dev, and a one-shot flag would
  // fire a spurious wipe on load.
  const previousTheme = useRef(theme);
  const counter = useRef(0);

  useEffect(() => {
    if (previousTheme.current === theme) return;
    previousTheme.current = theme;

    counter.current += 1;
    setSurge(counter.current);

    const timer = window.setTimeout(() => setSurge(null), SURGE_MS);
    return () => window.clearTimeout(timer);
  }, [theme]);

  // Literal colours rather than `var(--t-bg-primary)`: the variables are
  // rewritten by an effect in `ThemeProvider`, which runs after this child's
  // effect, so on the first painted frame they would still hold the outgoing
  // theme's values.
  const wash = theme === 'super' ? '#0E0E10' : '#F4F1EA';
  const accent = theme === 'super' ? '#FF8A5C' : '#FF4A1C';

  return (
    <AnimatePresence>
      {surge !== null && (
        <motion.div
          key={surge}
          aria-hidden="true"
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* The incoming theme's page colour blooming from the centre, so the
              flip reads as a wipe rather than a flash. */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 45%, ${wash} 0%, transparent 68%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, prefersReduced ? 0.6 : 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.25, 1], ease: 'easeOut' }}
          />

          {!prefersReduced && (
            /* Hairline ring opening outward, echoing the orbit ring. */
            <motion.div
              className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full"
              style={{ marginLeft: -64, marginTop: -64, border: `1px solid ${accent}` }}
              initial={{ scale: 0.4, opacity: 0.6 }}
              animate={{ scale: 13, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
