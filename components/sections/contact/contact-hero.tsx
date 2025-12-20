"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Phone, Clock, Shield } from "lucide-react"

const heroContent = {
  es: {
    badge: "Estamos para servirle",
    title: "Contáctenos",
    subtitle: "Solicite una inspección o consultoría marítima",
    highlights: [
      { icon: Phone, text: "Respuesta en 24h" },
      { icon: Clock, text: "Disponibles 24/7" },
      { icon: Shield, text: "Soporte de emergencia" },
    ],
  },
  en: {
    badge: "We're here to serve you",
    title: "Contact Us",
    subtitle: "Request a marine inspection or consultancy",
    highlights: [
      { icon: Phone, text: "24h Response" },
      { icon: Clock, text: "Available 24/7" },
      { icon: Shield, text: "Emergency Support" },
    ],
  },
}

export function ContactHero({ lang }: { lang: Language }) {
  const t = heroContent[lang]

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        >
          <source src="/images/videos/hero-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">{t.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10"
          >
            {t.subtitle}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {t.highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-white text-sm font-medium">{item.text}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path
            d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 50.7C840 56 960 64 1080 64C1200 64 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

