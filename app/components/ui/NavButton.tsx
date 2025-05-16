import React from 'react';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';
import { cn } from '~/utils/style';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavButton({ to, children, className, ...otherProps }: Props & LinkProps) {
  return (
    <Link
      {...otherProps}
      to={to}
      className={cn('text-primary h-fit w-fit rounded-sm bg-white px-5 py-3 text-lg leading-none shadow-md', className)}
    >
      {children}
    </Link>
  );
}
