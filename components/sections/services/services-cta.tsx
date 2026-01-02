"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LocalizedLink } from "@/components/ui/localized-link"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { servicesData, type Language } from "./services-data"

interface ServicesCtaProps {
  lang: Language
}

export function ServicesCta({ lang }: ServicesCtaProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-cta" className="py-16 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden" suppressHydrationWarning>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <Image
          src="/images/footage/IMG_20190406_180251.webp"
          alt="Background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {mounted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-hero uppercase tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-accent text-lg md:text-xl font-serif italic mb-3">
              {t.cta.subtitle}
            </p>
            <p className="text-white/70 text-sm md:text-base mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <LocalizedLink href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 h-12 rounded-lg shadow-lg shadow-accent/40">
                  {t.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LocalizedLink>
              <a href={`tel:${t.cta.phone.replace(/[^+\d]/g, "")}`}>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-lg bg-white/5 backdrop-blur-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  {t.cta.secondary}
                </Button>
              </a>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">{t.cta.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">{t.cta.email}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-hero uppercase tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-accent text-lg md:text-xl font-serif italic mb-3">
              {t.cta.subtitle}
            </p>
            <p className="text-white/70 text-sm md:text-base mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <LocalizedLink href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 h-12 rounded-lg shadow-lg shadow-accent/40">
                  {t.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LocalizedLink>
              <a href={`tel:${t.cta.phone.replace(/[^+\d]/g, "")}`}>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-lg bg-white/5 backdrop-blur-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  {t.cta.secondary}
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">{t.cta.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-white text-sm font-medium">{t.cta.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,1)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1440,50 1440,35 L1440,70 L0,70 Z"/>
        </svg>
      </div>
    </section>
  )
}

