"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Anchor, Ship, Award, ArrowRight } from "lucide-react"
import Image from "next/image"

// Data based EXACTLY on more-company-info.txt - "Historia de MSC: origen, evolución y consolidación"
const historyContent = {
  es: {
    title: "Nuestra Historia",
    subtitle: "Origen, evolución y consolidación",
    intro:
      "MSC nace en 2019 como respuesta a una necesidad recurrente en el sector marítimo: la falta de inspecciones verdaderamente independientes, con criterio técnico sólido y enfoque preventivo.",
    phases: [
      {
        id: "phase-1",
        years: "2019–2020",
        title: "Fundación",
        icon: Anchor,
        image: "/images/footage/IMG_20181207_111709.webp",
        description:
          "La empresa inicia operaciones enfocándose en inspecciones de carga, surveys de condición y supervisión de operaciones portuarias.",
        highlights: [
          "Inspecciones de carga",
          "Surveys de condición",
          "Supervisión de operaciones portuarias",
        ],
        result:
          "MSC construyó su reputación basándose en precisión técnica, informes claros y respuestas rápidas, logrando la confianza de clientes recurrentes.",
      },
      {
        id: "phase-2",
        years: "2021–2022",
        title: "Expansión Técnica",
        icon: Ship,
        image: "/images/footage/IMG_20190405_150249.webp",
        description:
          "MSC amplía su portafolio incorporando nuevos servicios especializados y fortaleciendo procesos internos.",
        highlights: [
          "Inspecciones de buques",
          "Surveys pre-charter y on/off hire",
          "Consultorías técnicas y peritajes",
        ],
        result:
          "Se fortalecen los procesos de gestión documental, control de calidad y estandarización de reportes, elevando el nivel profesional de la organización.",
      },
      {
        id: "phase-3",
        years: "2023–Presente",
        title: "Consolidación Regional",
        icon: Award,
        image: "/images/footage/IMG_20190406_095637.webp",
        description:
          "MSC se consolida como una empresa técnica integral con capacidad para atender operaciones complejas.",
        highlights: [
          "Atender operaciones complejas",
          "Emitir reportes con valor probatorio",
          "Asesorar en controversias técnicas y reclamos marítimos",
        ],
        result:
          "Actualmente, MSC es reconocida por su criterio técnico independiente, trazabilidad de procesos y enfoque en mitigación de riesgos.",
      },
    ],
  },
  en: {
    title: "Our History",
    subtitle: "Origin, evolution, and consolidation",
    intro:
      "MSC was established in 2019 in response to a recurring need within the maritime sector: the lack of truly independent inspections, supported by solid technical judgment and a preventive approach.",
    phases: [
      {
        id: "phase-1",
        years: "2019–2020",
        title: "Foundation",
        icon: Anchor,
        image: "/images/footage/IMG_20181207_111709.webp",
        description:
          "The company began operations focusing on cargo inspections, condition surveys, and supervision of port operations.",
        highlights: [
          "Cargo inspections",
          "Condition surveys",
          "Supervision of port operations",
        ],
        result:
          "MSC built its reputation on technical accuracy, clear reporting, and prompt response, earning the trust of recurring clients.",
      },
      {
        id: "phase-2",
        years: "2021–2022",
        title: "Technical Expansion",
        icon: Ship,
        image: "/images/footage/IMG_20190405_150249.webp",
        description:
          "MSC expanded its service portfolio by incorporating new specialized services and strengthening internal processes.",
        highlights: [
          "Vessel inspections",
          "Pre-charter and on-hire/off-hire surveys",
          "Technical consultancy and expert assessments",
        ],
        result:
          "Internal processes related to document management, quality control, and report standardization were strengthened, raising the organization's professional standards.",
      },
      {
        id: "phase-3",
        years: "2023–Present",
        title: "Regional Consolidation",
        icon: Award,
        image: "/images/footage/IMG_20190406_095637.webp",
        description:
          "MSC consolidated as a comprehensive technical maritime firm with the capability to manage complex operations.",
        highlights: [
          "Manage complex operations",
          "Issue reports with evidentiary value",
          "Provide advisory services in technical disputes and maritime claims",
        ],
        result:
          "Today, MSC is recognized for its independent technical judgment, process traceability, and risk mitigation approach.",
      },
    ],
  },
}

export function CompanyHistory({ lang }: { lang: Language }) {
  const t = historyContent[lang]

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-slate-50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-slate-50 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-accent text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3 font-sans uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 mt-6 max-w-3xl mx-auto text-lg">{t.intro}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden lg:block" />

          {/* Timeline items */}
          <div className="space-y-16 lg:space-y-24">
            {t.phases.map((phase, idx) => {
              const Icon = phase.icon
              const isEven = idx % 2 === 0

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    isEven ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Timeline Node - Desktop */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center z-10">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30 ring-8 ring-white">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="mt-3 bg-accent text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      {phase.years}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${isEven ? "lg:pr-24 lg:text-right" : "lg:pl-24 lg:col-start-2"}`}>
                    {/* Mobile timeline node */}
                    <div className="flex items-center gap-4 mb-6 lg:hidden">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                        {phase.years}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-sans">
                      {phase.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                      {phase.description}
                    </p>

                    {/* Highlights */}
                    <div className={`space-y-2 mb-6 ${isEven ? "lg:ml-auto" : ""}`}>
                      {phase.highlights.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 text-slate-700 ${
                            isEven ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <ArrowRight className={`h-4 w-4 text-accent shrink-0 ${isEven ? "lg:rotate-180" : ""}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    <div className={`p-5 bg-primary/5 rounded-xl ${isEven ? "lg:border-r-4" : "border-l-4"} border-accent`}>
                      <p className="text-slate-700 italic">{phase.result}</p>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`mt-8 lg:mt-0 ${isEven ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <Image
                        src={phase.image}
                        alt={phase.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
                      
                      {/* Floating badge */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-bold text-primary">{phase.title}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
