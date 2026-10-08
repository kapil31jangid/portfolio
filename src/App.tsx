import { ThemeProvider } from './context/ThemeContext';
import { MotionConfig } from 'framer-motion';
import { FloatingNavbar } from './components/navigation/FloatingNavbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { SelectedWork } from './components/work/SelectedWork';
import { Capabilities } from './components/capabilities/Capabilities';
import { Journey } from './components/journey/Journey';
import { Credentials } from './components/credentials/Credentials';
import { Contact } from './components/contact/Contact';
import { PowerSurge, CursorDot, ScrollProgress } from './components/ui/motion';

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
      <div className="portfolio min-h-screen font-body antialiased">
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[210] focus:px-4 focus:py-2 focus:rounded-full focus:font-body focus:text-sm focus:font-semibold focus:bg-[var(--t-accent-main)] focus:text-white"
        >
          Skip to main content
        </a>

        <ScrollProgress />
        <PowerSurge />
        <CursorDot />
        <FloatingNavbar />

        <main id="main-content" className="w-full">
          <Hero />
          <About />
          <SelectedWork />
          <Capabilities />
          <Journey />
          <Credentials />
          <Contact />
        </main>
      </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
