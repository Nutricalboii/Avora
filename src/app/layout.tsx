import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/site';
import { generateSchema } from '@/app/schema';
import { SpotlightNav } from '@/components/ui/SpotlightNav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Outsourcing, Skill Hiring & AI Solutions`,
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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080b12' },
    { media: '(prefers-color-scheme: light)', color: '#f9f6f0' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#080b12] text-slate-100">
        {/* Skip to content — for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SpotlightNav />
          {/* ponytail: inlined PageTransition — opacity/translate on mount via CSS */}
          <main id="main-content" className="flex-grow flex flex-col relative z-0 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
