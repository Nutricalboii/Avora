import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AI Data & Implementation Case Studies',
  description:
    'Review anonymized Avora Ventures outcomes across healthcare, precision agriculture, pharmaceuticals, and retail AI engagements.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'AI Data & Implementation Case Studies',
    description: 'Verified, anonymized outcomes from Avora Ventures engagements.',
    url: `${siteConfig.url}/work`,
    type: 'website',
  },
};

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
