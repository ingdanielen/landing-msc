import type { Metadata } from "next"
import { BlogPageClient } from "./blog-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Noticias y Publicaciones | Actualidad Marítima y Normativa",
  description:
    "Artículos técnicos, noticias de la industria marítima, actualizaciones normativas y publicaciones sobre inspecciones marítimas, cumplimiento IMO y mejores prácticas.",
  keywords: [
    "noticias marítimas",
    "publicaciones",
    "artículos técnicos",
    "normativa marítima",
    "actualidad marítima",
    "IMO",
    "regulaciones",
  ],
  openGraph: {
    title: "Noticias y Publicaciones | MSC",
    description: "Artículos técnicos y noticias de la industria marítima.",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Noticias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noticias y Publicaciones | MSC",
    description: "Artículos técnicos y noticias de la industria marítima.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
}

export default function BlogPage() {
  return (
    <>
      <WebPageSchema
        name="Noticias y Publicaciones | Actualidad Marítima y Normativa"
        description="Artículos técnicos, noticias de la industria marítima, actualizaciones normativas y publicaciones sobre inspecciones marítimas."
        url={`${siteUrl}/blog`}
      />
      <BlogPageClient />
    </>
  )
}
