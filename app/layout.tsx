import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Playfair_Display } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

// Fuente local Reversal para títulos de hero
const reversal = localFont({
  src: "../public/fonts/reversal/reversal_lt.otf",
  variable: "--font-reversal",
  display: "swap",
})

// Fuente elegante para subtítulos y textos destacados
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

// Space Grotesk - Fuente principal moderna y futurista
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#0A2A43",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MSC - Marine Surveyors & Consultants | Inspecciones Marítimas Independientes",
    template: "%s | MSC - Marine Surveyors & Consultants",
  },
  description:
    "Marine Surveyors & Consultants (MSC) - Inspecciones marítimas independientes, encuestas de carga, evaluaciones de buques y consultoría técnica. Servicios globales con certificación ISO 9001:2015 y cumplimiento IMO.",
  keywords: [
    "Marine Surveyors",
    "Panama",
    "Cargo Inspection",
    "Vessel Survey",
    "Consultoría Marítima",
    "Inspecciones Marítimas",
    "Marine Inspections",
    "Cargo Surveys",
    "Vessel Assessments",
    "Maritime Consultancy",
    "ISO 9001",
    "IMO Compliance",
    "Panama Maritime",
    "Marine Surveyors Panama",
    "Independent Marine Surveys",
  ],
  authors: [{ name: "Marine Surveyors & Consultants" }],
  creator: "Marine Surveyors & Consultants",
  publisher: "Marine Surveyors & Consultants",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Marine Surveyors & Consultants",
    title: "MSC - Marine Surveyors & Consultants | Inspecciones Marítimas Independientes",
    description:
      "Inspecciones marítimas independientes, encuestas de carga, evaluaciones de buques y consultoría técnica. Servicios globales con certificación ISO 9001:2015.",
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
    title: "MSC - Marine Surveyors & Consultants",
    description:
      "Inspecciones marítimas independientes, encuestas de carga, evaluaciones de buques y consultoría técnica.",
    images: [`${siteUrl}/brand/logo-white.png`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      es: `${siteUrl}/es`,
      en: `${siteUrl}/en`,
    },
  },
  verification: {
    // Add verification codes if available
  },
  category: "Maritime Services",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Precargar imagen del hero para mobile */}
        <link
          rel="preload"
          href="/images/placeholder-hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Precargar fuente Reversal */}
        <link
          rel="preload"
          href="/fonts/reversal/reversal_lt.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://a.tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://b.tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://c.tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </head>
      <body
        className={`${reversal.variable} ${playfair.variable} ${spaceGrotesk.variable} font-body antialiased text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
