import { useMemo } from 'react';

import { useGetFormQuery } from '@/entities/form/api';
import { useGetResponsesQuery } from '@/entities/response/api';

import { createFormResponsesViewData } from '../lib/formResponses.view-data';
import type { FormResponsesViewModel } from '../types';

export const useFormResponses = (
  formId?: string,
): FormResponsesViewModel => {
  const shouldSkip = !formId;
  const formQuery = useGetFormQuery({ id: formId ?? '' }, { skip: shouldSkip });
  const responsesQuery = useGetResponsesQuery(
    { formId: formId ?? '' },
    { skip: shouldSkip },
  );

  const form = formQuery.data?.form ?? null;
  const questions = useMemo(() => form?.questions ?? [], [form]);
  const responses = useMemo(
    () => responsesQuery.data?.responses ?? [],
    [responsesQuery.data],
  );
  const viewData = useMemo(
    () => createFormResponsesViewData(questions, responses),
    [questions, responses],
  );

  const refetch = () => {
    void formQuery.refetch();
    void responsesQuery.refetch();
  };

  return {
    form,
    responseCards: viewData.responseCards,
    summary: viewData.summary,
    responsesCount: viewData.responsesCount,
    isLoading: formQuery.isLoading || responsesQuery.isLoading,
    isError: formQuery.isError || responsesQuery.isError,
    loadError: formQuery.error ?? responsesQuery.error,
    refetch,
  };
};
