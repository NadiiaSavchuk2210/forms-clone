import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { FiCalendar } from 'react-icons/fi';

import type { DatePickerTriggerProps } from './types';

import css from './DatePickerField.module.css';

const DatePickerTrigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ value, onClick, placeholder, hasError, className }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(css.inputButton, hasError && css.inputError, className)}
      onClick={onClick}
    >
      <span className={clsx(css.inputValue, !value && css.placeholderText)}>
        {value || placeholder}
      </span>
      <span className={css.iconWrap} aria-hidden="true">
        <FiCalendar className={css.icon} />
      </span>
    </button>
  ),
);

DatePickerTrigger.displayName = 'DatePickerTrigger';

export default DatePickerTrigger;
