"use client"

import { motion } from "framer-motion"
import { FileText, CheckCircle2, Users, Shield, ArrowRight } from "lucide-react"
import { type Language } from "@/lib/content"
import Image from "next/image"

const qualityControlData = {
  es: {
    title: "Control de Calidad",
    description:
      "Cada inspección pasa por un proceso de revisión interna para garantizar precisión, integridad y objetividad en todos los informes.",
    steps: [
      {
        icon: FileText,
        title: "Revisión Técnica",
        description:
          "Análisis exhaustivo de todos los datos y hallazgos de la inspección por parte de expertos senior con amplia experiencia en el sector marítimo.",
      },
      {
        icon: CheckCircle2,
        title: "Verificación de Cumplimiento",
        description:
          "Validación de que todos los estándares y normativas aplicables (IMO, ISO, Estado de Bandera) han sido considerados y cumplidos correctamente.",
      },
      {
        icon: Users,
        title: "Revisión por Pares",
        description:
          "Evaluación cruzada por parte de profesionales independientes para garantizar objetividad, imparcialidad y precisión técnica en cada informe.",
      },
      {
        icon: Shield,
        title: "Aseguramiento de Calidad",
        description:
          "Proceso final de control que garantiza la integridad, precisión y objetividad del informe final antes de su entrega al cliente.",
      },
    ],
  },
  en: {
    title: "Quality Control",
    description:
      "Every inspection goes through an internal review process to ensure accuracy, integrity and objectivity in all reports.",
    steps: [
      {
        icon: FileText,
        title: "Technical Review",
        description:
          "Comprehensive analysis of all inspection data and findings by senior experts with extensive experience in the maritime sector.",
      },
      {
        icon: CheckCircle2,
        title: "Compliance Verification",
        description:
          "Validation that all applicable standards and regulations (IMO, ISO, Flag State) have been considered and properly met.",
      },
      {
        icon: Users,
        title: "Peer Review",
        description:
          "Cross-evaluation by independent professionals to ensure objectivity, impartiality and technical accuracy in each report.",
      },
      {
        icon: Shield,
        title: "Quality Assurance",
        description:
          "Final control process that guarantees the integrity, accuracy and objectivity of the final report before delivery to the client.",
      },
    ],
  },
}

export function QualityControl({ lang }: { lang: Language }) {
  const data = qualityControlData[lang as keyof typeof qualityControlData]

  return (
    <div className="card-ocean-solid rounded-2xl p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">{data.title}</h3>
        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{data.description}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-ocean p-6 rounded-xl flex items-start gap-4 group"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-primary mb-2 font-sans">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
