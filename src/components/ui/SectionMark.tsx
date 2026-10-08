export interface SectionMarkProps {
  /** Two-digit chapter number, e.g. `01`. */
  index: string;
  className?: string;
}

/**
 * The `<NN/>` bracket seal that opens each chapter, in place of the old kanji
 * medallion.
 *
 * Marked `aria-hidden` because the same number is already spoken as part of the
 * chapter heading right beside it; announcing it twice is noise.
 */
export function SectionMark({ index, className }: SectionMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border font-code text-xs sm:text-sm font-bold ${className ?? ''}`}
      style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}
    >
      &lt;{index}/&gt;
    </span>
  );
}
