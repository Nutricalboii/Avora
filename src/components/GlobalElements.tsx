'use client';
import { usePathname } from 'next/navigation';
import { SpotlightNav } from '@/components/ui/SpotlightNav';
import Footer from '@/components/Footer';

export default function GlobalElements({ type }: { type: 'header' | 'footer' }) {
  const pathname = usePathname();
  if (pathname === '/intro') return null;
  
  if (type === 'header') return <SpotlightNav />;
  if (type === 'footer') return <Footer />;
  return null;
}
