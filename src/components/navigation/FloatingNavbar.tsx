import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import { PowerToggle } from '../ui/PowerToggle';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanjiEmblem } from '../ui/AnimePrimitives';

const NAV_ITEMS = [
  { id: 'hero',        label: 'Home' },
  { id: 'about',       label: 'About' },
  { id: 'skills',      label: 'Skills' },
  { id: 'work',        label: 'Projects' },
  { id: 'journey',     label: 'Journey' },
  { id: 'credentials', label: 'Achievements' },
  { id: 'contact',     label: 'Contact' },
];

export const FloatingNavbar = () => {
  const [isVisible, setIsVisible]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const drawer = drawerRef.current;
    const menuButton = menuButtonRef.current;
    const controls = drawer?.querySelectorAll<HTMLElement>('a[href], button');
    controls?.[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
      if (event.key !== 'Tab' || !controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      menuButton?.focus();
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <motion.header
        inert={!isVisible || mobileMenuOpen}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-50 max-w-6xl mx-auto pointer-events-none"
      >
        <div
          className="pointer-events-auto border-[3px] border-[#11172C] shadow-[5px_5px_0px_#11172C] rounded-2xl px-4 sm:px-6 h-14 flex items-center justify-between relative overflow-hidden transition-colors duration-300"
          style={{
            backgroundColor: 'var(--t-navbar-bg)',
            color: 'var(--t-navbar-text)',
          }}
        >
          {/* Top Accent Line — orange in Base, gold in Super */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-colors duration-300"
            style={{ backgroundColor: 'var(--t-accent-main)' }}
          />

          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2.5 group relative z-10">
            <KanjiEmblem symbol="悟" size="sm" className="w-8 h-8 text-xs shadow-[2px_2px_0px_#11172C]" />
            <span
              className="font-manga text-xl tracking-wide uppercase transition-colors group-hover:opacity-80"
              style={{ color: 'var(--t-navbar-text)' }}
            >
              KJ
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 relative z-10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'skills' && activeSection === 'capabilities');
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative font-body text-sm font-bold tracking-wide transition-colors duration-200 py-1 flex items-center gap-1.5 group"
                  style={{
                    color: isActive ? 'var(--t-navbar-active)' : 'var(--t-navbar-text)',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavEnergy"
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: 'var(--t-navbar-active)', boxShadow: `0 0 8px var(--t-navbar-active)` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                  <span
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-200"
                    style={{
                      width: isActive ? '100%' : '0%',
                      backgroundColor: 'var(--t-navbar-active)',
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="hidden sm:block"><PowerToggle /></div>

            {/* Resume */}
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="anime-btn anime-btn-orange text-sm px-3.5 py-1.5 rounded-lg"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              ref={menuButtonRef}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-1.5 rounded-lg border-2 border-[#11172C]"
              style={{ backgroundColor: 'var(--t-surface)', color: 'var(--t-accent-main)' }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE FULLSCREEN DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] p-6 overflow-y-auto flex flex-col justify-between lg:hidden bg-halftone"
            style={{ backgroundColor: 'var(--t-bg-secondary)', color: 'var(--t-text-primary)' }}
          >
            {/* Drawer Header */}
            <div
              className="flex items-center justify-between border-b-4 pb-4 pt-2"
              style={{ borderColor: 'var(--t-accent-main)' }}
            >
              <div className="flex items-center gap-3">
                <KanjiEmblem symbol="悟" size="sm" />
                <span className="font-manga text-2xl" style={{ color: 'var(--t-accent-main)' }}>
                  KAPIL JANGID
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg font-bold border-2 border-[#11172C]"
                style={{ backgroundColor: 'var(--t-accent-main)', color: 'var(--dbz-ink)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-4"><PowerToggle /></div>

            <nav className="space-y-3 py-4 flex-1">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id || (item.id === 'skills' && activeSection === 'capabilities');
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx }}
                    className="flex items-center justify-between p-3.5 rounded-xl border-[3px] border-[#11172C] shadow-[4px_4px_0px_#11172C]"
                    style={{
                      backgroundColor: isActive ? 'var(--t-accent-main)' : 'var(--t-card-bg)',
                      color: isActive ? 'var(--dbz-ink)' : 'var(--t-card-text)',
                    }}
                  >
                    <span className="font-manga text-2xl tracking-wider">{item.label}</span>
                    {isActive && <span className="font-code text-xs font-bold uppercase">● ACTIVE</span>}
                  </motion.a>
                );
              })}
            </nav>

            <div
              className="flex items-center justify-around pt-4 border-t-2"
              style={{ borderColor: 'rgba(255,212,71,0.3)' }}
            >
              <a aria-label="GitHub Profile" href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-6 h-6 text-[var(--t-accent-ink)]" />
              </a>
              <a aria-label="LinkedIn Profile" href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="w-6 h-6 text-[var(--t-cool-ink)]" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manga text-xl"
                style={{ color: 'var(--t-accent-main)' }}
              >
                RESUME ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
