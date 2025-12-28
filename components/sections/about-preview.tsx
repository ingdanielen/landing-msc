"use client"

import { type Language, content } from "@/lib/content"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function AboutPreview({ lang }: { lang: Language }) {
  const t = content[lang]

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
              {t.about.title}
            </h2>
            <div className="w-24 h-1 bg-accent mb-6"></div>
            <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
              {t.about.description}
            </p>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              {lang === "es"
                ? "Con un equipo de inspectores altamente calificados, arquitectos navales y consultores marítimos, proporcionamos evaluaciones objetivas, precisas y conformes a estándares internacionales para buques, la carga, los puertos y las estructuras marítimos."
                : lang === "zh"
                ? "我们拥有一支高素质的检验师、造船工程师和海事顾问团队，为船舶、货物、港口和海事结构提供客观、准确且符合国际标准的评估服务。"
                : "With a team of highly qualified inspectors, naval architects and maritime consultants, we provide objective, accurate and internationally compliant assessments for vessels, cargo, ports and maritime structures."}
            </p>
            <Link href="/about">
              <Button className="bg-accent hover:bg-accent/90 text-white font-semibold group">
                {lang === "es" ? "Conoce más" : lang === "zh" ? "了解更多" : "Learn More"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Image - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/stock/sea-msc.jpg"
              alt="Marine Surveyors & Consultants"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
