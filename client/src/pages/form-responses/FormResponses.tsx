import { useParams } from 'react-router-dom';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { usePageMeta } from '@/shared/lib/hooks/usePageMeta';
import { PageLayout } from '@/shared/ui/layout';
import { useFormResponses } from './model';
import {
  FormResponsesContent,
  FormResponsesErrorState,
  FormResponsesLoadingState,
  FormResponsesMissingIdState,
  FormResponsesNotFoundState,
} from './ui';
import css from './FormResponses.module.css';

const FormResponses = () => {
  const { id } = useParams<{ id: string }>();
  const {
    form,
    isError,
    isLoading,
    loadError,
    refetch,
    responseCards,
    responsesCount,
    summary,
  } = useFormResponses(id);

  const pageTitle = form?.title ? `${form.title} Responses` : 'Form Responses';
  const pageDescription =
    form?.description ??
    'Review each submitted response in question order and compare answers across the form.';

  usePageMeta({
    title: pageTitle,
    description: pageDescription,
    path: id ? ROUTES.FORM_RESPONSES(id) : ROUTES.FORM_RESPONSES_PATTERN,
  });

  if (!id) {
    return <FormResponsesMissingIdState />;
  }

  if (isLoading) {
    return <FormResponsesLoadingState />;
  }

  if (isError) {
    return <FormResponsesErrorState loadError={loadError} onRetry={refetch} />;
  }

  if (!form) {
    return <FormResponsesNotFoundState />;
  }

  return (
    <PageLayout className={css.responsesPage}>
      <FormResponsesContent
        form={form}
        responseCards={responseCards}
        responsesCount={responsesCount}
        summary={summary}
      />
    </PageLayout>
  );
};

export default FormResponses;
