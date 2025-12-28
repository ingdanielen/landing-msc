"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, FileCheck, Wrench, Globe } from "lucide-react"
import { type Language } from "@/lib/content"
import Image from "next/image"

const whyChooseUsItems = {
  es: [
    {
      icon: CheckCircle2,
      title: "Verificación Independiente",
      description: "Tercera parte objetiva y confiable para todas sus inspecciones marítimas.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Clock,
      title: "Respuesta Rápida 24/7",
      description: "Disponibilidad inmediata para inspecciones de emergencia en cualquier momento.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      icon: FileCheck,
      title: "Informes Imparciales",
      description: "Documentos técnicos aceptados por todas las partes interesadas y autoridades.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      icon: Wrench,
      title: "Herramientas Modernas",
      description: "Tecnología avanzada e inspecciones con drones para áreas de difícil acceso.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Globe,
      title: "Experiencia Regional",
      description: "Profundo conocimiento de la industria marítima y experiencia en la región.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
  ],
  en: [
    {
      icon: CheckCircle2,
      title: "Independent Verification",
      description: "Objective and reliable third-party for all your marine inspections.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Clock,
      title: "Rapid 24/7 Response",
      description: "Immediate availability for emergency inspections at any time.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      icon: FileCheck,
      title: "Impartial Reports",
      description: "Technical documents accepted by all stakeholders and authorities.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      icon: Wrench,
      title: "Modern Tools",
      description: "Advanced technology and drone inspections for hard-to-reach areas.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Globe,
      title: "Regional Experience",
      description: "Deep industry knowledge and regional maritime experience.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
  ],
  zh: [
    {
      icon: CheckCircle2,
      title: "独立验证",
      description: "为您所有的海事检验提供客观可靠的第三方服务。",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Clock,
      title: "24/7快速响应",
      description: "随时为紧急检验提供即时服务。",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      icon: FileCheck,
      title: "公正报告",
      description: "所有利益相关方和当局认可的技术文件。",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      icon: Wrench,
      title: "现代化工具",
      description: "先进技术和无人机检验，用于难以到达的区域。",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
      icon: Globe,
      title: "区域经验",
      description: "深厚的行业知识和区域海事经验。",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
  ],
}

export function WhyWorkWithUs({ lang }: { lang: Language }) {
  const items = whyChooseUsItems[lang]

  return (
    <section className="py-24 bg-linear-gradient(to bottom, var(--color-white), var(--color-slate-50))">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-hero uppercase tracking-tight">
            {lang === "es" ? "¿Por Qué Trabajar Con Nosotros?" : lang === "zh" ? "为什么选择我们？" : "Why Work With Us?"}
          </h2>
          <div className="w-32 h-1 bg-linear-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary/80 to-secondary/95 group-hover:from-primary/85 group-hover:via-primary/75 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="h-20 w-20 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-accent/30 group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-hero uppercase tracking-tight drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/95 text-lg leading-relaxed drop-shadow-md">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
