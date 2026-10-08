import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Mail, MapPin, FileText, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChapterHeader } from '../ui/ChapterHeader';
import { AssembleHeading, Magnetic, Reveal } from '../ui/motion';

export const Contact = () => {
  const p = PORTFOLIO_DATA.personal;
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative pt-24 pb-12 border-t overflow-hidden select-none"
      style={{ borderColor: 'var(--t-hairline)', backgroundColor: 'var(--t-bg-primary)' }}
    >
      <div className="shell relative z-10 space-y-20">
        <ChapterHeader index="06" label="NEXT ADVENTURE" eyebrow="GET IN TOUCH" badge="06 / 06" />

        <div className="max-w-5xl space-y-12">
          <Reveal direction="up" distance={1.25} duration={0.7} className="space-y-4">
            <span
              className="font-code text-xs font-bold uppercase tracking-widest block"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              [ FINAL EPISODE FRAME ]
            </span>
            <h3
              className="font-display text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.88]"
              style={{ color: 'var(--t-heading)' }}
            >
              <AssembleHeading text="LET'S BUILD" stagger={0.035} />
              <br />
              <AssembleHeading text="SOMETHING" stagger={0.035} delay={0.15} />
              <br />
              <span style={{ color: 'var(--t-accent-main)' }}>
                <AssembleHeading text="POWERFUL." stagger={0.05} delay={0.3} />
              </span>
            </h3>
          </Reveal>

          {/* Direct email link */}
          <Reveal direction="up" duration={0.6} delay={0.15} className="pt-2">
            <div className="relative inline-flex">
              {/* Pulsing ring (ref #11). Gated off under reduced motion — an
                  endless repeating pulse is exactly what that setting exists
                  to stop. */}
              {!prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border pointer-events-none"
                  style={{ borderColor: 'var(--t-accent-main)' }}
                  animate={{ scale: [1, 1.1], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              <Magnetic strength={0.18}>
                <a
                  href={`mailto:${p.email}`}
                  className="contact-email btn btn-primary text-base md:text-lg px-7 py-4"
                >
                  <Mail className="w-5 h-5" />
                  <span>{p.email}</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* Links & location */}
          <Reveal
            direction="up"
            duration={0.6}
            delay={0.25}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <span
              className="inline-flex items-center gap-2 font-code text-[11px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-full border"
              style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--t-accent-main)' }} />
              {p.location}
            </span>

            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code text-xs font-bold uppercase tracking-widest transition-colors hover:text-[var(--t-accent-main)]"
              style={{ color: 'var(--t-text-primary)' }}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code text-xs font-bold uppercase tracking-widest transition-colors hover:text-[var(--t-accent-main)]"
              style={{ color: 'var(--t-text-primary)' }}
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={p.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-code text-xs font-bold uppercase tracking-widest transition-colors hover:text-[var(--t-accent-main)]"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              <FileText className="w-4 h-4" />
              <span>RESUME PDF</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </div>

        {/* Footer */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 font-code text-[11px] font-bold uppercase tracking-widest"
          style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-muted)' }}
        >
          <div style={{ color: 'var(--t-text-primary)' }}>KAPIL JANGID</div>
          <div>AI-DRIVEN FULL STACK DEVELOPER</div>
        </div>
      </div>
    </section>
  );
};
