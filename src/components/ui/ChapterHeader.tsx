import { motion, useReducedMotion } from 'framer-motion';
import { SectionMark } from './SectionMark';

export interface ChapterHeaderProps {
  /** Two-digit chapter number, e.g. `01`. */
  index: string;
  /** Section name as it reads after the index, e.g. `ORIGIN`. */
  label: string;
  /** Mono line above the heading, without brackets — the component adds them. */
  eyebrow: string;
  /** Right-hand seal text, e.g. `CHAPTER 01`. Hidden below `sm`. */
  badge: string;
  /** Which ink the eyebrow and mark take. */
  tone?: 'accent' | 'cool';
}

/**
 * The chapter opener used by every section. Was six near-identical copies that
 * differed only in their label, index and emblem.
 *
 * The heading's `NN / NAME` string and the eyebrow text are passed in whole
 * rather than composed from parts, because both are content: they read the same
 * as they did before the restyle.
 */
export function ChapterHeader({
  index,
  label,
  eyebrow,
  badge,
  tone = 'accent',
}: ChapterHeaderProps) {
  const prefersReduced = useReducedMotion();
  const ink = tone === 'cool' ? 'var(--t-cool-ink)' : 'var(--t-accent-ink)';

  return (
    <header className="relative pb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <SectionMark index={index} />
          <div className="min-w-0">
            <span
              className="font-code text-xs font-bold uppercase tracking-widest block"
              style={{ color: ink }}
            >
              [ {eyebrow} ]
            </span>
            <h2
              className="font-display text-5xl md:text-7xl uppercase leading-none mt-1.5"
              style={{ color: 'var(--t-heading)' }}
            >
              {index} / {label}
            </h2>
          </div>
        </div>

        <span
          className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-widest"
          style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
        >
          {badge}
        </span>
      </div>

      {/* The hairline draws outward from the left as the header arrives (ref #10).
          Under reduced motion it starts already drawn, so nothing is left
          collapsed at `scaleX(0)` for a reader who never animates. */}
      <motion.div
        className="rule absolute bottom-0 left-0 right-0"
        initial={{ scaleX: prefersReduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </header>
  );
}
