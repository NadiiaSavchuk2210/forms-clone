import { Suspense } from 'react';

import Loader from '@/shared/ui/Loader/Loader';

const SuspenseWrapper = (element: React.ReactNode) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);

export default SuspenseWrapper;
