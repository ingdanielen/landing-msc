"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import { Package, Ship, Briefcase, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Data based EXACTLY on more-company-info.txt
const successContent = {
  es: {
    title: "Casos de Éxito",
    subtitle: "Resultados que hablan por nosotros",
    categories: [
      {
        id: "cargo",
        icon: Package,
        name: "Inspecciones de Carga",
        cases: [
          {
            title: "Inspección de carga a granel",
            client: "Operador logístico internacional",
            image: "/images/footage/IMG_20190405_150150.webp",
            problem: "Discrepancias recurrentes en peso y condición de la carga.",
            solution: "Draft survey completo, supervisión de carga y descarga, registro fotográfico y documental.",
            result: "Eliminación de reclamos contractuales y ahorro económico significativo.",
          },
          {
            title: "Daños en carga general",
            client: "Empresa exportadora regional",
            image: "/images/footage/IMG_20190405_150249.webp",
            problem: "Rechazo de mercancía por daños aparentes.",
            solution: "Inspección previa y posterior, informe técnico con causa raíz.",
            result: "Defensa exitosa ante aseguradora, recuperación parcial del valor.",
          },
          {
            title: "Supervisión de estiba",
            client: "Terminal portuaria",
            image: "/images/footage/IMG_20190406_095637.webp",
            problem: "Riesgo de daño por mala estiba.",
            solution: "Supervisión en tiempo real, recomendaciones técnicas inmediatas.",
            result: "Operación segura, cero incidentes.",
          },
        ],
      },
      {
        id: "vessel",
        icon: Ship,
        name: "Inspecciones de Buques",
        cases: [
          {
            title: "Survey pre-charter",
            client: "Operador de flota",
            image: "/images/footage/IMG_20181207_111709.webp",
            problem: "Incertidumbre sobre condición real del buque.",
            solution: "Inspección estructural y operativa, checklists internacionales.",
            result: "Negociación ajustada a realidad técnica.",
          },
          {
            title: "On-hire / Off-hire survey",
            client: "Armador internacional",
            image: "/images/footage/IMG_20181207_111716.webp",
            problem: "Disputa por daños durante fletamento.",
            solution: "Comparativo técnico documentado.",
            result: "Resolución objetiva, reducción de tiempos legales.",
          },
          {
            title: "Condition survey",
            client: "Inversionista marítimo",
            image: "/images/footage/IMG_20190406_172726.webp",
            problem: "Evaluar viabilidad de adquisición.",
            solution: "Informe integral de condición.",
            result: "Decisión informada de inversión.",
          },
        ],
      },
      {
        id: "consultancy",
        icon: Briefcase,
        name: "Consultoría Marítima",
        cases: [
          {
            title: "Cumplimiento normativo",
            client: "Operador portuario",
            image: "/images/footage/IMG_20190405_150331.webp",
            problem: "Observaciones recurrentes en auditorías.",
            solution: "Diagnóstico normativo, plan de acción correctivo.",
            result: "Cumplimiento total en auditoría posterior.",
          },
          {
            title: "Asistencia en reclamo",
            client: "Aseguradora",
            image: "/images/footage/IMG_20190406_095657.webp",
            problem: "Falta de evidencia técnica clara.",
            solution: "Peritaje técnico independiente.",
            result: "Resolución favorable del reclamo.",
          },
          {
            title: "Optimización operativa",
            client: "Empresa logística",
            image: "/images/footage/IMG_20190406_180706.webp",
            problem: "Retrasos y sobrecostos portuarios.",
            solution: "Análisis técnico-operativo.",
            result: "Reducción de tiempos y costos.",
          },
        ],
      },
    ],
  },
  en: {
    title: "Success Stories",
    subtitle: "Results that speak for us",
    categories: [
      {
        id: "cargo",
        icon: Package,
        name: "Cargo Inspections",
        cases: [
          {
            title: "Bulk Cargo Inspection",
            client: "International logistics operator",
            image: "/images/footage/IMG_20190405_150150.webp",
            problem: "Recurring discrepancies in cargo weight and condition.",
            solution: "Full draft survey, loading and discharge supervision, photographic records.",
            result: "Elimination of contractual claims and significant financial savings.",
          },
          {
            title: "Damage to General Cargo",
            client: "Regional exporting company",
            image: "/images/footage/IMG_20190405_150249.webp",
            problem: "Cargo rejection due to apparent damage.",
            solution: "Pre- and post-shipment inspections, technical report with root cause.",
            result: "Successful defense before insurer, partial value recovery.",
          },
          {
            title: "Stowage Supervision",
            client: "Port terminal",
            image: "/images/footage/IMG_20190406_095637.webp",
            problem: "Risk of damage due to improper stowage.",
            solution: "Real-time supervision, immediate technical recommendations.",
            result: "Safe operation, zero incidents.",
          },
        ],
      },
      {
        id: "vessel",
        icon: Ship,
        name: "Vessel Inspections",
        cases: [
          {
            title: "Pre-Charter Survey",
            client: "Fleet operator",
            image: "/images/footage/IMG_20181207_111709.webp",
            problem: "Uncertainty regarding vessel's actual condition.",
            solution: "Structural and operational inspection, international checklists.",
            result: "Negotiations aligned with technical condition.",
          },
          {
            title: "On-Hire / Off-Hire Survey",
            client: "International shipowner",
            image: "/images/footage/IMG_20181207_111716.webp",
            problem: "Dispute over damages during charter period.",
            solution: "Documented technical comparison.",
            result: "Objective dispute resolution, reduced legal timelines.",
          },
          {
            title: "Condition Survey",
            client: "Maritime investor",
            image: "/images/footage/IMG_20190406_172726.webp",
            problem: "Assessment of acquisition viability.",
            solution: "Comprehensive condition report.",
            result: "Informed investment decision.",
          },
        ],
      },
      {
        id: "consultancy",
        icon: Briefcase,
        name: "Maritime Consultancy",
        cases: [
          {
            title: "Regulatory Compliance",
            client: "Port operator",
            image: "/images/footage/IMG_20190405_150331.webp",
            problem: "Recurrent observations during audits.",
            solution: "Regulatory assessment, corrective action plan.",
            result: "Full compliance in subsequent audit.",
          },
          {
            title: "Maritime Claim Assistance",
            client: "Insurance company",
            image: "/images/footage/IMG_20190406_095657.webp",
            problem: "Lack of clear technical evidence.",
            solution: "Independent technical expert assessment.",
            result: "Favorable claim resolution.",
          },
          {
            title: "Operational Optimization",
            client: "Logistics company",
            image: "/images/footage/IMG_20190406_180706.webp",
            problem: "Port delays and cost overruns.",
            solution: "Technical-operational analysis.",
            result: "Reduced time and costs.",
          },
        ],
      },
    ],
  },
}

