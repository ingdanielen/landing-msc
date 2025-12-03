"use client"

import { useState } from "react"
import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { ServiceDetailCard } from "@/components/sections/service-detail-card"
import Image from "next/image"

// Información detallada de servicios basada en company-info.txt
const servicesData = {
  es: {
    vessel: {
      title: "Inspecciones de Buques",
      description:
        "Inspecciones integrales de buques para armadores, fletadores, aseguradoras y operadores portuarios. Evaluaciones objetivas, precisas y conformes a estándares internacionales.",
      features: [
        "Inspecciones precompra: inspección integral antes de adquirir un buque, cubriendo casco, maquinaria, equipos y documentación",
        "Inspecciones de condición y relacionadas con clase: evaluación del estado del buque y estimación del valor de mercado",
        "Inspecciones on-hire / off-hire y de bunkers: inspección del estado del buque y/o cantidades de combustible al inicio o final de contrato de fletamento",
        "Inspecciones de daños y siniestros: evaluación de integridad estructural, motores, sistemas de propulsión y equipos mecánicos",
        "Inspecciones para clubes de protección e indemnización (P&I): centradas en seguridad, equipos de gestión de carga y condición general",
      ],
      image: "/images/footage/IMG_20181207_111709.webp",
    },
    cargo: {
      title: "Inspecciones a la Carga",
      description:
        "Verificación y evaluación técnica de carga para prevenir reclamaciones y determinar responsabilidades. Servicios especializados para diferentes tipos de carga marítima.",
      features: [
        "Inspecciones de pre-embarque y descarga: verificación de carga, estiba y operaciones para prevenir reclamaciones",
        "Evaluación de daños en carga: determinación de causa, alcance, circunstancias y responsabilidad asociada a daños",
        "Supervisión de carga y descarga: monitoreo de operaciones de manipulación para garantizar seguridad y cumplimiento",
        "Evaluación de carga suelta, fraccionada a granel y contenedores: inspección y supervisión de operaciones especializadas",
        "Inspección de cantidad por calados: método hidrostático preciso para calcular peso de carga a granel",
        "Servicios de conteo: conteo físico y verificación de carga embarcada o recibida",
      ],
      image: "/images/footage/IMG_20190405_150150.webp",
    },
    consultancy: {
      title: "Consultoría Marítima",
      description:
        "Asesoramiento experto y auditorías de cumplimiento para garantizar operaciones seguras y conformes a normativas internacionales.",
      features: [
        "Auditorías e inspecciones de seguridad y protección (IGS/PBIP/MLC): auditorías de cumplimiento que cubren requisitos de seguridad, protección marítima y normas laborales",
        "Asesoría técnica: asesoramiento experto sobre operaciones del buque, mantenimiento y fallas operativas o mecánicas",
        "Investigación de incidentes marítimos: investigaciones independientes de accidentes marítimos",
        "Consultoría de cumplimiento normativo: asistencia para cumplir con instrumentos de la OMI, requisitos de Estado de Bandera y reglas de sociedades de clasificación",
      ],
      image: "/images/footage/IMG_20190406_095637.webp",
    },
    port: {
      title: "Servicios de Puertos y Terminales",
      description:
        "Evaluaciones de infraestructura portuaria y condiciones de seguridad para garantizar operaciones seguras y eficientes.",
      features: [
        "Evaluaciones de condición de terminales: evaluación de infraestructura portuaria y condiciones de seguridad en terminales",
        "Inspecciones de atraque y amarre: evaluación de sistemas de amarre, defensas y la idoneidad del muelle para operaciones seguras",
      ],
      image: "/images/footage/IMG_20190406_172726.webp",
    },
    specialized: {
      title: "Servicios Especializados",
      description:
        "Tecnología de vanguardia para inspecciones en áreas de difícil acceso, mejorando la precisión y eficiencia de nuestras evaluaciones.",
      features: [
        "Inspecciones aéreas con drones: inspecciones aéreas de áreas del buque de difícil acceso",
      ],
      image: "/images/footage/IMG_20190506_163718.webp",
    },
  },
  en: {
    vessel: {
      title: "Vessel Surveys",
      description:
        "Comprehensive vessel inspections for shipowners, charterers, insurers, and port operators. Objective, accurate assessments compliant with international standards.",
      features: [
        "Pre-purchase surveys: comprehensive inspection before acquiring a vessel, covering hull, machinery, equipment and documentation",
        "Condition and class-related inspections: assessment of vessel condition and market value estimation",
        "On-hire / off-hire and bunker surveys: inspection of vessel condition and/or fuel quantities at the start or end of charter contract",
        "Damage and casualty surveys: assessment of structural integrity, engines, propulsion systems and mechanical equipment",
        "P&I inspections: focused on safety, cargo management equipment and general condition",
      ],
      image: "/images/footage/IMG_20181207_111709.webp",
    },
    cargo: {
      title: "Cargo Surveys",
      description:
        "Technical verification and assessment of cargo to prevent claims and determine responsibilities. Specialized services for different types of maritime cargo.",
      features: [
        "Pre-loading & discharge surveys: verification of cargo, stowage and operations to prevent claims",
        "Cargo damage assessment: determination of cause, extent, circumstances and responsibility associated with damage",
        "Loading and discharging supervision: monitoring of handling operations to ensure safety and compliance",
        "Breakbulk, bulk and container evaluations: inspection and supervision of specialized operations",
        "Draft surveys: precise hydrostatic method to calculate bulk cargo weight",
        "Tally services: physical counting and verification of shipped or received cargo",
      ],
      image: "/images/footage/IMG_20190405_150150.webp",
    },
    consultancy: {
      title: "Marine Consultancy",
      description:
        "Expert advice and compliance audits to ensure safe operations and compliance with international regulations.",
      features: [
        "ISM/ISPS/MLC audits and inspections: compliance audits covering safety requirements, maritime security and labor standards",
        "Technical advisory: expert advice on vessel operations, maintenance and operational or mechanical failures",
        "Marine incident investigation: independent investigations of maritime accidents",
        "Regulatory compliance consulting: assistance to comply with IMO instruments, Flag State requirements and Classification Society rules",
      ],
      image: "/images/footage/IMG_20190406_095637.webp",
    },
    port: {
      title: "Port & Terminal Services",
      description:
        "Port infrastructure assessments and safety conditions to ensure safe and efficient operations.",
      features: [
        "Terminal condition assessments: evaluation of port infrastructure and safety conditions in terminals",
        "Berth and mooring surveys: evaluation of mooring systems, fenders and berth suitability for safe operations",
      ],
      image: "/images/footage/IMG_20190406_172726.webp",
    },
    specialized: {
      title: "Specialized Services",
      description:
        "Cutting-edge technology for inspections in hard-to-reach areas, improving the accuracy and efficiency of our assessments.",
      features: [
        "Drone aerial surveys: aerial inspections of hard-to-reach vessel areas",
      ],
      image: "/images/footage/IMG_20190506_163718.webp",
    },
  },
}

