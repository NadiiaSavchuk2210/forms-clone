import { Outlet } from 'react-router-dom';

import ThemeSwitcher from '@/features/theme-switcher/ui/ThemeSwitcher';
import Header from '@/widgets/header/Header';

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
