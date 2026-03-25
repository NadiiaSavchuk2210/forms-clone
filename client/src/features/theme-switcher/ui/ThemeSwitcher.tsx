import { useState } from 'react';
import { useTheme } from '@/app/providers/theme/useTheme';
import css from './ThemeSwitcher.module.css';
import { Theme, THEMES } from '../model/theme.config';
import { clsx } from 'clsx';
import { HiOutlineSwatch } from 'react-icons/hi2';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={css.themeSwitcher}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={css.trigger}
        aria-label="Open theme switcher"
        aria-expanded={isOpen}
        aria-controls="theme-switcher-options"
        onClick={() => setIsOpen((value) => !value)}
      >
        <HiOutlineSwatch aria-hidden="true" className={css.triggerIcon} />
      </button>

      <ul
        id="theme-switcher-options"
        className={clsx(css.themeOptions, isOpen && css.open)}
      >
        {Object.entries(THEMES).map(([key, value]) => (
          <li
            key={key}
            className={clsx(css.themeItem, theme === key && css.activeItem)}
          >
            <button
              type="button"
              className={clsx(css.themeCircle, theme === key && css.active)}
              style={{ backgroundColor: value.color }}
              title={value.label}
              aria-label={`Switch to ${value.label} theme`}
              aria-pressed={theme === key}
              onClick={() => {
                setTheme(key as Theme);
                setIsOpen(false);
              }}
            >
              <span className={css.themeLabel}>{value.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
