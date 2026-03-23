function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getErrorMessage(error: unknown): string {
  if (isObject(error)) {
    const err = error as Record<string, unknown>;

    if (isObject(err.data)) {
      const inner = err.data as Record<string, unknown>;
      if (typeof inner.data === 'string') return inner.data;
    }

    if (isObject(err.data)) {
      const inner = err.data as Record<string, unknown>;
      const maybeErrors = inner.errors;
      if (Array.isArray(maybeErrors)) {
        const messages = maybeErrors
          .map((e) =>
            isObject(e) && typeof e.message === 'string' ? e.message : '',
          )
          .filter(Boolean);
        if (messages.length > 0) return messages.join('; ');
      }

      if (
        isObject(maybeErrors) &&
        typeof (maybeErrors as Record<string, unknown>).message === 'string'
      ) {
        return (maybeErrors as Record<string, unknown>).message as string;
      }
    }
    if (typeof (err.message as unknown) === 'string')
      return err.message as string;
  }

  if (typeof error === 'string') return error;

  return 'An unexpected error occurred. Please try again.';
}

export function isNetworkError(error: unknown): boolean {
  if (isObject(error)) {
    const err = error as Record<string, unknown>;
    const status = err.status;
    if (typeof status === 'number') return status >= 500;
    if (
      typeof err.message === 'string' &&
      err.message.toLowerCase().includes('network')
    )
      return true;
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  const message = getErrorMessage(error);
  const lower = message.toLowerCase();
  return (
    lower.includes('validation') ||
    lower.includes('required') ||
    lower.includes('invalid') ||
    lower.includes('must')
  );
}

export function getUserFriendlyError(error: unknown): {
  title: string;
  message: string;
} {
  if (isNetworkError(error)) {
    return {
      title: 'Network Error',
      message:
        'Unable to connect to the server. Please check your connection and try again.',
    };
  }

  if (isValidationError(error)) {
    return {
      title: 'Validation Error',
      message: getErrorMessage(error),
    };
  }

  return {
    title: 'Error',
    message: getErrorMessage(error),
  };
}
