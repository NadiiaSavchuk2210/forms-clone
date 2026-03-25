import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Providers;
