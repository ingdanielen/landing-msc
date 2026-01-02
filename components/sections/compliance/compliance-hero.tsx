"use client"

import { motion } from "framer-motion"
import { Shield, ChevronDown } from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"

const heroContent = {
  es: {
    badge: "ISO 9001:2015 CERTIFICADO",
    title: "Calidad y Cumplimiento",
    subtitle: "Compromiso con la Excelencia Marítima",
    description:
      "Operaciones alineadas con los más altos estándares internacionales de la industria marítima. Procesos certificados que garantizan precisión, integridad y confiabilidad en cada servicio.",
    scroll: "Descubre más",
  },
  en: {
    badge: "ISO 9001:2015 CERTIFIED",
    title: "Quality & Compliance",
    subtitle: "Commitment to Maritime Excellence",
    description:
      "Operations aligned with the highest international standards in the maritime industry. Certified processes that guarantee precision, integrity and reliability in every service.",
    scroll: "Discover more",
  },
  zh: {
    badge: "ISO 9001:2015 认证",
    title: "质量与合规",
    subtitle: "致力于海事卓越",
    description:
      "运营符合国际海事行业最高标准。认证流程确保每项服务的精确性、完整性和可靠性。",
    scroll: "了解更多",
  },
}

export function ComplianceHero({ lang }: { lang: Language }) {
  const t = heroContent[lang as keyof typeof heroContent] || heroContent.en

  const scrollToContent = () => {
    const element = document.getElementById("compliance-metrics")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="compliance-hero"
      className="relative min-h-[70dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/sections-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/90 to-primary/80" />
      </div>
      
      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden z-[5]">
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(248,250,252,0.2)" d="M0,50 C360,30 720,70 1080,50 C1440,30 1800,70 2160,50 C2520,30 2880,70 2880,50 L2880,100 L0,100 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(248,250,252,0.4)" d="M0,65 C360,50 720,80 1080,65 C1440,50 1800,80 2160,65 C2520,50 2880,80 2880,65 L2880,100 L0,100 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(248,250,252,0.7)" d="M0,80 C360,70 720,90 1080,80 C1440,70 1800,90 2160,80 C2520,70 2880,90 2880,80 L2880,100 L0,100 Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-24 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium text-white/80 tracking-wider uppercase">
            {t.badge}
          </span>
        </motion.div>

        {/* Title - Using HeroText for proper character handling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <HeroText 
            as="h1" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-4"
          >
            {t.title}
          </HeroText>
        </motion.div>

        {/* Subtitle - Using Playfair font */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-accent italic mb-6"
        >
          {t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-white/70 max-w-3xl mx-auto leading-relaxed mb-8"
        >
          {t.description}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest">
            {t.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
