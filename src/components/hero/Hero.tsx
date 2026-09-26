import { PORTFOLIO_DATA } from '../../data/portfolio';
import { PowerToggle } from '../ui/PowerToggle';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ArrowDownRight, FileText, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimeMountainScenery, KanjiEmblem } from '../ui/AnimePrimitives';

export const Hero = () => {
  const p = PORTFOLIO_DATA.personal;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-16 pb-8 overflow-hidden bg-halftone select-none transition-colors duration-500"
      style={{ backgroundColor: 'var(--t-hero-bg)', color: 'var(--t-text-primary)' }}
    >
      <div className="hero-speed-lines" aria-hidden="true" />

      {/* ──── FOREGROUND ──── */}
      <div className="section-anime relative z-10 my-auto pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center min-h-[75vh]">

          {/* ═══ LEFT: TYPOGRAPHY + CTAs ═══ */}
          <div className="lg:col-span-7 space-y-7 relative z-20">

            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <PowerToggle />
              <KanjiEmblem symbol="悟" size="sm" className="shadow-[3px_3px_0px_#11172C]" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F47B20] text-[#11172C] border-[3px] border-[#11172C] shadow-[4px_4px_0px_#11172C]">
                <Sparkles className="w-4 h-4 text-[#11172C]" />
                <span className="font-manga text-sm tracking-wider uppercase">CURRENT FORM:</span>
                <span className="font-manga text-sm text-[#11172C] tracking-wider uppercase">
                  AI-DRIVEN FULL STACK DEVELOPER
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 font-code text-xs font-bold text-[#35B8FF] bg-[#0A1022] px-3.5 py-1.5 rounded-lg border-2 border-[#11172C]">
                <MapPin className="w-3.5 h-3.5 text-[#F47B20]" />
                <span>{p.location}</span>
              </div>
            </motion.div>

            {/* KAPIL / JANGID — colors driven by CSS vars */}
            <div className="space-y-1 relative">
              <motion.h1
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-manga text-7xl sm:text-8xl md:text-9xl xl:text-[130px] leading-[0.85] tracking-wider uppercase select-none"
              >
                <span
                  className="block manga-stroke-navy drop-shadow-[7px_7px_0px_#11172C] transition-colors duration-500"
                  style={{ color: 'var(--t-hero-kapil)' }}
                >
                  KAPIL
                </span>
                <span
                  className="block manga-stroke-navy drop-shadow-[7px_7px_0px_#11172C] transition-colors duration-500"
                  style={{ color: 'var(--t-hero-jangid)' }}
                >
                  JANGID
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-manga text-2xl sm:text-4xl tracking-wide uppercase pt-2 transition-colors duration-500"
                style={{ color: 'var(--t-hero-role)' }}
              >
                AI-DRIVEN FULL STACK DEVELOPER
              </motion.p>
            </div>

            {/* Editorial caption */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="font-body text-lg md:text-xl font-medium max-w-lg leading-relaxed pl-4 border-l-[3px] border-[#F47B20] transition-colors duration-500"
              style={{ color: 'var(--t-hero-caption)' }}
            >
              I build intelligent products across AI, backend systems and the web.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <a href="#work" className="anime-btn anime-btn-orange">
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href={p.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="anime-btn anime-btn-cream text-lg"
              >
                <FileText className="w-5 h-5 text-[#F47B20]" />
                <span>RESUME</span>
              </a>

              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l-2 border-[#FFF1CF]/20">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3.5 rounded-xl bg-[#0A1022] text-[#FFD447] border-[3px] border-[#11172C] shadow-[3px_3px_0px_#11172C] hover:scale-105 transition-all flex items-center gap-2 font-manga text-base"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">GITHUB</span>
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3.5 rounded-xl bg-[#0A1022] text-[#35B8FF] border-[3px] border-[#11172C] shadow-[3px_3px_0px_#11172C] hover:scale-105 transition-all flex items-center gap-2 font-manga text-base"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">LINKEDIN</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT: CHARACTER ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative lg:-ml-20 lg:-mr-6 mt-8 lg:mt-0 z-10"
          >
            <div className="hero-character">
              <div className="character-energy" aria-hidden="true" />
              <img
                src="/hero_character.jpg"
                alt="Dragon Ball-inspired martial artist with an electric aura"
                width="896"
                height="1200"
                fetchPriority="high"
                className="character-image"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimeMountainScenery className="relative z-10 -mb-8" />
    </section>
  );
};
