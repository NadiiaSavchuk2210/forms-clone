export const ROUTES = {
  HOME: '/',
  FORM_BUILDER: '/forms/new',
  FORM_FILL_PATTERN: '/forms/:id/fill',
  FORM_RESPONSES_PATTERN: '/forms/:id/responses',

  FORM_FILL: (id: number | string) => `/forms/${id}/fill`,
  FORM_RESPONSES: (id: number | string) => `/forms/${id}/responses`,
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
