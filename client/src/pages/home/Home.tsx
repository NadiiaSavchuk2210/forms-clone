import { DndContext, closestCenter } from '@dnd-kit/core';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button';
import ContentLoader from '@/shared/ui/ContentLoader';
import EmptyState from '@/shared/ui/EmptyState';
import Pagination from '@/shared/ui/Pagination';
import { useGetFormsQuery } from '@/shared/api/queries/forms';
import { getErrorMessage } from '@/shared/lib/error-handler';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import { useHomeDnd } from '@/shared/hooks/useHomeDnd';
import FormsList from '@/widgets/forms-list/FormsList';
import { useHomePagination } from './model';
import { HomeHeader } from './ui';
import css from './Home.module.css';
import { clsx } from 'clsx';

const FORMS_PER_PAGE = 6;
const FORMS_POLLING_INTERVAL = 15000;

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useGetFormsQuery(
    undefined,
    {
      pollingInterval: FORMS_POLLING_INTERVAL,
      skipPollingIfUnfocused: true,
    },
  );
  const forms = data?.forms ?? [];
  const { forms: draggableForms, sensors, handleDragEnd } = useHomeDnd(forms);
  const {
    currentPage,
    totalPages,
    visibleItems,
    goToPreviousPage,
    goToNextPage,
  } = useHomePagination({
    items: draggableForms,
    itemsPerPage: FORMS_PER_PAGE,
  });

  usePageMeta({
    title: 'Forms',
    description:
      'Create, fill out, and review lightweight Google Forms style questionnaires.',
    path: ROUTES.HOME,
  });

  if (isLoading) {
    return (
      <main className={clsx('container', css.homeContainer)}>
        <HomeHeader />
        <ContentLoader label="Loading forms..." />
      </main>
    );
  }

  if (isError) {
    return (
      <main className={clsx('container', css.homeContainer)}>
        <section className={css.errorContainer}>
          <h2>Failed to load forms</h2>
          <p>{getErrorMessage(error)}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </section>
      </main>
    );
  }

  return (
    <main className={clsx('container', css.homeContainer)}>
      <HomeHeader />

      {draggableForms.length === 0 ? (
        <section>
          <EmptyState variant="forms" />
        </section>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <FormsList forms={visibleItems} />
          </DndContext>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </>
      )}
    </main>
  );
};

export default Home;
