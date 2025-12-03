"use client"

import { motion } from "framer-motion"
import { Ship, Container, Briefcase, Anchor, Zap, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const icons = {
  Ship: Ship,
  Container: Container,
  Briefcase: Briefcase,
  Anchor: Anchor,
  Drone: Zap,
}

interface ServiceDetailCardProps {
  title: string
  description: string
  icon: string
  image: string
  features: string[]
  idx: number
  lang: "es" | "en"
}

export function ServiceDetailCard({ title, description, icon, image, features, idx, lang }: ServiceDetailCardProps) {
  const Icon = icons[icon as keyof typeof icons] || Ship

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
    >
      {/* Image Header */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        
        {/* Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
            <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-4 font-sans uppercase tracking-tight">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
        
        {/* Features List */}
        {features.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              {lang === "es" ? "Servicios Incluidos:" : "Services Included:"}
            </h4>
            <ul className="space-y-2">
              {features.map((feature, featureIdx) => (
                <li key={featureIdx} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <Link href="/contact">
            <button className="text-accent hover:text-primary font-semibold text-sm uppercase tracking-wide flex items-center gap-2 group/btn">
              {lang === "es" ? "Solicitar cotización" : "Request Quote"}
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
