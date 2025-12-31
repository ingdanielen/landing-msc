import type { Metadata } from "next"
import { CompliancePageClient } from "./compliance-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Calidad y Cumplimiento | ISO 9001:2015, IMO, SOLAS, MARPOL | MSC",
  description:
    "Operaciones certificadas ISO 9001:2015 alineadas con convenios IMO (SOLAS, MARPOL, MLC, ISM, ISPS), requisitos de Estado de Bandera, Sociedades de Clasificación y directrices de aseguradoras P&I. +480 servicios completados con 95% de satisfacción.",
  keywords: [
    "calidad marítima",
    "cumplimiento normativo marítimo",
    "ISO 9001:2015 marítimo",
    "IMO compliance",
    "SOLAS compliance",
    "MARPOL cumplimiento",
    "MLC 2006",
    "ISM Code",
    "ISPS Code",
    "sociedades de clasificación",
    "P&I insurers",
    "HULL & MACHINERY",
    "certificación marítima",
    "control de calidad inspecciones",
    "inspecciones certificadas Panamá",
    "Autoridad Marítima de Panamá",
    "AMP Panamá",
    "marine surveys quality",
    "regulatory compliance maritime",
    "flag state requirements",
  ],
  openGraph: {
    title: "Calidad y Cumplimiento Marítimo | ISO 9001:2015 & IMO | MSC",
    description:
      "Inspecciones marítimas certificadas ISO 9001:2015. Cumplimiento con convenios IMO: SOLAS, MARPOL, MLC, ISM e ISPS. +480 servicios con 95% de satisfacción del cliente.",
    url: `${siteUrl}/compliance`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/brand/images/seo-placeholder.webp`,
        width: 1200,
        height: 630,
        alt: "MSC - Calidad y Cumplimiento Marítimo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calidad y Cumplimiento | MSC Marine Surveyors",
    description: "Operaciones certificadas ISO 9001:2015 y cumplimiento total con convenios IMO.",
    images: [`${siteUrl}/brand/images/seo-placeholder.webp`],
  },
  alternates: {
    canonical: `${siteUrl}/compliance`,
    languages: {
      es: `${siteUrl}/compliance`,
      en: `${siteUrl}/en/compliance`,
    },
  },
  other: {
    "article:section": "Quality & Compliance",
  },
}

// JSON-LD structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Calidad y Cumplimiento | MSC Marine Surveyors & Consultants",
  description: "Operaciones de inspección marítima certificadas ISO 9001:2015 con cumplimiento de convenios IMO.",
  url: `${siteUrl}/compliance`,
  mainEntity: {
    "@type": "Organization",
    name: "Marine Surveyors & Consultants",
    certification: [
      {
        "@type": "Certification",
        name: "ISO 9001:2015",
        certificationStatus: "Active",
      },
    ],
    hasCredential: [
      "SOLAS Compliance",
      "MARPOL Compliance", 
      "MLC 2006 Compliance",
      "ISM Code Compliance",
      "ISPS Code Compliance",
    ],
    areaServed: {
      "@type": "GeoShape",
      name: "Global Maritime Operations",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
      bestRating: "5",
    },
  },
}

export default function CompliancePage() {
  return (
    <>
      <WebPageSchema
        name="Calidad y Cumplimiento | ISO 9001:2015, IMO, Clasificación"
        description="Todas nuestras operaciones se encuentran alineadas con ISO 9001:2015, Convenios de la IMO (SOLAS, MARPOL, MLC), Requisitos de Estado de Bandera, Reglas de las Sociedades de Clasificación."
        url={`${siteUrl}/compliance`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CompliancePageClient />
    </>
  )
}
