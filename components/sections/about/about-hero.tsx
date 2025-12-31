"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { ChevronDown } from "lucide-react"

const heroContent = {
  es: {
    title: "Sobre",
    titleHighlight: "Nosotros",
    subtitle: "Marine Surveyors & Consultants",
    description:
      "Firma especializada en inspecciones marítimas, supervisión técnica, consultoría y verificación independiente, creada para ofrecer criterio técnico confiable, imparcial y alineado con los estándares internacionales.",
    tagline: "Cuidado en el Mar. Confianza en Tierra.",
    founded: "Fundada en 2019",
  },
  en: {
    title: "About",
    titleHighlight: "Us",
    subtitle: "Marine Surveyors & Consultants",
    description:
      "Specialized firm providing marine inspections, technical supervision, consultancy, and independent verification, established to deliver reliable, impartial technical judgment aligned with international standards.",
    tagline: "Care at Sea. Trust on Land.",
    founded: "Founded in 2019",
  },
  zh: {
    title: "About",
    titleHighlight: "Us",
    subtitle: "海事测量师与顾问",
    description:
      "专业从事海事检验、技术监督、咨询和独立验证的公司，致力于提供可靠、公正、符合国际标准的技术判断。",
    tagline: "海上关怀，陆上信任。",
    founded: "成立于2019年",
  },
}

export function AboutHero({ lang }: { lang: Language }) {
  const t = heroContent[lang as keyof typeof heroContent] || heroContent.en

  const scrollToContent = () => {
    const element = document.getElementById("company-intro")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
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
          <source src="/images/videos/hero-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/60 to-primary/40" />
      </div>
      
      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden z-5">
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.2)" d="M0,50 C360,30 720,70 1080,50 C1440,30 1800,70 2160,50 C2520,30 2880,70 2880,50 L2880,100 L0,100 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.4)" d="M0,65 C360,50 720,80 1080,65 C1440,50 1800,80 2160,65 C2520,50 2880,80 2880,65 L2880,100 L0,100 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 100" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.7)" d="M0,80 C360,70 720,90 1080,80 C1440,70 1800,90 2160,80 C2520,70 2880,90 2880,80 L2880,100 L0,100 Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-24 pb-32">
        {/* Founded Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          <span className="text-xs font-medium text-white/80 tracking-wider uppercase">
            {t.founded}
          </span>
        </motion.div>

        {/* Title - Using Reversal font */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-4"
        >
          <span className="font-hero">{t.title}</span>{" "}
          <span className="font-hero text-accent">{t.titleHighlight}</span>
        </motion.h1>

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

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-base md:text-lg text-white/60 italic">
            "{t.tagline}"
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest">
            {lang === "es" ? "Descubre más" : lang === "zh" ? "了解更多" : "Discover more"}
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
