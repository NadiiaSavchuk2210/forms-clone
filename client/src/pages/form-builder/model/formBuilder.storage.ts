import { QuestionType } from '@/shared/api/generated';
import type {
  FormBuilderQuestionDraft,
  FormBuilderState,
} from './formBuilderSlice';
import { FORM_BUILDER_STORAGE_KEY } from './constants';

const isQuestionType = (value: unknown): value is QuestionType =>
  Object.values(QuestionType).includes(value as QuestionType);

const isQuestionDraft = (value: unknown): value is FormBuilderQuestionDraft => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const draft = value as Record<string, unknown>;
  if (typeof draft.id !== 'string') {
    return false;
  }

  if (typeof draft.title !== 'string') {
    return false;
  }

  if (!isQuestionType(draft.type)) {
    return false;
  }

  if (!Array.isArray(draft.options)) {
    return false;
  }

  return draft.options.every((option) => typeof option === 'string');
};

const isFormBuilderState = (value: unknown): value is FormBuilderState => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const state = value as Record<string, unknown>;
  if (typeof state.title !== 'string') {
    return false;
  }

  if (typeof state.description !== 'string') {
    return false;
  }

  if (!Array.isArray(state.questions)) {
    return false;
  }

  return state.questions.every(isQuestionDraft);
};

export const loadFormBuilderDraft = (): FormBuilderState | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const rawDraft = window.localStorage.getItem(FORM_BUILDER_STORAGE_KEY);
    if (!rawDraft) {
      return undefined;
    }

    const parsedDraft = JSON.parse(rawDraft);
    if (!isFormBuilderState(parsedDraft)) {
      return undefined;
    }

    return parsedDraft;
  } catch {
    return undefined;
  }
};

export const saveFormBuilderDraft = (draft: FormBuilderState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const storage = window.localStorage;
    const serializedDraft = JSON.stringify(draft);

    storage.setItem(FORM_BUILDER_STORAGE_KEY, serializedDraft);
  } catch {
    // Ignore storage write failures.
  }
};
