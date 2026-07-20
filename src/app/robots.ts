import { MetadataRoute } from 'next';

// Engineered by Vaibhav Sharma · github.com/Nutricalboii

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/dashboard/', '/api/'],
      },
    ],
    sitemap: 'https://avora-3kyx.vercel.app/sitemap.xml',
  };
}
