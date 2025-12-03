"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { WhyWorkWithUs } from "@/components/sections/why-work-with-us"
import { WhoIsMsc } from "@/components/sections/who-is-msc"
import { ValuesCarousel } from "@/components/sections/values-carousel"
import { SectionExplorer } from "@/components/ui/section-explorer"

export function AboutPageClient() {
  const { lang } = useLang()
  const t = content[lang].about

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "who-is-msc", label: "Quién Es MSC", labelEn: "Who Is MSC" },
    { id: "why-work-with-us", label: "Por Qué Trabajar Con Nosotros", labelEn: "Why Work With Us" },
    { id: "values", label: "Valores", labelEn: "Values" },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      {/* Header */}
      <section id="hero" className="relative h-[40dvh] flex items-center justify-center overflow-hidden bg-primary pt-16">
        {/* Video Background */}
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-sans mb-6 text-white drop-shadow-lg uppercase tracking-tight"
          >
            {t.title}
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md uppercase">{t.description}</p>
        </div>
      </section>

      {/* Who Is MSC */}
      <div id="who-is-msc">
        <WhoIsMsc lang={lang} />
      </div>

      {/* Why Work With Us */}
      <div id="why-work-with-us">
        <WhyWorkWithUs lang={lang} />
      </div>

      {/* Values, Mission & Vision Carousel */}
      <div id="values">
        <ValuesCarousel lang={lang} />
      </div>
    </main>
  )
}

