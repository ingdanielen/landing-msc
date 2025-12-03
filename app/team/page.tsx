import type { Metadata } from "next"
import { TeamPageClient } from "./team-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Nuestro Equipo | Expertos Certificados en Inspecciones Marítimas",
  description:
    "Nuestros Inspectores y consultores son profesionales certificados en arquitectura naval, ingeniería marítima, operaciones portuarias, ciencias náuticas y derecho marítimo.",
  keywords: [
    "equipo",
    "team",
    "inspectores",
    "consultores marítimos",
    "arquitectos navales",
    "ingenieros marítimos",
    "capitanes",
    "abogados marítimos",
    "expertos certificados",
  ],
  openGraph: {
    title: "Nuestro Equipo | MSC",
    description:
      "Profesionales certificados en arquitectura naval, ingeniería marítima, operaciones portuarias, ciencias náuticas y derecho marítimo.",
    url: `${siteUrl}/team`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Nuestro Equipo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestro Equipo | MSC",
    description: "Profesionales certificados en inspecciones marítimas.",
  },
  alternates: {
    canonical: `${siteUrl}/team`,
  },
}

export default function TeamPage() {
  return (
    <>
      <WebPageSchema
        name="Nuestro Equipo | Expertos Certificados en Inspecciones Marítimas"
        description="Nuestros Inspectores y consultores son profesionales certificados en arquitectura naval, ingeniería marítima, operaciones portuarias, ciencias náuticas y derecho marítimo."
        url={`${siteUrl}/team`}
      />
      <TeamPageClient />
    </>
  )
}
