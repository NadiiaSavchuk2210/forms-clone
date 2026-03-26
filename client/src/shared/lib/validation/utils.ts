export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);

  return date instanceof Date && !isNaN(date.getTime());
};
