import { MetadataRoute } from 'next';

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard crawlers: allow public pages, block API and Next.js internals
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/404', '/500'],
      },
      // Block AI training scrapers
      { userAgent: 'GPTBot',          disallow: ['/'] },
      { userAgent: 'ChatGPT-User',    disallow: ['/'] },
      { userAgent: 'Claude-Web',      disallow: ['/'] },
      { userAgent: 'ClaudeBot',       disallow: ['/'] },
      { userAgent: 'anthropic-ai',    disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot',           disallow: ['/'] },
      { userAgent: 'FacebookBot',     disallow: ['/'] },
      { userAgent: 'Bytespider',      disallow: ['/'] },
      { userAgent: 'Amazonbot',       disallow: ['/'] },
      { userAgent: 'cohere-ai',       disallow: ['/'] },
    ],
    sitemap: 'https://avora-3kyx.vercel.app/sitemap.xml',
  };
}
