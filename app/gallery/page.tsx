import type { Metadata } from "next"
import { GalleryPageClient } from "./gallery-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Galería Multimedia | Nuestras Operaciones en Campo",
  description:
    "Galería de imágenes y videos de nuestras operaciones de inspección marítima en campo. Inspecciones de buques, carga, puertos y servicios especializados.",
  keywords: [
    "galería",
    "gallery",
    "operaciones",
    "inspecciones",
    "fotos",
    "videos",
    "campo",
    "buques",
    "carga",
  ],
  openGraph: {
    title: "Galería Multimedia | MSC",
    description: "Galería de imágenes y videos de nuestras operaciones de inspección marítima en campo.",
    url: `${siteUrl}/gallery`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Galería",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galería Multimedia | MSC",
    description: "Galería de nuestras operaciones de inspección marítima.",
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
}

export default function GalleryPage() {
  return (
    <>
      <WebPageSchema
        name="Galería Multimedia | Nuestras Operaciones en Campo"
        description="Galería de imágenes y videos de nuestras operaciones de inspección marítima en campo."
        url={`${siteUrl}/gallery`}
      />
      <GalleryPageClient />
    </>
  )
}
