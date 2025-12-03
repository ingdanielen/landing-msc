import Script from "next/script"

interface OrganizationSchemaProps {
  url?: string
}

export function OrganizationSchema({ url = "https://www.mscsurveyors.org" }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marine Surveyors & Consultants",
    alternateName: "MSC",
    url: url,
    logo: `${url}/brand/logo-white.png`,
    description: "Independent Marine Inspections, Cargo Surveys & Technical Consultancy. Global Excellence.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Altos de Curundu, Calle River, Edificio 569B",
      addressLocality: "Ancón",
      addressRegion: "Panamá",
      addressCountry: "PA",
      postalCode: "0801",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "msc@mscsurveyors.org",
      telephone: "+507-2636601",
      areaServed: "Worldwide",
      availableLanguage: ["es", "en"],
    },
    sameAs: [],
    foundingDate: "2019",
    legalName: "Marine Surveyors & Consultants",
    taxID: "155675244-2-2019 DV: 20",
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebSiteSchemaProps {
  url?: string
}

export function WebSiteSchema({ url = "https://www.mscsurveyors.org" }: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: url,
    name: "Marine Surveyors & Consultants",
    alternateName: "MSC",
    description: "Independent Marine Inspections, Cargo Surveys & Technical Consultancy. Global Excellence.",
    publisher: {
      "@type": "Organization",
      name: "Marine Surveyors & Consultants",
    },
    inLanguage: ["es", "en"],
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebPageSchemaProps {
  name: string
  description: string
  url: string
  siteUrl?: string
}

export function WebPageSchema({ name, description, url, siteUrl = "https://www.mscsurveyors.org" }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    url: url,
    description: description,
    isPartOf: {
      "@type": "WebSite",
      url: siteUrl,
      name: "Marine Surveyors & Consultants",
    },
    inLanguage: ["es", "en"],
    publisher: {
      "@type": "Organization",
      name: "Marine Surveyors & Consultants",
    },
  }

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string
  description: string
  url: string
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Marine Surveyors & Consultants",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    url: url,
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

