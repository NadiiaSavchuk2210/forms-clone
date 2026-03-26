import type { IconType } from 'react-icons';

export interface HeaderAction {
  href: string;
  label: string;
  icon: IconType;
  variant: 'primary' | 'outline';
}
