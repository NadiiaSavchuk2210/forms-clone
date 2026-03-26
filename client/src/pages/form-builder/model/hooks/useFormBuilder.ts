import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { useCreateFormMutation } from '@/entities/form/api';
import { QuestionType } from '@/shared/api/generated';
import { getUserFriendlyError } from '@/shared/lib/error-handler';
import { validateFormData } from '@/shared/lib/validators';
import {
  addQuestion,
  addQuestionOption,
  moveQuestionDown,
  moveQuestionUp,
  reorderQuestions,
  removeQuestion,
  removeQuestionOption,
  resetFormBuilder,
  setFormDescription,
  setFormTitle,
  updateQuestionOption,
  updateQuestionTitle,
  updateQuestionType,
} from '../slice/formBuilderSlice';
import {
  buildValidationErrorMap,
  buildQuestionInput,
  getFirstFieldError,
  getChoiceQuestionsErrors,
} from '../lib/formBuilder.utils';
import {
  QUESTION_TYPE_LABELS,
  QUESTION_TYPE_OPTIONS,
} from '../lib/constants';
import type {
  FormBuilderActions,
  FormBuilderQuestionsModel,
  QuestionCardActions,
  SuccessLinks,
} from '../types';

export const useFormBuilder = () => {
  const dispatch = useAppDispatch();
  const { title, description, questions } = useAppSelector(
    (state) => state.formBuilder,
  );
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [successState, setSuccessState] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [createForm, createFormState] = useCreateFormMutation();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const questionTypeOptions = useMemo(() => QUESTION_TYPE_OPTIONS, []);

  const saveErrorMessage = createFormState.error
    ? getUserFriendlyError(createFormState.error).message
    : null;
  const formValidationErrors = useMemo(() => {
    const baseErrors = validateFormData({
      title,
      description,
      questions,
    });
    const choiceQuestionErrors = getChoiceQuestionsErrors(questions);

    return [...baseErrors, ...choiceQuestionErrors];
  }, [description, questions, title]);
  const visibleValidationErrors = useMemo(() => {
    if (!showValidationErrors) {
      return [];
    }

    return formValidationErrors;
  }, [formValidationErrors, showValidationErrors]);
  const fieldErrorMap = useMemo(
    () => buildValidationErrorMap(visibleValidationErrors),
    [visibleValidationErrors],
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      dispatch(
        reorderQuestions({
          activeId: String(active.id),
          overId: String(over.id),
        }),
      );
    }
  };

  const successLinks: SuccessLinks = successState
    ? {
        fill: ROUTES.FORM_FILL(successState.id),
        responses: ROUTES.FORM_RESPONSES(successState.id),
      }
    : null;
  const questionActions: QuestionCardActions = {
    onMoveQuestionUp: (id: string) => dispatch(moveQuestionUp(id)),
    onMoveQuestionDown: (id: string) => dispatch(moveQuestionDown(id)),
    onRemoveQuestion: (id: string) => dispatch(removeQuestion(id)),
    onQuestionTitleChange: (id: string, value: string) =>
      dispatch(updateQuestionTitle({ id, title: value })),
    onQuestionTypeChange: (id: string, value: QuestionType) =>
      dispatch(updateQuestionType({ id, type: value })),
    onAddOption: (id: string) => dispatch(addQuestionOption(id)),
    onOptionChange: (id: string, optionIndex: number, value: string) =>
      dispatch(updateQuestionOption({ id, optionIndex, value })),
    onRemoveOption: (id: string, optionIndex: number) =>
      dispatch(removeQuestionOption({ id, optionIndex })),
  };
  const handleSubmit = async () => {
    if (formValidationErrors.length > 0) {
      setShowValidationErrors(true);
      setSuccessState(null);
      toast.error('Please fix the highlighted fields before saving.', {
        id: 'form-builder-validation',
      });
      return;
    }

    setShowValidationErrors(false);

    const payloadQuestions = questions.map(buildQuestionInput);

    try {
      const response = await createForm({
        title: title.trim(),
        description: description.trim() || undefined,
        questions: payloadQuestions,
      }).unwrap();

      setSuccessState({
        id: response.createForm.id,
        title: response.createForm.title,
      });
      dispatch(resetFormBuilder());
      setShowValidationErrors(false);
      toast.success(`"${response.createForm.title}" is ready to share.`, {
        id: 'form-builder-success',
      });
    } catch {
      setSuccessState(null);
      toast.error(saveErrorMessage ?? 'Unable to save the form right now.', {
        id: 'form-builder-error',
      });
    }
  };
  const actions: FormBuilderActions = {
    setup: {
      onTitleChange: (value: string) => dispatch(setFormTitle(value)),
      onDescriptionChange: (value: string) => dispatch(setFormDescription(value)),
    },
    questionSection: {
      onAddQuestion: (type: QuestionType) => dispatch(addQuestion(type)),
    },
    questionCards: questionActions,
    save: {
      onSubmit: () => {
        void handleSubmit();
      },
      onReset: () => {
        dispatch(resetFormBuilder());
        setShowValidationErrors(false);
        setSuccessState(null);
      },
    },
  };
  const questionsModel: FormBuilderQuestionsModel = {
    sensors,
    questions,
    questionTypeLabels: QUESTION_TYPE_LABELS,
    questionTypeOptions,
    getQuestionTypeHint: (type: QuestionType) =>
      QUESTION_TYPE_OPTIONS.find((item) => item.value === type)?.hint ?? '',
    getQuestionTitleError: (questionId: string) =>
      getFirstFieldError(fieldErrorMap, `question-${questionId}-title`),
    getQuestionOptionsError: (questionId: string) =>
      getFirstFieldError(fieldErrorMap, `question-${questionId}-options`),
    onDragEnd: handleDragEnd,
  };

  return {
    title,
    description,
    questions,
    validationErrors: visibleValidationErrors,
    successState,
    successLinks,
    errorMessage: saveErrorMessage,
    isSaving: createFormState.isLoading,
    questionTypeOptions,
    questionTypeLabels: QUESTION_TYPE_LABELS,
    questionsModel,
    actions,
    formTitleError: getFirstFieldError(fieldErrorMap, 'form-title'),
    formDescriptionError: getFirstFieldError(
      fieldErrorMap,
      'form-description',
    ),
    questionsError: getFirstFieldError(fieldErrorMap, 'questions'),
  };
};
