import React from 'react';

type Props = {
  errors?: string[];
  name: string;
  label: string;
};

export default function TextArea({
  errors,
  name,
  label,
  ...otherProps
}: Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} aria-invalid={!!errors} aria-describedby="error" {...otherProps} />
      {errors && <span className="text-error">{errors[0]}</span>}
    </div>
  );
}
