"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { servicesData, processIcons, type Language } from "./services-data"

interface ServicesProcessProps {
  lang: Language
}

export function ServicesProcess({ lang }: ServicesProcessProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-process" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4"
          >
            {lang === "es" ? "Metodología" : lang === "zh" ? "方法论" : "Methodology"}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 font-hero"
          >
            {t.process.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            {t.process.subtitle}
          </motion.p>
        </div>

        {/* Horizontal scroll cards */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {t.process.steps.map((step, idx) => {
              const Icon = processIcons[step.icon as keyof typeof processIcons] || Search
              
              return mounted ? (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Arrow connector (desktop only) */}
                  {idx < t.process.steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-16 z-20 text-accent">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="relative bg-white border-2 border-slate-100 rounded-2xl p-6 h-full transition-all duration-500 hover:border-accent hover:shadow-xl hover:shadow-accent/10 group-hover:-translate-y-2">
                    {/* Large number watermark */}
                    <div className="absolute -top-4 -right-2 text-8xl font-black text-slate-100/80 select-none leading-none group-hover:text-accent/10 transition-colors duration-500">
                      {idx + 1}
                    </div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 mb-6">
                      <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shadow-lg">
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Step indicator */}
                    <div className="relative z-10 mb-2">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">
                        {lang === "es" ? "Paso" : lang === "zh" ? "步骤" : "Step"} {idx + 1}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="relative z-10 text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="relative z-10 text-slate-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                    
                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </motion.div>
              ) : (
                <div key={idx} className="relative bg-white border-2 border-slate-100 rounded-2xl p-6 h-full">
                  <div className="absolute -top-4 -right-2 text-8xl font-black text-slate-100/80 select-none leading-none">
                    {idx + 1}
                  </div>
                  <div className="relative z-10 mb-6">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="relative z-10 mb-2">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      {lang === "es" ? "Paso" : lang === "zh" ? "步骤" : "Step"} {idx + 1}
                    </span>
                  </div>
                  <h3 className="relative z-10 text-lg font-bold text-primary mb-3">{step.title}</h3>
                  <p className="relative z-10 text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
