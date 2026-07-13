import type { Metadata } from 'next';
import LeadershipPage from './LeadershipPage';

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

export const metadata: Metadata = {
  title: 'Executive Leadership | Avora Ventures',
  description:
    'Avora Ventures is led by an experienced team with credentials including Stanford MBA & MS, IIT Kanpur B.Tech, and career experience at McKinsey & Co., Mitsubishi Heavy Industries, NextEra Energy, and Autogrid.',
  openGraph: {
    title: 'Executive Leadership | Avora Ventures',
    description:
      'Avora Ventures executive leadership team details including education, work history, awards, publications, and patents.',
    url: 'https://avoraventure.com/leadership',
    type: 'website',
  },
};

export default function Page() {
  return <LeadershipPage />;
}
