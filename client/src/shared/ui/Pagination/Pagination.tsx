import Button from '@/shared/ui/Button/Button';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={css.pagination} aria-label="Forms pagination">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className={css.label}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
