"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { QualityIntro } from "@/components/sections/quality-intro"
import { QualityStandards } from "@/components/sections/quality-standards"
import { QualityControl } from "@/components/sections/quality-control"

export function QualityPageClient() {
  const { lang } = useLang()
  const t = content[lang].compliance

  const sections = [
    { id: "quality-hero", label: "Inicio", labelEn: "Hero" },
    { id: "quality-intro", label: "Nuestros Estándares", labelEn: "Our Standards" },
    { id: "quality-standards", label: "Estándares de Cumplimiento", labelEn: "Compliance Standards" },
    { id: "quality-control", label: "Control de Calidad", labelEn: "Quality Control" },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      
      {/* Hero Section */}
      <section id="quality-hero" className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-primary pt-16">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-30" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6 text-white drop-shadow-lg uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-blue-100 drop-shadow-md uppercase">
            {lang === "es"
              ? "Certificación y Cumplimiento Normativo"
              : "Certification & Regulatory Compliance"}
          </p>
        </div>
      </section>

      {/* Introduction Section with Image */}
      <QualityIntro lang={lang} />

      {/* Standards Section */}
      <section id="quality-standards" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <QualityStandards lang={lang} />
        </div>
      </section>

      {/* Quality Control Section */}
      <section id="quality-control" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <QualityControl lang={lang} />
        </div>
      </section>
    </div>
  )
}
