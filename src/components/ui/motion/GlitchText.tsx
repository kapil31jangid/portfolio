import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

interface GlitchTextProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  trigger?: 'hover' | 'mount';
  glitchChars?: string;
}

function GlitchChar({ char, glitchChar, show }: { char: string; glitchChar: string; show: boolean }) {
  return (
    <span
      className="inline-block"
      style={{
        color: show ? 'inherit' : 'var(--t-accent-main)',
        opacity: show ? 1 : 0.6,
      }}
    >
      {show ? char : glitchChar}
    </span>
  );
}

export function GlitchText({
  children,
  className,
  style,
  trigger = 'hover',
  glitchChars = GLITCH_CHARS,
}: GlitchTextProps) {
  const prefersReduced = useReducedMotion();
  const text = String(children);
  const chars = text.split('');
  const [glitching, setGlitching] = useState(false);
  const frameRefs = useRef<Array<ReturnType<typeof setTimeout> | null>>(chars.map(() => null));

  useEffect(() => {
    if (prefersReduced || trigger !== 'mount') return;
    setGlitching(true);
    const t = setTimeout(() => setGlitching(false), 600);
    return () => clearTimeout(t);
  }, [prefersReduced, trigger]);

  const handleMouseEnter = () => {
    if (prefersReduced || trigger !== 'hover') return;
    setGlitching(true);
    frameRefs.current = chars.map((_, i) => {
      const t = setTimeout(() => {
        frameRefs.current![i] = null;
      }, (i / chars.length) * 400 + 200);
      return t;
    });
    const end = setTimeout(() => setGlitching(false), 700);
    return () => {
      frameRefs.current.forEach(f => f && clearTimeout(f));
      clearTimeout(end);
    };
  };

  const handleMouseLeave = () => {
    frameRefs.current.forEach(f => f && clearTimeout(f));
    setGlitching(false);
  };

  if (prefersReduced) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span
      className={className}
      style={{ ...style, cursor: trigger === 'hover' ? 'crosshair' : 'default' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => {
          const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          const show = !glitching;
          return (
            <GlitchChar key={i} char={char} glitchChar={glitchChar} show={show} />
          );
        })}
      </span>
    </span>
  );
}
