"use client"

import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import { ArrowRight, Users, Ship, FileCheck, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const iconMap = {
  Users,
  Ship,
  FileCheck,
  MapPin,
}

const iconKeys = ["Users", "Ship", "FileCheck", "MapPin"] as const

export function StatsBanner({ lang }: { lang: Language }) {
  const t = content[lang].statsBanner

  return (
    <section id="stats" className="relative w-full h-[75dvh] min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/stock/front-msc.jpg"
          alt="Marine Surveyors & Consultants"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay with Primary Color */}
        <div className="absolute inset-0 bg-primary/65" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 font-sans uppercase tracking-tight drop-shadow-lg px-2"
            >
              {t.headline}
            </motion.h2>

            {/* Decorative Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 md:w-32 h-1 bg-accent mx-auto mb-4 md:mb-5"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-lg lg:text-xl text-white/95 leading-relaxed mb-5 md:mb-6 font-light drop-shadow-md max-w-3xl mx-auto px-2"
            >
              {t.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold text-sm md:text-base px-5 md:px-6 py-4 md:py-5 rounded-lg transition-all duration-300 group"
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats Grid - Sin cards, solo contenido directo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-12 mt-8 md:mt-12 max-w-6xl mx-auto"
          >
            {t.stats.map((stat, idx) => {
              const Icon = iconMap[iconKeys[idx]]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="h-12 w-12 md:h-14 md:w-14 bg-accent/20 rounded-full flex items-center justify-center mb-3 md:mb-4 border border-accent/30">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1.5 md:mb-2 font-sans drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-semibold text-white/90 mb-1 uppercase tracking-wide drop-shadow-md px-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-white/70 leading-relaxed drop-shadow-sm max-w-[180px] md:max-w-[200px] px-1">
                    {stat.description}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
