import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ChapterHeader } from '../ui/ChapterHeader';
import { AssembleHeading, Reveal, StaggerGroup, StaggerItem } from '../ui/motion';

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 border-b overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-primary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-hairline)',
      }}
    >
      <div className="shell relative z-10 space-y-16">
        <ChapterHeader index="01" label="ORIGIN" eyebrow="ABOUT ME" badge="01 / 06" />

        {/* Editorial statement */}
        <div className="max-w-5xl space-y-10">
          <Reveal direction="up" duration={0.6} className="space-y-4">
            <span
              className="font-code text-xs font-bold uppercase tracking-widest block"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              [ CORE PHILOSOPHY ]
            </span>
            <h3
              className="font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.92]"
              style={{ color: 'var(--t-heading)' }}
            >
              <AssembleHeading text="I BUILD TECHNOLOGY" stagger={0.03} />
              <br />
              <span style={{ color: 'var(--t-accent-main)' }}>
                <AssembleHeading text="TO SOLVE REAL PROBLEMS." stagger={0.03} delay={0.25} />
              </span>
            </h3>
          </Reveal>

          <Reveal direction="up" delay={0.15} duration={0.6}>
            <p
              className="font-body text-xl md:text-2xl font-medium leading-relaxed max-w-4xl border-l pl-6 py-1"
              style={{ color: 'var(--t-text-secondary)', borderColor: 'var(--t-accent-main)' }}
            >
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </Reveal>
        </div>

        {/* Focus pillars */}
        <Reveal
          direction="up"
          delay={0.25}
          duration={0.6}
          className="pt-10 border-t grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
          style={{ borderColor: 'var(--t-hairline)' }}
        >
          <div className="md:col-span-7 space-y-4">
            <span
              className="font-code text-xs font-bold uppercase tracking-widest block"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              ACTIVE TRAINING FOCUS
            </span>
            <StaggerGroup className="flex flex-wrap gap-2.5" stagger={0.06}>
              {PORTFOLIO_DATA.currentFocus.map((item) => (
                <StaggerItem
                  key={item}
                  className="card card-hover px-4 py-2 font-body text-sm font-semibold"
                >
                  {item}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div
            className="md:col-span-5 space-y-4 border-l-0 md:border-l pl-0 md:pl-10"
            style={{ borderColor: 'var(--t-hairline)' }}
          >
            <span
              className="font-code text-xs font-bold uppercase tracking-widest block"
              style={{ color: 'var(--t-accent-ink)' }}
            >
              ACADEMIC ACADEMIES
            </span>
            <StaggerGroup className="space-y-2.5" stagger={0.09} delay={0.12}>
              <StaggerItem
                className="card card-invert flex justify-between items-center gap-4 px-4 py-3.5"
              >
                <span className="font-body text-sm font-semibold">SILVER OAK UNIVERSITY</span>
                <span
                  className="font-code text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--t-accent-main)', color: '#FFFFFF' }}
                >
                  B.TECH (8.83)
                </span>
              </StaggerItem>
              <StaggerItem
                className="card card-invert flex justify-between items-center gap-4 px-4 py-3.5"
              >
                <span className="font-body text-sm font-semibold">IIT MADRAS</span>
                <span
                  className="font-code text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--t-accent-cool)', color: '#FFFFFF' }}
                >
                  BS DATA SCIENCE
                </span>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
