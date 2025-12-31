"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { 
  Shield, 
  FileCheck, 
  Award, 
  Building2, 
  Scale, 
  CheckCircle2,
  Anchor,
  Globe,
  ChevronRight
} from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"

const standardsContent = {
  es: {
    badge: "MARCO NORMATIVO",
    title: "Estándares de Cumplimiento",
    subtitle: "Operamos bajo los marcos regulatorios más exigentes de la industria marítima internacional",
    standards: [
      {
        icon: Shield,
        title: "ISO 9001:2015",
        category: "Sistema de Gestión",
        description: "Sistemas de Gestión de Calidad certificados con procesos estandarizados y mejora continua.",
        features: ["Procesos documentados", "Auditorías internas", "Mejora continua"],
      },
      {
        icon: Anchor,
        title: "Convenios IMO",
        category: "Regulación Internacional",
        description: "Cumplimiento estricto con SOLAS, MARPOL, MLC, ISM e ISPS para seguridad marítima.",
        features: ["SOLAS", "MARPOL", "MLC 2006", "ISM Code"],
      },
      {
        icon: Award,
        title: "Sociedades de Clasificación",
        category: "Estándares Técnicos",
        description: "Alineados con las principales sociedades de clasificación internacionales.",
        features: ["Lloyd's Register", "DNV", "Bureau Veritas", "ABS"],
      },
      {
        icon: Building2,
        title: "Estado de Bandera",
        category: "Requisitos Nacionales",
        description: "Cumplimiento con requisitos de Estado de Bandera incluyendo AMP Panamá.",
        features: ["AMP Panamá", "Registros internacionales"],
      },
      {
        icon: Scale,
        title: "Aseguradoras P&I",
        category: "Sector Asegurador",
        description: "Adherencia a directrices P&I y Hull & Machinery para el sector asegurador.",
        features: ["Clubs P&I", "Hull & Machinery"],
      },
      {
        icon: Globe,
        title: "Mejores Prácticas",
        category: "Industria Global",
        description: "Aplicación de mejores prácticas internacionales con precisión e integridad.",
        features: ["Metodologías avanzadas", "Trazabilidad"],
      },
    ],
  },
  en: {
    badge: "REGULATORY FRAMEWORK",
    title: "Compliance Standards",
    subtitle: "We operate under the most demanding regulatory frameworks in the international maritime industry",
    standards: [
      {
        icon: Shield,
        title: "ISO 9001:2015",
        category: "Management System",
        description: "Certified Quality Management Systems with standardized processes and continuous improvement.",
        features: ["Documented processes", "Internal audits", "Continuous improvement"],
      },
      {
        icon: Anchor,
        title: "IMO Conventions",
        category: "International Regulation",
        description: "Strict compliance with SOLAS, MARPOL, MLC, ISM and ISPS for maritime safety.",
        features: ["SOLAS", "MARPOL", "MLC 2006", "ISM Code"],
      },
      {
        icon: Award,
        title: "Classification Societies",
        category: "Technical Standards",
        description: "Aligned with major international classification societies standards.",
        features: ["Lloyd's Register", "DNV", "Bureau Veritas", "ABS"],
      },
      {
        icon: Building2,
        title: "Flag State",
        category: "National Requirements",
        description: "Compliance with Flag State requirements including Panama AMP.",
        features: ["Panama AMP", "International registries"],
      },
      {
        icon: Scale,
        title: "P&I Insurers",
        category: "Insurance Sector",
        description: "Adherence to P&I and Hull & Machinery guidelines for the insurance sector.",
        features: ["P&I Clubs", "Hull & Machinery"],
      },
      {
        icon: Globe,
        title: "Best Practices",
        category: "Global Industry",
        description: "Application of international best practices with precision and integrity.",
        features: ["Advanced methodologies", "Traceability"],
      },
    ],
  },
  zh: {
    badge: "监管框架",
    title: "合规标准",
    subtitle: "我们在国际海事行业最严格的监管框架下运营",
    standards: [
      {
        icon: Shield,
        title: "ISO 9001:2015",
        category: "管理体系",
        description: "认证质量管理体系，标准化流程和持续改进。",
        features: ["文档化流程", "内部审计", "持续改进"],
      },
      {
        icon: Anchor,
        title: "IMO公约",
        category: "国际法规",
        description: "严格遵守SOLAS、MARPOL、MLC、ISM和ISPS。",
        features: ["SOLAS", "MARPOL", "MLC 2006", "ISM规则"],
      },
      {
        icon: Award,
        title: "船级社",
        category: "技术标准",
        description: "遵循主要国际船级社的规则和标准。",
        features: ["劳氏船级社", "DNV", "法国船级社", "ABS"],
      },
      {
        icon: Building2,
        title: "船旗国",
        category: "国家要求",
        description: "符合船旗国要求，包括巴拿马AMP。",
        features: ["巴拿马AMP", "国际船籍"],
      },
      {
        icon: Scale,
        title: "P&I保险商",
        category: "保险行业",
        description: "遵守P&I和船壳机械险指南。",
        features: ["P&I俱乐部", "船壳与机械"],
      },
      {
        icon: Globe,
        title: "最佳实践",
        category: "全球行业",
        description: "应用国际最佳实践，确保精确和完整。",
        features: ["先进方法论", "可追溯性"],
      },
    ],
  },
}

