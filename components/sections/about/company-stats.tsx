"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, animate } from "framer-motion"
import { type Language } from "@/lib/content"
import {
  FileCheck,
  Users,
  RefreshCw,
  ThumbsUp,
  TrendingUp,
  Clock,
} from "lucide-react"
import Image from "next/image"

// Data based EXACTLY on more-company-info.txt
const statsContent = {
  es: {
    title: "Metricas de",
    titleHighlight: "Impacto",
    subtitle: "Datos que respaldan nuestra trayectoria",
    since: "Desde 2019",
    verifiable: "Cifras verificables • Resultados reales",
    stats: [
      { icon: FileCheck, value: 480, prefix: "+", suffix: "", label: "Servicios Técnicos Completados" },
      { icon: Users, value: 120, prefix: "+", suffix: "", label: "Clientes Corporativos Atendidos" },
      { icon: RefreshCw, value: 78, prefix: "", suffix: "%", label: "Tasa de Recurrencia de Clientes" },
      { icon: ThumbsUp, value: 95, prefix: "", suffix: "%", label: "Índice de Satisfacción del Cliente" },
      { icon: TrendingUp, value: 22, prefix: "+", suffix: "%", label: "Crecimiento Anual Promedio" },
      { icon: Clock, value: 72, prefix: "24-", suffix: "h", label: "Tiempo de Entrega de Informes" },
    ],
  },
  en: {
    title: "Impact",
    titleHighlight: "Metrics",
    subtitle: "Data supporting our track record",
    since: "Since 2019",
    verifiable: "Verifiable figures • Real results",
    stats: [
      { icon: FileCheck, value: 480, prefix: "+", suffix: "", label: "Technical Services Completed" },
      { icon: Users, value: 120, prefix: "+", suffix: "", label: "Corporate Clients Served" },
      { icon: RefreshCw, value: 78, prefix: "", suffix: "%", label: "Client Recurrence Rate" },
      { icon: ThumbsUp, value: 95, prefix: "", suffix: "%", label: "Customer Satisfaction Index" },
      { icon: TrendingUp, value: 22, prefix: "+", suffix: "%", label: "Average Annual Growth" },
      { icon: Clock, value: 72, prefix: "24-", suffix: "h", label: "Report Delivery Time" },
    ],
  },
  zh: {
    title: "Impact",
    titleHighlight: "Metrics",
    subtitle: "支持我们业绩记录的数据",
    since: "自2019年以来",
    verifiable: "可验证的数据 • 真实的结果",
    stats: [
      { icon: FileCheck, value: 480, prefix: "+", suffix: "", label: "完成的技术服务" },
      { icon: Users, value: 120, prefix: "+", suffix: "", label: "服务的企业客户" },
      { icon: RefreshCw, value: 78, prefix: "", suffix: "%", label: "客户回头率" },
      { icon: ThumbsUp, value: 95, prefix: "", suffix: "%", label: "客户满意度指数" },
      { icon: TrendingUp, value: 22, prefix: "+", suffix: "%", label: "平均年增长率" },
      { icon: Clock, value: 72, prefix: "24-", suffix: "h", label: "报告交付时间" },
    ],
  },
}

function AnimatedCounter({ 
  value, 
  prefix, 
  suffix 
}: { 
  value: number
  prefix: string
  suffix: string 
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.round(v)),
      })
      return () => controls.stop()
    }
  }, [isInView, value, hasAnimated])

  // Fallback: si después de 3s no ha animado, mostrar el valor final
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count === 0 && value > 0) {
        setCount(value)
      }
    }, 3000)
    return () => clearTimeout(timeout)
  }, [count, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

export function CompanyStats({ lang }: { lang: Language }) {
  const t = statsContent[lang]

  // Split stats into featured (first 2) and rest
  const featuredStats = t.stats.slice(0, 2)
  const restStats = t.stats.slice(2)

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/footage/IMG_20190406_172726.webp"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      {/* Subtle texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">{t.since}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="font-hero">{t.title}</span>{" "}
            <span className="font-hero text-accent">{t.titleHighlight}</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Featured Stats - Large */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 max-w-4xl mx-auto">
          {featuredStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/[0.08] backdrop-blur-sm rounded-lg border border-white/10 p-6 md:p-8 lg:p-10 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-tr-lg">
                    <div className="absolute top-0 right-0 w-full h-full bg-accent/10 rounded-bl-[60px] md:rounded-bl-[80px]" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-3">
                      <AnimatedCounter 
                        value={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix} 
                      />
                    </div>
                    <div className="text-white/70 font-medium text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Rest Stats - Smaller Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {restStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <div className="bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/10 p-4 md:p-6 text-center transition-all duration-300 hover:bg-white/[0.1]">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-none mb-1">
                    <AnimatedCounter 
                      value={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix} 
                    />
                  </div>
                  <div className="text-white/50 text-xs md:text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 lg:mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 text-white/40 text-xs md:text-sm">
            <div className="w-6 md:w-8 h-px bg-white/20" />
            <span>{t.verifiable}</span>
            <div className="w-6 md:w-8 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
