import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ────────────────────────────────────────────
   SoundEffect — "THWIP!", "POW!", "BANG!" comic
   sound-effect text that pops on trigger.
   Plays a short synth beep via Web Audio API.
   ──────────────────────────────────────────── */

interface SoundEffectProps {
  text: string;
  className?: string;
  color?: 'red' | 'blue' | 'yellow';
}

const COLORS = {
  red: 'sfx-red',
  blue: 'sfx-blue',
  yellow: 'sfx-yellow',
};

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playSfx(type: 'pop' | 'thwip' | 'pow') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'pop') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'thwip') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.linearRampToValueAtTime(200, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      // pow
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Audio may be blocked; ignore silently.
  }
}

export function SoundEffect({
  text,
  className,
  color = 'red',
}: SoundEffectProps) {
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);

  const trigger = (type: 'pop' | 'thwip' | 'pow' = 'pop') => {
    playSfx(type);
    setActive(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(false), 600);
  };

  // Auto-trigger once on mount
  useEffect(() => {
    trigger('pop');
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <motion.span
      className={`sfx ${COLORS[color]} ${className ?? ''} ${active ? 'animate-pop' : ''}`}
      style={{
        transform: active ? 'scale(1.25) rotate(-2deg)' : 'scale(1)',
        opacity: active ? 1 : 0,
        pointerEvents: 'none',
      }}
      onClick={() => trigger('pow')}
      onMouseEnter={() => trigger('thwip')}
      role="img"
      aria-label={text}
    >
      {text}
    </motion.span>
  );
}
