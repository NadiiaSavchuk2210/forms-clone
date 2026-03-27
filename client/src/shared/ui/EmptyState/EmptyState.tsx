import { clsx } from 'clsx';

import { EMPTY_STATE_CONTENT, EMPTY_STATE_VARIANT_CONFIG } from './config';
import type { EmptyStateHeadingLevel, EmptyStateVariant } from './types';

import css from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: EmptyStateVariant;
  className?: string;
  headingLevel?: EmptyStateHeadingLevel;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'generic',
  className,
  headingLevel = 3,
}: EmptyStateProps) => {
  const { Icon, eyebrow } = EMPTY_STATE_VARIANT_CONFIG[variant];
  const TitleTag = headingLevel === 2 ? 'h2' : 'h3';

  const content = EMPTY_STATE_CONTENT[variant];

  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;
  const resolvedAction = actionLabel ?? content.action;

  return (
    <div className={clsx(css.wrapper, className)}>
      <div className={css.card}>
        <div className={css.backgroundGlow} aria-hidden="true" />
        <div className={css.backgroundOrbit} aria-hidden="true" />

        <span className={css.eyebrow}>{eyebrow}</span>

        <div className={css.iconWrapper}>
          <Icon className={css.icon} />
        </div>

        <TitleTag className={css.title}>{resolvedTitle}</TitleTag>
        <p className={css.description}>{resolvedDescription}</p>

        {resolvedAction && onAction && (
          <button type="button" className={css.button} onClick={onAction}>
            {resolvedAction}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
