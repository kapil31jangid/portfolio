import { ThemeProvider } from './context/ThemeContext';
import { SkipperProvider } from './lib/skipper-ui';
import { AnimasterProvider } from './lib/animaster-lab';
import { ThreeUIProvider } from './lib/threeui';
import { FloatingNavbar } from './components/navigation/FloatingNavbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { SelectedWork } from './components/work/SelectedWork';
import { Capabilities } from './components/capabilities/Capabilities';
import { Journey } from './components/journey/Journey';
import { Credentials } from './components/credentials/Credentials';
import { Contact } from './components/contact/Contact';

let audioCtx: AudioContext | null = null;
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}
function playClick() {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.type = 'square';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // ignore
  }
}

export function App() {
  return (
    <ThemeProvider>
      <SkipperProvider>
        <AnimasterProvider defaults={{ ease: [0.16, 1, 0.3, 1], duration: 0.6, reduceMotion: true }}>
          <ThreeUIProvider camera={{ position: [0, 0, 6], fov: 45 }}>
            <div
              className="portfolio min-h-screen font-body antialiased overflow-x-hidden"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button, a')) playClick();
              }}
            >
              {/* Skip to main content accessibility link */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[210] focus:px-4 focus:py-2 focus:rounded-full focus:font-body focus:text-sm focus:font-semibold focus:bg-[var(--t-accent-main)] focus:text-white"
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
          </ThreeUIProvider>
        </AnimasterProvider>
      </SkipperProvider>
    </ThemeProvider>
  );
}

export default App;
