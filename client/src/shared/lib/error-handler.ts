function isObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object') {
    return false;
  }

  return value !== null;
}

export function getErrorMessage(error: unknown): string {
  if (!isObject(error)) {
    if (typeof error === 'string') {
      return error;
    }

    return 'An unexpected error occurred. Please try again.';
  }

  const err = error as Record<string, unknown>;
  if (isObject(err.data)) {
    const inner = err.data as Record<string, unknown>;

    if (typeof inner.data === 'string') {
      return inner.data;
    }

    const maybeErrors = inner.errors;
    if (Array.isArray(maybeErrors)) {
      const messages = maybeErrors
        .map((item) => {
          if (!isObject(item) || typeof item.message !== 'string') {
            return '';
          }

          return item.message;
        })
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join('; ');
      }
    }

    if (isObject(maybeErrors) && typeof maybeErrors.message === 'string') {
      return maybeErrors.message;
    }
  }

  if (typeof err.message === 'string') {
    return err.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

export function isNetworkError(error: unknown): boolean {
  if (!isObject(error)) {
    return false;
  }

  const err = error as Record<string, unknown>;
  const status = err.status;

  if (typeof status === 'number') {
    return status >= 500;
  }

  if (typeof err.message !== 'string') {
    return false;
  }

  return err.message.toLowerCase().includes('network');
}

export function isValidationError(error: unknown): boolean {
  const message = getErrorMessage(error);
  const lower = message.toLowerCase();

  return ['validation', 'required', 'invalid', 'must'].some((token) =>
    lower.includes(token),
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
