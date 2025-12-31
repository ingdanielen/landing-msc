import type { Metadata } from "next"
import { ContactPageClient } from "./contact-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Contacto | Solicite una Inspección Marítima",
  description:
    "Contacte a Marine Surveyors & Consultants para consultas, cotizaciones o inspecciones de emergencia. Oficina en Panamá, disponible 24/7. Email: msc@mscsurveyors.org, Teléfono: (+507) 2636601.",
  keywords: [
    "contacto",
    "contact",
    "solicitar inspección",
    "cotización",
    "emergencia marítima",
    "Panama",
    "msc@mscsurveyors.org",
    "24/7",
  ],
  openGraph: {
    title: "Contacto | MSC - Marine Surveyors & Consultants",
    description:
      "Contacte a MSC para consultas, cotizaciones o inspecciones de emergencia. Disponible 24/7. Oficina en Panamá.",
    url: `${siteUrl}/contact`,
    images: [
      {
        url: `${siteUrl}/brand/images/seo-placeholder.webp`,
        width: 1200,
        height: 630,
        alt: "MSC - Contacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | MSC",
    description: "Contacte a MSC para consultas, cotizaciones o inspecciones de emergencia. Disponible 24/7.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
}

export default function ContactPage() {
  return (
    <>
      <WebPageSchema
        name="Contacto | Solicite una Inspección Marítima"
        description="Contacte a Marine Surveyors & Consultants para consultas, cotizaciones o inspecciones de emergencia. Oficina en Panamá, disponible 24/7."
        url={`${siteUrl}/contact`}
      />
      <ContactPageClient />
    </>
  )
}
