import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ArrowUpRight, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';

export const Credentials = () => {
  return (
    <section
      id="credentials"
      className="relative py-24 md:py-36 border-b-[4px] overflow-hidden bg-halftone select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-secondary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-bg-secondary)',
      }}
    >
      <div className="section-anime relative z-10 space-y-16">
        {/* Chapter Header */}
        <div
          className="flex items-center justify-between border-b-[4px] pb-6"
          style={{ borderColor: 'var(--t-divider)' }}
        >
          <div className="flex items-center gap-4">
            <KanjiEmblem symbol="印" size="md" className="shadow-[4px_4px_0px_#11172C]" />
            <div>
              <span className="font-code text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t-accent-ink)' }}>
                [ EARNED MILESTONES ]
              </span>
              <h2 className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1" style={{ color: 'var(--t-text-primary)' }}>
                05 / ACHIEVEMENTS
              </h2>
            </div>
          </div>
          <span
            className="hidden sm:inline-block px-4 py-1.5 font-manga text-base border-2 border-[#11172C] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase"
            style={{ backgroundColor: 'var(--t-accent-main)', color: '#11172C' }}
          >
            CHAPTER 05
          </span>
        </div>

        {/* Achievement List */}
        <div className="space-y-4">
          {PORTFOLIO_DATA.certifications.map((cert, idx) => {
            const hasUrl = Boolean(cert.url);
            const Component = hasUrl ? 'a' : 'div';
            const indexCode = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
              >
                <Component
                  {...(hasUrl ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group p-5 md:p-6 rounded-lg border-[3px] border-[#11172C] shadow-[5px_5px_0px_#11172C] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 relative overflow-hidden ${
                    hasUrl ? 'cursor-pointer hover:translate-x-3' : ''
                  }`}
                  style={{ backgroundColor: 'var(--t-bg-panel)', color: 'var(--t-text-primary)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    if (hasUrl) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--t-accent-main)';
                    }
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#11172C';
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, var(--t-aura-gold) 0%, transparent 50%, var(--t-aura-blue) 100%)' }}
                  />

                  {/* Left: Index + Emblem + Title */}
                  <div className="flex items-center gap-5 min-w-0 relative z-10">
                    <span
                      className="font-manga text-3xl md:text-4xl transition-colors shrink-0 font-bold group-hover:opacity-80"
                      style={{ color: 'var(--t-accent-ink)' }}
                    >
                      {indexCode}
                    </span>

                    <div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--t-bg-secondary)',
                        color: 'var(--t-accent-ink)',
                        borderColor: 'var(--t-accent-main)',
                        boxShadow: '2px 2px 0px #11172C',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px var(--t-aura-gold)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0px #11172C';
                      }}
                    >
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h3
                        className="font-manga text-2xl md:text-3xl tracking-wide uppercase break-words transition-colors group-hover:opacity-80"
                        style={{ color: 'var(--t-text-primary)' }}
                      >
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 font-body text-sm font-semibold" style={{ color: 'var(--t-text-secondary)' }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: 'var(--t-cool-ink)' }} />
                        <span>ISSUED BY {cert.issuer.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Date + Verify */}
                  <div className="flex items-center justify-between md:justify-end gap-6 font-code text-xs shrink-0 relative z-10 pt-2 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--t-divider)' }}>
                    <span
                      className="px-3.5 py-1.5 rounded-lg font-bold border"
                      style={{
                        backgroundColor: 'var(--t-bg-secondary)',
                        color: 'var(--t-cool-ink)',
                        borderColor: 'rgba(53,184,255,0.4)',
                      }}
                    >
                      DATE: {cert.date}
                    </span>
                    {hasUrl && (
                      <span className="anime-btn anime-btn-orange text-sm px-3.5 py-1.5 rounded-lg">
                        <span>VERIFY</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </Component>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
