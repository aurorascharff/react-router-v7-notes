import React from 'react';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="rounded bg-error p-2">{children}</div>;
}
