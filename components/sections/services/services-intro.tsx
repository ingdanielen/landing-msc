"use client"

import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Clock, 
  Target, 
  CheckCircle2,
  ArrowRight,
  ArrowUpRight
} from "lucide-react"
import { LocalizedLink } from "@/components/ui/localized-link"
import { HeroText } from "@/components/ui/hero-text"

type Language = "es" | "en" | "zh"

const introContent = {
  es: {
    badge: "INSPECCIONES MARÍTIMAS DE TERCERA PARTE",
    title: "El criterio técnico independiente que su",
    titleHighlight: "operación necesita",
    description: "Cuando las decisiones críticas dependen de información precisa e imparcial, MSC entrega evaluaciones técnicas que protegen sus intereses comerciales, reducen riesgos operativos y garantizan cumplimiento normativo.",
    highlights: [
      {
        icon: ShieldCheck,
        title: "Sin conflictos de interés",
        text: "Informes objetivos aceptados por armadores, aseguradoras y autoridades",
        accent: "from-accent to-blue-500"
      },
      {
        icon: Clock,
        title: "Respuesta inmediata",
        text: "Disponibilidad 24/7 en los principales puertos de operación",
        accent: "from-emerald-500 to-teal-500"
      },
      {
        icon: Target,
        title: "Enfoque preventivo",
        text: "Identificamos riesgos antes de que se conviertan en pérdidas",
        accent: "from-amber-500 to-orange-500"
      },
    ],
    cta: "Explorar servicios",
    trust: "Más de 120 empresas confían en nuestro criterio técnico",
  },
  en: {
    badge: "THIRD-PARTY MARINE INSPECTIONS",
    title: "The independent technical judgment your",
    titleHighlight: "operation needs",
    description: "When critical decisions depend on accurate and impartial information, MSC delivers technical assessments that protect your commercial interests, reduce operational risks, and ensure regulatory compliance.",
    highlights: [
      {
        icon: ShieldCheck,
        title: "No conflicts of interest",
        text: "Objective reports accepted by shipowners, insurers, and authorities",
        accent: "from-accent to-blue-500"
      },
      {
        icon: Clock,
        title: "Immediate response",
        text: "24/7 availability at major ports of operation",
        accent: "from-emerald-500 to-teal-500"
      },
      {
        icon: Target,
        title: "Preventive approach",
        text: "We identify risks before they become losses",
        accent: "from-amber-500 to-orange-500"
      },
    ],
    cta: "Explore services",
    trust: "Over 120 companies trust our technical judgment",
  },
  zh: {
    badge: "第三方海事检验",
    title: "您的运营所需的独立",
    titleHighlight: "技术判断",
    description: "当关键决策依赖于准确公正的信息时，MSC提供技术评估，保护您的商业利益，降低运营风险，确保法规合规。",
    highlights: [
      {
        icon: ShieldCheck,
        title: "无利益冲突",
        text: "船东、保险公司和当局认可的客观报告",
        accent: "from-accent to-blue-500"
      },
      {
        icon: Clock,
        title: "即时响应",
        text: "主要运营港口24/7全天候服务",
        accent: "from-emerald-500 to-teal-500"
      },
      {
        icon: Target,
        title: "预防性方法",
        text: "在风险演变为损失之前识别它们",
        accent: "from-amber-500 to-orange-500"
      },
    ],
    cta: "探索服务",
    trust: "超过120家企业信任我们的技术判断",
  },
}

export function ServicesIntro({ lang }: { lang: Language }) {
  const t = introContent[lang] || introContent.en

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#0a2a43 1px, transparent 1px),
              linear-gradient(90deg, #0a2a43 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 via-transparent to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border-l-2 border-primary mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold text-primary tracking-[0.15em] uppercase">
                {t.badge}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <HeroText
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl text-primary mb-2 leading-[1.1]"
              >
                {t.title}
              </HeroText>
              <HeroText
                as="span"
                className="text-3xl md:text-4xl lg:text-5xl text-accent"
              >
                {t.titleHighlight}
              </HeroText>
            </motion.div>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-1 bg-accent mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10"
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <LocalizedLink
                href="#services-catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold transition-all group"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </LocalizedLink>
              
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs">{t.trust}</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Highlight Cards con diseño brutal */}
          <div className="space-y-6">
            {t.highlights.map((highlight, idx) => {
              const Icon = highlight.icon
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: 50, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.15, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative bg-white border-l-4 border-l-transparent hover:border-l-accent overflow-hidden transition-all duration-500 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${highlight.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    
                    <div className="p-6 md:p-8 flex gap-6">
                      {/* Icon Container */}
                      <div className="shrink-0">
                        <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${highlight.accent} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10" />
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                            {highlight.title}
                          </h3>
                          <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                          {highlight.text}
                        </p>
                      </div>
                    </div>

                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Number indicator */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              )
            })}

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-start gap-8 pt-8 border-t border-slate-200"
            >
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">ISO 9001:2015</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">IMO Compliance</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">P&I Approved</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
