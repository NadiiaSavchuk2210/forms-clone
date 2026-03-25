import { useTheme } from '@/app/providers/theme/useTheme';
import css from './ThemeSwitcher.module.css';
import { Theme, THEMES } from '../model/theme.config';
import { clsx } from 'clsx';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ul className={css.themeSwitcher}>
      {Object.entries(THEMES).map(([key, value]) => (
        <li key={key}>
          <label
            className={clsx(css.themeCircle, theme === key && css.active)}
            style={{ backgroundColor: value.color }}
            title={value.label}
          >
            <input
              type="radio"
              name="theme"
              value={key}
              checked={theme === key}
              onChange={() => setTheme(key as Theme)}
              className={css.themeInput}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ThemeSwitcher;
