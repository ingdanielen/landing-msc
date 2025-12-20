"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { ChevronDown } from "lucide-react"

const heroContent = {
  es: {
    title: "Sobre Nosotros",
    subtitle: "Marine Surveyors & Consultants",
    description:
      "Firma especializada en inspecciones marítimas, supervisión técnica, consultoría y verificación independiente, creada para ofrecer criterio técnico confiable, imparcial y alineado con los estándares internacionales.",
    tagline: "Cuidado en el Mar. Confianza en Tierra.",
    founded: "Fundada en 2019",
  },
  en: {
    title: "About Us",
    subtitle: "Marine Surveyors & Consultants",
    description:
      "Specialized firm providing marine inspections, technical supervision, consultancy, and independent verification, established to deliver reliable, impartial technical judgment aligned with international standards.",
    tagline: "Care at Sea. Trust on Land.",
    founded: "Founded in 2019",
  },
}

export function AboutHero({ lang }: { lang: Language }) {
  const t = heroContent[lang]

  const scrollToContent = () => {
    const element = document.getElementById("company-intro")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden bg-primary"
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
        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/50 via-transparent to-primary/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent opacity-60" />
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-20">
        {/* Founded Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
            {t.founded}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans mb-4 text-white drop-shadow-2xl uppercase tracking-tighter"
        >
          {t.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-accent font-semibold mb-8 tracking-wide"
        >
          {t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed mb-12"
        >
          {t.description}
        </motion.p>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
        >
          <p className="text-2xl md:text-3xl font-light text-white/80 italic border-l-4 border-accent pl-6">
            "{t.tagline}"
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-xs uppercase tracking-widest">
            {lang === "es" ? "Descubre más" : "Discover more"}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-6 w-6 group-hover:text-accent transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

