import { clsx } from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerTrigger from './DatePickerTrigger';
import { formatDateValue, parseDateValue } from './lib';
import type { DatePickerFieldProps } from './types';
import css from './DatePickerField.module.css';

const DatePickerField = ({
  label,
  value,
  error,
  placeholder = 'Select a date',
  onChange,
  fieldClassName,
  inputClassName,
}: DatePickerFieldProps) => {
  const selectedDate = parseDateValue(value);

  return (
    <label className={clsx(css.field, fieldClassName)}>
      <span className={css.label}>{label}</span>

      <div className={css.pickerRoot}>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => onChange(formatDateValue(date))}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          customInput={
            <DatePickerTrigger
              hasError={Boolean(error)}
              className={inputClassName}
              placeholder={placeholder}
            />
          }
          showPopperArrow={false}
          fixedHeight
        />
      </div>

      {error && <span className={css.errorText}>{error}</span>}
    </label>
  );
};

export default DatePickerField;
