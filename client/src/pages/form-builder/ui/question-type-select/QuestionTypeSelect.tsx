import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { QuestionType } from '@/shared/api/generated';

import type { QuestionTypeOption } from '../types';

import css from './QuestionTypeSelect.module.css';

interface Props {
  value: QuestionType;
  options: readonly QuestionTypeOption[];
  onChange: (value: QuestionType) => void;
}

const QuestionTypeSelect = ({
  value,
  options,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const activeOption = options.find((option) => option.value === value) ?? options[0];
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  };
  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };
  const createOptionClickHandler = (nextValue: QuestionType) => () => {
    onChange(nextValue);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        const menuElement = menuRef.current;
        if (!menuElement) return;

        const menuRect = menuElement.getBoundingClientRect();
        const viewportPadding = 20;
        const bottomOverflow =
          menuRect.bottom - window.innerHeight + viewportPadding;
        const topOverflow = viewportPadding - menuRect.top;

        if (bottomOverflow > 0) {
          window.scrollBy({
            top: bottomOverflow,
            behavior: 'smooth',
          });
          return;
        }

        if (topOverflow > 0) {
          window.scrollBy({
            top: -topOverflow,
            behavior: 'smooth',
          });
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={clsx(css.selectWrap, isOpen && css.selectWrapOpen)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={clsx(css.select, css.selectTrigger, isOpen && css.selectOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span className={css.selectValue}>{activeOption.label}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={css.selectMenu}
          role="listbox"
          aria-label="Answer type"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={clsx(
                css.selectOption,
                option.value === value && css.selectOptionActive,
              )}
              onClick={createOptionClickHandler(option.value)}
            >
              <span className={css.selectOptionLabel}>{option.label}</span>
              <span className={css.selectOptionHint}>{option.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionTypeSelect;
