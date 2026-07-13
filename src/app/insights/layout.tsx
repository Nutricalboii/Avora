import { Suspense } from 'react';

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080b12]" />}>
      {children}
    </Suspense>
  );
}
