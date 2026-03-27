import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import css from './Breadcrumbs.module.css';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className={css.breadcrumbs}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.href && !isLastItem ? (
              <Link to={item.href} className={css.link}>
                {item.label}
              </Link>
            ) : (
              <span
                className={isLastItem ? css.current : undefined}
                aria-current={isLastItem ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}

            {!isLastItem ? (
              <span className={css.separator} aria-hidden="true">
                /
              </span>
            ) : null}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