export function ServicesPageClient() {
  const { lang } = useLang()
  const t = content[lang].services
  const [filter, setFilter] = useState<string>("all")

  const sections = [
    { id: "services-hero", label: "Inicio", labelEn: "Hero" },
    { id: "service-filters", label: "Filtros", labelEn: "Filters" },
    { id: "all-services", label: "Servicios", labelEn: "Services" },
  ]

  const filterLabels = {
    es: {
      all: "Todos los Servicios",
      vessel: "Buques",
      cargo: "Carga",
      port: "Puertos y Consultoría",
    },
    en: {
      all: "All Services",
      vessel: "Vessels",
      cargo: "Cargo",
      port: "Port & Consultancy",
    },
  }

  const getFilteredServices = () => {
    const services = [
      { ...servicesData[lang].vessel, icon: "Ship", type: "vessel" },
      { ...servicesData[lang].cargo, icon: "Container", type: "cargo" },
      { ...servicesData[lang].consultancy, icon: "Briefcase", type: "consultancy" },
      { ...servicesData[lang].port, icon: "Anchor", type: "port" },
      { ...servicesData[lang].specialized, icon: "Drone", type: "specialized" },
    ]

    if (filter === "all") return services
    if (filter === "vessel") return services.filter((s) => s.type === "vessel")
    if (filter === "cargo") return services.filter((s) => s.type === "cargo")
    if (filter === "port")
      return services.filter((s) => s.type === "port" || s.type === "consultancy" || s.type === "specialized")
    return services
  }

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      
      {/* Hero Section */}
      <section id="services-hero" className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-primary pt-16">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-30" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6 text-white drop-shadow-lg uppercase tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-blue-100 drop-shadow-md uppercase">{t.subtitle}</p>
        </div>
      </section>

      {/* Filters Section */}
      <section id="service-filters" className="py-12 border-b bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(filterLabels[lang]).map(([key, label]) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                onClick={() => setFilter(key)}
                className={`rounded-full transition-all ${
                  filter === key
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-primary text-primary hover:bg-primary/5"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="all-services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredServices().map((service, idx) => (
              <ServiceDetailCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                features={service.features}
                idx={idx}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
