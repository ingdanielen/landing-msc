"use client"

import { useLang } from "@/components/lang-provider"
import { SectionExplorer } from "@/components/ui/section-explorer"
import {
  AboutHero,
  CompanyIntro,
  CompanyHistory,
  CompanyStats,
  SuccessStories,
  WhyChooseUs,
  MissionVisionValues,
  TeamExpertise,
} from "@/components/sections/about"

export function AboutPageClient() {
  const { lang } = useLang()

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "company-intro", label: "Quiénes Somos", labelEn: "Who We Are" },
    { id: "history", label: "Historia", labelEn: "History" },
    { id: "team", label: "Nuestro Equipo", labelEn: "Our Team" },
    { id: "stats", label: "Métricas", labelEn: "Metrics" },
    { id: "success", label: "Casos de Éxito", labelEn: "Success Stories" },
    { id: "why-us", label: "Por Qué Elegirnos", labelEn: "Why Choose Us" },
    { id: "values", label: "Misión y Valores", labelEn: "Mission & Values" },
  ]

  return (
    <main className="min-h-screen flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />

      {/* Hero Section */}
      <AboutHero lang={lang} />

      {/* Company Introduction */}
      <div id="company-intro">
        <CompanyIntro lang={lang} />
      </div>

      {/* Company History Timeline */}
      <div id="history">
        <CompanyHistory lang={lang} />
      </div>

      {/* Team Expertise Section */}
      <TeamExpertise lang={lang} />

      {/* Company Statistics */}
      <div id="stats">
        <CompanyStats lang={lang} />
      </div>

      {/* Success Stories */}
      <div id="success">
        <SuccessStories lang={lang} />
      </div>

      {/* Why Choose Us */}
      <div id="why-us">
        <WhyChooseUs lang={lang} />
      </div>

      {/* Values, Mission & Vision */}
      <div id="values">
        <MissionVisionValues lang={lang} />
      </div>
    </main>
  )
}
