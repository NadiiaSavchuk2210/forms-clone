import { api as generatedApi } from './generated';

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetForms: {
      providesTags: (result) =>
        result
          ? [
              'Forms',
              ...result.forms.map((form) => ({
                type: 'Form' as const,
                id: form.id,
              })),
            ]
          : ['Forms'],
    },
    GetForm: {
      providesTags: (_result, _error, arg) => [{ type: 'Form' as const, id: arg.id }],
    },
    CreateForm: {
      invalidatesTags: ['Forms'],
    },
    GetResponses: {
      providesTags: (_result, _error, arg) => [
        { type: 'Responses' as const, id: arg.formId },
      ],
    },
    SubmitResponse: {
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Responses' as const, id: arg.formId },
      ],
    },
  },
});

export const {
  useGetFormsQuery,
  useLazyGetFormsQuery,
  useGetFormQuery,
  useLazyGetFormQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
  useGetResponsesQuery,
  useLazyGetResponsesQuery,
} = api;
