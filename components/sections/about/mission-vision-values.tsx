"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import {
  Target,
  Compass,
  Shield,
  Zap,
  Lock,
  Briefcase,
  Users,
  Lightbulb,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

// Data based on company-info.txt
const missionVisionContent = {
  es: {
    sectionTitle: "Nuestros Pilares",
    sectionTitleHighlight: "",
    mission: {
      title: "Mision",
      text: "Proveer inspecciones marítimas de tercera parte de forma objetiva, confiable y completa, y consultorías marítimas que apoyan la navegación segura, protegen el valor de los buques o artefactos navales y garantizan el cumplimiento normativo.",
      subtext:
        "Logramos esto mediante profesionales altamente calificados, metodologías avanzadas de inspección y un compromiso inquebrantable con la transparencia, la imparcialidad y un servicio excepcional al cliente.",
    },
    vision: {
      title: "Vision",
      text: "Ser la organización independiente de inspección marítima más confiable y reconocida globalmente, entregando precisión, integridad y excelencia técnica inquebrantables para salvaguardar las operaciones marítimas, los buques o artefactos navales y el medio ambiente.",
    },
    valuesTitle: "Valores",
    valuesTitleHighlight: "Corporativos",
    valuesSubtitle: "Los principios que guían cada una de nuestras acciones",
    values: [
      {
        title: "Integridad e Imparcialidad",
        short: "Integridad",
        description: "Mantenemos los más altos estándares éticos en todas nuestras evaluaciones, garantizando objetividad y transparencia en cada informe.",
        icon: Shield,
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        title: "Excelencia Técnica",
        short: "Excelencia",
        description: "Nuestros profesionales certificados aplican metodologías avanzadas y conocimientos especializados para proporcionar evaluaciones precisas.",
        icon: Zap,
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        title: "Seguridad y Cumplimiento",
        short: "Seguridad",
        description: "Aseguramos el cumplimiento estricto de normativas internacionales (IMO, ISO, SOLAS, MARPOL) para proteger vidas, bienes y el medio ambiente.",
        icon: Lock,
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        title: "Profesionalismo",
        short: "Profesionalismo",
        description: "Cada inspección se realiza con el máximo rigor profesional, asumiendo la responsabilidad de nuestras evaluaciones y recomendaciones.",
        icon: Briefcase,
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        title: "Servicio al Cliente",
        short: "Cliente",
        description: "Priorizamos las necesidades de nuestros clientes, ofreciendo soluciones personalizadas y un servicio excepcional.",
        icon: Users,
        image: "/images/footage/IMG_20181207_111716.webp",
      },
      {
        title: "Innovación Continua",
        short: "Innovación",
        description: "Incorporamos tecnología de vanguardia, como inspecciones con drones, y mejoramos constantemente nuestros procesos.",
        icon: Lightbulb,
        image: "/images/footage/IMG_20190405_150153.webp",
      },
      {
        title: "Protección Ambiental",
        short: "Ambiente",
        description: "Comprometidos con la sostenibilidad marítima, nuestras evaluaciones consideran el impacto ambiental y promueven prácticas responsables.",
        icon: Leaf,
        image: "/images/footage/IMG_20190406_095657.webp",
      },
    ],
  },
  en: {
    sectionTitle: "Our",
    sectionTitleHighlight: "Pillars",
    mission: {
      title: "Mission",
      text: "To provide objective, reliable, and complete third-party marine surveys and maritime consultancy that support safe navigation, protect the value of vessels or naval artifacts, and ensure regulatory compliance.",
      subtext:
        "We achieve this through highly qualified professionals, advanced inspection methodologies, and an unwavering commitment to transparency, impartiality, and exceptional customer service.",
    },
    vision: {
      title: "Vision",
      text: "To be the most trusted and globally recognized independent marine survey organization, delivering unwavering precision, integrity, and technical excellence to safeguard maritime operations, vessels or naval artifacts, and the environment.",
    },
    valuesTitle: "Corporate",
    valuesTitleHighlight: "Values",
    valuesSubtitle: "The principles that guide each of our actions",
    values: [
      {
        title: "Integrity & Impartiality",
        short: "Integrity",
        description: "We maintain the highest ethical standards in all our assessments, ensuring objectivity and transparency in every report.",
        icon: Shield,
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        title: "Technical Excellence",
        short: "Excellence",
        description: "Our certified professionals apply advanced methodologies and specialized knowledge to provide accurate assessments.",
        icon: Zap,
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        title: "Safety & Compliance",
        short: "Safety",
        description: "We ensure strict compliance with international regulations (IMO, ISO, SOLAS, MARPOL) to protect lives, assets, and the environment.",
        icon: Lock,
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        title: "Professionalism",
        short: "Professionalism",
        description: "Every inspection is conducted with maximum professional rigor, taking responsibility for our assessments and recommendations.",
        icon: Briefcase,
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        title: "Client Service",
        short: "Client",
        description: "We prioritize our clients' needs, offering personalized solutions and exceptional service.",
        icon: Users,
        image: "/images/footage/IMG_20181207_111716.webp",
      },
      {
        title: "Continuous Innovation",
        short: "Innovation",
        description: "We incorporate cutting-edge technology, such as drone inspections, and continuously improve our processes.",
        icon: Lightbulb,
        image: "/images/footage/IMG_20190405_150153.webp",
      },
      {
        title: "Environmental Protection",
        short: "Environment",
        description: "Committed to maritime sustainability, our assessments consider environmental impact and promote responsible practices.",
        icon: Leaf,
        image: "/images/footage/IMG_20190406_095657.webp",
      },
    ],
  },
  zh: {
    sectionTitle: "我们的",
    sectionTitleHighlight: "支柱",
    mission: {
      title: "使命",
      text: "提供客观、可靠、全面的第三方海事检验和海事咨询，支持安全航行，保护船舶或海事设施的价值，确保法规合规。",
      subtext:
        "我们通过高素质的专业人员、先进的检验方法以及对透明度、公正性和卓越客户服务的坚定承诺来实现这一目标。",
    },
    vision: {
      title: "愿景",
      text: "成为最受信赖和全球认可的独立海事检验机构，以坚定的精确性、诚信和技术卓越来保障海事运营、船舶或海事设施以及环境。",
    },
    valuesTitle: "企业",
    valuesTitleHighlight: "价值观",
    valuesSubtitle: "指导我们每项行动的原则",
    values: [
      {
        title: "诚信与公正",
        short: "诚信",
        description: "我们在所有评估中保持最高的道德标准，确保每份报告的客观性和透明度。",
        icon: Shield,
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        title: "技术卓越",
        short: "卓越",
        description: "我们的认证专业人员应用先进的方法和专业知识，提供准确的评估。",
        icon: Zap,
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        title: "安全与合规",
        short: "安全",
        description: "我们确保严格遵守国际法规（IMO、ISO、SOLAS、MARPOL），保护生命、资产和环境。",
        icon: Lock,
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        title: "专业精神",
        short: "专业",
        description: "每次检验都以最高的专业水准进行，对我们的评估和建议负责。",
        icon: Briefcase,
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        title: "客户服务",
        short: "客户",
        description: "我们优先考虑客户需求，提供个性化解决方案和卓越服务。",
        icon: Users,
        image: "/images/footage/IMG_20181207_111716.webp",
      },
      {
        title: "持续创新",
        short: "创新",
        description: "我们采用无人机检验等尖端技术，不断改进流程。",
        icon: Lightbulb,
        image: "/images/footage/IMG_20190405_150153.webp",
      },
      {
        title: "环境保护",
        short: "环境",
        description: "致力于海事可持续发展，我们的评估考虑环境影响并推广负责任的做法。",
        icon: Leaf,
        image: "/images/footage/IMG_20190406_095657.webp",
      },
    ],
  },
}

