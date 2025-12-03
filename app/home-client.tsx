"use client"

import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { AboutPreview } from "@/components/sections/about-preview"
import { StatsBanner } from "@/components/sections/stats-banner"
import { LocationSection } from "@/components/sections/location-section"
import { CtaSection } from "@/components/sections/cta-section"
import { BlogPreview } from "@/components/sections/blog-preview"
import { VideoShowcase } from "@/components/sections/video-showcase"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { useLang } from "@/components/lang-provider"

export function HomeClient() {
  const { lang } = useLang()

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Home" },
    { id: "services", label: "Servicios", labelEn: "Services" },
    { id: "about", label: "Nosotros", labelEn: "About" },
    { id: "stats", label: "Estadísticas", labelEn: "Statistics" },
    { id: "location", label: "Ubicación", labelEn: "Location" },
    { id: "cta", label: "Contacto", labelEn: "Contact" },
    { id: "blog", label: "Blog", labelEn: "Blog" },
    { id: "video", label: "Video", labelEn: "Video" },
  ]

  return (
    <div className="flex flex-col gap-10 relative">
      <SectionExplorer sections={sections} lang={lang} />
      <Hero lang={lang} />
      <ServicesPreview lang={lang} />
      <AboutPreview lang={lang} />
      <StatsBanner lang={lang} />
      <LocationSection lang={lang} />
      <CtaSection lang={lang} />
      <BlogPreview lang={lang} />
      <VideoShowcase lang={lang} />
    </div>
  )
}

