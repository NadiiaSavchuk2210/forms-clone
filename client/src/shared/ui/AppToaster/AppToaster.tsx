import { Toaster } from 'react-hot-toast';

import css from './AppToaster.module.css';

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      gutter={14}
      toastOptions={{
        duration: 4000,
        className: css.toast,
        success: {
          className: `${css.toast} ${css.success}`,
        },
        error: {
          className: `${css.toast} ${css.error}`,
        },
      }}
      containerClassName={css.toastViewport}
    />
  );
};

export default AppToaster;
