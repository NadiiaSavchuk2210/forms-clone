import { useMemo, useState } from 'react';

interface UseHomePaginationParams<T> {
  items: T[];
  itemsPerPage: number;
}

export const useHomePagination = <T>({
  items,
  itemsPerPage,
}: UseHomePaginationParams<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, itemsPerPage, safeCurrentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(Math.min(prev, totalPages) - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(Math.min(prev, totalPages) + 1, totalPages),
    );
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    visibleItems,
    goToPreviousPage,
    goToNextPage,
  };
};
