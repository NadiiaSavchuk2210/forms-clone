import { Provider } from 'react-redux';

import AppToaster from '@/shared/ui/AppToaster';

import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        {children}
        <AppToaster />
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
