"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LocalizedLink } from "@/components/ui/localized-link"
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Ship } from "lucide-react"
import { servicesData, serviceIcons, type Language } from "./services-data"

interface ServicesCatalogProps {
  lang: Language
}

export function ServicesCatalog({ lang }: ServicesCatalogProps) {
  const [mounted, setMounted] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  const servicesArray = Object.entries(t.services.items).map(([key, value]) => ({
    id: key,
    ...value,
  }))

  const filteredServices = activeFilter === "all" 
    ? servicesArray 
    : servicesArray.filter(s => {
        if (activeFilter === "vessel") return s.id === "vessel"
        if (activeFilter === "cargo") return s.id === "cargo"
        if (activeFilter === "consultancy") return s.id === "consultancy" || s.id === "specialized"
        if (activeFilter === "port") return s.id === "port"
        return true
      })

  return (
    <section id="services-catalog" className="py-16 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 font-hero uppercase tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { key: "all", label: t.services.filterAll },
            { key: "vessel", label: t.services.filterVessel },
            { key: "cargo", label: t.services.filterCargo },
            { key: "consultancy", label: t.services.filterConsultancy },
            { key: "port", label: t.services.filterPort },
          ].map((filter) => (
            <Button
              key={filter.key}
              size="sm"
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-md px-4 text-sm transition-all ${
                activeFilter === filter.key
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border-primary/20 text-primary hover:bg-primary/5"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mounted ? (
            <AnimatePresence>
              {filteredServices.map((service, idx) => {
                const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Ship
                const isExpanded = expandedService === service.id
                
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group ${
                      isExpanded ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-3 right-3 w-11 h-11 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                        <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                      </div>

                      {/* Title on image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-xl font-bold text-white font-hero uppercase tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-xs mt-1">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        {service.features.slice(0, isExpanded ? undefined : 3).map((feature, featureIdx) => (
                          <div
                            key={featureIdx}
                            className="flex items-start gap-2 p-2 bg-slate-50 rounded-md hover:bg-accent/5 transition-colors"
                          >
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-primary text-xs">
                                {feature.name}
                              </div>
                              {isExpanded && (
                                <div className="text-slate-500 text-[11px] mt-0.5">
                                  {feature.desc}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expand/Collapse & CTA */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        {service.features.length > 3 && (
                          <button
                            onClick={() => setExpandedService(isExpanded ? null : service.id)}
                            className="text-accent hover:text-primary font-medium text-xs flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                {lang === "es" ? "Ver menos" : lang === "zh" ? "收起" : "Show less"}
                                <ChevronUp className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                {lang === "es" ? "Ver más" : lang === "zh" ? "展开" : "Show more"}
                                <ChevronDown className="h-3 w-3" />
                              </>
                            )}
                          </button>
                        )}
                        <LocalizedLink href="/contact">
                          <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-md text-xs h-8">
                            {lang === "es" ? "Solicitar" : lang === "zh" ? "请求" : "Request"}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </LocalizedLink>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          ) : (
            filteredServices.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Ship
              
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                    <div className="absolute top-3 right-3 w-11 h-11 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
                      <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-bold text-white font-hero uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-xs mt-1">{service.shortDesc}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-md">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <div className="font-semibold text-primary text-xs">{feature.name}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-slate-100">
                      <LocalizedLink href="/contact">
                        <Button size="sm" className="bg-accent hover:bg-accent/90 text-white rounded-md text-xs h-8">
                          {lang === "es" ? "Solicitar" : lang === "zh" ? "请求" : "Request"}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </LocalizedLink>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

