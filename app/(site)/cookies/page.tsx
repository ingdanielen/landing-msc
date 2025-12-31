import type { Metadata } from "next"
import { CookiesClient } from "./cookies-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Cookie Policy | Marine Surveyors & Consultants",
  description:
    "MSC uses cookies in accordance with international best practices and Panamanian consumer protection standards. Learn about our cookie policy and how to manage cookies.",
  keywords: [
    "cookie policy",
    "privacy",
    "data protection",
    "Panama",
    "MSC",
    "marine surveyors",
  ],
  openGraph: {
    title: "Cookie Policy | MSC - Marine Surveyors & Consultants",
    description:
      "MSC uses cookies in accordance with international best practices and Panamanian consumer protection standards.",
    url: `${siteUrl}/cookies`,
    images: [
      {
        url: `${siteUrl}/brand/images/seo-placeholder.webp`,
        width: 1200,
        height: 630,
        alt: "MSC - Cookie Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | MSC",
    description: "MSC uses cookies in accordance with international best practices and Panamanian consumer protection standards.",
  },
  alternates: {
    canonical: `${siteUrl}/cookies`,
  },
}

export default function CookiesPage() {
  return (
    <>
      <WebPageSchema
        name="Cookie Policy | Marine Surveyors & Consultants"
        description="MSC uses cookies in accordance with international best practices and Panamanian consumer protection standards."
        url={`${siteUrl}/cookies`}
      />
      <CookiesClient />
    </>
  )
}





