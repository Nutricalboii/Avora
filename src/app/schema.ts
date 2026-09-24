import { siteConfig } from '@/config/site';

export function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
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
  };
}