export function ComplianceStandards({ lang }: { lang: Language }) {
  const t = standardsContent[lang as keyof typeof standardsContent] || standardsContent.en
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#00111f]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/footage/IMG_20190406_095637.webp"
          alt="Maritime background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00111f] via-[#00111f]/95 to-[#00111f]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#00111f]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <FileCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wider">
                {t.badge}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <HeroText 
                as="h2" 
                className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
              >
                {t.title}
              </HeroText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Standards Grid - Professional Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Side - Navigation Tabs */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-2">
                {t.standards.map((standard, idx) => {
                  const Icon = standard.icon
                  const isActive = activeIndex === idx
                  
                  return (
                    <motion.button
                      key={standard.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setActiveIndex(idx)}
                      className={`
                        w-full text-left p-4 rounded-xl transition-all duration-300
                        border group
                        ${isActive 
                          ? 'bg-accent/10 border-accent/30' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`
                          p-2.5 rounded-lg transition-colors duration-300
                          ${isActive ? 'bg-accent text-white' : 'bg-white/10 text-white/60 group-hover:text-white'}
                        `}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`
                            font-semibold truncate transition-colors duration-300
                            ${isActive ? 'text-accent' : 'text-white group-hover:text-white'}
                          `}>
                            {standard.title}
                          </h3>
                          <p className="text-xs text-white/40 truncate">
                            {standard.category}
                          </p>
                        </div>
                        <ChevronRight className={`
                          w-4 h-4 transition-all duration-300
                          ${isActive ? 'text-accent translate-x-1' : 'text-white/30 group-hover:text-white/60'}
                        `} />
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Right Side - Active Content */}
            <div className="lg:col-span-8">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Header with Icon */}
                <div className="p-8 md:p-10 border-b border-white/10">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-accent/20 rounded-xl">
                      {(() => {
                        const Icon = t.standards[activeIndex].icon
                        return <Icon className="w-8 h-8 text-accent" />
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {t.standards[activeIndex].category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                        {t.standards[activeIndex].title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-8 md:p-10">
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    {t.standards[activeIndex].description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {t.standards[activeIndex].features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-white font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="px-8 md:px-10 py-6 bg-white/5 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">
                      {lang === "es" ? "Estándar" : lang === "zh" ? "标准" : "Standard"} {activeIndex + 1} / {t.standards.length}
                    </span>
                    <div className="flex gap-1">
                      {t.standards.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className={`
                            w-8 h-1 rounded-full transition-all duration-300
                            ${idx === activeIndex ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'}
                          `}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
