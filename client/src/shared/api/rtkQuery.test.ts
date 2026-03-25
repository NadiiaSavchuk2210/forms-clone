import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import './typedDocumentString';
import { baseApi } from './baseApi';
import { QuestionType } from './generated';
import { api as rtkApi } from './enhancedApi';

type TestStore = ReturnType<typeof createTestStore>;

const createTestStore = () =>
  configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

const readGraphqlBody = async (
  input: unknown,
  init?: RequestInit,
): Promise<{ query?: string; variables?: unknown }> => {
  if (typeof init?.body === 'string') {
    return JSON.parse(init.body) as { query?: string; variables?: unknown };
  }

  if (input instanceof Request) {
    const rawBody = await input.text();
    return JSON.parse(rawBody || '{}') as {
      query?: string;
      variables?: unknown;
    };
  }

  return {};
};

describe('RTK Query GraphQL endpoints', () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: unknown, init?: RequestInit) => {
        const parsedBody = await readGraphqlBody(input, init);
        const query = parsedBody.query ?? '';

        if (query.includes('query GetForms')) {
          return new Response(
            JSON.stringify({
              data: {
                forms: [
                  {
                    id: '1',
                    title: 'Form A',
                    description: 'Desc',
                    questions: [
                      {
                        id: 'q1',
                        title: 'Q1',
                        type: 'TEXT',
                        options: [],
                      },
                    ],
                  },
                ],
              },
            }),
            { status: 200 },
          );
        }

        if (query.includes('query GetForm')) {
          return new Response(
            JSON.stringify({
              data: {
                form: {
                  id: '1',
                  title: 'Form A',
                  description: 'Desc',
                  questions: [
                    {
                      id: 'q1',
                      title: 'Q1',
                      type: 'TEXT',
                      options: [],
                    },
                  ],
                },
              },
            }),
            { status: 200 },
          );
        }

        if (query.includes('query GetResponses')) {
          return new Response(
            JSON.stringify({
              data: {
                responses: [
                  {
                    id: 'r1',
                    formId: '1',
                    answers: [
                      {
                        questionId: 'q1',
                        value: ['hello'],
                      },
                    ],
                  },
                ],
              },
            }),
            { status: 200 },
          );
        }

        if (query.includes('mutation SubmitResponse')) {
          return new Response(
            JSON.stringify({
              data: {
                submitResponse: {
                  id: 'r2',
                  formId: '1',
                  answers: [
                    {
                      questionId: 'q1',
                      value: ['x'],
                    },
                  ],
                },
              },
            }),
            { status: 200 },
          );
        }

        if (query.includes('mutation CreateForm')) {
          const variables = parsedBody.variables as
            | { title?: string }
            | undefined;

          if (variables?.title === 'Fresh Form') {
            return new Response(
              JSON.stringify({
                data: {
                  createForm: {
                    id: 'new-form',
                    title: 'Fresh Form',
                    description: 'Desc',
                    questions: [],
                  },
                },
              }),
              { status: 200 },
            );
          }

          return new Response(
            JSON.stringify({
              errors: [{ message: 'Form validation failed' }],
            }),
            { status: 200 },
          );
        }

        return new Response(JSON.stringify({ data: {} }), { status: 200 });
      }),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GetForms returns forms list', async () => {
    const result = await store
      .dispatch(rtkApi.endpoints.GetForms.initiate(undefined))
      .unwrap();

    expect(result.forms).toHaveLength(1);
    expect(result.forms[0].title).toBe('Form A');
  });

  it('GetForm returns one form by id', async () => {
    const result = await store
      .dispatch(rtkApi.endpoints.GetForm.initiate({ id: '1' }))
      .unwrap();

    expect(result.form?.id).toBe('1');
    expect(result.form?.questions[0].id).toBe('q1');
  });

  it('GetResponses returns responses for form', async () => {
    const result = await store
      .dispatch(rtkApi.endpoints.GetResponses.initiate({ formId: '1' }))
      .unwrap();

    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].answers[0].value).toEqual(['hello']);
  });

  it('SubmitResponse returns created response', async () => {
    const result = await store
      .dispatch(
        rtkApi.endpoints.SubmitResponse.initiate({
          formId: '1',
          answers: [{ questionId: 'q1', value: ['x'] }],
        }),
      )
      .unwrap();

    expect(result.submitResponse.id).toBe('r2');
    expect(result.submitResponse.answers[0].value).toEqual(['x']);
  });

  it('CreateForm surfaces GraphQL errors as rejected queries', async () => {
    await expect(
      store
        .dispatch(
          rtkApi.endpoints.CreateForm.initiate({
            title: 'Broken',
            description: 'Desc',
            questions: [],
          }),
        )
        .unwrap(),
    ).rejects.toMatchObject({
      status: 400,
      data: 'Form validation failed',
    });
  });

  it('CreateForm invalidates forms cache so list can refresh after creation', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    await store.dispatch(rtkApi.endpoints.GetForms.initiate(undefined)).unwrap();

    await store
      .dispatch(
        rtkApi.endpoints.CreateForm.initiate({
          title: 'Fresh Form',
          description: 'Desc',
          questions: [
            {
              title: 'Question 1',
              type: QuestionType.Text,
              options: [],
            },
          ],
        }),
      )
      .unwrap();

    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });
});
