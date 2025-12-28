"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { GraduationCap, Ship, Briefcase, Scale, Anchor } from "lucide-react"
import Image from "next/image"

const roleIcons = {
  es: {
    "Arquitectura Naval": Ship,
    "Ingeniería Marítima": Ship,
    "Operaciones Portuarias": Anchor,
    "Ciencias Náuticas": GraduationCap,
    "Derecho Marítimo y Cumplimiento": Scale,
  },
  en: {
    "Naval Architecture": Ship,
    "Maritime Engineering": Ship,
    "Port Operations": Anchor,
    "Nautical Sciences": GraduationCap,
    "Maritime Law & Compliance": Scale,
  },
}

const teamRoles = {
  es: [
    {
      title: "Arquitectura Naval",
      description:
        "Profesionales especializados en diseño, construcción y evaluación estructural de buques y artefactos navales.",
      icon: Ship,
    },
    {
      title: "Ingeniería Marítima",
      description:
        "Expertos en sistemas de propulsión, maquinaria naval y evaluación técnica de equipos marítimos.",
      icon: Ship,
    },
    {
      title: "Operaciones Portuarias",
      description:
        "Especialistas en gestión portuaria, logística marítima y operaciones de terminales y puertos.",
      icon: Anchor,
    },
    {
      title: "Ciencias Náuticas",
      description:
        "Capitanes y oficiales con amplia experiencia en navegación, seguridad marítima y operaciones de buques.",
      icon: GraduationCap,
    },
    {
      title: "Derecho Marítimo y Cumplimiento",
      description:
        "Abogados y consultores especializados en normativa marítima internacional, cumplimiento regulatorio y asuntos legales.",
      icon: Scale,
    },
  ],
  en: [
    {
      title: "Naval Architecture",
      description:
        "Professionals specialized in design, construction and structural evaluation of vessels and naval artifacts.",
      icon: Ship,
    },
    {
      title: "Maritime Engineering",
      description:
        "Experts in propulsion systems, naval machinery and technical evaluation of maritime equipment.",
      icon: Ship,
    },
    {
      title: "Port Operations",
      description:
        "Specialists in port management, maritime logistics and terminal and port operations.",
      icon: Anchor,
    },
    {
      title: "Nautical Sciences",
      description:
        "Captains and officers with extensive experience in navigation, maritime safety and vessel operations.",
      icon: GraduationCap,
    },
    {
      title: "Maritime Law & Compliance",
      description:
        "Lawyers and consultants specialized in international maritime regulations, regulatory compliance and legal matters.",
      icon: Scale,
    },
  ],
}

export function TeamPageClient() {
  const { lang } = useLang()
  const t = content[lang].team

  const sections = [
    { id: "team-hero", label: "Inicio", labelEn: "Hero" },
    { id: "team-intro", label: "Introducción", labelEn: "Introduction" },
    { id: "team-roles", label: "Especialidades", labelEn: "Specialties" },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      
      {/* Hero Section */}
      <section id="team-hero" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-gradient(to bottom, var(--color-primary-80), var(--color-primary-60), var(--color-primary-40))" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-hero text-3xl sm:text-4xl md:text-5xl text-white mb-3 tracking-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-base md:text-lg text-accent italic"
          >
            {t.subtitle}
          </motion.p>
        </div>
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden z-5">
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.3)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1800,50 2160,35 C2520,20 2880,50 2880,35 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.5)" d="M0,45 C360,35 720,55 1080,45 C1440,35 1800,55 2160,45 C2520,35 2880,55 2880,45 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.8)" d="M0,55 C360,48 720,62 1080,55 C1440,48 1800,62 2160,55 C2520,48 2880,62 2880,55 L2880,70 L0,70 Z"/>
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="team-intro" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                {t.description}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                {lang === "es"
                  ? "Ellos combinan una amplia experiencia en campo con conocimiento analítico para ofrecer evaluaciones de alto valor, imparciales y confiables."
                  : "They combine extensive field experience with analytical knowledge to deliver high-value, impartial and reliable assessments."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Roles Section */}
      <section id="team-roles" className="py-24 section-ocean-alt">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
              {lang === "es" ? "Áreas de Especialización" : "Areas of Specialization"}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamRoles[lang as keyof typeof teamRoles].map((role: { title: string; description: string; icon: React.ElementType }, idx: number) => {
              const Icon = role.icon
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-ocean p-8 rounded-xl group"
                >
                  <div className="h-20 w-20 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-hero uppercase tracking-tight">
                    {role.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-accent mb-4"></div>
                  <p className="text-slate-600 leading-relaxed text-sm">{role.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
