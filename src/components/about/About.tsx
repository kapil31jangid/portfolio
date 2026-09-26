import { PORTFOLIO_DATA } from '../../data/portfolio';
import { motion } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';

export const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 border-b-[4px] overflow-hidden bg-halftone-cream select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-primary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-chapter-border)',
      }}
    >
      {/* Speed Rays Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g stroke="var(--t-accent-main)" strokeWidth="1.5">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              const x1 = 300 + Math.cos(rad) * 100;
              const y1 = 300 + Math.sin(rad) * 100;
              const x2 = 300 + Math.cos(rad) * 900;
              const y2 = 300 + Math.sin(rad) * 900;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="10 8" />;
            })}
          </g>
        </svg>
      </div>

      <div className="section-anime relative z-10 space-y-16">
        {/* Chapter Header */}
        <div
          className="flex items-center justify-between border-b-[4px] pb-6"
          style={{ borderColor: 'var(--t-chapter-border)' }}
        >
          <div className="flex items-center gap-4">
            <KanjiEmblem symbol="亀" size="md" className="shadow-[4px_4px_0px_#11172C]" />
            <div>
              <span className="font-code text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t-accent-ink)' }}>
                [ CHARACTER ORIGIN ]
              </span>
              <h2
                className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1"
                style={{ color: 'var(--t-heading)' }}
              >
                01 / ORIGIN
              </h2>
            </div>
          </div>
          <span
            className="hidden sm:inline-block px-4 py-1.5 font-manga text-base border-2 border-[#11172C] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase"
            style={{ backgroundColor: 'var(--t-accent-main)', color: 'var(--dbz-ink)' }}
          >
            CHAPTER 01
          </span>
        </div>

        {/* Editorial Statement */}
        <div className="max-w-5xl space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <span className="font-code text-xs font-bold uppercase tracking-widest block" style={{ color: 'var(--t-accent-ink)' }}>
              [ CORE PHILOSOPHY ]
            </span>
            <h3
              className="font-manga text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wider uppercase"
              style={{ color: 'var(--t-heading)', textShadow: '5px 5px 0px var(--t-accent-main)' }}
            >
              I BUILD TECHNOLOGY <br />
              <span style={{ color: 'var(--t-accent-ink)', WebkitTextStroke: '2px #11172C' }}>
                TO SOLVE REAL PROBLEMS.
              </span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body text-xl md:text-2xl font-medium leading-relaxed max-w-4xl border-l-4 pl-6 py-1"
            style={{ color: 'var(--t-text-secondary)', borderColor: 'var(--t-accent-main)' }}
          >
            {PORTFOLIO_DATA.personal.summary}
          </motion.p>
        </div>

        {/* Focus Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="pt-8 border-t-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          style={{ borderColor: 'var(--t-divider)' }}
        >
          <div className="md:col-span-7 space-y-3">
            <span className="font-code text-xs font-bold uppercase tracking-widest block" style={{ color: 'var(--t-accent-ink)' }}>
              ACTIVE TRAINING FOCUS
            </span>
            <div className="flex flex-wrap gap-2.5">
              {PORTFOLIO_DATA.currentFocus.map((item) => (
                <span
                  key={item}
                  className="px-4 py-1.5 font-manga text-lg rounded-lg border-2 border-[#11172C] shadow-[2px_2px_0px_var(--t-accent-main)] hover:scale-105 transition-transform"
                  style={{ backgroundColor: 'var(--t-tag-bg)', color: 'var(--t-tag-text)' }}
                >
                  ⚡ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-3 border-l-0 md:border-l-2 pl-0 md:pl-8" style={{ borderColor: 'var(--t-divider)' }}>
            <span className="font-code text-xs font-bold uppercase tracking-widest block" style={{ color: 'var(--t-accent-ink)' }}>
              ACADEMIC ACADEMIES
            </span>
            <div className="space-y-2 font-body text-base font-bold">
              <div
                className="flex justify-between items-center p-3 rounded-lg border-2 border-[#11172C] shadow-[3px_3px_0px_var(--t-accent-main)]"
                style={{ backgroundColor: 'var(--t-surface)', color: '#FFF1CF' }}
              >
                <span>SILVER OAK UNIVERSITY</span>
                <span
                  className="font-code text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--t-accent-main)', color: 'var(--dbz-ink)' }}
                >
                  B.TECH (8.83)
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg border-2 border-[#11172C] shadow-[3px_3px_0px_#35B8FF]"
                style={{ backgroundColor: 'var(--t-surface)', color: '#FFF1CF' }}
              >
                <span>IIT MADRAS</span>
                <span className="font-code text-xs px-2 py-1 bg-[#35B8FF] text-[#11172C] rounded">
                  BS DATA SCIENCE
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
