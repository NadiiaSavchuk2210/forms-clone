import { Link } from 'react-router-dom';
import css from './Header.module.css';
import Icon from '@/shared/ui/Icon/Icon';
import { SITE_NAME } from '@/shared/constants/metadata';
import Button from '@/shared/ui/Button/Button';
import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { MdAdd } from 'react-icons/md';
import { clsx } from 'clsx';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={clsx(css.headerContainer, 'container')}>
        <Link to="/" className={css.logo} aria-label={SITE_NAME}>
          <Icon
            name="icon-logo"
            className={css.logoIcon}
            label="logo"
            width={40}
            height={40}
          />
          <span>{SITE_NAME}</span>
        </Link>

        <Button
          className={css.createFormBtn}
          as="link"
          href={ROUTES.FORM_BUILDER}
        >
          <span className={css.createFormBtnText}>Start a new form</span>
          <MdAdd size={22} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
