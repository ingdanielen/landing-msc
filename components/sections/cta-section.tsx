"use client"

import { type Language, content } from "@/lib/content"
import { LocalizedLink } from "@/components/ui/localized-link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail, Clock, MapPin } from "lucide-react"
import Image from "next/image"

const ctaContent = {
  es: {
    title: "¿Listo para una Inspección?",
    subtitle: "Nuestro equipo está preparado para movilizarse a cualquier puerto del mundo",
    description: "Contáctenos para una cotización sin compromiso o para coordinar una inspección de emergencia.",
    primary: "Solicitar Cotización",
    secondary: "Emergencia 24/7",
    features: [
      { icon: "Clock", text: "Respuesta en 24h" },
      { icon: "MapPin", text: "Cobertura Global" },
    ],
  },
  en: {
    title: "Ready for an Inspection?",
    subtitle: "Our team is ready to mobilize to any port worldwide",
    description: "Contact us for a no-obligation quote or to coordinate an emergency inspection.",
    primary: "Request Quote",
    secondary: "24/7 Emergency",
    features: [
      { icon: "Clock", text: "24h Response" },
      { icon: "MapPin", text: "Global Coverage" },
    ],
  },
  zh: {
    title: "准备好检验了吗？",
    subtitle: "我们的团队随时准备前往世界任何港口",
    description: "联系我们获取免费报价或协调紧急检验。",
    primary: "请求报价",
    secondary: "24/7紧急热线",
    features: [
      { icon: "Clock", text: "24小时响应" },
      { icon: "MapPin", text: "全球覆盖" },
    ],
  },
}

const featureIcons = {
  Clock: Clock,
  MapPin: MapPin,
}

export function CtaSection({ lang }: { lang: Language }) {
  const t = content[lang]
  const cta = ctaContent[lang]

  return (
    <section id="cta" className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary">
        <Image
          src="/images/footage/IMG_20190406_175330.webp"
          alt="Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-primary/90" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main content */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-hero uppercase tracking-tight">
            {cta.title}
          </h2>
          
          <p className="text-accent text-base md:text-lg font-serif italic mb-3">
            {cta.subtitle}
          </p>
          
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>

          {/* Features badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {cta.features.map((feature, idx) => {
              const Icon = featureIcons[feature.icon as keyof typeof featureIcons] || Clock
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-white text-xs font-medium">{feature.text}</span>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <LocalizedLink href="/contact">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 h-12 rounded-lg shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/50 transition-all"
              >
                {cta.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </LocalizedLink>
            <a href={`tel:+50765980679`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 h-12 px-6 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
                {cta.secondary}
              </Button>
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+50765980679"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg hover:bg-white/20 transition-colors group"
            >
              <Phone className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">(+507) 65980679</span>
            </motion.a>
            <motion.a
              href="mailto:msc@mscsurveyors.org"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg hover:bg-white/20 transition-colors group"
            >
              <Mail className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">msc@mscsurveyors.org</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,1)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1440,50 1440,35 L1440,70 L0,70 Z"/>
        </svg>
      </div>
    </section>
  )
}
