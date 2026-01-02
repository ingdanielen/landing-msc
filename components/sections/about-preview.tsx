"use client"

import { type Language, content } from "@/lib/content"
import { ArrowRight, Users, Shield, Anchor, Globe, CheckCircle } from "lucide-react"
import { LocalizedLink } from "@/components/ui/localized-link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { HeroText } from "@/components/ui/hero-text"

const aboutContent = {
  es: {
    badge: "QUIÉNES SOMOS",
    title: "Excelencia Técnica",
    titleHighlight: "Independiente",
    description: "Marine Surveyors and Consultants es una organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima.",
    features: [
      { icon: Shield, text: "Sin conflictos de interés" },
      { icon: Globe, text: "Cobertura global" },
      { icon: Anchor, text: "Experiencia marítima" },
    ],
    stats: [
      { value: "6+", label: "Años de experiencia" },
      { value: "480+", label: "Servicios completados" },
      { value: "120+", label: "Clientes corporativos" },
    ],
    cta: "Conocer más",
  },
  en: {
    badge: "WHO WE ARE",
    title: "Independent Technical",
    titleHighlight: "Excellence",
    description: "Marine Surveyors and Consultants is an independent organization specializing in comprehensive vessel, cargo, and maritime infrastructure inspections.",
    features: [
      { icon: Shield, text: "No conflicts of interest" },
      { icon: Globe, text: "Global coverage" },
      { icon: Anchor, text: "Maritime expertise" },
    ],
    stats: [
      { value: "6+", label: "Years of experience" },
      { value: "480+", label: "Services completed" },
      { value: "120+", label: "Corporate clients" },
    ],
    cta: "Learn more",
  },
  zh: {
    badge: "关于我们",
    title: "独立技术",
    titleHighlight: "卓越",
    description: "海事检验与顾问是一家专门从事船舶、货物和海事基础设施综合检验的独立机构。",
    features: [
      { icon: Shield, text: "无利益冲突" },
      { icon: Globe, text: "全球覆盖" },
      { icon: Anchor, text: "海事专业知识" },
    ],
    stats: [
      { value: "6+", label: "年经验" },
      { value: "480+", label: "已完成服务" },
      { value: "120+", label: "企业客户" },
    ],
    cta: "了解更多",
  },
}

export function AboutPreview({ lang }: { lang: Language }) {
  const t = aboutContent[lang]
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-32 bg-[#00111f] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div 
              style={{ y: imageY }}
              className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
            >
              <Image
                src="/images/footage/IMG_20190406_172726.webp"
                alt="Marine Surveyors & Consultants"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={60}
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00111f] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00111f]/50 to-transparent" />
              
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-accent" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-accent" />
            </motion.div>

            {/* Secondary Image - Floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-10 -right-5 md:right-10 w-48 md:w-64 h-32 md:h-44 overflow-hidden border-2 border-white/10 shadow-2xl hidden md:block"
            >
              <Image
                src="/images/footage/IMG_20190406_095637.webp"
                alt="Maritime Inspection"
                fill
                className="object-cover"
                sizes="256px"
              />
            </motion.div>

            {/* Stats Card - Floating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-5 left-5 md:left-10 bg-accent p-4 md:p-6 shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-bold text-white">
                480+
              </div>
              <div className="text-white/80 text-xs uppercase tracking-wider mt-1">
                {lang === "es" ? "Servicios" : lang === "zh" ? "服务" : "Services"}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-[0.2em] uppercase">
                {t.badge}
              </span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <HeroText
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1]"
              >
                {t.title}
              </HeroText>
              <HeroText
                as="span"
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-accent"
              >
                {t.titleHighlight}
              </HeroText>
            </div>

            {/* Accent line */}
            <div className="w-20 h-1 bg-accent mb-8" />

            {/* Description */}
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              {t.description}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {t.features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/30 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-white/80 font-medium">{feature.text}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-white/10">
              {t.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <LocalizedLink 
              href="/about"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white px-6 py-3 font-semibold transition-all group"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