export function MissionVisionValues({ lang }: { lang: Language }) {
    const t = missionVisionContent[lang as keyof typeof missionVisionContent] || missionVisionContent.en
    const [activeValue, setActiveValue] = useState(0)

  const currentValue = t.values[activeValue]
  const CurrentIcon = currentValue.icon

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % t.values.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [t.values.length])

  const nextValue = () => setActiveValue((prev) => (prev + 1) % t.values.length)
  const prevValue = () => setActiveValue((prev) => (prev - 1 + t.values.length) % t.values.length)

  return (
    <section className="relative overflow-hidden">
      {/* Mission & Vision Section */}
      <div className="py-16 md:py-20 lg:py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 md:w-96 h-80 md:h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 md:w-96 h-80 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
              <span className="font-hero">{t.sectionTitle}</span>{" "}
              {t.sectionTitleHighlight && <span className="font-hero text-accent">{t.sectionTitleHighlight}</span>}
            </h2>
            <div className="w-20 md:w-24 h-1 bg-accent mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
              <div className="relative bg-white rounded-lg p-6 md:p-8 shadow-xl border border-slate-100 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                    <Target className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 tracking-tight">
                  {t.mission.title}
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4 text-sm md:text-base">{t.mission.text}</p>
                <p className="text-slate-500 leading-relaxed text-sm italic border-l-4 border-accent pl-4">
                  {t.mission.subtext}
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-accent rounded-lg transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500" />
              <div className="relative bg-white rounded-lg p-6 md:p-8 shadow-xl border border-slate-100 transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent flex items-center justify-center shadow-lg">
                    <Compass className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 tracking-tight">
                  {t.vision.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">{t.vision.text}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section - Full Screen Carousel */}
      <div className="relative min-h-[85vh] md:min-h-[80vh] bg-slate-950 overflow-hidden">
        {/* Dynamic Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeValue}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={currentValue.image}
              alt={currentValue.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-linear-gradient(to right, var(--color-slate-950), var(--color-slate-950-50), transparent)" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center px-4 md:px-8 lg:px-16 py-12 md:py-16">
          <div className="max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-10"
            >
              <span className="text-accent text-xs md:text-sm tracking-widest uppercase font-medium">
                {t.valuesSubtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 tracking-tight">
                <span className="font-hero">{t.valuesTitle}</span>{" "}
                <span className="font-hero text-accent">{t.valuesTitleHighlight}</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left - Current Value */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-5 md:space-y-6"
                >
                  {/* Large Number */}
                  <span className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-white/5 leading-none block">
                    {String(activeValue + 1).padStart(2, "0")}
                  </span>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 -mt-12 md:-mt-20 lg:-mt-28 relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <CurrentIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight">
                        {currentValue.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg">
                    {currentValue.description}
                  </p>

                  {/* Navigation */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={prevValue}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextValue}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                    <span className="text-white/40 font-mono text-sm ml-2 md:ml-4">
                      {String(activeValue + 1).padStart(2, "0")} / {String(t.values.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right - Value Selector */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-3">
                  {t.values.map((value, idx) => {
                    const ValueIcon = value.icon
                    const isActive = idx === activeValue
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveValue(idx)}
                        className={`
                          relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300 border
                          ${isActive 
                            ? "bg-accent border-accent" 
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                            ${isActive ? "bg-white/20" : "bg-white/10"}
                          `}>
                            <ValueIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <span className="text-white/40 text-xs font-mono block">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <h4 className="font-semibold text-white text-sm">
                              {value.short}
                            </h4>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Value Pills - Wrap instead of scroll */}
            <div className="lg:hidden mt-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {t.values.map((value, idx) => {
                  const isActive = idx === activeValue
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveValue(idx)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                        ${isActive 
                          ? "bg-accent border-accent text-white" 
                          : "bg-white/5 border-white/10 text-white/60"
                        }
                      `}
                    >
                      {value.short}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 lg:mt-10">
              <div className="flex gap-1.5 justify-center">
                {t.values.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveValue(idx)}
                    className={`
                      h-1 rounded-full transition-all
                      ${idx === activeValue ? "w-6 md:w-10 bg-accent" : "w-3 md:w-5 bg-white/20"}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
