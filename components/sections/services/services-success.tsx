"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { 
  Container, 
  Ship, 
  Shield, 
  Scale,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Quote,
  Target,
  Lightbulb,
  Trophy
} from "lucide-react"
import { servicesData, type Language } from "./services-data"
import { HeroText } from "@/components/ui/hero-text"

interface ServicesSuccessProps {
  lang: Language
}

const caseImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
  "/images/footage/IMG_20190406_172726.webp",
]

const caseIcons: Record<string, typeof Container> = {
  Container,
  Ship,
  Shield,
  Scale,
}

function CaseStep({ 
  caseItem, 
  index, 
  isActive,
  onActivate,
  lang,
  image
}: { 
  caseItem: {
    title: string
    client: string
    challenge: string
    solution: string
    result: string
    icon: string
  }
  index: number
  isActive: boolean
  onActivate: () => void
  lang: Language
  image: string
}) {
  const Icon = caseIcons[caseItem.icon] || Container
  const caseNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      onViewportEnter={onActivate}
      className={`
        relative min-h-[80vh] flex items-center
        ${index % 2 === 0 ? '' : 'flex-row-reverse'}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={caseItem.title}
          fill
          className={`
            object-cover transition-all duration-1000
            ${isActive ? 'scale-100 opacity-40' : 'scale-110 opacity-15'}
          `}
        />
        <div className={`
          absolute inset-0 transition-all duration-700
          ${index % 2 === 0 
            ? 'bg-gradient-to-r from-[#00111f] via-[#00111f]/95 to-[#00111f]/70' 
            : 'bg-gradient-to-l from-[#00111f] via-[#00111f]/95 to-[#00111f]/70'
          }
        `} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00111f]/60 via-transparent to-[#00111f]/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`
          grid lg:grid-cols-2 gap-12 lg:gap-20 items-center
        `}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={index % 2 === 0 ? '' : 'lg:order-2'}
          >
            {/* Case Number & Icon */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-8xl md:text-9xl font-bold text-white/[0.07]">
                {caseNumber}
              </span>
              <div className="p-4 bg-accent/20 rounded-lg backdrop-blur-sm border border-accent/20">
                <Icon className="w-10 h-10 text-accent" strokeWidth={1.5} />
              </div>
            </div>

            {/* Client Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold tracking-wide">
                {caseItem.client}
              </span>
            </motion.div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 font-hero leading-tight">
              {caseItem.title}
            </h3>

            {/* Challenge, Solution, Result */}
            <div className="space-y-6">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative pl-6 border-l-2 border-rose-500/50"
              >
                <div className="absolute -left-3 top-0 p-1.5 bg-[#00111f] rounded-full">
                  <Target className="w-4 h-4 text-rose-400" />
                </div>
                <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                  {lang === "es" ? "Desafío" : lang === "zh" ? "挑战" : "Challenge"}
                </span>
                <p className="text-white/70 leading-relaxed">
                  {caseItem.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative pl-6 border-l-2 border-accent/50"
              >
                <div className="absolute -left-3 top-0 p-1.5 bg-[#00111f] rounded-full">
                  <Lightbulb className="w-4 h-4 text-accent" />
                </div>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                  {lang === "es" ? "Solución MSC" : lang === "zh" ? "MSC解决方案" : "MSC Solution"}
                </span>
                <p className="text-white/70 leading-relaxed">
                  {caseItem.solution}
                </p>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="relative pl-6 border-l-2 border-emerald-500/50"
              >
                <div className="absolute -left-3 top-0 p-1.5 bg-[#00111f] rounded-full">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                  {lang === "es" ? "Resultado" : lang === "zh" ? "结果" : "Result"}
                </span>
                <p className="text-white font-medium leading-relaxed">
                  {caseItem.result}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Element - Circular Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`
              hidden lg:flex items-center justify-center
              ${index % 2 === 0 ? '' : 'lg:order-1'}
            `}
          >
            <div className="relative">
              {/* Success Quote */}
              <div className="relative bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 max-w-md">
                <Quote className="w-10 h-10 text-accent/50 mb-4" />
                <p className="text-xl text-white/90 italic leading-relaxed mb-6">
                  {caseItem.result}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{caseItem.client}</p>
                    <p className="text-white/50 text-sm">
                      {lang === "es" ? "Caso verificado" : lang === "zh" ? "已验证案例" : "Verified case"}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              </div>

              {/* Progress Border Around */}
              <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  rx="10"
                  fill="none"
                  stroke="url(#successGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="400"
                  initial={{ strokeDashoffset: 400 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2e86c1" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#2e86c1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connecting Line to Next */}
      {index < 3 && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
      )}
    </motion.div>
  )
}

export function ServicesSuccess({ lang }: ServicesSuccessProps) {
  const t = servicesData[lang] || servicesData.es
  const [activeCase, setActiveCase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative bg-[#00111f]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#00111f] via-[#00111f] to-transparent pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-[0.2em] uppercase">
                {lang === "es" ? "Casos de Éxito" : lang === "zh" ? "成功案例" : "Success Stories"}
              </span>
            </motion.div>

            <HeroText 
              as="h2" 
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            >
              {t.successCases.title}
            </HeroText>

            <p className="text-lg text-white/60 max-w-2xl">
              {t.successCases.subtitle}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2 mt-8">
            {t.successCases.cases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const element = document.getElementById(`success-case-${idx}`)
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className={`
                  h-1.5 rounded-full transition-all duration-500
                  ${idx === activeCase 
                    ? 'w-12 bg-accent' 
                    : idx < activeCase 
                      ? 'w-6 bg-emerald-500' 
                      : 'w-6 bg-white/20 hover:bg-white/40'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cases */}
      <div className="relative">
        {t.successCases.cases.map((caseItem, idx) => (
          <div key={idx} id={`success-case-${idx}`}>
            <CaseStep
              caseItem={caseItem}
              index={idx}
              isActive={activeCase === idx}
              onActivate={() => setActiveCase(idx)}
              lang={lang}
              image={caseImages[idx]}
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-accent/20 via-accent/10 to-emerald-500/20 rounded-xl p-8 md:p-12 border border-accent/20 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Trophy className="w-12 h-12 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-hero">
                    {lang === "es" 
                      ? "¿Listo para ser nuestro próximo caso de éxito?" 
                      : lang === "zh" 
                        ? "准备成为我们的下一个成功案例吗？" 
                        : "Ready to be our next success story?"}
                  </h3>
                  <p className="text-white/70 text-lg">
                    {lang === "es"
                      ? "Contáctenos para una consulta gratuita y descubra cómo podemos ayudarle."
                      : lang === "zh"
                        ? "联系我们进行免费咨询，了解我们如何帮助您。"
                        : "Contact us for a free consultation and discover how we can help you."}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-semibold transition-colors"
                >
                  {lang === "es" ? "Contactar" : lang === "zh" ? "联系" : "Contact"}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
