import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Mail, MapPin, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimeMountainScenery, KanjiEmblem } from '../ui/AnimePrimitives';

export const Contact = () => {
  const p = PORTFOLIO_DATA.personal;

  return (
    <section
      id="contact"
      className="relative pt-24 pb-12 mode-energy-night overflow-hidden bg-halftone select-none border-t-[4px] border-[var(--t-chapter-border)]"
    >

      <div className="section-anime relative z-10 space-y-20">
        {/* STANDARDIZED CHAPTER HEADER SYSTEM */}
        <div className="flex items-center justify-between border-b-[4px] border-[var(--t-divider)]/20 pb-6">
          <div className="flex items-center gap-4">
            <KanjiEmblem symbol="悟" size="md" className="shadow-[4px_4px_0px_#11172C]" />
            <div>
              <span className="font-code text-xs font-bold text-[var(--t-accent-ink)] tracking-widest uppercase">
                [ THE NEXT CHAPTER BEGINS ]
              </span>
              <h2 className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1 text-[var(--t-text-primary)]">
                06 / NEXT ADVENTURE
              </h2>
            </div>
          </div>

          <span className="hidden sm:inline-block px-4 py-1.5 font-manga text-base bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase">
            EPISODE END
          </span>
        </div>

        {/* Large Typography Statement */}
        <div className="max-w-5xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-2"
          >
            <span className="font-code text-xs font-bold text-[var(--t-accent-ink)] uppercase tracking-widest block">
              [ FINAL EPISODE FRAME ]
            </span>
            <h3 className="font-manga text-7xl sm:text-9xl md:text-[130px] leading-[0.84] tracking-wider uppercase select-none text-[var(--t-text-primary)]">
              LET'S BUILD <br />
              SOMETHING <br />
              <span className="text-[var(--t-accent-main)] manga-stroke-navy drop-shadow-[6px_6px_0px_#11172C]">
                POWERFUL.
              </span>
            </h3>
          </motion.div>

          {/* Direct Email Link Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="pt-2"
          >
            <a
              href={`mailto:${p.email}`}
              className="contact-email anime-btn anime-btn-orange text-2xl md:text-3xl px-8 py-5 rounded-lg"
            >
              <Mail className="w-8 h-8 text-[var(--t-accent-ink)]" />
              <span>{p.email}</span>
            </a>
          </motion.div>

          {/* Links & Location Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-8 pt-4 text-[var(--t-text-primary)] font-manga text-2xl"
          >
            <div className="flex items-center gap-2 font-code text-xs font-bold text-[var(--t-cool-ink)] bg-[var(--t-bg-panel)] px-4 py-2 rounded-lg border-2 border-[var(--t-chapter-border)]">
              <MapPin className="w-4 h-4 text-[var(--t-accent-ink)]" />
              <span>{p.location}</span>
            </div>

            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--t-accent-ink)] transition-colors"
            >
              <GithubIcon className="w-6 h-6" />
              <span>GITHUB</span>
            </a>

            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--t-cool-ink)] hover:text-[var(--t-accent-ink)] transition-colors"
            >
              <LinkedinIcon className="w-6 h-6" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={p.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--t-accent-ink)] hover:text-[var(--t-accent-ink)] transition-colors"
            >
              <FileText className="w-6 h-6" />
              <span>RESUME PDF</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* VERY BOTTOM FINAL SIGNATURE FOOTER */}
        <div className="pt-16 border-t-4 border-[var(--t-divider)]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-manga text-2xl text-[var(--t-accent-ink)] tracking-wider uppercase">
          <div>KAPIL JANGID</div>
          <div className="text-[var(--t-cool-ink)] text-xl">AI-DRIVEN FULL STACK DEVELOPER</div>
        </div>
      </div>

      <AnimeMountainScenery className="relative z-10 -mb-12 mt-12 opacity-90" />
    </section>
  );
};
