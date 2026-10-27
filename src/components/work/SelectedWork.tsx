import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ChapterHeader } from '../ui/ChapterHeader';
import { Reveal, TiltCard, ClickBurst } from '../ui/motion';
import { ExternalLink, AlertTriangle, Lightbulb } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundEffect } from '../ui/motion/SoundEffect';
import { X } from 'lucide-react';

const StocklyticsVisual = lazy(() => import('../projects/StocklyticsVisual').then((m) => ({ default: m.StocklyticsVisual })));
const VendorBridgeVisual = lazy(() => import('../projects/VendorBridgeVisual').then((m) => ({ default: m.VendorBridgeVisual })));

export const SelectedWork = () => {
  const stocklytics = PORTFOLIO_DATA.projects.find((p) => p.id === 'stocklytics-ai')!;
  const vendorbridge = PORTFOLIO_DATA.projects.find((p) => p.id === 'vendorbridge')!;
  const projects = [stocklytics, vendorbridge];
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);

  return (
    <>
      <section id="work" className="relative overflow-hidden select-none py-16 md:py-24 border-b" style={{ backgroundColor: 'var(--t-bg-primary)', borderColor: 'var(--t-hairline)' }}>
        <div className="shell space-y-16 md:space-y-20">
          <ChapterHeader index="03" label="PROJECTS" eyebrow="SELECTED WORK" badge="03 / 06" />
          {projects.map((project) => {
            return (
              <article key={project.id} className="relative space-y-8">
                <Reveal direction="up" duration={0.6}>
                  <div className="comic-panel comic-panel-hover p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end" style={{ borderColor: 'var(--t-hairline)' }}>
                    <div className="lg:col-span-8 space-y-4">
                      <SoundEffect text="MISSION" className="-mt-4 ml-1" color="blue" />
                      <h3 className="font-display text-4xl sm:text-5xl uppercase leading-[0.9] tracking-tighter group-hover:text-[var(--t-accent-main)] transition-colors duration-300" style={{ color: 'var(--t-heading)', textShadow: '3px 3px 0 #000000' }}>
                        {project.title}
                      </h3>
                      <p className="font-body text-lg md:text-xl font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-main)', textShadow: '2px 2px 0 #000000' }}>
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 border-2 border-black bg-white font-code text-[11px] font-bold uppercase tracking-widest group-hover:bg-[#EF3B2D] group-hover:text-white transition-all duration-200" style={{ color: 'var(--t-text-secondary)', boxShadow: '0 3px 0 #000000' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal duration={0.7} distance={1.4}>
                  <TiltCard intensity={4} spotlight={false}>
                    <ClickBurst theme="accent" maxRadius={180} rings={4} particleCount={16} disabled={false}>
                      <>
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-[440px] bg-[var(--t-bg-secondary)]">
                            <div className="font-code text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--t-text-muted)' }}>Loading visual…</div>
                          </div>
                        }>
                          {project.id === 'stocklytics-ai' ? <StocklyticsVisual /> : <VendorBridgeVisual />}
                        </Suspense>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 opacity-0 pointer-events-none group-hover:pointer-events-auto"
                        >
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-white font-code text-[11px] font-bold uppercase" style={{ color: 'var(--t-text-primary)', boxShadow: '0 4px 0 #000000' }}>
                              <GithubIcon className="w-3.5 h-3.5" /> VIEW CODE
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-white font-code text-[11px] font-bold uppercase" style={{ color: 'var(--t-text-primary)', boxShadow: '0 4px 0 #000000' }}>
                              <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                            </a>
                          )}
                          <button
                            onClick={() => setOpenCaseStudy(project.id)}
                            className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-white font-code text-[11px] font-bold uppercase"
                            style={{ color: 'var(--t-accent-main)', boxShadow: '0 4px 0 #000000' }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> CASE STUDY
                          </button>
                        </motion.div>
                      </>
                    </ClickBurst>
                  </TiltCard>
                </Reveal>

                <Reveal direction="up" duration={0.6} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card p-4 space-y-3 group-hover:border-[var(--t-accent-main)] transition-border duration-300" style={{ borderColor: 'var(--t-hairline)', boxShadow: '0 4px 0 #000000' }}>
                    <h4 className="font-display text-lg uppercase pb-2 border-b-2 border-black" style={{ color: 'var(--t-heading)', textShadow: '2px 2px 0 #000000' }}>
                      KEY FEATURES
                    </h4>
                    {project.featureLabels?.map((feature) => (
                      <motion.p
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4 }}
                        className="font-body text-sm leading-relaxed group-hover:text-[var(--t-accent-main)] transition-colors"
                        style={{ color: 'var(--t-text-secondary)' }}
                      >
                        {feature}
                      </motion.p>
                    ))}
                  </div>
                  <div className="card p-4 space-y-3 group-hover:border-[var(--t-accent-main)] transition-border duration-300" style={{ borderColor: 'var(--t-hairline)', boxShadow: '0 4px 0 #000000' }}>
                    <h4 className="font-display text-lg uppercase pb-2 border-b-2 border-black" style={{ color: 'var(--t-heading)', textShadow: '2px 2px 0 #000000' }}>
                      ARCHITECTURE
                    </h4>
                    {project.description.map((desc) => (
                      <motion.p
                        key={desc}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="font-body text-sm leading-relaxed group-hover:text-[var(--t-accent-main)] transition-colors"
                        style={{ color: 'var(--t-text-secondary)' }}
                      >
                        {desc}
                      </motion.p>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {openCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{ backgroundColor: 'var(--t-bg-primary)', border: '2px solid var(--t-hairline)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--t-hairline)' }}>
                <div className="flex items-center gap-4">
                  <span className="font-code text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-ink)' }}>
                    CASE STUDY
                  </span>
                  <h2 id="case-study-title" className="font-display text-2xl md:text-3xl uppercase" style={{ color: 'var(--t-heading)' }}>
                    {(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any)?.projectId ? (PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).projectId.replace('-', ' ').toUpperCase() : openCaseStudy.toUpperCase()}
                  </h2>
                </div>
                <button
                  onClick={() => setOpenCaseStudy(null)}
                  className="p-2 rounded-full border hover:bg-[var(--t-bg-secondary)] transition-colors"
                  style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
                  aria-label="Close case study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any) && (
                  <>
                    <CaseStudySection title="PROBLEM" icon={AlertTriangle} children={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).problem} />
                    <CaseStudySection title="SOLUTION" icon={Lightbulb} children={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).solution} />
                    <CaseStudyListSection title="ARCHITECTURE" items={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).architecture} />
                    <CaseStudyListSection title="CHALLENGES" items={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).challenges} />
                    <CaseStudyListSection title="OUTCOMES" items={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).outcomes} />
                    {(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).metrics && (
                      <CaseStudyMetricsSection metrics={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).metrics} />
                    )}
                    {(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).techStack && (
                      <CaseStudyTechStackSection techStack={(PORTFOLIO_DATA.projectCaseStudies[openCaseStudy] as any).techStack} />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Case Study Modal Sections
function CaseStudySection({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-main)' }}>
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="font-display text-lg uppercase" style={{ color: 'var(--t-heading)' }}>{title}</h3>
      </div>
      <p className="font-body text-base leading-relaxed pl-11" style={{ color: 'var(--t-text-secondary)' }}>{children}</p>
    </div>
  );
}

function CaseStudyListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg uppercase" style={{ color: 'var(--t-heading)' }}>{title}</h3>
      <ul className="space-y-2 pl-6">
        {items.map((item, idx) => (
          <li key={idx} className="font-body text-base leading-relaxed flex items-start gap-3 relative" style={{ color: 'var(--t-text-secondary)' }}>
            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--t-accent-main)' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudyMetricsSection({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg uppercase" style={{ color: 'var(--t-heading)' }}>KEY METRICS</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="card p-4 text-center" style={{ borderColor: 'var(--t-hairline)' }}>
            <div className="font-display text-2xl md:text-3xl" style={{ color: 'var(--t-accent-main)' }}>{m.value}</div>
            <div className="font-code text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--t-text-muted)' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudyTechStackSection({ techStack }: { techStack: { category: string; technologies: string[] }[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg uppercase" style={{ color: 'var(--t-heading)' }}>TECH STACK</h3>
      <div className="space-y-4">
        {techStack.map((stack, idx) => (
          <div key={idx} className="space-y-2">
            <div className="font-code text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-ink)' }}>{stack.category}</div>
            <div className="flex flex-wrap gap-2">
              {stack.technologies.map((tech, tIdx) => (
                <span key={tIdx} className="px-3 py-1 rounded-full border font-body text-sm font-medium" style={{ borderColor: 'var(--t-hairline)', backgroundColor: 'var(--t-card-bg)', color: 'var(--t-card-text)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}