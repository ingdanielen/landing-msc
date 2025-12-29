"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"

interface GalleryHeroProps {
  lang: Language
}

const content = {
  es: {
    title: "Galeria",
    subtitle: "Multimedia",
    description: "Descubre nuestras operaciones de inspeccion maritima a traves de imagenes reales de campo, inspecciones de buques y operaciones portuarias.",
  },
  en: {
    title: "Gallery",
    subtitle: "Multimedia",
    description: "Discover our maritime inspection operations through real field images, vessel inspections and port operations.",
  },
  zh: {
    title: "图库",
    subtitle: "多媒体",
    description: "通过现场图片、船舶检验和港口作业了解我们的海事检验业务。",
  },
}

export function GalleryHero({ lang }: GalleryHeroProps) {
  const t = content[lang]

  return (
    <section className="relative pt-20 pb-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary" />
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">MSC</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
          >
            <span className="font-hero">{t.title}</span>
            <br />
            <span className="text-accent font-hero">{t.subtitle}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-xl mt-6"
          >
            {t.description}
          </motion.p>
        </div>
      </div>

      {/* Waves */}
      <div className="relative h-16 md:h-20">
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path fill="rgba(248,250,252,0.3)" d="M0,40 C360,20 720,60 1080,40 C1440,20 1800,60 2160,40 C2520,20 2880,60 2880,40 L2880,80 L0,80 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path fill="rgba(248,250,252,0.6)" d="M0,50 C360,35 720,65 1080,50 C1440,35 1800,65 2160,50 C2520,35 2880,65 2880,50 L2880,80 L0,80 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 80" preserveAspectRatio="none">
          <path fill="#f8fafc" d="M0,60 C360,50 720,70 1080,60 C1440,50 1800,70 2160,60 C2520,50 2880,70 2880,60 L2880,80 L0,80 Z"/>
        </svg>
      </div>
    </section>
  )
}

