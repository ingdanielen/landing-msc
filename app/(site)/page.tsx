import type { Metadata } from "next"
import { HomeClient } from "./home-client"
import { WebPageSchema } from "@/components/seo/schema-org"
import { getRecentBlogPosts } from "@/lib/blog"
import { getRecentGalleryItems } from "@/lib/gallery"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

// ISR: Revalidar cada hora
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Inicio | Inspecciones Marítimas Independientes",
  description:
    "Marine Surveyors & Consultants (MSC) - Realizamos inspecciones independientes, encuestas de carga, evaluaciones de buques y consultoría técnica para armadores, fletadores, aseguradoras y operadores portuarios en todo el mundo.",
  keywords: [
    "inspecciones marítimas",
    "marine surveys",
    "cargo inspection",
    "vessel survey",
    "consultoría marítima",
    "Panama",
    "ISO 9001",
    "IMO compliance",
  ],
  openGraph: {
    title: "MSC - Inspecciones Marítimas Independientes en las que Puede Confiar",
    description:
      "Realizamos inspecciones independientes, encuestas de carga, evaluaciones de buques y consultoría técnica para armadores, fletadores, aseguradoras y operadores portuarios en todo el mundo.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Marine Surveyors & Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSC - Inspecciones Marítimas Independientes",
    description:
      "Realizamos inspecciones independientes, encuestas de carga, evaluaciones de buques y consultoría técnica para armadores, fletadores, aseguradoras y operadores portuarios en todo el mundo.",
    images: [`${siteUrl}/brand/logo-white.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  // Obtener posts recientes del CMS (Server Component)
  const recentPosts = getRecentBlogPosts(2)
  // Obtener imágenes destacadas de la galería (máx 12 para home)
  const recentGalleryItems = getRecentGalleryItems(12)

  return (
    <>
      <WebPageSchema
        name="Inicio | Inspecciones Marítimas Independientes"
        description="Marine Surveyors & Consultants (MSC) - Realizamos inspecciones independientes, encuestas de carga, evaluaciones de buques y consultoría técnica para armadores, fletadores, aseguradoras y operadores portuarios en todo el mundo."
        url={siteUrl}
      />
      <main className="min-h-screen">
        <HomeClient recentPosts={recentPosts} galleryItems={recentGalleryItems} />
      </main>
    </>
  )
}
