"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import { ArrowRight, FileCheck, Users, RefreshCw, ThumbsUp, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Icons mapped to the REAL metrics from more-company-info.txt
const statsIcons = [FileCheck, Users, RefreshCw, ThumbsUp]

export function StatsBanner({ lang }: { lang: Language }) {
  const t = content[lang].statsBanner
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="stats" className="relative min-h-[90vh] bg-primary overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 grid lg:grid-cols-2">
        <div className="hidden lg:block bg-primary" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Image
            src="/images/stock/front-msc.jpg"
            alt="Marine Surveyors & Consultants"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-linear-to-br from-primary/60 to-secondary/70" />
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-primary" />
        </motion.div>
      </div>

      {/* Diagonal separator */}
      <div className="absolute inset-y-0 left-1/2 w-32 hidden lg:block z-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <polygon points="0,0 100,0 0,100" className="fill-primary" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
            {/* Left Side - Main Content */}
            <div className="lg:pr-20 space-y-8">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent font-mono text-sm tracking-widest uppercase">
                  Marine Surveyors & Consultants
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-hero uppercase tracking-tight leading-tight"
              >
                {t.headline}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/70 leading-relaxed max-w-xl border-l-2 border-accent pl-4"
              >
                {t.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 py-6 rounded-xl transition-all duration-300 group"
                  >
                    {t.cta}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Progress Dots */}
              <div className="flex items-center gap-3 pt-8" role="tablist" aria-label="Statistics navigation">
                {t.stats.map((stat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="group relative"
                    aria-label={`Ver estadística ${idx + 1}: ${stat.label}`}
                    aria-selected={activeIndex === idx}
                    role="tab"
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeIndex === idx
                          ? "bg-accent scale-125"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      whileHover={{ scale: 1.3 }}
                    />
                  </button>
                ))}
                <span className="ml-4 text-white/60 font-mono text-sm">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(t.stats.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Right Side - Stats Navigation */}
            <div className="space-y-3 lg:pl-8">
              {t.stats.map((stat, idx) => {
                const Icon = statsIcons[idx]
                const isActive = activeIndex === idx
                return (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className={`w-full text-left p-5 rounded-xl transition-all duration-300 flex items-center gap-5 ${
                      isActive
                        ? "bg-white/15 backdrop-blur-sm border-l-4 border-accent"
                        : "hover:bg-white/5 border-l-4 border-transparent"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        isActive ? "bg-accent" : "bg-white/10"
                      }`}
                    >
                      <Icon className={`h-7 w-7 ${isActive ? "text-white" : "text-white/60"}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-mono text-3xl font-bold ${isActive ? "text-white" : "text-white/60"}`}>
                        {stat.value}
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-wide ${isActive ? "text-white/90" : "text-white/50"}`}>
                        {stat.label}
                      </span>
                      <p className={`text-xs mt-1 ${isActive ? "text-white/60" : "text-white/30"}`}>
                        {stat.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 transition-all ${
                        isActive ? "text-accent translate-x-1" : "text-white/20"
                      }`}
                    />
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Arrows */}
        <div className="absolute bottom-8 left-0 right-0 px-4 md:px-6 lg:px-12">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + t.stats.length) % t.stats.length)}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              aria-label={`Estadística anterior: ${t.stats[(activeIndex - 1 + t.stats.length) % t.stats.length].label}`}
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <ChevronRight className="h-5 w-5 rotate-180" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {t.stats[(activeIndex - 1 + t.stats.length) % t.stats.length].label}
              </span>
            </button>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % t.stats.length)}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              aria-label={`Siguiente estadística: ${t.stats[(activeIndex + 1) % t.stats.length].label}`}
            >
              <span className="text-sm font-medium hidden md:block">
                {t.stats[(activeIndex + 1) % t.stats.length].label}
              </span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
