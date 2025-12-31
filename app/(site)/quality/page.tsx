import type { Metadata } from "next"
import { QualityPageClient } from "./quality-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Calidad y Cumplimiento | ISO 9001:2015, IMO, Clasificación",
  description:
    "Todas nuestras operaciones se encuentran alineadas con ISO 9001:2015, Convenios de la IMO (SOLAS, MARPOL, MLC), Requisitos de Estado de Bandera, Reglas de las Sociedades de Clasificación, Directrices de aseguradoras P&I y CASCO & MAQUINARIA.",
  keywords: [
    "calidad",
    "cumplimiento",
    "ISO 9001",
    "IMO",
    "SOLAS",
    "MARPOL",
    "MLC",
    "sociedades de clasificación",
    "P&I",
    "CASCO & MAQUINARIA",
    "certificación",
  ],
  openGraph: {
    title: "Calidad y Cumplimiento | MSC",
    description:
      "Operaciones alineadas con ISO 9001:2015, Convenios IMO (SOLAS, MARPOL, MLC), Estado de Bandera y Sociedades de Clasificación.",
    url: `${siteUrl}/quality`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Calidad y Cumplimiento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calidad y Cumplimiento | MSC",
    description: "Operaciones certificadas ISO 9001:2015 y cumplimiento IMO.",
  },
  alternates: {
    canonical: `${siteUrl}/quality`,
  },
}

export default function QualityPage() {
  return (
    <>
      <WebPageSchema
        name="Calidad y Cumplimiento | ISO 9001:2015, IMO, Clasificación"
        description="Todas nuestras operaciones se encuentran alineadas con ISO 9001:2015, Convenios de la IMO (SOLAS, MARPOL, MLC), Requisitos de Estado de Bandera, Reglas de las Sociedades de Clasificación."
        url={`${siteUrl}/quality`}
      />
      <QualityPageClient />
    </>
  )
}
