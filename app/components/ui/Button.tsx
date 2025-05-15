import React from 'react';
import { cn } from '~/utils/style';

type Props = {
  color?: 'white' | 'primary';
  className?: string;
};

export default function Button({ color, className, ...props }: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const defaultClasses =
    'active:enabled:translate-y-px h-fit w-fit cursor-pointer rounded px-5 py-3 text-lg font-bold leading-none text-white shadow-lg hover:enabled:-translate-y-px disabled:cursor-default disabled:opacity-80';
  const colorClasses = color === 'white' ? 'bg-white' : 'bg-primary';

  return (
    <button className={cn(defaultClasses, colorClasses, className)} {...props}>
      {props.children}
    </button>
  );
}