export function SuccessStories({ lang }: { lang: Language }) {
  const t = successContent[lang as keyof typeof successContent] || successContent.en
  const [activeCat, setActiveCat] = useState(0)
  const [activeCase, setActiveCase] = useState(0)

  const category = t.categories[activeCat]
  const currentCase = category.cases[activeCase]
  const CategoryIcon = category.icon

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCase((prev) => {
        if (prev >= category.cases.length - 1) {
          setActiveCat((cat) => (cat + 1) % t.categories.length)
          return 0
        }
        return prev + 1
      })
    }, 8000)
    return () => clearInterval(timer)
  }, [category.cases.length, t.categories.length])

  const nextCase = () => {
    if (activeCase >= category.cases.length - 1) {
      setActiveCat((cat) => (cat + 1) % t.categories.length)
      setActiveCase(0)
    } else {
      setActiveCase((prev) => prev + 1)
    }
  }

  const prevCase = () => {
    if (activeCase <= 0) {
      const newCat = (activeCat - 1 + t.categories.length) % t.categories.length
      setActiveCat(newCat)
      setActiveCase(t.categories[newCat].cases.length - 1)
    } else {
      setActiveCase((prev) => prev - 1)
    }
  }

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCat}-${activeCase}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={currentCase.image}
            alt={currentCase.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-12 md:pt-16 lg:pt-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent text-sm tracking-widest uppercase font-medium">
                {t.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-white mt-2 tracking-tight">
                {t.title}
              </h2>
            </motion.div>

            {/* Category Pills - Wrap on mobile */}
            <div className="mt-6 md:mt-8">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {t.categories.map((cat, idx) => {
                  const CatIcon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCat(idx); setActiveCase(0) }}
                      className={`
                        flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-sm font-medium 
                        transition-all duration-300 border
                        ${idx === activeCat
                          ? "bg-white text-slate-900 border-white"
                          : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }
                      `}
                    >
                      <CatIcon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{cat.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCat}-${activeCase}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center"
              >
                {/* Left - Case Info */}
                <div className="space-y-5 md:space-y-6">
                  {/* Case Counter */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent flex items-center justify-center">
                      <CategoryIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-white/40 text-sm font-mono">
                        {String(activeCase + 1).padStart(2, "0")} / {String(category.cases.length).padStart(2, "0")}
                      </div>
                      <div className="text-white/60 text-sm">{category.name}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                      {currentCase.title}
                    </h3>
                    <p className="text-white/50 text-base md:text-lg italic">{currentCase.client}</p>
                  </div>

                  {/* Challenge */}
                  <div className="relative pl-4 border-l-2 border-red-500/60">
                    <span className="text-red-400 text-xs tracking-widest uppercase font-semibold block mb-1">
                      {lang === "es" ? "Desafío" : "Challenge"}
                    </span>
                    <p className="text-white/80 text-base md:text-lg">{currentCase.problem}</p>
                  </div>

                  {/* Navigation - Mobile */}
                  <div className="flex items-center gap-3 lg:hidden">
                    <button
                      onClick={prevCase}
                      className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextCase}
                      className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "linear" }}
                        key={`${activeCat}-${activeCase}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Right - Solution & Results */}
                <div className="space-y-4">
                  {/* Solution */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/10"
                  >
                    <h4 className="text-white/40 text-xs tracking-widest uppercase font-semibold mb-3">
                      {lang === "es" ? "Nuestra Solución" : "Our Solution"}
                    </h4>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">
                      {currentCase.solution}
                    </p>
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-accent rounded-lg p-5 md:p-6"
                  >
                    <h4 className="text-white/70 text-xs tracking-widest uppercase font-semibold mb-3">
                      {lang === "es" ? "Resultado" : "Result"}
                    </h4>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-white shrink-0 mt-0.5" />
                      <p className="text-white text-base md:text-lg font-semibold leading-snug">
                        {currentCase.result}
                      </p>
                    </div>
                  </motion.div>

                  {/* Navigation - Desktop */}
                  <div className="hidden lg:flex items-center gap-4 pt-2">
                    <button
                      onClick={prevCase}
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextCase}
                      className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden ml-4">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8, ease: "linear" }}
                        key={`${activeCat}-${activeCase}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Thumbnails */}
        <div className="pb-8 md:pb-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
              {category.cases.map((caseItem, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCase(idx)}
                  className={`
                    relative overflow-hidden rounded-lg transition-all duration-300
                    ${idx === activeCase
                      ? "w-20 md:w-28 h-14 md:h-18 ring-2 ring-accent"
                      : "w-14 md:w-18 h-14 md:h-18 opacity-50 hover:opacity-80"
                    }
                  `}
                >
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
