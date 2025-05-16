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
    'active:enabled:translate-y-px h-fit w-fit cursor-pointer rounded-sm px-5 py-3 text-lg font-bold leading-none text-white shadow-lg hover:enabled:-translate-y-px disabled:cursor-default disabled:opacity-80';
  const colorClasses =
    theme === 'secondary'
      ? 'bg-white text-primary'
      : theme === 'error'
        ? 'bg-error text-white'
        : 'bg-primary text-white';

  return (
    <button className={cn(defaultClasses, colorClasses, className)} {...props}>
      {children}
    </button>
  );
}
