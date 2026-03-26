export interface ValidationError {
  field: string;
  message: string;
}

export interface DraftQuestionData {
  id?: string;
  title?: string;
  type?: string;
  options?: string[];
}

export interface FormDraftData {
  title?: string;
  description?: string;
  questions?: DraftQuestionData[];
}

export interface SubmittedQuestionData {
  id: string;
  title: string;
  type: string;
}

export type QuestionAnswerValue = string | string[];

export interface SubmittedAnswerData {
  questionId?: string;
  value?: QuestionAnswerValue;
}
