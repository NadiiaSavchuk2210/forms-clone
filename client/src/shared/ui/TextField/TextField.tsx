import { clsx } from 'clsx';
import {
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

import css from './TextField.module.css';

type BaseProps = {
  label: string;
  value: string;
  error?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
  fieldClassName?: string;
  inputClassName?: string;
};

type InputProps = BaseProps & {
  as?: 'input';
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
};

type TextareaProps = BaseProps & {
  as: 'textarea';
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>['rows'];
};

type Props = InputProps | TextareaProps;

const TextField = ({
  label,
  value,
  error,
  placeholder,
  onChange,
  fieldClassName,
  inputClassName,
  ...props
}: Props) => {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const commonProps = {
    id: fieldId,
    value,
    placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    onChange: (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => onChange(event.target.value),
    className: clsx(css.input, error && css.inputError, inputClassName),
  };

  return (
    <label className={clsx(css.field, fieldClassName)}>
      <span className={css.label}>{label}</span>

      {props.as === 'textarea' ? (
        <textarea
          {...commonProps}
          rows={props.rows ?? 5}
          className={clsx(commonProps.className, css.textarea)}
        />
      ) : (
        <input
          {...commonProps}
          type={props.type ?? 'text'}
          autoComplete={props.autoComplete}
        />
      )}

      {error && (
        <span id={errorId} className={css.errorText}>
          {error}
        </span>
      )}
    </label>
  );
};

export default TextField;
