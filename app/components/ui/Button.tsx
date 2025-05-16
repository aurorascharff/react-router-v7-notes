import React from 'react';
import { cn } from '~/utils/style';

type Props = {
  theme?: 'secondary' | 'primary' | 'error';
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  theme,
  className,
  children,
  ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const defaultClasses =
    'active:enabled:translate-y-px h-fit w-fit cursor-pointer rounded-sm px-5 py-3 text-lg font-bold leading-none text-white disabled:cursor-default enabled:shadow-md';
  const colorClasses =
    theme === 'secondary'
      ? 'bg-white text-primary hover:enabled:bg-gray-100'
      : theme === 'error'
        ? 'bg-error text-white hover:enabled:bg-error-dark disabled:bg-error-dark '
        : 'bg-primary text-white hover:enabled:bg-primary-dark disabled:bg-primary-dark ';

  return (
    <button className={cn(defaultClasses, colorClasses, className)} {...props}>
      {children}
    </button>
  );
}
