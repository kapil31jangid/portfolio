import { useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ArrowDownRight, FileText, MapPin } from 'lucide-react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { AssembleHeading, Magnetic, OrbitRing, Typewriter, usePointerParallax } from '../ui/motion';
import { motionTokens } from '../../lib/motion-tokens';

const { splitDelay, splitDistance, splitDuration, splitEaseOut, splitEaseBack, panelGrowDuration, panelEase, roleTypewriterDelay, roleTypewriterSpeed, ctaDelay } = motionTokens.hero;

export const Hero = () => {
  const p = PORTFOLIO_DATA.personal;
  const prefersReduced = useReducedMotion();

  // A single pointer tracker for the hero; the ring drifts against it so the
  // composition reads as having depth. Kept to the ring — the wordmark itself
  // stays locked, since moving type is harder to read than moving decoration.
  const heroRef = useRef<HTMLElement>(null);
  const { x: pointerX, y: pointerY } = usePointerParallax(heroRef);
  const ringX = useTransform(pointerX, [-1, 1], [-18, 18]);
  const ringY = useTransform(pointerY, [-1, 1], [-14, 14]);

  return (
    <section
      id="hero"
      ref={heroRef}
          className="bg-dots relative min-h-screen flex flex-col justify-center overflow-hidden select-none pt-20 pb-12 transition-colors duration-500"
      style={{ backgroundColor: 'var(--t-bg-primary)', color: 'var(--t-text-primary)' }}
    >
      <div className="shell relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* ── STATUS RAIL ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <ThemeToggle />
            <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--t-accent-main)' }} />
              {p.location}
            </span>
            <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-code text-[11px] font-bold uppercase tracking-widest"
              style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-text-secondary)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--t-accent-main)' }} />
              ROLE: {p.positioning.toUpperCase()}
            </span>
          </motion.div>

          {/* ── WORDMARK ── */}
          <div className="relative w-full mt-8 sm:mt-12">
            {/* The orbit ring reads as the mark's halo. Sized off the viewport
                so it stays an ellipse rather than collapsing on narrow screens. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(86vw,600px)] aspect-square -z-10"
              style={{ x: ringX, y: ringY }}
            >
              <OrbitRing duration={motionTokens.orbit.heroDuration} tilt={motionTokens.orbit.heroTilt} />
            </motion.div>

            {/* Panel growing outward from the centre (ref #5), scoped to the
                wordmark rather than the viewport so it never blocks the page. */}
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 rounded-3xl pointer-events-none"
              style={{
                top: '14%',
                bottom: '14%',
                background: 'var(--t-accent-main)',
                opacity: 0.06,
                transformOrigin: 'center',
              }}
              initial={{ scaleX: prefersReduced ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: panelGrowDuration, ease: panelEase }}
            />

            <h1 className="relative font-display text-[19vw] sm:text-8xl md:text-9xl xl:text-[150px] leading-[0.82] uppercase">
              {/* The two halves slide apart at the peak of the flourish, then
                  snap back — the reference's split (ref #4), played once on
                  entry rather than on every section change. The return leg uses
                  `backOut` so the halves overshoot slightly into place, which is
                  what makes them read as one mark reforming. */}
              <motion.span
                className="block"
                style={{ color: 'var(--t-heading)' }}
                animate={prefersReduced ? undefined : { y: [0, -splitDistance, 0] }}
                transition={
                  prefersReduced
                    ? undefined
                    : { delay: splitDelay, duration: splitDuration, times: [0, 0.4, 1], ease: [splitEaseOut, splitEaseBack] }
                }
              >
                <AssembleHeading text="KAPIL" trigger="mount" stagger={0.055} delay={0.15} distance={0.7} />
              </motion.span>
              <motion.span
                className="block"
                style={{ color: 'var(--t-accent-main)' }}
                animate={prefersReduced ? undefined : { y: [0, splitDistance, 0] }}
                transition={
                  prefersReduced
                    ? undefined
                    : { delay: splitDelay, duration: splitDuration, times: [0, 0.4, 1], ease: [splitEaseOut, splitEaseBack] }
                }
              >
                <AssembleHeading text="JANGID" trigger="mount" stagger={0.055} delay={0.3} distance={0.7} />
              </motion.span>
            </h1>
          </div>

          {/* ── ROLE LINE ── */}
          <p
                      className="font-code text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.22em] mt-6"
            style={{ color: 'var(--t-text-secondary)' }}
          >
            <Typewriter text="AI-DRIVEN FULL STACK DEVELOPER" trigger="mount" startDelay={roleTypewriterDelay} speed={roleTypewriterSpeed} />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.5 }}
                      className="font-body text-lg md:text-xl font-medium max-w-xl leading-relaxed mt-4"
            style={{ color: 'var(--t-text-secondary)' }}
          >
            I build intelligent products across AI, backend systems and the web.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ctaDelay }}
                      className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            <Magnetic>
              <a href="#work" className="btn btn-primary group">
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic>
              <a href={p.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FileText className="w-4 h-4" />
                <span>RESUME</span>
              </a>
            </Magnetic>

            <span className="hidden sm:block w-px h-6" style={{ background: 'var(--t-hairline)' }} />

            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 font-code text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: 'var(--t-text-secondary)' }}
            >
              <GithubIcon className="w-4 h-4" />
              GITHUB
            </a>
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-2 font-code text-xs font-bold uppercase tracking-widest transition-colors"
              style={{ color: 'var(--t-text-secondary)' }}
            >
              <LinkedinIcon className="w-4 h-4" />
              LINKEDIN
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
