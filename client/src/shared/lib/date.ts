const ISO_DATE_VALUE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const DISPLAY_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const parseDateValue = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const match = value.match(ISO_DATE_VALUE_PATTERN);

  if (!match) {
    return null;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const parsedDate = new Date(year, month - 1, day);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
};

export const formatDateValue = (date: Date | null): string => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isValidDate = (value: string): boolean => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return false;
  }

  if (ISO_DATE_VALUE_PATTERN.test(normalizedValue)) {
    return parseDateValue(normalizedValue) !== null;
  }

  return !Number.isNaN(new Date(normalizedValue).getTime());
};

export const formatDateForDisplay = (value: string): string => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return '';
  }

  const parsedDate =
    parseDateValue(normalizedValue) ??
    (isValidDate(normalizedValue) ? new Date(normalizedValue) : null);

  if (!parsedDate) {
    return normalizedValue;
  }

  return DISPLAY_DATE_FORMATTER.format(parsedDate);
};
