"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import {
  CheckCircle2,
  Clock,
  FileCheck,
  Wrench,
  Globe,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

// Data based EXACTLY on company-info.txt - "POR QUÉ ELEGIRNOS" section
const whyChooseContent = {
  es: {
    title: "¿Por Qué Elegirnos?",
    subtitle: "Nuestra propuesta de valor",
    items: [
      {
        icon: CheckCircle2,
        title: "Verificación Independiente de Tercera Parte",
        description:
          "Organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima. Proporcionamos evaluaciones objetivas, precisas y conformes a estándares internacionales.",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: Clock,
        title: "Respuesta Rápida y Disponibilidad 24/7",
        description:
          "Disponibilidad inmediata para inspecciones de emergencia. Tiempo promedio de entrega de informes: 24-72 horas, según complejidad del servicio.",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: FileCheck,
        title: "Informes Imparciales Aceptados por las Partes Interesadas",
        description:
          "Documentos técnicos con valor probatorio, aceptados por armadores, operadores, aseguradoras, autoridades portuarias y empresas logísticas.",
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        icon: Wrench,
        title: "Herramientas Modernas",
        description:
          "Equipos de medición calibrados, inspecciones aéreas con drones para áreas del buque de difícil acceso, y metodologías alineadas con estándares de sociedades de clasificación.",
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        icon: Globe,
        title: "Profundo Conocimiento de la Industria y Experiencia Regional",
        description:
          "Equipo con +25 años de experiencia combinada. Cobertura operativa en puertos comerciales, terminales y fondeaderos. Inspectores certificados en arquitectura naval, ingeniería marítima, operaciones portuarias y ciencias náuticas.",
        image: "/images/footage/IMG_20181207_111716.webp",
      },
    ],
  },
  en: {
    title: "Why Choose Us?",
    subtitle: "Our value proposition",
    items: [
      {
        icon: CheckCircle2,
        title: "Independent Third-Party Verification",
        description:
          "Independent organization specializing in comprehensive vessel, cargo, and maritime infrastructure inspections. We provide objective, accurate assessments compliant with international standards.",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: Clock,
        title: "Rapid Response and 24/7 Availability",
        description:
          "Immediate availability for emergency inspections. Average report delivery time: 24-72 hours, depending on service complexity.",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: FileCheck,
        title: "Impartial Reports Accepted by Stakeholders",
        description:
          "Technical documents with evidentiary value, accepted by shipowners, operators, insurers, port authorities, and logistics companies.",
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        icon: Wrench,
        title: "Modern Tools",
        description:
          "Calibrated measuring equipment, drone aerial surveys for hard-to-access vessel areas, and methodologies aligned with classification society standards.",
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        icon: Globe,
        title: "Deep Industry Knowledge and Regional Experience",
        description:
          "Team with +25 years of combined experience. Operational coverage in commercial ports, terminals, and anchorages. Surveyors certified in naval architecture, marine engineering, port operations, and nautical sciences.",
        image: "/images/footage/IMG_20181207_111716.webp",
      },
    ],
  },
}

export function WhyChooseUs({ lang }: { lang: Language }) {
  const t = whyChooseContent[lang as keyof typeof whyChooseContent] || whyChooseContent.en
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = t.items[activeIndex]
  const ActiveIcon = activeItem.icon

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={activeItem.image}
            alt={activeItem.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/90 to-primary/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 py-20 lg:py-24">
        {/* Header */}
        <div className="mb-12">
          <span className="text-accent text-sm tracking-widest uppercase font-medium">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 font-hero uppercase tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Active Item Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Icon + Title Row */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <ActiveIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <span className="text-white/40 text-sm font-mono">
                      {String(activeIndex + 1).padStart(2, "0")}/{String(t.items.length).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-hero tracking-tight">
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg pl-[4.75rem]">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Navigation List */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-1">
              {t.items.map((item, idx) => {
                const ItemIcon = item.icon
                const isActive = activeIndex === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-4 ${
                      isActive
                        ? "bg-accent"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/20" : "bg-white/10"
                      }`}
                    >
                      <ItemIcon
                        className={`h-5 w-5 ${isActive ? "text-white" : "text-white/60"}`}
                      />
                    </div>
                    <span
                      className={`flex-1 text-sm font-medium ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-white" : "text-white/30"
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 flex gap-1.5">
          {t.items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-accent" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
