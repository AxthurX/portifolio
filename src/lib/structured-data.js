/**
 * JSON-LD Structured Data for WHYS Studio
 * Injected via <script type="application/ld+json"> in the <head>
 * Schemas included:
 *  - Organization
 *  - WebSite (with SearchAction for Sitelinks Search)
 *  - LocalBusiness (boosts Google Maps + local pack results)
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WHYS Studio",
  url: "https://whysbr.com",
  logo: "https://whysbr.com/logo-simbolo.png",
  description:
    "Estúdio digital focado em criar experiências digitais imersivas. Branding, UX/UI, Web Design e desenvolvimento de alta performance.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto Velho",
    addressRegion: "RO",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-11-98765-4321",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  sameAs: [
    "https://www.instagram.com/whysstudio",
    "https://www.linkedin.com/company/whysstudio",
    "https://github.com/WhysBr",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WHYS Studio",
  url: "https://whysbr.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://whysbr.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WHYS Studio",
  image: "https://whysbr.com/og-image.png",
  url: "https://whysbr.com",
  telephone: "+55-11-98765-4321",
  email: "whysadmin@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Centro",
    addressLocality: "Porto Velho",
    addressRegion: "RO",
    postalCode: "76801-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.7612,
    longitude: -63.9039,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços WHYS Studio",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identidade Visual" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UX/UI Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desenvolvimento Web" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce" } },
    ],
  },
};
