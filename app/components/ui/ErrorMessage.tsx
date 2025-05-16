import React from 'react';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="rounded bg-error p-4 text-white">{children}</div>;
}
