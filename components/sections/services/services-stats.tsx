"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { servicesData, type Language } from "./services-data"

interface ServicesStatsProps {
  lang: Language
}

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [isInView, value])
  
  // Format the display based on original value pattern
  const formatDisplay = () => {
    if (value.includes("+")) return `+${displayValue}`
    if (value.includes("K")) return `${displayValue}K`
    if (value.includes("%")) return `${displayValue}%`
    if (value.includes("-")) return value // Keep as-is for ranges like 24-72h
    if (value.includes("/")) return value // Keep as-is for 24/7
    return displayValue.toString()
  }
  
  return (
    <div ref={ref}>
      {formatDisplay()}
    </div>
  )
}

export function ServicesStats({ lang }: ServicesStatsProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-stats" className="py-20 bg-gradient-to-b from-primary via-secondary to-slate-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">
              {lang === "es" ? "Resultados Comprobados" : lang === "zh" ? "验证结果" : "Proven Results"}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-hero"
          >
            {t.stats.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            {t.stats.subtitle}
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.stats.items.map((stat, idx) => (
            mounted ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 h-full text-center">
                  {/* Number - using font-sans for cleaner look */}
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-sans tabular-nums">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-white/50">
                    {stat.desc}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-sans tabular-nums">{stat.value}</div>
                <div className="text-sm font-bold text-white uppercase tracking-wide mb-1">{stat.label}</div>
                <div className="text-xs text-white/50">{stat.desc}</div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
