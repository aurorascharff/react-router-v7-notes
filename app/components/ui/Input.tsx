import React from 'react';

type Props = {
  errors?: string[];
  name: string;
  label: string;
};

export default function Input({
  errors,
  name,
  label,
  ...otherProps
}: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} aria-invalid={!!errors} aria-describedby="error" {...otherProps} />
      {errors && <span className="text-error">{errors[0]}</span>}
    </div>
  );
}
