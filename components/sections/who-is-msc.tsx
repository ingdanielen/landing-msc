"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Users, Shield } from "lucide-react"
import Image from "next/image"

const whoIsMscContent = {
  es: {
    title: "¿Quién Es MSC?",
    description:
      "Marine Surveyors and Consultants es una organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima. Con años de experiencia en la industria, garantizamos informes precisos, cumplimiento normativo y seguridad operativa a lo largo de toda la cadena logística marítima.",
    team:
      "Con un equipo de inspectores altamente calificados, arquitectos navales y consultores marítimos, proporcionamos evaluaciones objetivas, precisas y conformes a estándares internacionales para buques, la carga, los puertos y las estructuras marítimos.",
    commitment:
      "Apoyar la navegación segura, proteger la integridad de la carga, asegurar el cumplimiento normativo y salvaguardar el medio ambiente marino, mediante la entrega de evaluaciones transparentes, imparciales y técnicamente sólidas en las que los clientes pueden confiar para la toma de decisiones críticas.",
  },
  en: {
    title: "Who Is MSC?",
    description:
      "Marine Surveyors and Consultants is an independent organization specializing in comprehensive vessel, cargo, and maritime infrastructure inspections. With years of industry experience, we guarantee precise reports, regulatory compliance, and operational safety throughout the entire maritime logistics chain.",
    team:
      "With a team of highly qualified inspectors, naval architects, and maritime consultants, we provide objective, accurate, and internationally compliant assessments for vessels, cargo, ports, and maritime structures.",
    commitment:
      "Support safe navigation, protect cargo integrity, ensure regulatory compliance, and safeguard the marine environment, by delivering transparent, impartial, and technically sound assessments that clients can trust for critical decision-making.",
  },
}

export function WhoIsMsc({ lang }: { lang: Language }) {
  const t = whoIsMscContent[lang]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-sans uppercase tracking-tight">
            {t.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* First Card with Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
                alt="Marine Surveyors"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-secondary/90" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center p-12 md:p-16">
              <div className="h-16 w-16 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-accent/30">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-white text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-lg font-light">
                {t.description}
              </p>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-md font-light">
                {t.team}
              </p>
            </div>
          </motion.div>

          {/* Second Card with Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
                alt="Our Commitment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/85 via-secondary/75 to-primary/90" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center p-12 md:p-16">
              <div className="h-16 w-16 bg-accent/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-accent/30">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans uppercase tracking-tight drop-shadow-lg">
                {lang === "es" ? "Nuestro Compromiso" : "Our Commitment"}
              </h3>
              <p className="text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md font-light">
                {t.commitment}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
