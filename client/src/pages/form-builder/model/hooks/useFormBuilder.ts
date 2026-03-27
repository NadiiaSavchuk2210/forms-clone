import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { useCreateFormMutation } from '@/entities/form/api';
import { QUESTION_TYPE_LABELS, QUESTION_TYPE_OPTIONS } from '@/entities/form/model';
import type { CreateFormMutation } from '@/shared/api/generated';
import { getUserFriendlyError } from '@/shared/lib/error-handler';
import {
  buildValidationErrorMap,
  getFirstFieldError,
  getVisibleValidationErrors,
  validateFormData,
} from '@/shared/lib/validation';

import { buildQuestionInput, getChoiceQuestionsErrors } from '../lib/formBuilder.utils';
import {
  createFormBuilderActions,
  createFormBuilderQuestionsModel,
  createQuestionCardActions,
  createSuccessLinks,
} from '../lib/formBuilder.view-model';
import { reorderQuestions, resetFormBuilder } from '../slice/formBuilderSlice';
import type { SuccessState } from '../types';

export const useFormBuilder = () => {
  const dispatch = useAppDispatch();
  const { title, description, questions } = useAppSelector(
    (state) => state.formBuilder,
  );
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [successState, setSuccessState] = useState<SuccessState>(null);
  const [createForm, createFormState] = useCreateFormMutation();
  const { error: saveError, isLoading: isSaving } = createFormState;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const saveErrorMessage = saveError
    ? getUserFriendlyError(saveError).message
    : null;

  // Validation
  const formValidationErrors = useMemo(() => {
    const baseErrors = validateFormData({
      title,
      description,
      questions,
    });

    const choiceQuestionErrors = getChoiceQuestionsErrors(questions);

    return [...baseErrors, ...choiceQuestionErrors];
  }, [description, questions, title]);

  const visibleValidationErrors = useMemo(
    () =>
      getVisibleValidationErrors(showValidationErrors, formValidationErrors),
    [formValidationErrors, showValidationErrors],
  );
  const fieldErrorMap = useMemo(
    () => buildValidationErrorMap(visibleValidationErrors),
    [visibleValidationErrors],
  );
  const formTitleError = getFirstFieldError(fieldErrorMap, 'form-title');
  const formDescriptionError = getFirstFieldError(
    fieldErrorMap,
    'form-description',
  );
  const questionsError = getFirstFieldError(fieldErrorMap, 'questions');

  // Handlers
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

  const resetBuilderViewState = () => {
    setShowValidationErrors(false);
    setSuccessState(null);
  };

  const handleCreateFormSuccess = (response: CreateFormMutation) => {
    setSuccessState({
      id: response.createForm.id,
      title: response.createForm.title,
    });
    dispatch(resetFormBuilder());
    setShowValidationErrors(false);
    toast.success(`"${response.createForm.title}" is ready to share.`, {
      id: 'form-builder-success',
    });
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

      handleCreateFormSuccess(response);
    } catch {
      setSuccessState(null);
      toast.error(saveErrorMessage ?? 'Unable to save the form right now.', {
        id: 'form-builder-error',
      });
    }
  };

  // View models
  const questionCardActions = createQuestionCardActions(dispatch);
  const actions = createFormBuilderActions({
    dispatch,
    onSubmit: () => {
      void handleSubmit();
    },
    onResetState: resetBuilderViewState,
    questionCardActions,
  });

  const questionsModel = createFormBuilderQuestionsModel({
    sensors,
    questions,
    fieldErrorMap,
    onDragEnd: handleDragEnd,
  });
  const successLinks = createSuccessLinks(successState);

  return {
    title,
    description,
    questions,
    validationErrors: visibleValidationErrors,
    successState,
    successLinks,
    errorMessage: saveErrorMessage,
    isSaving,
    questionTypeOptions: QUESTION_TYPE_OPTIONS,
    questionTypeLabels: QUESTION_TYPE_LABELS,
    questionsModel,
    actions,
    formTitleError,
    formDescriptionError,
    questionsError,
  };
};
