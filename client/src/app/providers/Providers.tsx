import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeProvider';
import AppToaster from '@/shared/ui/AppToaster';

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
