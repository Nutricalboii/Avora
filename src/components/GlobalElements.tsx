'use client';
import { usePathname } from 'next/navigation';
import { SpotlightNav } from '@/components/ui/SpotlightNav';
import Footer from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';

export default function GlobalElements({ type }: { type: 'header' | 'footer' | 'chat' }) {
  const pathname = usePathname();
  if (pathname === '/intro') return null;
  
  if (type === 'header') return <SpotlightNav />;
  if (type === 'footer') return <Footer />;
  if (type === 'chat') return <ChatbotWidget />;
  return null;
}
