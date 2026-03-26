import { clsx } from 'clsx';
import css from './Button.module.css';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline';

type ButtonBaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  as: 'link';
  href: string;
};

type ButtonAsButton = ButtonBaseProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const Button = (props: ButtonProps) => {
  const { variant = 'primary', className, children } = props;

  const classes = clsx(css.button, css[variant], className);

  if (props.as === 'link') {
    return (
      <Link to={props.href} className={classes} data-variant={variant}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      data-variant={variant}
    >
      {children}
    </button>
  );
};

export default Button;
