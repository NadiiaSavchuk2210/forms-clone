import type {
  FormQuestion,
  FormQuestionType,
  FormRecord,
} from '@/entities/form/model';
import type { ResponseRecord } from '@/entities/response/model';

export type FormResponsesForm = FormRecord;
export type FormResponsesQuestion = FormQuestion;
export type FormResponsesRecord = ResponseRecord;

export interface FormResponseCardAnswer {
  questionId: string;
  questionTitle: string;
  questionType: FormQuestionType;
  questionTypeLabel: string;
  values: string[];
  displayValue: string;
  hasAnswer: boolean;
}

export interface FormResponseCard {
  id: string;
  title: string;
  answeredCount: number;
  totalQuestions: number;
  answers: FormResponseCardAnswer[];
}

export interface FormResponsesSummaryModel {
  responsesCount: number;
  questionsCount: number;
  collectedAnswersCount: number;
  averageAnswersPerResponse: number;
  questionAnalytics: FormResponsesQuestionAnalyticsRow[];
}

export interface FormResponsesQuestionAnalyticsAnswer {
  value: string;
  responseTitles: string[];
  responseIds: string[];
}

export interface FormResponsesQuestionAnalyticsRow {
  questionId: string;
  questionTitle: string;
  questionTypeLabel: string;
  answeredCount: number;
  answers: FormResponsesQuestionAnalyticsAnswer[];
}

export interface FormResponsesViewModel {
  form: FormResponsesForm | null;
  responseCards: FormResponseCard[];
  summary: FormResponsesSummaryModel;
  responsesCount: number;
  isLoading: boolean;
  isError: boolean;
  loadError: unknown;
  refetch: () => void;
}
