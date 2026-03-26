export type DatePickerFieldProps = {
  label: string;
  value: string;
  error?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
  fieldClassName?: string;
  inputClassName?: string;
};

export type DatePickerTriggerProps = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  hasError: boolean;
  className?: string;
};
