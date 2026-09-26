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

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
      <div className="portfolio min-h-screen font-body antialiased">
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F47C20] focus:text-[#FFF3D6] focus:font-manga focus:text-lg focus:rounded-lg focus:border-2 focus:border-[#10172A] focus:shadow-[4px_4px_0px_#10172A]"
        >
          Skip to main content
        </a>

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
