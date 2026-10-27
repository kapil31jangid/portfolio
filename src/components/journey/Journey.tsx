import { useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChapterHeader } from '../ui/ChapterHeader';
import { OrbitRing, Reveal, StaggerGroup, StaggerItem, ScrollVelocity } from '../ui/motion';
import { Award, GraduationCap, Users } from 'lucide-react';

/** Where the rail line sits, and therefore where the markers centre on it. */
const RAIL_LEFT = 19;

export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Drives the marker down the rail as the timeline passes the viewport.
  // Ranges are inset from 0/100% so it starts and finishes inside the line.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 45%'],
  });
  const markerTop = useTransform(scrollYProgress, [0, 1], ['4%', '96%']);

  const milestones = [
    {
      year: '2025', title: 'Silver Oak University',
      subtitle: 'B.Tech Computer Science & Engineering',
      meta: 'Jul 2025 – Jul 2029 · CGPA 8.83',
      detail: 'Core CSE fundamentals, OOP, Data Structures, DBMS & active participation in technical societies.',
      icon: GraduationCap,
    },
    {
      year: '2025', title: 'IIT Madras',
      subtitle: 'BS Data Science & Applications',
      meta: 'Sep 2025 – Present · Remote',
      detail: 'Specializing in machine learning algorithms, statistical data analytics & computational systems.',
      icon: GraduationCap,
    },
    {
      year: '2026', title: 'CodeXLab',
      subtitle: 'Organizer',
      meta: '2026 – Present · SOU',
      detail: 'Organized university technical community and hands-on C/C++ bootcamp focused on programming fundamentals & peer mentorship.',
      icon: Users,
    },
    {
      year: '2026', title: 'IEEE SOU SIGHT SBG',
      subtitle: 'Secretary',
      meta: 'Apr 2026 – Aug 2026 · Leadership',
      detail: 'Led humanitarian technology initiatives and coordinated technical activities, community projects & outreach under IEEE SIGHT.',
      icon: Award,
    },
  ];

  return (
    <section
      id="journey"
      className="relative py-16 md:py-24 border-b select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-primary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-hairline)',
      }}
    >
      <div className="shell relative z-10 space-y-12">
        <ChapterHeader index="04" label="JOURNEY" eyebrow="EXPERIENCE & EDUCATION" badge="04 / 06" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── STICKY RAIL ──
              Holds its position while the timeline scrolls past, so the
              section reads as a running log rather than a list. Purely
              decorative, hence `aria-hidden` — the milestones carry the
              content, and announcing an empty graphic would only add noise.
              Hidden below `lg`, where there is no room to pin anything. */}
          <aside aria-hidden="true" className="hidden lg:flex lg:col-span-4 justify-center">
            <div className="sticky top-32 w-full max-w-[320px] aspect-square">
              <OrbitRing duration={22} tilt={70} />

              {/* Concentric rings, so the mark reads as a radar sweep. */}
              <span
                className="absolute inset-[15%] rounded-full border"
                style={{ borderColor: 'var(--t-hairline)' }}
              />
              <span
                className="absolute inset-[31%] rounded-full border"
                style={{ borderColor: 'var(--t-hairline)' }}
              />
              <span
                className="absolute inset-[43%] rounded-full"
                style={{ backgroundColor: 'var(--t-accent-main)', opacity: 0.1 }}
              />
            </div>
          </aside>

          {/* ── TIMELINE ── */}
          <div ref={timelineRef} className="lg:col-span-8 relative">
            <div
              className="absolute top-2 bottom-2 w-px pointer-events-none"
              style={{ left: RAIL_LEFT, backgroundColor: 'var(--t-hairline)' }}
            >
              <motion.div
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-full"
                style={{ background: 'linear-gradient(180deg, var(--t-accent-cool), var(--t-accent-main))' }}
              />

              {/* Marker riding the line. Hidden entirely under reduced motion —
                  unlike the scroll progress bar, this one is pure decoration
                  with no information to preserve. */}
              {!prefersReduced && (
                <motion.div
                  className="absolute left-1/2 rounded-full"
                  style={{
                    top: markerTop,
                    width: 10,
                    height: 10,
                    marginLeft: -5,
                    marginTop: -5,
                    background: 'var(--t-accent-main)',
                    boxShadow: '0 0 14px var(--t-accent-main)',
                  }}
                />
              )}
            </div>

            <ScrollVelocity intensity={0.25} className="space-y-6 md:space-y-8">
              {milestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <Reveal
                    key={m.title}
                    direction="up"
                    distance={1}
                    delay={0.08 * idx}
                    className="relative pl-14"
                  >
                    {/* Numbered marker, centred on the rail line */}
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.1 * idx }}
                      className="absolute top-7 w-10 h-10 rounded-full border flex items-center justify-center font-code text-[11px] font-bold z-10"
                      style={{
                        left: 0,
                        backgroundColor: 'var(--t-bg-panel)',
                        color: 'var(--t-accent-ink)',
                        borderColor: 'var(--t-hairline)',
                      }}
                    >
                      0{idx + 1}
                    </motion.div>

                    <div className="card p-4 md:p-5 space-y-3 group-hover:border-[var(--t-accent-main)] transition-border duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-display text-4xl md:text-5xl leading-none"
                            style={{ color: 'var(--t-accent-main)' }}
                          >
                            {m.year}
                          </span>
                          <span
                            className="p-2 rounded-full border"
                            style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                        </div>

                        {/* Date badge, as on the reference's experience cards */}
                        <span
                          className="font-code text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                          style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-muted)' }}
                        >
                          {m.meta}
                        </span>
                      </div>

                      <h3
                        className="font-display text-2xl md:text-3xl uppercase leading-tight"
                        style={{ color: 'var(--t-heading)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="font-body text-base font-semibold" style={{ color: 'var(--t-accent-ink)' }}>
                        {m.subtitle}
                      </p>
                      <p className="font-body text-base leading-relaxed" style={{ color: 'var(--t-text-secondary)' }}>
                        {m.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ScrollVelocity>
          </div>
        </div>

        {/* Community memberships */}
        <Reveal
          direction="up"
          distance={0.9}
          duration={0.6}
          className="pt-12 border-t space-y-5"
          style={{ borderColor: 'var(--t-hairline)' }}
        >
          <div
            className="font-code text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--t-accent-ink)' }}
          >
            COMMUNITY MEMBERSHIPS & GUILD AFFILIATIONS
          </div>
          <StaggerGroup className="flex flex-wrap gap-3" stagger={0.08}>
            {PORTFOLIO_DATA.communityMemberships.map((mem) => (
              <StaggerItem
                key={mem.name}
                className="card flex items-center gap-2.5 px-4 py-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--t-accent-main)' }} />
                <span className="font-body text-sm font-semibold">{mem.name}</span>
                <span className="font-code text-[11px]" style={{ color: 'var(--t-text-muted)' }}>
                  ({mem.period})
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
};
