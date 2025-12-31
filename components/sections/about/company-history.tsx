"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Anchor, Ship, Award, ArrowRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import { HeroText } from "@/components/ui/hero-text"

// Data based EXACTLY on more-company-info.txt - "Historia de MSC: origen, evolución y consolidación"
const historyContent = {
  es: {
    badge: "TRAYECTORIA",
    title: "Nuestra",
    titleHighlight: "Historia",
    intro:
      "MSC nace en 2019 como respuesta a una necesidad recurrente en el sector maritimo: la falta de inspecciones verdaderamente independientes, con criterio tecnico solido y enfoque preventivo.",
    phases: [
      {
        id: "phase-1",
        years: "2019-2020",
        title: "Fundacion",
        icon: Anchor,
        image: "/about-us/Foundation.webp",
        description:
          "La empresa inicia operaciones enfocandose en inspecciones de carga, surveys de condicion y supervision de operaciones portuarias.",
        highlights: [
          "Inspecciones de carga",
          "Surveys de condicion",
          "Supervision de operaciones portuarias",
        ],
        result:
          "MSC construyo su reputacion basandose en precision tecnica, informes claros y respuestas rapidas, logrando la confianza de clientes recurrentes.",
      },
      {
        id: "phase-2",
        years: "2021-2022",
        title: "Expansion Tecnica",
        icon: Ship,
        image: "/about-us/technical.webp",
        description:
          "MSC amplia su portafolio incorporando nuevos servicios especializados y fortaleciendo procesos internos.",
        highlights: [
          "Inspecciones de buques",
          "Surveys pre-charter y on/off hire",
          "Consultorias tecnicas y peritajes",
        ],
        result:
          "Se fortalecen los procesos de gestion documental, control de calidad y estandarizacion de reportes, elevando el nivel profesional de la organizacion.",
      },
      {
        id: "phase-3",
        years: "2023-Presente",
        title: "Consolidacion Regional",
        icon: Award,
        image: "/about-us/regional.webp",
        description:
          "MSC se consolida como una empresa tecnica integral con capacidad para atender operaciones complejas.",
        highlights: [
          "Atender operaciones complejas",
          "Emitir reportes con valor probatorio",
          "Asesorar en controversias tecnicas y reclamos maritimos",
        ],
        result:
          "Actualmente, MSC es reconocida por su criterio tecnico independiente, trazabilidad de procesos y enfoque en mitigacion de riesgos.",
      },
    ],
  },
  en: {
    badge: "TRACK RECORD",
    title: "Our",
    titleHighlight: "History",
    intro:
      "MSC was established in 2019 in response to a recurring need within the maritime sector: the lack of truly independent inspections, supported by solid technical judgment and a preventive approach.",
    phases: [
      {
        id: "phase-1",
        years: "2019-2020",
        title: "Foundation",
        icon: Anchor,
        image: "/about-us/Foundation.webp",
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
        years: "2021-2022",
        title: "Technical Expansion",
        icon: Ship,
        image: "/about-us/technical.webp",
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
        years: "2023-Present",
        title: "Regional Consolidation",
        icon: Award,
        image: "/about-us/regional.webp",
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
  const t = historyContent[lang as keyof typeof historyContent] || historyContent.en

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0a2a43 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-[11px] font-bold text-accent tracking-[0.2em] uppercase">
              {t.badge}
            </span>
          </div>
          
          <div className="flex items-baseline gap-3 flex-wrap mb-6">
            <HeroText as="h2" className="text-4xl md:text-5xl lg:text-6xl text-primary">
              {t.title}
            </HeroText>
            <HeroText as="span" className="text-4xl md:text-5xl lg:text-6xl text-accent">
              {t.titleHighlight}
            </HeroText>
          </div>
          
          <p className="text-slate-600 max-w-3xl text-lg leading-relaxed">
            {t.intro}
          </p>
        </motion.div>

        {/* Timeline - Vertical brutal design */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-slate-200" />
          
          {/* Timeline items */}
          <div className="space-y-0">
            {t.phases.map((phase, idx) => {
              const Icon = phase.icon
              const isLast = idx === t.phases.length - 1

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Content container */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Left side - Timeline node & Years */}
                    <div className="lg:col-span-2 relative">
                      {/* Node */}
                      <div className="absolute left-0 md:left-8 -translate-x-1/2 top-0">
                        <div className="w-4 h-4 bg-accent" />
                      </div>
                      
                      {/* Years badge */}
                      <div className="pl-8 md:pl-20">
                        <span className="inline-block bg-primary text-white text-sm font-bold px-4 py-2">
                          {phase.years}
                        </span>
                      </div>
                    </div>

                    {/* Center - Content */}
                    <div className="lg:col-span-5 pl-8 md:pl-0">
                      {/* Title with icon */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/5 border-l-4 border-accent flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-primary font-hero">
                          {phase.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {phase.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {phase.highlights.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 text-slate-700">
                            <ChevronRight className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <span className="font-medium">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Result box */}
                      <div className="bg-slate-50 border-l-4 border-accent p-5">
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {phase.result}
                        </p>
                      </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="lg:col-span-5 pl-8 md:pl-0">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-[4/3] overflow-hidden group"
                      >
                        <Image
                          src={phase.image}
                          alt={phase.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                        
                        {/* Phase number */}
                        <div className="absolute top-4 right-4">
                          <span className="text-[5rem] font-black text-white/10 leading-none">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        
                        {/* Bottom badge */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent flex items-center justify-center">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-bold">{phase.title}</p>
                              <p className="text-white/70 text-sm">{phase.years}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Divider */}
                  {!isLast && (
                    <div className="my-12 lg:my-16 ml-8 md:ml-20 lg:ml-0 lg:pl-[16.666%]">
                      <div className="h-px bg-slate-200" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-slate-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-primary text-xl font-bold">
                  <span className="font-sans">+</span><span className="font-hero">25</span> {lang === 'es' ? 'años de experiencia combinada' : 'years combined experience'}
                </p>
                <p className="text-slate-500 text-sm">{lang === 'es' ? 'En el equipo de MSC' : 'Within the MSC team'}</p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-hero font-bold text-primary">2019</p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{lang === 'es' ? 'Fundada' : 'Founded'}</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">
                  <span className="font-sans">+</span><span className="font-hero">480</span>
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{lang === 'es' ? 'Servicios' : 'Services'}</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  <span className="font-sans">+</span><span className="font-hero">120</span>
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{lang === 'es' ? 'Clientes' : 'Clients'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
