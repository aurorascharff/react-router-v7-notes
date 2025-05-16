import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-4 bg-white p-6 shadow-lg">{children}</div>;
}
