"use client"

import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import Image from "next/image"
import { ArrowRight, Ship, Container, Briefcase, Anchor, Zap } from "lucide-react"

const icons = {
  Ship: Ship,
  Container: Container,
  Briefcase: Briefcase,
  Anchor: Anchor,
  Drone: Zap,
}

// Diferentes imágenes para cada servicio
const serviceImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
  "/images/footage/IMG_20190406_172726.webp",
  "/images/footage/IMG_20190506_163718.webp",
]

export function Services({ lang }: { lang: Language }) {
  const t = content[lang].services

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-4 font-sans uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] || Ship
            const imageUrl = serviceImages[i] || item.image || "/placeholder.jpg"
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="relative h-[500px] w-full overflow-hidden bg-secondary group cursor-pointer">
                  {/* Background Image */}
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-secondary/95 group-hover:from-primary/90 group-hover:via-primary/80 group-hover:to-secondary/95 transition-all duration-500" />
                  
                  {/* Hover Overlay - Behind content */}
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none" />
                  
                  {/* Content Container - Above overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-20">
                    {/* Icon and Title - Centered, move up on hover */}
                    <div className="text-center space-y-6 transform group-hover:-translate-y-10 transition-transform duration-500">
                      {/* Icon - No background */}
                      <div className="flex justify-center">
                        <Icon className="w-16 h-16 text-white group-hover:scale-110 group-hover:text-accent transition-all duration-300 drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-3xl font-bold text-white font-sans uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300 drop-shadow-lg">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Description - Appears on hover below title */}
                    <div className="text-center mt-8">
                      <p className="text-white text-base leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md transform translate-y-4 group-hover:translate-y-0">
                        {item.desc}
                      </p>
                    </div>
                    
                    {/* CTA - Appears on hover below description */}
                    <div className="flex items-center justify-center text-accent font-bold text-sm uppercase tracking-wider gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0">
                      <span>{lang === "es" ? "Ver más" : "Learn more"}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

