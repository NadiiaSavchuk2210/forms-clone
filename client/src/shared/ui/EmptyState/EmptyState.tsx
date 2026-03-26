import { clsx } from 'clsx';
import css from './EmptyState.module.css';
import { MdOutlineAssignment, MdOutlineAnalytics } from 'react-icons/md';
import { EMPTY_STATE_CONTENT } from './config';
import {
  EmptyStateHeadingLevel,
  EmptyStateVariant,
} from './types';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: EmptyStateVariant;
  className?: string;
  headingLevel?: EmptyStateHeadingLevel;
}

const ICONS = {
  forms: MdOutlineAssignment,
  responses: MdOutlineAnalytics,
  generic: MdOutlineAssignment,
};

const EYEBROW_LABELS: Record<EmptyStateVariant, string> = {
  forms: 'Ready to begin',
  responses: 'Quiet inbox',
  generic: 'Coming soon',
};

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'generic',
  className,
  headingLevel = 3,
}: EmptyStateProps) => {
  const Icon = ICONS[variant];
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

        <span className={css.eyebrow}>{EYEBROW_LABELS[variant]}</span>

        <div className={css.iconWrapper}>
          <Icon className={css.icon} />
        </div>

        <TitleTag className={css.title}>{resolvedTitle}</TitleTag>
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
