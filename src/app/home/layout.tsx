import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Production AI Data Operations & Solutions',
  description:
    'Avora Ventures prepares high-quality AI data and builds production-ready AI solutions through one integrated delivery framework.',
  alternates: { canonical: '/home' },
  openGraph: {
    title: 'Production AI Data Operations & Solutions',
    description:
      'High-quality AI data and production-ready AI solutions from Avora Ventures.',
    url: `${siteConfig.url}/home`,
    type: 'website',
  },
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
