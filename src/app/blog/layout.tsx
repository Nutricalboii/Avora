import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'AI Data Operations Insights & Research',
  description:
    'Curated insights on synthetic data, data annotation, quality auditing, and production AI implementation from Avora Ventures.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AI Data Operations Insights & Research',
    description: 'Research and practical guides for building production AI systems.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
