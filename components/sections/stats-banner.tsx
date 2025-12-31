"use client"

import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import { ArrowRight, FileCheck, Users, RefreshCw, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroText } from "@/components/ui/hero-text"

// Icons mapped to the REAL metrics
const statsIcons = [FileCheck, Users, RefreshCw, ThumbsUp]

export function StatsBanner({ lang }: { lang: Language }) {
  const t = content[lang].statsBanner

  return (
    <section id="stats" className="relative py-20 md:py-28 bg-[#00111f] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Image with overlay - More visible */}
        <Image
          src="/images/footage/IMG_20190406_095637.webp"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          quality={40}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00111f]/80 via-[#00111f]/70 to-[#00111f]/90" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-accent text-sm font-bold tracking-[0.2em] uppercase">
              <span className="w-8 h-px bg-accent" />
              Marine Surveyors & Consultants
              <span className="w-8 h-px bg-accent" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <HeroText 
              as="h2" 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6"
            >
              {t.headline}
            </HeroText>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed"
          >
            {t.description}
          </motion.p>
        </div>

        {/* Stats Cards - Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {t.stats.map((stat, idx) => {
            const Icon = statsIcons[idx]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 md:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/30">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                  </div>

                  {/* Value - Sin font-hero porque son números */}
                  <div className="mb-2">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-sm md:text-base font-semibold text-white mb-2 uppercase tracking-wide">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                    {stat.description}
                  </p>

                  {/* Bottom corner accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link href="/about">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 py-6 transition-all duration-300 group"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
