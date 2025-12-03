import type { Metadata } from "next"
import { PrivacyClient } from "./privacy-client"
import { WebPageSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export const metadata: Metadata = {
  title: "Privacy Policy | Marine Surveyors & Consultants",
  description:
    "MSC is committed to protecting your personal data in accordance with Law 81 of 2019 on Personal Data Protection of Panama, as well as relevant international standards, including GDPR principles.",
  keywords: [
    "privacy policy",
    "data protection",
    "Law 81",
    "Panama",
    "GDPR",
    "personal data",
    "MSC",
  ],
  openGraph: {
    title: "Privacy Policy | MSC - Marine Surveyors & Consultants",
    description:
      "MSC is committed to protecting your personal data in accordance with Law 81 of 2019 on Personal Data Protection of Panama.",
    url: `${siteUrl}/privacy`,
    images: [
      {
        url: `${siteUrl}/brand/logo-white.png`,
        width: 1200,
        height: 630,
        alt: "MSC - Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MSC",
    description: "MSC is committed to protecting your personal data in accordance with Law 81 of 2019 on Personal Data Protection of Panama.",
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <WebPageSchema
        name="Privacy Policy | Marine Surveyors & Consultants"
        description="MSC is committed to protecting your personal data in accordance with Law 81 of 2019 on Personal Data Protection of Panama."
        url={`${siteUrl}/privacy`}
      />
      <PrivacyClient />
    </>
  )
}





