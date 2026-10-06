'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  action: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === 'undefined' || !GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', action, parameters);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;

    const sendPageView = () => {
      if (typeof window.gtag !== 'function') return;
      window.gtag('config', GA_ID, {
        page_path: pathname,
        page_title: document.title,
      });
    };

    sendPageView();

    const handleConsent = (event: Event) => {
      if (typeof window.gtag !== 'function') return;
      const consent = (event as CustomEvent<'granted' | 'denied'>).detail;
      window.gtag('consent', 'update', {
        analytics_storage: consent === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      if (consent === 'granted') sendPageView();
    };

    window.addEventListener('avora:analytics-consent', handleConsent);

    const storedConsent = window.localStorage.getItem('avora-analytics-consent');
    if (storedConsent && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: storedConsent === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      if (storedConsent === 'granted') sendPageView();
    }

    return () => window.removeEventListener('avora:analytics-consent', handleConsent);
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
    </>
  );
}
