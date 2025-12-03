import type { Metadata } from "next"
import { ServicesPageClient } from "./services-client"
import { WebPageSchema, ServiceSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Servicios | Inspecciones de Buques, Carga y Consultoría Marítima",
  description:
    "Servicios de inspecciones de buques, inspecciones a la carga, consultoría marítima, servicios de puertos y terminales, y servicios especializados con drones. Soluciones integrales para la industria marítima.",
  keywords: [
    "servicios marítimos",
    "inspecciones de buques",
    "cargo surveys",
    "consultoría marítima",
    "puertos y terminales",
    "drone surveys",
    "vessel inspections",
    "marine consultancy",
  ],
  openGraph: {
    title: "Servicios | MSC - Inspecciones Marítimas",
    description:
      "Inspecciones de buques, inspecciones a la carga, consultoría marítima, servicios de puertos y terminales, y servicios especializados con drones.",
    url: `${siteUrl}/services`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Servicios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios | MSC",
    description: "Inspecciones de buques, inspecciones a la carga, consultoría marítima y servicios especializados.",
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
}

export default function ServicesPage() {
  return (
    <>
      <WebPageSchema
        name="Servicios | Inspecciones de Buques, Carga y Consultoría Marítima"
        description="Servicios de inspecciones de buques, inspecciones a la carga, consultoría marítima, servicios de puertos y terminales, y servicios especializados con drones."
        url={`${siteUrl}/services`}
      />
      <ServiceSchema
        name="Marine Survey Services"
        description="Comprehensive marine inspection services including vessel surveys, cargo inspections, maritime consultancy, port services, and specialized drone surveys."
        url={`${siteUrl}/services`}
      />
      <ServicesPageClient />
    </>
  )
}
