import { clsx } from 'clsx';
import css from './EmptyState.module.css';
import { MdOutlineAssignment, MdOutlineAnalytics } from 'react-icons/md';
import { EMPTY_STATE_CONTENT } from './config';
import { EmptyStateVariant } from './types';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: EmptyStateVariant;
  className?: string;
}

const ICONS = {
  forms: MdOutlineAssignment,
  responses: MdOutlineAnalytics,
  generic: MdOutlineAssignment,
};

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'generic',
  className,
}: EmptyStateProps) => {
  const Icon = ICONS[variant];

  const content = EMPTY_STATE_CONTENT[variant];

  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;
  const resolvedAction = actionLabel ?? content.action;

  return (
    <div className={clsx(css.wrapper, className)}>
      <div className={css.card}>
        <div className={css.iconWrapper}>
          <Icon className={css.icon} />
        </div>
        <h3 className={css.title}>{resolvedTitle}</h3>
        <p className={css.description}>{resolvedDescription}</p>

        {resolvedAction && onAction && (
          <button className={css.button} onClick={onAction}>
            {resolvedAction}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
