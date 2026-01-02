"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LocalizedLink } from "@/components/ui/localized-link"
import { ArrowRight, Phone, Star } from "lucide-react"
import { servicesData, type Language } from "./services-data"

interface ServicesHeroProps {
  lang: Language
}

export function ServicesHero({ lang }: ServicesHeroProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-hero" className="relative min-h-[70dvh] flex items-center justify-center overflow-hidden pt-20">
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
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-20 -mt-20">
        <div className="space-y-2">
          {/* Badge */}
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 px-3 py-1.5 rounded-md"
            >
              <Star className="w-3 h-3 text-accent" />
              <span className="text-accent text-xs font-medium">
                {lang === "es" ? "Desde 2019" : lang === "zh" ? "自2019年" : "Since 2019"}
              </span>
            </motion.div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 px-3 py-1.5 rounded-md opacity-0">
              <span className="text-accent text-xs font-medium">
                {lang === "es" ? "Desde 2019" : lang === "zh" ? "自2019年" : "Since 2019"}
              </span>
            </div>
          )}

          {mounted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 "
            >
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                {t.hero.title}
              </h1>
              
              <p className="font-serif text-base md:text-lg lg:text-xl text-accent/90 italic max-w-3xl mx-auto">
                {t.hero.subtitle}
              </p>
              
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <LocalizedLink href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-6 h-12 rounded-lg shadow-lg shadow-accent/30">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-12 px-6 rounded-lg bg-white/5 backdrop-blur-sm">
                    <Phone className="mr-2 h-4 w-4" />
                    {t.hero.ctaSecondary}
                  </Button>
                </LocalizedLink>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                {t.hero.title}
              </h1>
              <p className="font-serif text-base md:text-lg lg:text-xl text-accent/90 italic max-w-3xl mx-auto">
                {t.hero.subtitle}
              </p>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <LocalizedLink href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-6 h-12 rounded-lg shadow-lg shadow-accent/30">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-12 px-6 rounded-lg bg-white/5 backdrop-blur-sm">
                    <Phone className="mr-2 h-4 w-4" />
                    {t.hero.ctaSecondary}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden z-[5]">
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 70" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.15)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1800,50 2160,35 C2520,20 2880,50 2880,35 L2880,70 L0,70 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 70" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.3)" d="M0,45 C360,35 720,55 1080,45 C1440,35 1800,55 2160,45 C2520,35 2880,55 2880,45 L2880,70 L0,70 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 70" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.9)" d="M0,55 C360,48 720,62 1080,55 C1440,48 1800,62 2160,55 C2520,48 2880,62 2880,55 L2880,70 L0,70 Z"/>
        </svg>
      </div>
    </section>
  )
}

