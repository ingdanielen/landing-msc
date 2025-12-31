import type { Metadata } from "next"
import { AboutPageClient } from "./about-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Marine Surveyors & Consultants",
  description:
    "Marine Surveyors & Consultants es una organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima. Con años de experiencia, garantizamos informes precisos y cumplimiento normativo.",
  keywords: [
    "sobre nosotros",
    "about us",
    "marine surveyors",
    "organización independiente",
    "inspecciones marítimas",
    "Panama",
    "misión",
    "visión",
    "valores corporativos",
  ],
  openGraph: {
    title: "Sobre Nosotros | MSC - Marine Surveyors & Consultants",
    description:
      "Organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima. Con años de experiencia en la industria.",
    url: `${siteUrl}/about`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Sobre Nosotros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | MSC",
    description:
      "Organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima.",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
}

export default function AboutPage() {
  return (
    <>
      <WebPageSchema
        name="Sobre Nosotros | Marine Surveyors & Consultants"
        description="Organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima."
        url={`${siteUrl}/about`}
      />
      <AboutPageClient />
    </>
  )
}
