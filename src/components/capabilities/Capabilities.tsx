import { motion } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';

export const Capabilities = () => {
  const categories = [
    { code: '01', title: 'AI / ML',    skills: ['LLMs', 'RAG', 'AI Agents', 'Prompt Engineering', 'ML Fundamentals'] },
    { code: '02', title: 'BACKEND',    skills: ['FastAPI', 'REST APIs', 'Node.js', 'Express'] },
    { code: '03', title: 'DATABASES',  skills: ['PostgreSQL', 'Supabase', 'Neon', 'SQL'] },
    { code: '04', title: 'CLOUD',      skills: ['Google Cloud Platform', 'Cloud Run', 'AWS', 'AWS Amplify', 'Docker'] },
    { code: '05', title: 'LANGUAGES',  skills: ['Python', 'C', 'C++', 'SQL', 'HTML', 'CSS'] },
    { code: '06', title: 'CORE CS',    skills: ['DSA', 'OOP', 'DBMS', 'System Design'] },
    { code: '07', title: 'TOOLS',      skills: ['Git', 'GitHub', 'VS Code', 'Linux'] },
  ] as const;

  return (
    <section
      id="skills"
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
            <KanjiEmblem symbol="術" size="md" className="shadow-[4px_4px_0px_#11172C]" />
            <div>
              <span className="font-code text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--t-cool-ink)' }}>
                [ TRAINING ARC ]
              </span>
              <h2
                className="font-manga text-5xl md:text-7xl tracking-wide uppercase leading-none mt-1"
                style={{ color: 'var(--t-text-primary)' }}
              >
                02 / SKILLS
              </h2>
            </div>
          </div>
          <span
            className="hidden sm:inline-block px-4 py-1.5 font-manga text-base border-2 border-[#11172C] shadow-[3px_3px_0px_#11172C] rounded-lg uppercase"
            style={{ backgroundColor: 'var(--t-accent-main)', color: '#11172C' }}
          >
            CHAPTER 02
          </span>
        </div>

        {/* Technique List */}
        <div className="space-y-0 divide-y-[3px] divide-[var(--t-divider)]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.04 * idx }}
              className="group py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center cursor-default px-4 rounded-lg relative transition-all duration-300"
              style={{ '--hover-bg': 'var(--t-bg-panel)' } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--t-bg-panel)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {/* Hover aura border */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2"
                style={{ borderColor: 'var(--t-accent-cool)', boxShadow: `0 0 40px var(--t-aura-blue)` }}
              />

              {/* Number & Category */}
              <div className="md:col-span-4 flex items-center gap-4 relative z-10">
                <span
                  className="font-manga text-3xl md:text-4xl shrink-0 transition-colors"
                  style={{ color: 'var(--t-accent-ink)' }}
                >
                  {cat.code}
                </span>
                <h3
                  className="font-manga text-3xl md:text-5xl tracking-wide uppercase transition-colors"
                  style={{ color: 'var(--t-text-primary)' }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="md:col-span-8 flex flex-wrap items-center gap-3 relative z-10">
                {cat.skills.map((skill, sIdx) => (
                  <span key={skill} className="inline-flex items-center gap-3">
                    <span
                      className="px-4 py-2 rounded-lg font-manga text-xl border-[3px] border-[var(--t-chapter-border)] shadow-[3px_3px_0px_#11172C] group-hover:scale-[1.03] transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--t-card-bg)',
                        color: 'var(--t-card-text)',
                      }}
                    >
                      {skill}
                    </span>
                    {sIdx < cat.skills.length - 1 && (
                      <span className="font-manga text-2xl select-none" style={{ color: 'var(--t-accent-ink)' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
