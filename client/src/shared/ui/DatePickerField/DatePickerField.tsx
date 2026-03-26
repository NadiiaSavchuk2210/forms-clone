import { clsx } from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  const getDayClassName = (date: Date) => {
    const isSelected =
      selectedDate &&
      date.toDateString() === selectedDate.toDateString();

    return clsx(css.day, isSelected && css.daySelected);
  };

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
          popperClassName={css.popper}
          calendarClassName={css.calendar}
          weekDayClassName={() => css.weekDay}
          dayClassName={getDayClassName}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={css.calendarHeader}>
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className={css.navButton}
                aria-label="Previous month"
              >
                <FiChevronLeft />
              </button>

              <span className={css.currentMonth}>
                {date.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className={css.navButton}
                aria-label="Next month"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        />
      </div>

      {error && <span className={css.errorText}>{error}</span>}
    </label>
  );
};

export default DatePickerField;
