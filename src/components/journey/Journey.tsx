import { PORTFOLIO_DATA } from '../../data/portfolio';
import { motion } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';
import { Award, GraduationCap, Users } from 'lucide-react';

export const Journey = () => {
  const milestones = [
    {
      year: '2025', title: 'Silver Oak University',
      subtitle: 'B.Tech Computer Science & Engineering',
      meta: 'Jul 2025 – Jul 2029 · CGPA 8.83',
      detail: 'Core CSE fundamentals, OOP, Data Structures, DBMS & active participation in technical societies.',
      icon: GraduationCap, color: 'var(--t-accent-ink)', align: 'left',
    },
    {
      year: '2025', title: 'IIT Madras',
      subtitle: 'BS Data Science & Applications',
      meta: 'Sep 2025 – Present · Remote',
      detail: 'Specializing in machine learning algorithms, statistical data analytics & computational systems.',
      icon: GraduationCap, color: 'var(--t-cool-ink)', align: 'right',
    },
    {
      year: '2026', title: 'CodeXLab',
      subtitle: 'Organizer',
      meta: '2026 – Present · SOU',
      detail: 'Organized university technical community and hands-on C/C++ bootcamp focused on programming fundamentals & peer mentorship.',
      icon: Users, color: 'var(--t-accent-bright)', align: 'left',
    },
    {
      year: '2026', title: 'IEEE SOU SIGHT SBG',
      subtitle: 'Secretary',
      meta: 'Apr 2026 – Aug 2026 · Leadership',
      detail: 'Led humanitarian technology initiatives and coordinated technical activities, community projects & outreach under IEEE SIGHT.',
      icon: Award, color: 'var(--t-accent-ink)', align: 'right',
    },
  ];

  return (
    <section
      id="journey"
      className="relative py-28 md:py-40 border-b-[4px] overflow-hidden bg-halftone-cream select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-primary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-chapter-border)',
      }}
    >
      <div className="section-anime relative z-10 space-y-20">
        {/* Chapter Header */}
        <div
          className="flex items-center justify-between border-b-[4px] pb-6"
          style={{ borderColor: 'var(--t-chapter-border)' }}
        >
          <div className="flex items-center gap-4">
            <KanjiEmblem symbol="界" size="md" className="shadow-[4px_4px_0px_#11172C]" />
            <div>
              <span className="font-code text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t-accent-ink)' }}>
                [ PROGRESSION & CHECKPOINTS ]
              </span>
              <h2 className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1" style={{ color: 'var(--t-heading)' }}>
                04 / JOURNEY
              </h2>
            </div>
          </div>
          <span
            className="hidden sm:inline-block px-4 py-1.5 font-manga text-base border-2 border-[#11172C] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase"
            style={{ backgroundColor: 'var(--t-accent-main)', color: 'var(--dbz-ink)' }}
          >
            CHAPTER 04
          </span>
        </div>

        {/* Winding Path */}
        <div className="relative max-w-5xl mx-auto py-4">
          {/* Center line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 pointer-events-none hidden md:block"
            style={{ backgroundColor: 'var(--t-divider)' }}
          >
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-[#F47B20] via-[#FFD447] to-[#35B8FF]"
            />
          </div>

          <div className="space-y-20 md:space-y-28">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isLeft = m.align === 'left';
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Centre marker */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      className="w-10 h-10 rounded-full border-[3px] flex items-center justify-center font-code text-xs font-bold"
                      style={{
                        backgroundColor: 'var(--t-surface)',
                        color: 'var(--t-accent-main)',
                        borderColor: 'var(--t-bg-primary)',
                        boxShadow: '0 0 15px var(--t-aura-gold)',
                      }}
                    >
                      0{idx + 1}
                    </motion.div>
                  </div>

                  <div className={`md:col-span-6 ${isLeft ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'}`}>
                    <div className="space-y-3">
                      <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span
                          className="font-manga text-6xl md:text-8xl drop-shadow-[4px_4px_0px_#11172C]"
                          style={{ color: 'var(--t-accent-ink)' }}
                        >
                          {m.year}
                        </span>
                        <div
                          className="p-2.5 rounded-lg border-2 border-[#11172C] shadow-[3px_3px_0px_#11172C]"
                          style={{ backgroundColor: 'var(--t-surface)', color: '#FFF1CF' }}
                        >
                          <Icon className="w-5 h-5" style={{ color: 'var(--t-accent-main)' }} />
                        </div>
                      </div>

                      <h3 className="font-manga text-3xl md:text-5xl uppercase tracking-wide leading-tight" style={{ color: 'var(--t-heading)' }}>
                        {m.title}
                      </h3>
                      <p className="font-body text-xl font-bold" style={{ color: 'var(--t-accent-ink)' }}>
                        {m.subtitle}
                      </p>
                      <div className="font-code text-xs font-bold uppercase" style={{ color: 'var(--t-text-secondary)' }}>
                        {m.meta}
                      </div>
                      <p className="font-body text-base font-medium leading-relaxed max-w-md pt-1" style={{ color: 'var(--t-text-secondary)' }}>
                        {m.detail}
                      </p>
                    </div>
                  </div>

                  <div className={`hidden md:block md:col-span-6 ${isLeft ? 'md:order-2' : 'md:order-1'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Community Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t-2 space-y-4"
          style={{ borderColor: 'var(--t-divider)' }}
        >
          <div className="font-code text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-ink)' }}>
            COMMUNITY MEMBERSHIPS & GUILD AFFILIATIONS
          </div>
          <div className="flex flex-wrap gap-4">
            {PORTFOLIO_DATA.communityMemberships.map((mem) => (
              <div
                key={mem.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#11172C] shadow-[2px_2px_0px_var(--t-accent-main)]"
                style={{ backgroundColor: 'var(--t-surface)', color: '#FFF1CF' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--t-accent-main)' }} />
                <span className="font-manga text-lg" style={{ color: 'var(--t-accent-main)' }}>{mem.name}</span>
                <span className="font-code text-xs" style={{ color: 'rgba(255,241,207,0.7)' }}>({mem.period})</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
