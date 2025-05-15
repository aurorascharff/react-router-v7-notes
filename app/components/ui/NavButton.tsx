import React from 'react';
import { Link } from 'react-router';
import type { LinkProps } from 'react-router';

type Props = {
  to: string;
  children: React.ReactNode;
};

export default function NavButton({ to, children, ...otherProps }: Props & LinkProps) {
  return (
    <Link
      {...otherProps}
      to={to}
      className="m-0 w-fit cursor-pointer rounded bg-primary px-5 py-3 text-lg font-bold leading-none text-white shadow-lg"
    >
      {children}
    </Link>
  );
}
