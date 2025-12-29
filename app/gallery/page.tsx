import type { Metadata } from "next"
import { GalleryPageClient } from "./gallery-client"
import { WebPageSchema } from "@/components/seo/schema-org"
import { getAllGalleryItems, getGalleryCategories } from "@/lib/gallery"
import type { GalleryItem, GalleryCategory } from "@/lib/gallery-types"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Galeria Multimedia | Nuestras Operaciones en Campo",
  description:
    "Galeria de imagenes de nuestras operaciones de inspeccion maritima en campo. Inspecciones de buques, carga, puertos y servicios especializados.",
  keywords: [
    "galeria",
    "gallery",
    "operaciones",
    "inspecciones",
    "fotos",
    "campo",
    "buques",
    "carga",
  ],
  openGraph: {
    title: "Galeria Multimedia | MSC",
    description: "Galeria de imagenes de nuestras operaciones de inspeccion maritima en campo.",
    url: `${siteUrl}/gallery`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Galeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeria Multimedia | MSC",
    description: "Galeria de nuestras operaciones de inspeccion maritima.",
  },
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
}

export const revalidate = 3600 // ISR cada hora

export default function GalleryPage() {
  const allItems: GalleryItem[] = getAllGalleryItems()
  const categories: GalleryCategory[] = getGalleryCategories()

  return (
    <>
      <WebPageSchema
        name="Galeria Multimedia | Nuestras Operaciones en Campo"
        description="Galeria de imagenes de nuestras operaciones de inspeccion maritima en campo."
        url={`${siteUrl}/gallery`}
      />
      <GalleryPageClient items={allItems} categories={categories} />
    </>
  )
}
