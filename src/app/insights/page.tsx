import type { Metadata } from 'next';
import InsightsPage from './InsightsPage';

export const metadata: Metadata = {
  title: 'AI Delivery Playbook | Avora Ventures',
  description:
    'Six disciplines, one continuous pipeline — from data generation to specialized outsourcing. The complete framework for building reliable AI systems.',
  openGraph: {
    title: 'AI Delivery Playbook | Avora Ventures',
    description:
      'Six disciplines, one continuous pipeline — from data generation to specialized outsourcing.',
    url: 'https://avora-3kyx.vercel.app/insights',
    type: 'website',
  },
};

export default function Page() {
  return <InsightsPage />;
}
