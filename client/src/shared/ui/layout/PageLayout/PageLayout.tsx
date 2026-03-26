import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className }: Props) => (
  <main className={clsx('container', className)}>{children}</main>
);

export default PageLayout;
