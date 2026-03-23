import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { Form, Response } from '@shared/types';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

type Variables = Record<string, unknown>;
type GraphQLRequest = { document: string; variables?: Variables };
type GraphQLResponseData =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | null;

const API_URL = (import.meta.env.VITE_API_URL ||
  'http://localhost:4000/graphql') as string;

const graphqlBaseQuery = fetchBaseQuery({
  baseUrl: API_URL.replace('/graphql', ''),
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const graphqlQueryFn: BaseQueryFn<
  GraphQLRequest,
  GraphQLResponseData,
  unknown
> = async ({ document, variables }: GraphQLRequest, api, extraOptions) => {
  const body = {
    query: document,
    ...(variables && { variables }),
  };

  const result = (await graphqlBaseQuery(
    {
      url: '/graphql',
      method: 'POST',
      body,
    },
    api,
    extraOptions,
  )) as { data?: unknown; error?: unknown };

  if (result.error) {
    return { error: result.error };
  }

  const response = result.data as
    | GraphQLResponse<Record<string, unknown>>
    | undefined;
  if (response?.errors && response.errors.length > 0) {
    return {
      error: {
        status: 400,
        data: response.errors[0]?.message ?? 'GraphQL error',
      },
    };
  }

  return { data: (response?.data ?? null) as GraphQLResponseData };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlQueryFn,
  tagTypes: ['Forms', 'Form', 'Responses'],
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        document: `
          query {
            forms {
              id
              title
              description
              questions {
                id
                title
                type
                options
              }
            }
          }
        `,
      }),
      transformResponse: (response: { forms: Form[] }) => response.forms,
      providesTags: ['Forms'],
    }),

    getForm: builder.query<Form | null, string>({
      query: (id) => ({
        document: `
          query GetForm($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                title
                type
                options
              }
            }
          }
        `,
        variables: { id },
      }),
      transformResponse: (response: { form: Form | null }) => response.form,
      providesTags: (_result, _error, id) => [{ type: 'Form', id }],
    }),

    createForm: builder.mutation<
      Form,
      {
        title: string;
        description?: string;
        questions?: Array<{ title: string; type: string; options?: string[] }>;
      }
    >({
      query: (formData) => ({
        document: `
          mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {
            createForm(title: $title, description: $description, questions: $questions) {
              id
              title
              description
              questions {
                id
                title
                type
                options
              }
            }
          }
        `,
        variables: formData,
      }),
      transformResponse: (response: { createForm: Form }) =>
        response.createForm,
      invalidatesTags: ['Forms'],
    }),

    getResponses: builder.query<Response[], string>({
      query: (formId) => ({
        document: `
          query GetResponses($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId },
      }),
      transformResponse: (response: { responses: Response[] }) =>
        response.responses,
      providesTags: (_result, _error, formId) => [
        { type: 'Responses', id: formId },
      ],
    }),

    submitResponse: builder.mutation<
      Response,
      {
        formId: string;
        answers: Array<{ questionId: string; value: string | string[] }>;
      }
    >({
      query: ({ formId, answers }) => ({
        document: `
          mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
            submitResponse(formId: $formId, answers: $answers) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables: { formId, answers },
      }),
      transformResponse: (response: { submitResponse: Response }) =>
        response.submitResponse,
      invalidatesTags: (_result, _error, { formId }) => [
        { type: 'Responses', id: formId },
      ],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useGetResponsesQuery,
  useSubmitResponseMutation,
} = api;
