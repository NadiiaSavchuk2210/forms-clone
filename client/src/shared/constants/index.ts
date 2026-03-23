export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';

export const FORM_QUESTION_TYPES = {
  TEXT: 'TEXT',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
  DATE: 'DATE',
} as const;

export const DEFAULT_TIMEOUT = 30000;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_FORM: 'Invalid form data. Please check all required fields.',
  FORM_SUBMISSION_FAILED: 'Failed to submit form. Please try again.',
  FORM_LOAD_FAILED: 'Failed to load form. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

export const SUCCESS_MESSAGES = {
  FORM_CREATED: 'Form created successfully!',
  FORM_UPDATED: 'Form updated successfully!',
  RESPONSE_SUBMITTED: 'Your response has been submitted successfully!',
  QUESTION_ADDED: 'Question added successfully!',
} as const;
