import { useEffect, useState } from 'react';

/**
 * True only on devices with a real pointing device (mouse/trackpad).
 * Pointer-driven effects read this so they stay inert on touch, where
 * there is no cursor to follow and the effect would only cost battery.
 */
export function useHoverCapable(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return canHover;
}
