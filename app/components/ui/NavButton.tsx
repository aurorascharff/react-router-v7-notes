import React from 'react';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';
import { cn } from '~/utils/style';

type Props = {
  to: string;
  theme?: 'secondary' | 'primary';
  children: React.ReactNode;
  className?: string;
};

export default function NavButton({ to, theme, children, className, ...otherProps }: Props & LinkProps) {
  const defaultClasses = 'h-fit w-fit rounded-sm px-5 py-3 text-lg leading-none text-white shadow-lg';
  const colorClasses = theme === 'secondary' ? 'bg-white text-primary' : 'bg-primary text-white';

  return (
    <Link {...otherProps} to={to} className={cn(defaultClasses, colorClasses, className)}>
      {children}
    </Link>
  );
}
