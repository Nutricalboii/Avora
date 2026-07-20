'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Root() {
  const router = useRouter();
  // If they have visited before, skip intro (sessionStorage flag)
  useEffect(() => {
    if (sessionStorage.getItem('avora_intro_seen')) {
      router.replace('/home');
    } else {
      router.replace('/intro');
    }
  }, [router]);
  return null;
}
