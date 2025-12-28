"use client"

import { motion } from "framer-motion"
import { ShieldCheck, FileCheck, Award, Building2, Scale, CheckCircle2 } from "lucide-react"
import { type Language } from "@/lib/content"

const standardsData = {
  es: [
    {
      icon: ShieldCheck,
      title: "ISO 9001:2015",
      description:
        "Sistemas de Gestión de Calidad certificados. Garantizamos procesos estandarizados y mejora continua en todas nuestras operaciones de inspección y consultoría marítima.",
      color: "accent",
    },
    {
      icon: FileCheck,
      title: "Convenios de la IMO",
      description:
        "Cumplimiento estricto con SOLAS, MARPOL, MLC y demás convenios internacionales para garantizar seguridad marítima, protección ambiental y condiciones laborales adecuadas.",
      color: "primary",
    },
    {
      icon: Award,
      title: "Sociedades de Clasificación",
      description:
        "Alineados con las reglas y estándares de las principales sociedades de clasificación internacionales para garantizar evaluaciones técnicas precisas y confiables.",
      color: "secondary",
    },
    {
      icon: Building2,
      title: "Estado de Bandera",
      description:
        "Cumplimiento con los requisitos específicos de Estado de Bandera para garantizar conformidad regulatoria y validez internacional de nuestros informes.",
      color: "accent",
    },
    {
      icon: Scale,
      title: "Aseguradoras P&I y CASCO",
      description:
        "Adherencia a las directrices de aseguradoras de Protección e Indemnización (P&I) y CASCO & MAQUINARIA para evaluaciones aceptadas por el sector asegurador.",
      color: "primary",
    },
    {
      icon: CheckCircle2,
      title: "Mejores Prácticas",
      description:
        "Aplicación de las mejores prácticas de la industria para inspección y elaboración de informes técnicos, garantizando precisión, integridad y objetividad.",
      color: "accent",
    },
  ],
  en: [
    {
      icon: ShieldCheck,
      title: "ISO 9001:2015",
      description:
        "Certified Quality Management Systems. We guarantee standardized processes and continuous improvement in all our inspection and maritime consultancy operations.",
      color: "accent",
    },
    {
      icon: FileCheck,
      title: "IMO Conventions",
      description:
        "Strict compliance with SOLAS, MARPOL, MLC and other international conventions to ensure maritime safety, environmental protection and adequate working conditions.",
      color: "primary",
    },
    {
      icon: Award,
      title: "Classification Societies",
      description:
        "Aligned with the rules and standards of major international classification societies to ensure precise and reliable technical assessments.",
      color: "secondary",
    },
    {
      icon: Building2,
      title: "Flag State",
      description:
        "Compliance with specific Flag State requirements to ensure regulatory conformity and international validity of our reports.",
      color: "accent",
    },
    {
      icon: Scale,
      title: "P&I and HULL Insurers",
      description:
        "Adherence to guidelines from Protection & Indemnity (P&I) and HULL & MACHINERY insurers for assessments accepted by the insurance sector.",
      color: "primary",
    },
    {
      icon: CheckCircle2,
      title: "Best Practices",
      description:
        "Application of industry best practices for inspection and technical reporting, ensuring accuracy, integrity and objectivity.",
      color: "accent",
    },
  ],
}

export function QualityStandards({ lang }: { lang: Language }) {
  const standards = standardsData[lang as keyof typeof standardsData]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
          {lang === "es" ? "Estándares de Cumplimiento" : "Compliance Standards"}
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto"></div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {standards.map((standard, idx) => {
          const Icon = standard.icon
          return (
            <motion.div
              key={standard.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-ocean p-8 rounded-xl group"
            >
              <div
                className={`h-16 w-16 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  standard.color === "accent"
                    ? "bg-accent/10 group-hover:bg-accent"
                    : standard.color === "primary"
                    ? "bg-primary/10 group-hover:bg-primary"
                    : "bg-slate-100 group-hover:bg-primary"
                }`}
              >
                <Icon
                  className={`h-8 w-8 transition-colors ${
                    standard.color === "accent"
                      ? "text-accent group-hover:text-white"
                      : standard.color === "primary"
                      ? "text-primary group-hover:text-white"
                      : "text-slate-600 group-hover:text-white"
                  }`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-hero uppercase tracking-tight">
                {standard.title}
              </h3>
              <div className="w-12 h-0.5 bg-accent mb-4"></div>
              <p className="text-slate-600 leading-relaxed text-sm">{standard.description}</p>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}
