import { useEffect } from 'react';
import { useGetFormsQuery } from '@/shared/api/queries/forms';

export function useFormPolling(interval: number = 15000) {
  const { refetch } = useGetFormsQuery();

  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    refetch();

    const pollingTimer = setInterval(() => {
      if (document.hidden) {
        refetch();
      }
    }, interval);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(pollingTimer);
    };
  }, [interval, refetch]);
}
