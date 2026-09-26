import { Zap } from 'lucide-react';
import { useTheme } from '../../context/theme';

export function PowerToggle() {
  const { isSuperMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-label="Super Saiyan Mode"
      aria-checked={isSuperMode}
      onClick={toggleTheme}
      className="power-toggle"
    >
      <span className="power-toggle-label"><Zap size={14} aria-hidden="true" /> POWER LEVEL</span>
      <span className="power-toggle-options" aria-hidden="true">
        <span className={!isSuperMode ? 'is-selected' : ''}>Base</span>
        <span className={isSuperMode ? 'is-selected' : ''}>Super Saiyan</span>
      </span>
    </button>
  );
}
