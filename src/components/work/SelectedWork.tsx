import { PORTFOLIO_DATA } from '../../data/portfolio';
import { StocklyticsVisual } from '../projects/StocklyticsVisual';
import { VendorBridgeVisual } from '../projects/VendorBridgeVisual';
import { ChapterHeader } from '../ui/ChapterHeader';
import { Reveal, TiltCard, Magnetic, ClickBurst } from '../ui/motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { motion } from 'framer-motion';
import { SoundEffect } from '../ui/motion/SoundEffect';

export const SelectedWork = () => {
  const stocklytics = PORTFOLIO_DATA.projects.find((p) => p.id === 'stocklytics-ai')!;
  const vendorbridge = PORTFOLIO_DATA.projects.find((p) => p.id === 'vendorbridge')!;
  const projects = [stocklytics, vendorbridge];

  return (
    <section id="work" className="relative overflow-hidden select-none py-16 md:py-24 border-b" style={{ backgroundColor: 'var(--t-bg-primary)', borderColor: 'var(--t-hairline)' }}>
      <div className="shell space-y-16 md:space-y-20">
        <ChapterHeader index="03" label="PROJECTS" eyebrow="SELECTED WORK" badge="03 / 06" />
        {projects.map((project) => (
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
                  <Magnetic strength={0.15}>
                    <div className="project-visual relative overflow-hidden border-4 border-black p-1 comic-panel-hover" style={{ background: 'var(--t-card-bg)', boxShadow: '0 6px 0 #000000' }}>
                      {project.id === 'stocklytics-ai' ? <StocklyticsVisual /> : <VendorBridgeVisual />}
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
                      </motion.div>
                    </div>
                  </Magnetic>
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
        ))}
      </div>
    </section>
  );
};
