import { DndContext, closestCenter } from '@dnd-kit/core';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import Button from '@/shared/ui/Button';
import ContentLoader from '@/shared/ui/ContentLoader';
import EmptyState from '@/shared/ui/EmptyState';
import Pagination from '@/shared/ui/Pagination';
import { PageLayout } from '@/shared/ui/layout';
import { clsx } from 'clsx';
import { useGetFormsQuery } from '@/entities/form/api';
import { getErrorMessage } from '@/shared/lib/error-handler';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import FormsList from '@/widgets/forms-list/FormsList';
import FormsListSkeleton from '@/widgets/forms-list/FormsListSkeleton';
import { useHomeDnd, useHomePagination } from './model';
import { HomeHeader } from './ui';
import css from './Home.module.css';
import { FORMS_PER_PAGE, FORMS_POLLING_INTERVAL } from './constants';

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
      <PageLayout className={css.homeContainer}>
        <HomeHeader formsCount={0} />
        <section className={css.collectionShell}>
          <header className={css.collectionHeader}>
            <div>
              <h2 className={css.sectionTitle}>Your form collection</h2>
              <p className={css.sectionText}>
                Gathering the latest forms and arranging them for browsing.
              </p>
            </div>
            <span className={css.sectionPill}>Loading</span>
          </header>

          <FormsListSkeleton />

          <ContentLoader label="Loading forms..." />
        </section>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout className={css.homeContainer}>
        <HomeHeader formsCount={0} />
        <section className={css.errorContainer}>
          <h2>Failed to load forms</h2>
          <p>{getErrorMessage(error)}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout className={css.homeContainer}>
      <HomeHeader formsCount={draggableForms.length} />

      {draggableForms.length === 0 ? (
        <section className={clsx(css.collectionShell, css.emptyShell)}>
          <EmptyState variant="forms" headingLevel={2} />
        </section>
      ) : (
        <section className={css.collectionShell}>
          <header className={css.collectionHeader}>
            <div>
              <h2 className={css.sectionTitle}>Your form collection</h2>
              <p className={css.sectionText}>
                Browse what is ready, reshuffle the card order, and move between
                fill and response views.
              </p>
            </div>
            <span className={css.sectionPill}>
              {visibleItems.length} on this page
            </span>
          </header>

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
        </section>
      )}
    </PageLayout>
  );
};

export default Home;
