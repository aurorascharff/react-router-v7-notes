import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-4 bg-white shadow-lg p-6">{children}</div>;
}
