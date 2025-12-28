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
  zh: {
    badge: "我们随时为您服务",
    title: "联系我们",
    subtitle: "请求海事检验或咨询",
    highlights: [
      { icon: Phone, text: "24小时响应" },
      { icon: Clock, text: "全天候服务" },
      { icon: Shield, text: "紧急支援" },
    ],
  },
}

export function ContactHero({ lang }: { lang: Language }) {
  const t = heroContent[lang as keyof typeof heroContent] || heroContent.en

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40" />
      </div>
      
      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 overflow-hidden z-[5]">
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 90" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.2)" d="M0,45 C360,30 720,60 1080,45 C1440,30 1800,60 2160,45 C2520,30 2880,60 2880,45 L2880,90 L0,90 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 90" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.4)" d="M0,60 C360,45 720,75 1080,60 C1440,45 1800,75 2160,60 C2520,45 2880,75 2880,60 L2880,90 L0,90 Z"/>
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 90" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.7)" d="M0,75 C360,65 720,85 1080,75 C1440,65 1800,85 2160,75 C2520,65 2880,85 2880,75 L2880,90 L0,90 Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase">{t.badge}</span>
          </motion.div>

          {/* Title - Using Reversal font */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-hero text-3xl sm:text-4xl md:text-5xl text-white mb-3 tracking-tight"
          >
            {t.title}
          </motion.h1>

          {/* Subtitle - Using Playfair font */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-base md:text-lg text-accent italic mb-8"
          >
            {t.subtitle}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {t.highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-white text-xs font-medium">{item.text}</span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
