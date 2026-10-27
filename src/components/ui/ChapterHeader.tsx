import { motion, useReducedMotion } from 'framer-motion';
import { SectionMark } from './SectionMark';
import { SoundEffect } from './motion/SoundEffect';

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

const SOUNDS: Record<string, string> = {
  '01': 'ORIGIN',
  '02': 'POWERS',
  '03': 'MISSIONS',
  '04': 'EXPERIENCE',
  '05': 'CREDENTIALS',
  '06': 'CONTACT',
};

const TONE_COLOR: Record<string, 'red' | 'blue' | 'yellow'> = {
  accent: 'red',
  cool: 'blue',
};

export function ChapterHeader({
  index,
  label,
  eyebrow,
  badge,
  tone = 'accent',
}: ChapterHeaderProps) {
  const prefersReduced = useReducedMotion();
  const ink = tone === 'cool' ? 'var(--t-cool-ink)' : 'var(--t-accent-ink)';
  const sfxText = SOUNDS[index] ?? label;
  const sfxColor = TONE_COLOR[tone];

  return (
    <header className="relative pb-6 comic-panel comic-panel-hover">
      <div className="relative z-2">
        <SoundEffect text={sfxText} className="absolute -top-6 -left-2" color="red" />
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <SectionMark index={index} />
            <div className="min-w-0">
              <span
                className="font-code text-xs font-bold uppercase tracking-widest block"
                style={{ color: ink }}
              >
                <SoundEffect text={`[ ${eyebrow} ]`} color={sfxColor} />
              </span>
              <h2
                className="font-display text-3xl md:text-5xl uppercase leading-none mt-1"
                style={{ color: 'var(--t-heading)' }}
              >
                <SoundEffect text={`${index} / ${label}`} color={sfxColor} />
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
      </div>

      {/* Comic border drop-shadow is on .comic-panel */}
      <motion.div
        className="rule absolute bottom-0 left-0 right-0 z-2"
        initial={{ scaleX: prefersReduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </header>
  );
}
