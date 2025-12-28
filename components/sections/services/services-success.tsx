"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container, Quote, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { servicesData, caseIcons, type Language } from "./services-data"

interface ServicesSuccessProps {
  lang: Language
}

const caseImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
  "/images/footage/IMG_20190406_172726.webp",
]

export function ServicesSuccess({ lang }: ServicesSuccessProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-success" className="py-20 bg-gradient-to-br from-amber-50 via-white to-slate-50 relative overflow-hidden" suppressHydrationWarning>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, #1a365d 50px, #1a365d 51px)`
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-primary text-sm font-bold uppercase tracking-[0.15em]">
              {lang === "es" ? "Casos de Éxito" : lang === "zh" ? "成功案例" : "Success Stories"}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 font-hero"
          >
            {t.successCases.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            {t.successCases.subtitle}
          </motion.p>
        </div>

        {/* Cases Grid - Magazine Style */}
        <div className="grid lg:grid-cols-2 gap-6">
          {t.successCases.cases.map((caseItem, idx) => {
            const Icon = caseIcons[caseItem.icon as keyof typeof caseIcons] || Container
            const isLarge = idx === 0 || idx === 3
            
            return mounted ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`group ${isLarge ? "lg:row-span-2" : ""}`}
              >
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 ${isLarge ? "h-full" : ""}`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden ${isLarge ? "h-64" : "h-48"}`}>
                    <Image
                      src={caseImages[idx]}
                      alt={caseItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    
                    {/* Quote on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <Quote className="w-6 h-6 text-accent mb-2 opacity-80" />
                      <p className="text-white text-sm font-medium italic line-clamp-2">
                        {caseItem.result}
                      </p>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      {caseItem.client}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                          {caseItem.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Challenge & Solution */}
                    <div className="space-y-3">
                      <div className="pl-4 border-l-2 border-red-400/50">
                        <span className="text-red-500 text-xs font-bold uppercase tracking-wider">
                          {lang === "es" ? "Desafío" : lang === "zh" ? "挑战" : "Challenge"}
                        </span>
                        <p className="text-slate-600 text-sm mt-1">
                          {caseItem.challenge}
                        </p>
                      </div>
                      
                      <div className="pl-4 border-l-2 border-green-400/50">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wider">
                          {lang === "es" ? "Solución" : lang === "zh" ? "解决方案" : "Solution"}
                        </span>
                        <p className="text-slate-600 text-sm mt-1">
                          {caseItem.solution}
                        </p>
                      </div>
                    </div>
                    
                    {/* Result highlight */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-accent text-xs font-bold uppercase tracking-wider">
                          {lang === "es" ? "Resultado" : lang === "zh" ? "结果" : "Result"}
                        </span>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-primary font-semibold text-sm mt-1 line-clamp-2">
                        {caseItem.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div key={idx} className={`group ${isLarge ? "lg:row-span-2" : ""}`}>
                <div className={`relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 ${isLarge ? "h-full" : ""}`}>
                  <div className={`relative overflow-hidden ${isLarge ? "h-64" : "h-48"}`}>
                    <Image
                      src={caseImages[idx]}
                      alt={caseItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <Quote className="w-6 h-6 text-accent mb-2 opacity-80" />
                      <p className="text-white text-sm font-medium italic line-clamp-2">{caseItem.result}</p>
                    </div>
                    <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      {caseItem.client}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-primary">{caseItem.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="pl-4 border-l-2 border-red-400/50">
                        <span className="text-red-500 text-xs font-bold uppercase tracking-wider">
                          {lang === "es" ? "Desafío" : lang === "zh" ? "挑战" : "Challenge"}
                        </span>
                        <p className="text-slate-600 text-sm mt-1">{caseItem.challenge}</p>
                      </div>
                      <div className="pl-4 border-l-2 border-green-400/50">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wider">
                          {lang === "es" ? "Solución" : lang === "zh" ? "解决方案" : "Solution"}
                        </span>
                        <p className="text-slate-600 text-sm mt-1">{caseItem.solution}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-accent text-xs font-bold uppercase tracking-wider">
                        {lang === "es" ? "Resultado" : lang === "zh" ? "结果" : "Result"}
                      </span>
                      <p className="text-primary font-semibold text-sm mt-1 line-clamp-2">{caseItem.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
