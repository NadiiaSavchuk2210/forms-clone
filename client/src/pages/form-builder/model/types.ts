import { QuestionType } from '@/shared/api/generated';
import type { ValidationError } from '@/shared/lib/validation';
import type {
  DragEndEvent,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import type { FormBuilderQuestionDraft } from './slice/formBuilderSlice';

export type { FormBuilderQuestionDraft };

export type QuestionTypeOption = {
  value: QuestionType;
  label: string;
  hint: string;
};

export type QuestionTypeLabels = Record<QuestionType, string>;

export type FormBuilderFieldErrors = Record<string, string[]>;

export type SuccessState = {
  id: string;
  title: string;
} | null;

export type SuccessLinks = {
  fill: string;
  responses: string;
} | null;

export type QuestionCardActions = {
  onMoveQuestionUp: (id: string) => void;
  onMoveQuestionDown: (id: string) => void;
  onRemoveQuestion: (id: string) => void;
  onQuestionTitleChange: (id: string, value: string) => void;
  onQuestionTypeChange: (id: string, value: QuestionType) => void;
  onOptionChange: (id: string, optionIndex: number, value: string) => void;
  onRemoveOption: (id: string, optionIndex: number) => void;
  onAddOption: (id: string) => void;
};

export type FormBuilderActions = {
  setup: {
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
  };
  questionSection: {
    onAddQuestion: (type: QuestionType) => void;
  };
  questionCards: QuestionCardActions;
  save: {
    onSubmit: () => void;
    onReset: () => void;
  };
};

export type FormBuilderQuestionsModel = {
  sensors: SensorDescriptor<SensorOptions>[];
  questions: FormBuilderQuestionDraft[];
  questionTypeLabels: QuestionTypeLabels;
  questionTypeOptions: readonly QuestionTypeOption[];
  getQuestionTypeHint: (type: QuestionType) => string;
  getQuestionTitleError: (questionId: string) => string | null;
  getQuestionOptionsError: (questionId: string) => string | null;
  onDragEnd: (event: DragEndEvent) => void;
};

export type FormBuilderViewModel = {
  title: string;
  description: string;
  questions: FormBuilderQuestionDraft[];
  validationErrors: ValidationError[];
  successState: SuccessState;
  errorMessage: string | null;
  isSaving: boolean;
  questionTypeOptions: readonly QuestionTypeOption[];
  questionTypeLabels: QuestionTypeLabels;
};
