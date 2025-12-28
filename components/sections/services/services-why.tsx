"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Award } from "lucide-react"
import Image from "next/image"
import { servicesData, advantageIcons, type Language } from "./services-data"

interface ServicesWhyProps {
  lang: Language
}

const advantageImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
  "/images/footage/IMG_20190406_172726.webp",
  "/images/footage/IMG_20190506_163718.webp",
  "/images/footage/IMG_20181207_111709.webp",
]

export function ServicesWhy({ lang }: ServicesWhyProps) {
  const [mounted, setMounted] = useState(false)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-why" className="py-20 bg-slate-50 relative overflow-hidden" suppressHydrationWarning>
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {lang === "es" ? "Nuestras Ventajas" : lang === "zh" ? "我们的优势" : "Our Advantages"}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 font-hero"
          >
            {t.whyChooseUs.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            {t.whyChooseUs.subtitle}
          </motion.p>
        </div>

        {/* Advantages Grid - Similar to catalog style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {t.whyChooseUs.items.map((item, idx) => {
            const Icon = advantageIcons[item.icon as keyof typeof advantageIcons] || Shield
            
            return mounted ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="relative h-[280px] w-full overflow-hidden bg-secondary group cursor-pointer">
                  {/* Background Image */}
                  <Image
                    src={advantageImages[idx]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-secondary/95 group-hover:from-primary/90 group-hover:via-primary/80 group-hover:to-secondary/95 transition-all duration-500" />
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 z-10">
                    {/* Icon and Title - move up on hover */}
                    <div className="text-center space-y-4 transform group-hover:-translate-y-6 transition-transform duration-500">
                      {/* Icon */}
                      <div className="flex justify-center">
                        <Icon className="w-12 h-12 text-white group-hover:scale-110 group-hover:text-accent transition-all duration-300 drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 drop-shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Description - appears on hover */}
                    <div className="text-center mt-4">
                      <p className="text-white/90 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0 drop-shadow-md">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div key={idx} className="relative h-[280px] w-full overflow-hidden bg-secondary">
                <Image
                  src={advantageImages[idx]}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-secondary/95" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 z-10">
                  <Icon className="w-12 h-12 text-white mb-4 drop-shadow-lg" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-white text-center drop-shadow-lg">{item.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
