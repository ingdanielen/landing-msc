import type { Metadata } from "next"
import { LegalClient } from "./legal-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Legal Notice | Marine Surveyors & Consultants",
  description:
    "Legal notice and company information for Marine Surveyors & Consultants (MSC). Registered commercial entity in the Republic of Panama. RUC: 155675244-2-2019 DV: 20",
  keywords: [
    "legal notice",
    "Panama",
    "MSC",
    "marine surveyors",
    "company information",
    "registered entity",
  ],
  openGraph: {
    title: "Legal Notice | MSC - Marine Surveyors & Consultants",
    description:
      "Legal notice and company information for Marine Surveyors & Consultants (MSC). Registered commercial entity in the Republic of Panama.",
    url: `${siteUrl}/legal`,
    images: [
      {
        url: `${siteUrl}/brand/images/seo-placeholder.webp`,
        width: 1200,
        height: 630,
        alt: "MSC - Legal Notice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Notice | MSC",
    description: "Legal notice and company information for Marine Surveyors & Consultants (MSC).",
  },
  alternates: {
    canonical: `${siteUrl}/legal`,
  },
}

export default function LegalPage() {
  return (
    <>
      <WebPageSchema
        name="Legal Notice | Marine Surveyors & Consultants"
        description="Legal notice and company information for Marine Surveyors & Consultants (MSC)."
        url={`${siteUrl}/legal`}
      />
      <LegalClient />
    </>
  )
}





