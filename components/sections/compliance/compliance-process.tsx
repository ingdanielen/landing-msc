"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { 
  ClipboardCheck, 
  Search, 
  Users, 
  Shield, 
  FileCheck,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"

const processContent = {
  es: {
    badge: "PROCESO DE CALIDAD",
    title: "Control de Calidad Riguroso",
    subtitle: "Cada inspección pasa por un proceso de revisión interna para garantizar precisión, integridad y objetividad en todos los informes",
    steps: [
      {
        number: "01",
        icon: ClipboardCheck,
        title: "Inspección en Campo",
        description: "Nuestros inspectores certificados realizan evaluaciones exhaustivas siguiendo protocolos internacionales estandarizados y metodologías avanzadas.",
        details: ["Protocolos ISO estandarizados", "Documentación fotográfica completa", "Registro de hallazgos en tiempo real"],
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        number: "02",
        icon: Search,
        title: "Revisión Técnica",
        description: "Análisis detallado de todos los datos y hallazgos de la inspección por expertos senior con amplia experiencia en el sector marítimo.",
        details: ["Análisis de datos recopilados", "Verificación de mediciones", "Evaluación de riesgos identificados"],
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        number: "03",
        icon: FileCheck,
        title: "Verificación de Cumplimiento",
        description: "Validación de que todos los estándares y normativas aplicables (IMO, ISO, Estado de Bandera) han sido considerados y cumplidos.",
        details: ["Conformidad con IMO", "Cumplimiento ISO 9001", "Requisitos de Estado de Bandera"],
        image: "/images/footage/IMG_20190406_180330.webp",
      },
      {
        number: "04",
        icon: Users,
        title: "Revisión por Pares",
        description: "Evaluación cruzada por profesionales independientes para garantizar objetividad, imparcialidad y precisión técnica en cada informe.",
        details: ["Segunda opinión técnica", "Validación de conclusiones", "Revisión de recomendaciones"],
        image: "/images/footage/IMG_20190406_180706.webp",
      },
      {
        number: "05",
        icon: Shield,
        title: "Aseguramiento Final",
        description: "Proceso final de control que garantiza la integridad, precisión y objetividad del informe antes de su entrega al cliente.",
        details: ["Control de calidad final", "Formato y presentación", "Entrega en 24-72 horas"],
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    guarantee: {
      title: "Garantía de Calidad",
      description: "Todos nuestros informes están respaldados por nuestro compromiso de precisión, integridad y objetividad.",
    },
  },
  en: {
    badge: "QUALITY PROCESS",
    title: "Rigorous Quality Control",
    subtitle: "Every inspection goes through an internal review process to ensure accuracy, integrity and objectivity in all reports",
    steps: [
      {
        number: "01",
        icon: ClipboardCheck,
        title: "Field Inspection",
        description: "Our certified inspectors conduct comprehensive assessments following standardized international protocols and advanced methodologies.",
        details: ["ISO standardized protocols", "Complete photographic documentation", "Real-time findings recording"],
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        number: "02",
        icon: Search,
        title: "Technical Review",
        description: "Detailed analysis of all inspection data and findings by senior experts with extensive experience in the maritime sector.",
        details: ["Collected data analysis", "Measurement verification", "Identified risk assessment"],
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        number: "03",
        icon: FileCheck,
        title: "Compliance Verification",
        description: "Validation that all applicable standards and regulations (IMO, ISO, Flag State) have been considered and met.",
        details: ["IMO conformity", "ISO 9001 compliance", "Flag State requirements"],
        image: "/images/footage/IMG_20190406_180330.webp",
      },
      {
        number: "04",
        icon: Users,
        title: "Peer Review",
        description: "Cross-evaluation by independent professionals to ensure objectivity, impartiality and technical accuracy in each report.",
        details: ["Second technical opinion", "Conclusions validation", "Recommendations review"],
        image: "/images/footage/IMG_20190406_180706.webp",
      },
      {
        number: "05",
        icon: Shield,
        title: "Final Assurance",
        description: "Final control process that guarantees the integrity, accuracy and objectivity of the report before delivery to the client.",
        details: ["Final quality control", "Format and presentation", "Delivery in 24-72 hours"],
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    guarantee: {
      title: "Quality Guarantee",
      description: "All our reports are backed by our commitment to accuracy, integrity and objectivity.",
    },
  },
  zh: {
    badge: "质量流程",
    title: "严格的质量控制",
    subtitle: "每项检验都要经过内部审核流程，确保所有报告的准确性、完整性和客观性",
    steps: [
      {
        number: "01",
        icon: ClipboardCheck,
        title: "现场检验",
        description: "我们的认证检验员按照标准化国际协议和先进方法进行全面评估。",
        details: ["ISO标准化协议", "完整的摄影文档", "实时记录发现"],
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        number: "02",
        icon: Search,
        title: "技术审核",
        description: "由具有丰富海事经验的高级专家对所有检验数据和发现进行详细分析。",
        details: ["收集的数据分析", "测量验证", "已识别风险评估"],
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        number: "03",
        icon: FileCheck,
        title: "合规验证",
        description: "验证所有适用标准和法规(IMO、ISO、船旗国)已被考虑和满足。",
        details: ["IMO合规性", "ISO 9001合规", "船旗国要求"],
        image: "/images/footage/IMG_20190406_180330.webp",
      },
      {
        number: "04",
        icon: Users,
        title: "同行评审",
        description: "由独立专业人员进行交叉评估，确保每份报告的客观性、公正性和技术准确性。",
        details: ["第二技术意见", "结论验证", "建议审核"],
        image: "/images/footage/IMG_20190406_180706.webp",
      },
      {
        number: "05",
        icon: Shield,
        title: "最终保证",
        description: "最终控制流程，保证报告交付客户前的完整性、准确性和客观性。",
        details: ["最终质量控制", "格式和展示", "24-72小时交付"],
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    guarantee: {
      title: "质量保证",
      description: "我们所有的报告都有准确性、完整性和客观性承诺的支持。",
    },
  },
}

function ProcessStep({ 
  step, 
  index, 
  isActive,
  onActivate,
  lang
}: { 
  step: typeof processContent.es.steps[0]
  index: number
  isActive: boolean
  onActivate: () => void
  lang: Language
}) {
  const Icon = step.icon
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      onViewportEnter={onActivate}
      className={`
        relative min-h-[70vh] flex items-center
        ${index % 2 === 0 ? '' : 'flex-row-reverse'}
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={step.image}
          alt={step.title}
          fill
          className={`
            object-cover transition-all duration-1000
            ${isActive ? 'scale-100 opacity-30' : 'scale-110 opacity-10'}
          `}
        />
        <div className={`
          absolute inset-0 transition-all duration-700
          ${index % 2 === 0 
            ? 'bg-gradient-to-r from-[#00111f] via-[#00111f]/90 to-transparent' 
            : 'bg-gradient-to-l from-[#00111f] via-[#00111f]/90 to-transparent'
          }
        `} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00111f]/50 via-transparent to-[#00111f]/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`
          grid lg:grid-cols-2 gap-12 items-center
          ${index % 2 === 0 ? '' : 'direction-rtl'}
        `}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={index % 2 === 0 ? '' : 'lg:order-2'}
          >
            {/* Step Number */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-7xl md:text-8xl font-bold text-white/10">
                {step.number}
              </span>
              <div className="p-3 bg-accent/20 rounded-xl">
                <Icon className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-hero">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              {step.description}
            </p>

            {/* Details */}
            <div className="space-y-3">
              {step.details.map((detail, idx) => (
                <motion.div
                  key={detail}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1 bg-emerald-500/20 rounded">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white/80">{detail}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element / Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`
              hidden lg:flex items-center justify-center
              ${index % 2 === 0 ? '' : 'lg:order-1'}
            `}
          >
            <div className="relative">
              {/* Circular Progress */}
              <svg className="w-64 h-64" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={283}
                  initial={{ strokeDashoffset: 283 }}
                  whileInView={{ strokeDashoffset: 283 - (283 * ((index + 1) / 5)) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e67e22" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white">{step.number}</span>
                <span className="text-sm text-white/50 mt-1">
                  {lang === "es" ? "de 05" : lang === "zh" ? "/ 05" : "of 05"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connecting Line */}
      {index < 4 && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
      )}
    </motion.div>
  )
}

export function ComplianceProcess({ lang }: { lang: Language }) {
  const t = processContent[lang as keyof typeof processContent] || processContent.en
  const [activeStep, setActiveStep] = useState(0)
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
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wider">
                {t.badge}
              </span>
            </motion.div>

            <HeroText 
              as="h2" 
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            >
              {t.title}
            </HeroText>

            <p className="text-lg text-white/60 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2 mt-8">
            {t.steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const element = document.getElementById(`process-step-${idx}`)
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className={`
                  h-1.5 rounded-full transition-all duration-500
                  ${idx === activeStep 
                    ? 'w-12 bg-accent' 
                    : idx < activeStep 
                      ? 'w-6 bg-emerald-500' 
                      : 'w-6 bg-white/20 hover:bg-white/40'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        {t.steps.map((step, idx) => (
          <div key={step.number} id={`process-step-${idx}`}>
            <ProcessStep
              step={step}
              index={idx}
              isActive={activeStep === idx}
              onActivate={() => setActiveStep(idx)}
              lang={lang}
            />
          </div>
        ))}
      </div>

      {/* Guarantee Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-accent/20 via-accent/10 to-emerald-500/20 rounded-2xl p-8 md:p-12 border border-accent/20 overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Shield className="w-12 h-12 text-accent" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-hero">
                    {t.guarantee.title}
                  </h3>
                  <p className="text-white/70 text-lg">
                    {t.guarantee.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
