import { siteConfig } from '@/config/site';

export function generateSchema() {
  const organizationId = `${siteConfig.url}/#organization`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
      description: siteConfig.description,
      areaServed: 'Worldwide',
      knowsAbout: siteConfig.keywords,
      sameAs: [
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
        siteConfig.links.github,
      ].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.contactEmail,
        availableLanguage: 'English',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': organizationId },
      inLanguage: 'en-US',
    },
  ];
}
