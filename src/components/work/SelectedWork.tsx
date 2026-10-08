import { PORTFOLIO_DATA } from '../../data/portfolio';
import { StocklyticsVisual } from '../projects/StocklyticsVisual';
import { VendorBridgeVisual } from '../projects/VendorBridgeVisual';
import { motion } from 'framer-motion';
import { ChapterHeader } from '../ui/ChapterHeader';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from '../ui/motion';

export const SelectedWork = () => {
  const stocklytics = PORTFOLIO_DATA.projects.find((p) => p.id === 'stocklytics-ai')!;
  const vendorbridge = PORTFOLIO_DATA.projects.find((p) => p.id === 'vendorbridge')!;

  return (
    <section
      id="work"
      className="relative overflow-hidden select-none py-24 md:py-36 border-b"
      style={{ backgroundColor: 'var(--t-bg-primary)', borderColor: 'var(--t-hairline)' }}
    >
      <div className="shell space-y-20 md:space-y-28">
        <ChapterHeader index="03" label="PROJECTS" eyebrow="SELECTED WORK" badge="03 / 06" />

        {/* ──── PROJECT 01 — STOCKLYTICS AI ──── */}
        <article className="space-y-12">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b"
            style={{ borderColor: 'var(--t-hairline)' }}
          >
            <Reveal direction="up" duration={0.6} className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full font-code text-[11px] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
                >
                  BATTLE ARC I
                </span>
                <span
                  className="font-code text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--t-text-muted)' }}
                >
                  // RETAIL INTELLIGENCE & POS PLATFORM
                </span>
              </div>

              <h3 className="font-display text-5xl sm:text-7xl uppercase leading-none" style={{ color: 'var(--t-heading)' }}>
                {stocklytics.title}
              </h3>

              <p className="font-body text-lg font-semibold" style={{ color: 'var(--t-accent-ink)' }}>
                {stocklytics.subtitle}
              </p>
            </Reveal>

            <StaggerGroup className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end" stagger={0.07}>
              {stocklytics.technologies.map((tech) => (
                <StaggerItem
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
                >
                  {tech}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Interactive retail dashboard mockup */}
          <Reveal duration={0.7} distance={1.4}>
            <TiltCard intensity={4}>
              <StocklyticsVisual />
            </TiltCard>
          </Reveal>

          <Reveal direction="up" duration={0.6} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 space-y-4">
              <h4
                className="font-display text-xl uppercase pb-3 border-b"
                style={{ color: 'var(--t-heading)', borderColor: 'var(--t-hairline)' }}
              >
                MISSION BRIEFING & ARCHITECTURE
              </h4>
              {stocklytics.description.map((desc, i) => (
                <p key={i} className="font-body text-base leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                  {desc}
                </p>
              ))}
            </div>

            <div className="card p-6 space-y-4">
              <h4
                className="font-display text-xl uppercase pb-3 border-b"
                style={{ color: 'var(--t-heading)', borderColor: 'var(--t-hairline)' }}
              >
                CORE CAPABILITIES & CALLOUTS
              </h4>
              <StaggerGroup className="flex flex-wrap gap-2 pt-1" stagger={0.055}>
                {stocklytics.featureLabels?.map((feat) => (
                  <StaggerItem
                    key={feat}
                    className="px-3 py-1.5 rounded-full font-code text-[11px] font-bold"
                    style={{ backgroundColor: 'var(--t-accent-cool)', color: '#FFFFFF' }}
                  >
                    {feat}
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </article>

        {/* ──── PROJECT 02 — VENDORBRIDGE ──── */}
        <article className="space-y-12">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b"
            style={{ borderColor: 'var(--t-hairline)' }}
          >
            <Reveal direction="up" duration={0.6} className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full font-code text-[11px] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--t-tag-bg)', color: 'var(--t-tag-text)' }}
                >
                  BATTLE ARC II
                </span>
                <span
                  className="font-code text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--t-text-muted)' }}
                >
                  // SUPPLY CHAIN AUTOMATION ENGINE
                </span>
              </div>

              <h3 className="font-display text-5xl sm:text-7xl uppercase leading-none" style={{ color: 'var(--t-heading)' }}>
                {vendorbridge.title}
              </h3>

              <p className="font-body text-lg font-semibold" style={{ color: 'var(--t-accent-ink)' }}>
                {vendorbridge.subtitle}
              </p>
            </Reveal>

            <StaggerGroup className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end" stagger={0.07}>
              {vendorbridge.technologies.map((tech) => (
                <StaggerItem
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
                >
                  {tech}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Interactive procurement interface mockup */}
          <Reveal duration={0.7} distance={1.4}>
            <TiltCard intensity={4}>
              <VendorBridgeVisual />
            </TiltCard>
          </Reveal>

          <Reveal direction="up" duration={0.6} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 space-y-4">
              <h4
                className="font-display text-xl uppercase pb-3 border-b"
                style={{ color: 'var(--t-heading)', borderColor: 'var(--t-hairline)' }}
              >
                AUTOMATION MISSION ARCHITECTURE
              </h4>
              {vendorbridge.description.map((desc, i) => (
                <p key={i} className="font-body text-base leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                  {desc}
                </p>
              ))}
            </div>

            <div className="card p-6 space-y-4">
              <h4
                className="font-display text-xl uppercase pb-3 border-b"
                style={{ color: 'var(--t-heading)', borderColor: 'var(--t-hairline)' }}
              >
                AUTOMATED WORKFLOW PIPELINE
              </h4>
              <div className="space-y-4 pt-1">
                {/* A slower stagger so the steps read as a sequence, not a set. */}
                <StaggerGroup className="flex flex-wrap gap-2" stagger={0.11} delay={0.1}>
                  {vendorbridge.workflow?.map((step) => (
                    <StaggerItem
                      key={step}
                      className="px-3 py-1.5 rounded-full font-code text-[11px] font-bold"
                      style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
                    >
                      {step}
                    </StaggerItem>
                  ))}
                </StaggerGroup>

                {/* Progress line that wipes in underneath, so the row reads as a
                    pipeline advancing rather than a static list. */}
                <motion.div
                  className="h-px origin-left"
                  style={{
                    background: 'linear-gradient(90deg, var(--t-accent-main), var(--t-accent-cool))',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  );
};
