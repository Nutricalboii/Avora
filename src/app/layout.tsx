import { Suspense } from 'react';
import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { generateSchema } from '@/app/schema';
import { SpotlightNav } from '@/components/ui/SpotlightNav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import "./globals.css";


const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Institutional AI Infrastructure & Data Operations`,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#FBF8F1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${dmSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        {/* Skip to content — for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-slate-900 dark:focus:bg-slate-900 focus:text-white dark:focus:text-white focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScrollProvider>
            <SpotlightNav />
            {/* ponytail: inlined PageTransition — opacity/translate on mount via CSS */}
            <main id="main-content" className="flex-grow flex flex-col relative z-0 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
                {children}
              </Suspense>
            </main>
            <Footer />
            <ChatbotWidget />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
