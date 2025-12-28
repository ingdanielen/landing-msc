"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, CheckCircle2 } from "lucide-react"
import { servicesData, type Language } from "./services-data"

interface ServicesCertificationsProps {
  lang: Language
}

export function ServicesCertifications({ lang }: ServicesCertificationsProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-certifications" className="py-20 relative overflow-hidden" suppressHydrationWarning>
      {/* Split background - left dark, right with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-gradient(to bottom right, var(--color-primary), var(--color-secondary), var(--color-slate-900))" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <div className="absolute inset-0 bg-[url('/images/footage/IMG_20190406_095637.webp')] bg-cover bg-center" />
        </div>
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)_1px,linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Header and description */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">
                {lang === "es" ? "Acreditaciones" : lang === "zh" ? "认证资质" : "Accreditations"}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-hero leading-tight"
            >
              {t.certifications.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg mb-4"
            >
              {t.certifications.subtitle}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-sm mb-8"
            >
              {t.certifications.description}
            </motion.p>

            {/* Feature highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 bg-accent/10 border border-accent/20 rounded-xl p-4"
            >
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  {lang === "es" ? "Cumplimiento Garantizado" : lang === "zh" ? "保证合规" : "Guaranteed Compliance"}
                </div>
                <div className="text-white/60 text-xs">
                  {lang === "es" 
                    ? "Todas nuestras operaciones cumplen con los mas altos estandares internacionales" 
                    : lang === "zh" 
                      ? "我们所有的运营都符合最高国际标准" 
                      : "All our operations comply with the highest international standards"}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Certifications grid */}
          <div className="grid grid-cols-2 gap-3">
            {t.certifications.items.map((cert, idx) => (
              mounted ? (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-0.5 group-hover:text-accent transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-md flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-0.5">{cert.name}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{cert.desc}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
