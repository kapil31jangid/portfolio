import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/theme';

/**
 * Light / Dark switch. A `switch` role rather than two buttons: it is one
 * binary setting, and `aria-checked` reports its state in a single stop.
 *
 * The visible option labels are the accessible name, so the whole control
 * carries one label and the inner spans are hidden from the tree.
 */
export function ThemeToggle() {
  const { isSuperMode, toggleTheme } = useTheme();
  const isDark = isSuperMode;
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      role="switch"
      aria-label="Colour theme"
      aria-checked={isDark}
      onClick={toggleTheme}
      className="theme-toggle"
    >
      <span className="theme-toggle-label">
        <Icon size={13} aria-hidden="true" />
        THEME
      </span>
      <span className="theme-toggle-options" aria-hidden="true">
        <span className={!isDark ? 'is-selected' : ''}>Light</span>
        <span className={isDark ? 'is-selected' : ''}>Dark</span>
      </span>
    </button>
  );
}
