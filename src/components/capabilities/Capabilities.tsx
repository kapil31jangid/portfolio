import { motion } from 'framer-motion';
import { ChapterHeader } from '../ui/ChapterHeader';
import { StaggerGroup, StaggerItem } from '../ui/motion';

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
      className="relative py-16 md:py-24 border-b overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--t-bg-secondary)',
        color: 'var(--t-text-primary)',
        borderColor: 'var(--t-hairline)',
      }}
    >
      <div className="shell relative z-10 space-y-12">
        <ChapterHeader index="02" label="SKILLS" eyebrow="TECHNICAL SKILLS" badge="02 / 06" tone="cool" />

        <div className="border-t" style={{ borderColor: 'var(--t-hairline)' }}>
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.04 * idx }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center px-4 py-8 md:py-10 border-b card card-hover transition-colors duration-300"
              style={{ borderColor: 'var(--t-hairline)' }}
            >
              {/* Hover aura edge */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-y rounded-2xl"
                style={{ borderColor: 'var(--t-accent-cool)', boxShadow: '0 0 40px var(--t-aura-blue)' }}
              />

              <div className="absolute bottom-0 left-4 right-4 h-px overflow-hidden pointer-events-none">
                <motion.div
                  className="h-full origin-left"
                  style={{ background: 'linear-gradient(90deg, var(--t-accent-cool), var(--t-accent-main))' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.05 * idx, ease: 'easeOut' }}
                />
              </div>

              <div className="md:col-span-4 flex items-baseline gap-4 relative z-10">
                <span className="font-code text-sm font-bold shrink-0" style={{ color: 'var(--t-accent-ink)' }}>
                  {cat.code}
                </span>
                <h3
                  className="font-display text-3xl md:text-4xl uppercase leading-none group-hover:text-[var(--t-accent-main)] transition-colors"
                  style={{ color: 'var(--t-text-primary)' }}
                >
                  {cat.title}
                </h3>
              </div>

              <StaggerGroup className="md:col-span-8 flex flex-wrap items-center gap-2.5 relative z-10" stagger={0.045}>
                {cat.skills.map((skill) => (
                  <StaggerItem
                    key={skill}
                    className="px-3 py-1 rounded-full border font-body text-sm font-medium transition-all duration-200 group-hover:border-[var(--t-accent-cool)] group-hover:text-[var(--t-accent-cool)] group-hover:bg-[rgba(91,91,240,0.05)]"
                    style={{
                      borderColor: 'var(--t-hairline)',
                      backgroundColor: 'var(--t-card-bg)',
                      color: 'var(--t-card-text)',
                    }}
                  >
                    {skill}
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
