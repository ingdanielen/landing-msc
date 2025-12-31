import type { Metadata } from "next"
import { TermsClient } from "./terms-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Terms & Conditions | Marine Surveyors & Consultants",
  description:
    "Terms and Conditions for the use of Marine Surveyors & Consultants website. Governed by the laws of the Republic of Panama.",
  keywords: [
    "terms and conditions",
    "terms of use",
    "Panama",
    "MSC",
    "marine surveyors",
    "legal terms",
  ],
  openGraph: {
    title: "Terms & Conditions | MSC - Marine Surveyors & Consultants",
    description:
      "Terms and Conditions for the use of Marine Surveyors & Consultants website. Governed by the laws of the Republic of Panama.",
    url: `${siteUrl}/terms`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | MSC",
    description: "Terms and Conditions for the use of Marine Surveyors & Consultants website.",
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
}

export default function TermsPage() {
  return (
    <>
      <WebPageSchema
        name="Terms & Conditions | Marine Surveyors & Consultants"
        description="Terms and Conditions for the use of Marine Surveyors & Consultants website."
        url={`${siteUrl}/terms`}
      />
      <TermsClient />
    </>
  )
}





