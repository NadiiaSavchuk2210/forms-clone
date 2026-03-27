import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { isChoiceQuestionType } from '@/entities/form/model';
import { QuestionType } from '@/shared/api/generated';

import { loadFormBuilderDraft } from '../lib/formBuilder.storage';

export interface FormBuilderQuestionDraft {
  id: string;
  title: string;
  type: QuestionType;
  options: string[];
}

export interface FormBuilderState {
  title: string;
  description: string;
  questions: FormBuilderQuestionDraft[];
}

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createQuestionDraft = (
  type: QuestionType = QuestionType.Text,
): FormBuilderQuestionDraft => ({
  id: createId(),
  title: '',
  type,
  options: isChoiceQuestionType(type) ? ['', ''] : [],
});

const createInitialState = (): FormBuilderState => ({
  title: '',
  description: '',
  questions: [createQuestionDraft()],
});

const ensureOptions = (type: QuestionType, options: string[]): string[] => {
  if (!isChoiceQuestionType(type)) {
    return [];
  }

  if (options.length >= 2) {
    return options;
  }

  return [...options, ...new Array(2 - options.length).fill('')];
};

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number): T[] => {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
};

export const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState: loadFormBuilderDraft() ?? createInitialState(),
  reducers: {
    setFormTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setFormDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    addQuestion(state, action: PayloadAction<QuestionType>) {
      state.questions.push(createQuestionDraft(action.payload));
    },
    updateQuestionTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) {
      const question = state.questions.find(
        ({ id }) => id === action.payload.id,
      );
      if (question) {
        question.title = action.payload.title;
      }
    },
    updateQuestionType(
      state,
      action: PayloadAction<{ id: string; type: QuestionType }>,
    ) {
      const question = state.questions.find(
        ({ id }) => id === action.payload.id,
      );
      if (question) {
        question.type = action.payload.type;
        question.options = ensureOptions(action.payload.type, question.options);
      }
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(({ id }) => id !== action.payload);
      if (state.questions.length === 0) {
        state.questions = [createQuestionDraft()];
      }
    },
    moveQuestionUp(state, action: PayloadAction<string>) {
      const index = state.questions.findIndex(({ id }) => id === action.payload);
      if (index > 0) {
        state.questions = moveItem(state.questions, index, index - 1);
      }
    },
    moveQuestionDown(state, action: PayloadAction<string>) {
      const index = state.questions.findIndex(({ id }) => id === action.payload);
      if (index >= 0 && index < state.questions.length - 1) {
        state.questions = moveItem(state.questions, index, index + 1);
      }
    },
    reorderQuestions(
      state,
      action: PayloadAction<{ activeId: string; overId: string }>,
    ) {
      const fromIndex = state.questions.findIndex(
        ({ id }) => id === action.payload.activeId,
      );
      const toIndex = state.questions.findIndex(
        ({ id }) => id === action.payload.overId,
      );

      if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
        state.questions = moveItem(state.questions, fromIndex, toIndex);
      }
    },
    addQuestionOption(state, action: PayloadAction<string>) {
      const question = state.questions.find(({ id }) => id === action.payload);
      if (question) {
        question.options.push('');
      }
    },
    updateQuestionOption(
      state,
      action: PayloadAction<{ id: string; optionIndex: number; value: string }>,
    ) {
      const question = state.questions.find(
        ({ id }) => id === action.payload.id,
      );
      if (question && question.options[action.payload.optionIndex] !== undefined) {
        question.options[action.payload.optionIndex] = action.payload.value;
      }
    },
    removeQuestionOption(
      state,
      action: PayloadAction<{ id: string; optionIndex: number }>,
    ) {
      const question = state.questions.find(
        ({ id }) => id === action.payload.id,
      );
      if (
        question &&
        question.options.length > 2 &&
        question.options[action.payload.optionIndex] !== undefined
      ) {
        question.options.splice(action.payload.optionIndex, 1);
      }
    },
    resetFormBuilder() {
      return createInitialState();
    },
  },
});

export const {
  setFormTitle,
  setFormDescription,
  addQuestion,
  updateQuestionTitle,
  updateQuestionType,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown,
  reorderQuestions,
  addQuestionOption,
  updateQuestionOption,
  removeQuestionOption,
  resetFormBuilder,
} = formBuilderSlice.actions;

export const formBuilderReducer = formBuilderSlice.reducer;
