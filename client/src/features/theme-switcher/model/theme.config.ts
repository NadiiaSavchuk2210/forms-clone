export const THEMES = {
  green: { label: 'Green', color: '#34a853' },
  purple: { label: 'Purple', color: '#673ab7' },
  dark: { label: 'Dark', color: '#1f6a35' },
} as const;

export type Theme = keyof typeof THEMES;
