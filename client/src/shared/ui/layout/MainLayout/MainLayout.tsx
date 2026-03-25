import ThemeSwitcher from '@/features/theme-switcher/ui/ThemeSwitcher';
import Header from '@/widgets/header/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <ThemeSwitcher />
    </>
  );
};

export default MainLayout;
