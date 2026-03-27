import { v4 as uuid } from 'uuid';
import {
  type CreateFormInput,
  type Form,
  type Response,
  type SubmitResponseInput,
} from '../../shared/src/types';
import { validateForm, validateResponse } from './utils/validation';
import { forms, responses } from './database';

type ResolverParent = Record<string, never>;
type QueryArgsWithId = { id: string };
type QueryArgsWithFormId = { formId: string };

const normalizeText = (value: string): string => value.trim();

const normalizeOptions = (options: string[] | undefined): string[] =>
  (options ?? []).map(normalizeText).filter(Boolean);

export const resolvers = {
  Query: {
    forms: (): Form[] => forms,

    form: (_parent: ResolverParent, { id }: QueryArgsWithId): Form | null =>
      forms.find((form) => form.id === id) ?? null,

    responses: (
      _parent: ResolverParent,
      { formId }: QueryArgsWithFormId,
    ): Response[] => responses.filter((response) => response.formId === formId),
  },

  Mutation: {
    createForm: (_parent: ResolverParent, args: CreateFormInput): Form => {
      const validation = validateForm(args);

      if (!validation.valid) {
        throw new Error(validation.error || 'Form validation failed');
      }

      const questionsWithIds = args.questions.map((question) => ({
        id: uuid(),
        title: normalizeText(question.title),
        type: question.type,
        options: normalizeOptions(question.options),
      }));

      const newForm: Form = {
        id: uuid(),
        title: normalizeText(args.title),
        description: args.description?.trim() || undefined,
        questions: questionsWithIds,
      };

      forms.push(newForm);

      return newForm;
    },

    submitResponse: (
      _parent: ResolverParent,
      { formId, answers }: SubmitResponseInput,
    ): Response => {
      const normalizedFormId = formId.trim();
      const form = forms.find((item) => item.id === normalizedFormId);

      const validation = validateResponse(
        { formId: normalizedFormId, answers },
        form,
      );

      if (!validation.valid) {
        throw new Error(validation.error || 'Response validation failed');
      }

      const newResponse: Response = {
        id: uuid(),
        formId: normalizedFormId,
        answers: answers.map((answer) => ({
          questionId: answer.questionId.trim(),
          value: answer.value.map((item) => item.trim()).filter(Boolean),
        })),
      };

      responses.push(newResponse);

      return newResponse;
    },
  },
};
