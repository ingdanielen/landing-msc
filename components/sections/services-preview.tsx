"use client"

import { type Language, content } from "@/lib/content"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Ship, Container, Briefcase, Anchor, Zap, Plus } from "lucide-react"

const icons = {
  Ship: Ship,
  Container: Container,
  Briefcase: Briefcase,
  Anchor: Anchor,
  Drone: Zap,
}

const serviceImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
]

export function ServicesPreview({ lang }: { lang: Language }) {
  const t = content[lang].services
  const services = t.items.slice(0, 3)

  return (
    <section id="services" className="bg-primary relative">
      {/* Header */}
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8"
          >
            <div className="max-w-2xl">
              <span className="text-accent font-bold text-sm uppercase tracking-[0.2em] mb-3 block">
                {lang === "es" ? "Servicios Especializados" : lang === "zh" ? "专业服务" : "Specialized Services"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-hero font-bold text-white tracking-tight leading-[1.1]">
                {t.title}
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="text-white/70 md:text-lg max-w-md mb-4 lg:mb-6">{t.subtitle}</p>
              <Link href="/services" className="hidden lg:inline-block">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold group">
                  {lang === "es" ? "Explorar Todos" : lang === "zh" ? "探索全部" : "Explore All"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="lg:hidden">
        {services.map((item, idx) => {
          const Icon = icons[item.icon as keyof typeof icons] || Ship
          const imageUrl = serviceImages[idx]
          const isLast = idx === services.length - 1

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href="/services" className="block relative overflow-hidden">
                {/* Image Container */}
                <div className="relative h-[280px] md:h-[350px]">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
                  
                  {/* Number */}
                  <span className="absolute top-4 right-4 text-7xl font-black text-white/10">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content Bar */}
                <div className="bg-primary px-5 py-6 flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Divider line */}
                {!isLast && (
                  <div className="h-px bg-white/10" />
                )}
              </Link>
            </motion.div>
          )
        })}

        {/* Mobile CTA */}
        <div className="bg-primary px-5 py-8">
          <Link href="/services" className="block">
            <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 text-base group">
              {lang === "es" ? "Ver Todos los Servicios" : lang === "zh" ? "查看所有服务" : "View All Services"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop: 3 Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-3">
        {services.map((item, idx) => {
          const Icon = icons[item.icon as keyof typeof icons] || Ship
          const imageUrl = serviceImages[idx]

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <Link href="/services" className="group block relative h-[70vh] min-h-[500px] overflow-hidden">
                {/* Image */}
                <Image
                  src={imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay - Darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90 group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/40 transition-all duration-500" />
                
                {/* Number Watermark */}
                <span className="absolute top-6 right-6 text-[10rem] font-black text-white/5 leading-none select-none group-hover:text-accent/10 transition-colors duration-500">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="absolute inset-0 p-8 xl:p-10 flex flex-col justify-end">
                  {/* Icon Badge */}
                  <div className="absolute top-8 left-8 xl:top-10 xl:left-10">
                    <div className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Category Label - Appears on hover */}
                  <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest">
                      {lang === "es" ? "Servicio" : lang === "zh" ? "服务" : "Service"} {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl xl:text-4xl font-hero font-bold text-white mb-4 tracking-tight leading-tight transform group-hover:-translate-y-2 transition-transform duration-500">
                    {item.title}
                  </h3>
                  
                  {/* Description - Larger and more visible on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-[200px] transition-all duration-500 ease-out">
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-6 group-hover:translate-y-0">
                    <div className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-lg transition-colors">
                      <span>{lang === "es" ? "Explorar Servicio" : lang === "zh" ? "探索服务" : "Explore Service"}</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Border Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
