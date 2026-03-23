import { RouterProvider } from 'react-router-dom';
import { router } from './app/providers/router';
import ErrorBoundary from './shared/ui/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
