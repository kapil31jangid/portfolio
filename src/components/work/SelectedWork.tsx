import { PORTFOLIO_DATA } from '../../data/portfolio';
import { StocklyticsVisual } from '../projects/StocklyticsVisual';
import { VendorBridgeVisual } from '../projects/VendorBridgeVisual';
import { motion } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';

export const SelectedWork = () => {
  const stocklytics = PORTFOLIO_DATA.projects.find((p) => p.id === 'stocklytics-ai')!;
  const vendorbridge = PORTFOLIO_DATA.projects.find((p) => p.id === 'vendorbridge')!;

  return (
    <section id="work" className="relative overflow-hidden select-none">
      {/* STANDARDIZED CHAPTER HEADER SYSTEM */}
      <div className="mode-energy-night py-12 border-b-[4px] border-[var(--t-chapter-border)] bg-halftone">
        <div className="section-anime">
          <div className="flex items-center justify-between border-b-[4px] border-[var(--t-divider)]/20 pb-6">
            <div className="flex items-center gap-4">
              <KanjiEmblem symbol="戦" size="md" className="shadow-[4px_4px_0px_#11172C]" />
              <div>
                <span className="font-code text-xs font-bold text-[var(--t-accent-ink)] tracking-widest uppercase">
                  [ FEATURED BATTLES ]
                </span>
                <h2 className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1 text-[var(--t-text-primary)]">
                  03 / PROJECTS
                </h2>
              </div>
            </div>

            <span className="hidden sm:inline-block px-4 py-1.5 font-manga text-base bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase">
              CHAPTER 03
            </span>
          </div>
        </div>
      </div>

      {/* ──── PROJECT 01 — STOCKLYTICS AI ──── */}
      <div className="relative py-20 md:py-32 mode-energy-night border-b-[4px] border-[var(--t-chapter-border)] overflow-hidden bg-speed-lines">
        <div className="section-anime space-y-12">
          {/* Battle Introduction Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b-[3px] border-[var(--t-divider)]/15 pb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-3 font-code text-xs font-bold text-[var(--t-cool-ink)]">
                <span className="bg-[var(--t-accent-main)] text-[var(--dbz-ink)] px-3 py-1 rounded-lg border-2 border-[var(--t-chapter-border)] font-manga text-base">
                  BATTLE ARC I
                </span>
                <span>// RETAIL INTELLIGENCE & POS PLATFORM</span>
              </div>

              <h3 className="font-manga text-6xl sm:text-8xl tracking-wider uppercase text-[var(--t-accent-ink)] drop-shadow-[5px_5px_0px_#11172C]">
                {stocklytics.title}
              </h3>

              <p className="font-body text-xl font-bold text-[var(--t-accent-ink)]">
                {stocklytics.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end"
            >
              {stocklytics.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg font-manga text-lg bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)] shadow-[2px_2px_0px_#FFD447]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Large Conceptual Retail Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <StocklyticsVisual />
          </motion.div>

          {/* Project Description Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4"
          >
            <div className="comic-card p-6 rounded-lg bg-[var(--t-bg-panel)] text-[var(--t-text-primary)] space-y-4">
              <h4 className="font-manga text-2xl text-[var(--t-accent-ink)] border-b border-[#FFD447]/30 pb-2">
                MISSION BRIEFING & ARCHITECTURE
              </h4>
              {stocklytics.description.map((desc, i) => (
                <p key={i} className="font-body text-base text-[var(--t-text-primary)]/85 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            <div className="comic-card p-6 rounded-lg bg-[var(--t-bg-panel)] text-[var(--t-text-primary)] space-y-4">
              <h4 className="font-manga text-2xl text-[var(--t-cool-ink)] border-b border-[#35B8FF]/30 pb-2">
                CORE CAPABILITIES & CALLOUTS
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {stocklytics.featureLabels?.map((feat) => (
                  <span
                    key={feat}
                    className="px-3.5 py-1.5 rounded-lg font-code text-xs font-bold bg-[var(--dbz-blue)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)]"
                  >
                    ⚡ {feat}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ──── PROJECT 02 — VENDORBRIDGE ──── */}
      <div className="relative py-20 md:py-32 mode-manga-day border-b-[4px] border-[var(--t-chapter-border)] overflow-hidden bg-halftone-cream">
        <div className="section-anime space-y-12">
          {/* Battle Introduction Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b-[3px] border-[var(--t-chapter-border)]/20 pb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-3 font-code text-xs font-bold text-[var(--t-alt-ink)]">
                <span className="bg-[var(--t-tag-bg)] text-[var(--t-tag-text)] px-3 py-1 rounded-lg border-2 border-[var(--t-chapter-border)] font-manga text-base">
                  BATTLE ARC II
                </span>
                <span>// SUPPLY CHAIN AUTOMATION ENGINE</span>
              </div>

              <h3 className="font-manga text-6xl sm:text-8xl tracking-wider uppercase text-[var(--t-text-primary)] drop-shadow-[5px_5px_0px_#E34835]">
                {vendorbridge.title}
              </h3>

              <p className="font-body text-xl font-bold text-[var(--t-alt-ink)]">
                {vendorbridge.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end"
            >
              {vendorbridge.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg font-manga text-lg bg-[var(--t-accent-alt)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)] shadow-[2px_2px_0px_#11172C]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Large Procurement Interface Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <VendorBridgeVisual />
          </motion.div>

          {/* Description & Workflow Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4"
          >
            <div className="comic-card-cream p-6 rounded-lg space-y-4">
              <h4 className="font-manga text-2xl text-[var(--t-text-primary)] border-b-2 border-[var(--t-chapter-border)] pb-2">
                AUTOMATION MISSION ARCHITECTURE
              </h4>
              {vendorbridge.description.map((desc, i) => (
                <p key={i} className="font-body text-base font-medium text-[var(--t-text-primary)]/90 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            <div className="comic-card-cream p-6 rounded-lg space-y-4">
              <h4 className="font-manga text-2xl text-[var(--t-text-primary)] border-b-2 border-[var(--t-chapter-border)] pb-2">
                AUTOMATED WORKFLOW PIPELINE
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {vendorbridge.workflow?.map((step) => (
                  <span
                    key={step}
                    className="px-3.5 py-1.5 rounded-lg font-code text-xs font-bold bg-[var(--t-accent-main)] text-[var(--dbz-ink)] border-2 border-[var(--t-chapter-border)]"
                  >
                    ► {step}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
