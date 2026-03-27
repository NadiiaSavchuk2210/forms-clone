import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/app/providers/router/config/routesConfig';
import { SITE_NAME } from '@/shared/constants/metadata';
import Button from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import { Container } from '@/shared/ui/layout';

import { getHeaderAction } from './lib';

import css from './Header.module.css';

const Header = () => {
  const { pathname } = useLocation();
  const { href, icon: ActionIcon, label, variant } = getHeaderAction(pathname);

  return (
    <header className={css.header}>
      <Container className={css.headerContainer}>
        <Link to={ROUTES.HOME} className={css.logo} aria-label={SITE_NAME}>
          <span className={css.logoMark}>
            <Icon
              name="icon-logo"
              className={css.logoIcon}
              label="logo"
              width={40}
              height={40}
            />
          </span>

          <span className={css.logoCopy}>
            <span className={css.logoTitle}>{SITE_NAME}</span>
            <span className={css.logoTag}>Forms workspace</span>
          </span>
        </Link>

        <Button
          className={css.actionBtn}
          as="link"
          href={href}
          variant={variant}
        >
          <span className={css.actionBtnText}>{label}</span>
          <ActionIcon size={22} />
        </Button>
      </Container>
    </header>
  );
};

export default Header;
