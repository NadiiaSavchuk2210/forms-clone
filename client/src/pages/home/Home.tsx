import { useGetFormsQuery } from '@/shared/api/api';
import Loader from '@/shared/ui/Loader/Loader';
import { getUserFriendlyError } from '@/shared/lib/error-handler';
import { useMetaTags } from '@/shared/lib/hooks/useMetaTags';
import { HOME_PAGE_URL, SITE_NAME } from '@/shared/constants/metadata';

const Home = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  useMetaTags({
    title: SITE_NAME,
    description:
      'Create and share forms easily with our lightweight Google Forms clone.',
    ogUrl: HOME_PAGE_URL,
  });

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    const { title, message } = getUserFriendlyError(error);
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fee',
          borderRadius: '8px',
          color: '#c00',
        }}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <h2>No Forms Yet</h2>
        <p>Create a new form to get started</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Forms</h1>
      <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
        {data.map((form) => (
          <div
            key={form.id}
            style={{
              padding: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <h3>{form.title}</h3>
            {form.description && (
              <p style={{ color: '#666' }}>{form.description}</p>
            )}
            <small style={{ color: '#999' }}>
              {form.questions?.length || 0} questions
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
