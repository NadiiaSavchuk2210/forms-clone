import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return <div className={clsx('container', className)}>{children}</div>;
};

export default Container;
