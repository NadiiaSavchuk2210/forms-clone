import { ROUTES } from '@/app/providers/router/config/routesConfig';
import type { AppDispatch } from '@/app/providers/store/store';
import { getQuestionTypeHint } from '@/entities/form/model';
import type { FormQuestionType } from '@/entities/form/model';
import { getFirstFieldError } from '@/shared/lib/validation';
import type { SensorDescriptor, SensorOptions } from '@dnd-kit/core';
import {
  addQuestion,
  addQuestionOption,
  moveQuestionDown,
  moveQuestionUp,
  removeQuestion,
  removeQuestionOption,
  resetFormBuilder,
  setFormDescription,
  setFormTitle,
  updateQuestionOption,
  updateQuestionTitle,
  updateQuestionType,
} from '../slice/formBuilderSlice';
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_OPTIONS } from '@/entities/form/model';
import type {
  FormBuilderActions,
  FormBuilderFieldErrors,
  FormBuilderQuestionsModel,
  QuestionCardActions,
  SuccessLinks,
  SuccessState,
} from '../types';

export const createSuccessLinks = (
  successState: SuccessState,
): SuccessLinks => {
  if (!successState) {
    return null;
  }

  return {
    fill: ROUTES.FORM_FILL(successState.id),
    responses: ROUTES.FORM_RESPONSES(successState.id),
  };
};

export const createQuestionCardActions = (
  dispatch: AppDispatch,
): QuestionCardActions => {
  return {
    onMoveQuestionUp: (id: string) => dispatch(moveQuestionUp(id)),
    onMoveQuestionDown: (id: string) => dispatch(moveQuestionDown(id)),
    onRemoveQuestion: (id: string) => dispatch(removeQuestion(id)),
    onQuestionTitleChange: (id: string, value: string) =>
      dispatch(updateQuestionTitle({ id, title: value })),
    onQuestionTypeChange: (id: string, value: FormQuestionType) =>
      dispatch(updateQuestionType({ id, type: value })),
    onAddOption: (id: string) => dispatch(addQuestionOption(id)),
    onOptionChange: (id: string, optionIndex: number, value: string) =>
      dispatch(updateQuestionOption({ id, optionIndex, value })),
    onRemoveOption: (id: string, optionIndex: number) =>
      dispatch(removeQuestionOption({ id, optionIndex })),
  };
};

type CreateFormBuilderActionsParams = {
  dispatch: AppDispatch;
  onSubmit: () => void;
  onResetState: () => void;
  questionCardActions: QuestionCardActions;
};

const createResetHandler = (
  dispatch: AppDispatch,
  onResetState: () => void,
) => {
  return () => {
    dispatch(resetFormBuilder());
    onResetState();
  };
};

export const createFormBuilderActions = ({
  dispatch,
  onSubmit,
  onResetState,
  questionCardActions,
}: CreateFormBuilderActionsParams): FormBuilderActions => {
  return {
    setup: {
      onTitleChange: (value: string) => dispatch(setFormTitle(value)),
      onDescriptionChange: (value: string) =>
        dispatch(setFormDescription(value)),
    },
    questionSection: {
      onAddQuestion: (type: FormQuestionType) => dispatch(addQuestion(type)),
    },
    questionCards: questionCardActions,
    save: {
      onSubmit,
      onReset: createResetHandler(dispatch, onResetState),
    },
  };
};

type CreateFormBuilderQuestionsModelParams = {
  sensors: SensorDescriptor<SensorOptions>[];
  questions: FormBuilderQuestionsModel['questions'];
  fieldErrorMap: FormBuilderFieldErrors;
  onDragEnd: FormBuilderQuestionsModel['onDragEnd'];
};

export const createFormBuilderQuestionsModel = ({
  sensors,
  questions,
  fieldErrorMap,
  onDragEnd,
}: CreateFormBuilderQuestionsModelParams): FormBuilderQuestionsModel => {
  return {
    sensors,
    questions,
    questionTypeLabels: QUESTION_TYPE_LABELS,
    questionTypeOptions: QUESTION_TYPE_OPTIONS,
    getQuestionTypeHint,
    getQuestionTitleError: (questionId: string) =>
      getFirstFieldError(fieldErrorMap, `question-${questionId}-title`),
    getQuestionOptionsError: (questionId: string) =>
      getFirstFieldError(fieldErrorMap, `question-${questionId}-options`),
    onDragEnd,
  };
};
