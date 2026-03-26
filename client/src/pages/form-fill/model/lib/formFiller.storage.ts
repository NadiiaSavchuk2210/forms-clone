import type { QuestionAnswersById } from '../types';
import { FORM_FILLER_STORAGE_KEY_PREFIX } from './constants';

const isQuestionAnswersById = (
  value: unknown,
): value is QuestionAnswersById => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const answers = value as Record<string, unknown>;

  return Object.values(answers).every(
    (answerValue) =>
      Array.isArray(answerValue) &&
      answerValue.every((item) => typeof item === 'string'),
  );
};

const getFormFillerStorageKey = (formId: string): string =>
  `${FORM_FILLER_STORAGE_KEY_PREFIX}:${formId}`;

export const loadFormFillerDraft = (
  formId?: string,
): QuestionAnswersById => {
  if (typeof window === 'undefined' || !formId) {
    return {};
  }

  try {
    const rawDraft = window.localStorage.getItem(
      getFormFillerStorageKey(formId),
    );

    if (!rawDraft) {
      return {};
    }

    const parsedDraft = JSON.parse(rawDraft);

    if (!isQuestionAnswersById(parsedDraft)) {
      return {};
    }

    return parsedDraft;
  } catch {
    return {};
  }
};

export const saveFormFillerDraft = (
  formId: string | undefined,
  draft: QuestionAnswersById,
): void => {
  if (typeof window === 'undefined' || !formId) {
    return;
  }

  try {
    window.localStorage.setItem(
      getFormFillerStorageKey(formId),
      JSON.stringify(draft),
    );
  } catch {
    // Ignore storage write failures.
  }
};
