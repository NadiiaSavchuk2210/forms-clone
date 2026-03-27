import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useGetFormQuery } from '@/entities/form/api';
import { useSubmitResponseMutation } from '@/entities/response/api';
import { getUserFriendlyError } from '@/shared/lib/error-handler';
import {
  buildValidationErrorMap,
  getFirstFieldError,
  getVisibleValidationErrors,
  validateFormSubmission,
} from '@/shared/lib/validation';

import { loadFormFillerDraft, saveFormFillerDraft } from '../lib/formFiller.storage';
import {
  buildAnswerInput,
  createFormFillerActions,
  createQuestionFieldActions,
  createQuestionsModel,
  setSingleAnswerValue,
  syncAnswersWithQuestions,
  toggleAnswerOption,
} from '../lib/formFiller.utils';
import type { QuestionAnswersById, SubmitSuccessState } from '../types';

type FormFillerState = {
  formId: string | null;
  answerDrafts: QuestionAnswersById;
  showValidationErrors: boolean;
  successState: SubmitSuccessState;
};

const createFormState = (formId?: string): FormFillerState => ({
  formId: formId ?? null,
  answerDrafts: loadFormFillerDraft(formId),
  showValidationErrors: false,
  successState: null,
});

export const useFormFiller = (formId?: string) => {
  const {
    data: formQueryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFormQuery({ id: formId ?? '' }, { skip: !formId });
  const [submitResponse, submitResponseRequest] = useSubmitResponseMutation();
  const [formState, setFormState] = useState<FormFillerState>(() =>
    createFormState(formId),
  );

  const currentFormId = formId ?? null;
  const activeFormState =
    formState.formId === currentFormId ? formState : createFormState(formId);

  const form = formQueryData?.form ?? null;
  const formQuestions = useMemo(() => form?.questions ?? [], [form]);
  const answersByQuestionId = useMemo(
    () => syncAnswersWithQuestions(formQuestions, activeFormState.answerDrafts),
    [activeFormState.answerDrafts, formQuestions],
  );
  const submitErrorMessage = submitResponseRequest.error
    ? getUserFriendlyError(submitResponseRequest.error).message
    : null;

  const updateFormState = (
    updater: (previousState: FormFillerState) => FormFillerState,
  ) => {
    setFormState((previousState) => {
      const baseState =
        previousState.formId === currentFormId
          ? previousState
          : createFormState(formId);

      return updater(baseState);
    });
  };

  useEffect(() => {
    saveFormFillerDraft(formId, activeFormState.answerDrafts);
  }, [activeFormState.answerDrafts, formId]);

  const submissionErrors = useMemo(() => {
    const answers = buildAnswerInput(formQuestions, answersByQuestionId);

    return validateFormSubmission(answers, formQuestions);
  }, [answersByQuestionId, formQuestions]);

  const visibleValidationErrors = useMemo(
    () =>
      getVisibleValidationErrors(
        activeFormState.showValidationErrors,
        submissionErrors,
      ),
    [activeFormState.showValidationErrors, submissionErrors],
  );

  const fieldErrorMap = useMemo(
    () => buildValidationErrorMap(visibleValidationErrors),
    [visibleValidationErrors],
  );

  const setSingleValue = (questionId: string, value: string) => {
    updateFormState((previousState) => ({
      ...previousState,
      answerDrafts: setSingleAnswerValue(
        previousState.answerDrafts,
        questionId,
        value,
      ),
    }));
  };

  const toggleCheckboxValue = (questionId: string, option: string) => {
    updateFormState((previousState) => ({
      ...previousState,
      answerDrafts: toggleAnswerOption(
        previousState.answerDrafts,
        questionId,
        option,
      ),
    }));
  };

  const handleReset = () => {
    updateFormState((previousState) => ({
      ...previousState,
      answerDrafts: {},
      showValidationErrors: false,
      successState: null,
    }));
  };

  const handleSubmit = async () => {
    if (!formId || !form) {
      return;
    }

    if (submissionErrors.length > 0) {
      updateFormState((previousState) => ({
        ...previousState,
        showValidationErrors: true,
        successState: null,
      }));
      toast.error(
        'Please answer the highlighted questions before submitting.',
        {
          id: 'form-filler-validation',
        },
      );
      return;
    }

    try {
      const response = await submitResponse({
        formId,
        answers: buildAnswerInput(formQuestions, answersByQuestionId),
      }).unwrap();

      updateFormState((previousState) => ({
        ...previousState,
        successState: {
          responseId: response.submitResponse.id,
          formTitle: form.title,
        },
        showValidationErrors: false,
        answerDrafts: {},
      }));
      toast.success('Form submitted successfully.', {
        id: 'form-filler-success',
      });
    } catch {
      updateFormState((previousState) => ({
        ...previousState,
        successState: null,
      }));
      toast.error(
        submitErrorMessage ?? 'Unable to submit the form right now.',
        { id: 'form-filler-error' },
      );
    }
  };

  const submitForm = () => {
    void handleSubmit();
  };

  const fieldActions = createQuestionFieldActions(
    setSingleValue,
    toggleCheckboxValue,
  );

  const actions = createFormFillerActions(
    fieldActions,
    submitForm,
    handleReset,
  );

  const questionsModel = createQuestionsModel(
    formQuestions,
    answersByQuestionId,
    (questionId: string) => getFirstFieldError(fieldErrorMap, questionId),
  );

  return {
    form,
    questionsModel,
    actions,
    validationErrors: visibleValidationErrors,
    successState: activeFormState.successState,
    submitErrorMessage,
    isLoading,
    isError,
    loadError: error,
    refetch,
    isSubmitting: submitResponseRequest.isLoading,
  };
};
