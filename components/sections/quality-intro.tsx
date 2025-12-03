"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import Image from "next/image"

const qualityIntroData = {
  es: {
    title: "Nuestros Estándares",
    description:
      "Todas nuestras operaciones se encuentran alineadas con ISO 9001:2015, Convenios de la IMO (SOLAS, MARPOL, MLC, etc.), Requisitos de Estado de Bandera, Reglas de las Sociedades de Clasificación, Directrices de aseguradoras P&I y CASCO & MAQUINARIA, y mejores prácticas de la industria para inspección y elaboración de informes.",
  },
  en: {
    title: "Our Standards",
    description:
      "All our operations are aligned with ISO 9001:2015, IMO Conventions (SOLAS, MARPOL, MLC, etc.), Flag State Requirements, Classification Society Rules, P&I and HULL & MACHINERY Insurer Guidelines, and industry best practices for inspection and reporting.",
  },
}

export function QualityIntro({ lang }: { lang: Language }) {
  const data = qualityIntroData[lang]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-sans uppercase tracking-tight">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-accent mb-6"></div>
            <p className="text-lg text-slate-700 leading-relaxed">{data.description}</p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/footage/IMG_20190406_095637.webp"
              alt="Quality Standards"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

