export const normalizeQuestionOptions = (options: string[]): string[] =>
  options.map((option) => option.trim()).filter(Boolean);
