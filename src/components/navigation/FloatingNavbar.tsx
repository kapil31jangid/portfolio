import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero',        label: 'Home' },
  { id: 'about',       label: 'About' },
  { id: 'skills',      label: 'Skills' },
  { id: 'work',        label: 'Projects' },
  { id: 'journey',     label: 'Journey' },
  { id: 'credentials', label: 'Achievements' },
  { id: 'contact',     label: 'Contact' },
];

/** Small accent mark standing in for the wordmark when the full name is too long. */
const BrandMark = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-block rounded-sm ${className ?? 'w-2.5 h-2.5'}`}
    style={{ backgroundColor: 'var(--t-accent-main)' }}
  />
);

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

  const isActiveItem = (id: string) =>
    activeSection === id || (id === 'skills' && activeSection === 'capabilities');

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
          className="glass pointer-events-auto rounded-full border px-4 sm:px-6 h-14 flex items-center justify-between relative"
          style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-navbar-text)' }}
        >
          {/* Brand */}
          <a href="#hero" className="flex items-center gap-2.5 group relative z-10">
            <BrandMark />
            <span
              className="font-display text-lg uppercase tracking-tight transition-opacity group-hover:opacity-70"
              style={{ color: 'var(--t-navbar-text)' }}
            >
              KJ
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 relative z-10">
            {NAV_ITEMS.map((item) => {
              const isActive = isActiveItem(item.id);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative font-body text-sm font-medium transition-colors duration-200 py-1 flex items-center gap-1.5"
                  style={{ color: isActive ? 'var(--t-navbar-active)' : 'var(--t-navbar-text)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavMark"
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: 'var(--t-navbar-active)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{item.label}</span>
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-200"
                    style={{ width: isActive ? '100%' : '0%', backgroundColor: 'var(--t-navbar-active)' }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="hidden sm:block"><ThemeToggle /></div>

            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              ref={menuButtonRef}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-1.5 rounded-full border"
              style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-main)' }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ── */}
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
            className="fixed inset-0 z-[60] p-6 overflow-y-auto flex flex-col justify-between lg:hidden"
            style={{ backgroundColor: 'var(--t-bg-primary)', color: 'var(--t-text-primary)' }}
          >
            <div
              className="flex items-center justify-between border-b pb-4 pt-2"
              style={{ borderColor: 'var(--t-hairline)' }}
            >
              <div className="flex items-center gap-2.5">
                <BrandMark />
                <span className="font-display text-lg uppercase" style={{ color: 'var(--t-text-primary)' }}>
                  KAPIL JANGID
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full border"
                style={{ borderColor: 'var(--t-hairline)', color: 'var(--t-accent-main)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4"><ThemeToggle /></div>

            <nav className="space-y-1.5 py-4 flex-1">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = isActiveItem(item.id);
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx }}
                    className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border"
                    style={{
                      borderColor: isActive ? 'transparent' : 'var(--t-hairline)',
                      backgroundColor: isActive ? 'var(--t-accent-main)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--t-text-primary)',
                    }}
                  >
                    <span className="font-body text-lg font-medium">{item.label}</span>
                    <span className="font-code text-[10px] font-bold uppercase tracking-widest opacity-70">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div
              className="flex items-center justify-around pt-5 border-t"
              style={{ borderColor: 'var(--t-hairline)' }}
            >
              <a aria-label="GitHub Profile" href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-6 h-6" style={{ color: 'var(--t-text-secondary)' }} />
              </a>
              <a aria-label="LinkedIn Profile" href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="w-6 h-6" style={{ color: 'var(--t-text-secondary)' }} />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-code text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--t-accent-ink)' }}
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
