"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Shield, Target, Globe, Award, Calendar, Users, MapPin, FileSearch } from "lucide-react"
import Image from "next/image"

// Data based EXACTLY on company-info.txt "Quiénes Somos" and "Compromiso" sections
const introContent = {
  es: {
    title: "Quiénes Somos",
    subtitle: "Sobre la empresa",
    description: [
      "Marine Surveyors and Consultants es una organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima. Con años de experiencia en la industria, garantizamos informes precisos, cumplimiento normativo y seguridad operativa a lo largo de toda la cadena logística marítima.",
      "Con un equipo de inspectores altamente calificados, arquitectos navales y consultores marítimos, proporcionamos evaluaciones objetivas, precisas y conformes a estándares internacionales para buques, la carga, los puertos y las estructuras marítimas.",
    ],
    commitment: {
      title: "Nuestro Compromiso",
      text: "Apoyar la navegación segura, proteger la integridad de la carga, asegurar el cumplimiento normativo y salvaguardar el medio ambiente marino, mediante la entrega de evaluaciones transparentes, imparciales y técnicamente sólidas en las que los clientes pueden confiar para la toma de decisiones críticas.",
    },
    dataPoints: [
      {
        icon: Calendar,
        label: "Año de Fundación",
        value: "2019",
        highlight: true,
      },
      {
        icon: Users,
        label: "Experiencia del Equipo",
        value: "+25 años",
        sublabel: "combinados",
      },
      {
        icon: MapPin,
        label: "Cobertura Operativa",
        value: "Puertos, terminales",
        sublabel: "y fondeaderos",
      },
      {
        icon: FileSearch,
        label: "Enfoque",
        value: "Preventivo, técnico",
        sublabel: "y documental",
      },
    ],
    clientTypes: {
      title: "Tipo de Clientes",
      list: [
        "Armadores",
        "Operadores marítimos",
        "Aseguradoras",
        "Empresas de logística y comercio internacional",
      ],
    },
  },
  en: {
    title: "Who We Are",
    subtitle: "About the company",
    description: [
      "Marine Surveyors and Consultants is an independent organization specializing in comprehensive vessel, cargo, and maritime infrastructure inspections. With years of industry experience, we ensure accurate reports, regulatory compliance, and operational safety throughout the maritime logistics chain.",
      "With a team of highly qualified surveyors, naval architects, and marine consultants, we provide objective, accurate assessments compliant with international standards for vessels, cargo, ports, and maritime structures.",
    ],
    commitment: {
      title: "Our Commitment",
      text: "To support safe navigation, protect cargo integrity, ensure regulatory compliance, and safeguard the marine environment by delivering transparent, impartial, and technically sound assessments that clients can rely on for critical decision-making.",
    },
    dataPoints: [
      {
        icon: Calendar,
        label: "Year of Incorporation",
        value: "2019",
        highlight: true,
      },
      {
        icon: Users,
        label: "Team Experience",
        value: "+25 years",
        sublabel: "combined",
      },
      {
        icon: MapPin,
        label: "Operational Coverage",
        value: "Ports, terminals",
        sublabel: "and anchorages",
      },
      {
        icon: FileSearch,
        label: "Approach",
        value: "Preventive, technical",
        sublabel: "and documentary",
      },
    ],
    clientTypes: {
      title: "Client Profile",
      list: [
        "Shipowners",
        "Maritime operators",
        "Insurance companies",
        "Logistics and international trade companies",
      ],
    },
  },
  zh: {
    title: "关于我们",
    subtitle: "公司简介",
    description: [
      "Marine Surveyors and Consultants 是一家专业从事船舶、货物和海事基础设施综合检验的独立组织。凭借多年的行业经验，我们确保在整个海事物流链中提供准确的报告、法规合规性和运营安全。",
      "我们拥有一支由高素质检验员、船舶建筑师和海事顾问组成的团队，为船舶、货物、港口和海事结构提供符合国际标准的客观、准确评估。",
    ],
    commitment: {
      title: "我们的承诺",
      text: "通过提供透明、公正和技术可靠的评估，支持安全航行、保护货物完整性、确保法规合规并保护海洋环境，让客户能够依赖这些评估做出关键决策。",
    },
    dataPoints: [
      {
        icon: Calendar,
        label: "成立年份",
        value: "2019",
        highlight: true,
      },
      {
        icon: Users,
        label: "团队经验",
        value: "+25年",
        sublabel: "综合经验",
      },
      {
        icon: MapPin,
        label: "运营覆盖",
        value: "港口、码头",
        sublabel: "和锚地",
      },
      {
        icon: FileSearch,
        label: "方法",
        value: "预防性、技术性",
        sublabel: "和文件性",
      },
    ],
    clientTypes: {
      title: "客户类型",
      list: [
        "船东",
        "海事运营商",
        "保险公司",
        "物流和国际贸易公司",
      ],
    },
  },
}

export function CompanyIntro({ lang }: { lang: Language }) {
  const t = introContent[lang]

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/footage/IMG_20190405_150331.webp"
                alt="MSC Team"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            
            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6"
            >
              <div className="bg-primary text-white p-4 md:p-6 rounded-lg shadow-xl">
                <div className="text-3xl md:text-4xl font-black text-accent leading-none">+25</div>
                <div className="text-xs md:text-sm text-white/70 mt-1 leading-tight">
                  {lang === "es" ? "Años de experiencia" : "Years of experience"}
                  <br />
                  <span className="text-white/50">{lang === "es" ? "combinada" : "combined"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 md:space-y-6"
          >
            <div>
              <span className="text-accent text-sm tracking-widest uppercase font-medium">
                {t.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-hero font-bold text-primary mt-2 tracking-tight">
                {t.title}
              </h2>
            </div>

            {t.description.map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-sm md:text-base">
                {para}
              </p>
            ))}

            {/* Commitment Box - Redesigned */}
            <div className="relative bg-slate-900 text-white p-5 md:p-6 rounded-lg overflow-hidden">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
              <h3 className="font-bold text-white mb-2 text-sm md:text-base">{t.commitment.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{t.commitment.text}</p>
            </div>
          </motion.div>
        </div>

        {/* Data Points - Redesigned as horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="card-ocean-solid rounded-lg p-4 md:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {t.dataPoints.map((point, idx) => {
                const Icon = point.icon
                return (
                  <div
                    key={idx}
                    className="relative group"
                  >
                    <div className={`
                      flex flex-col h-full p-4 rounded-lg transition-all duration-300
                      ${point.highlight 
                        ? "bg-accent text-white" 
                        : "card-ocean"
                      }
                    `}>
                      {/* Icon */}
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center mb-3
                        ${point.highlight ? "bg-accent" : "bg-accent/10"}
                      `}>
                        <Icon className={`h-5 w-5 ${point.highlight ? "text-white" : "text-accent"}`} />
                      </div>
                      
                      {/* Label */}
                      <div className={`text-xs font-medium mb-1 ${point.highlight ? "text-white/60" : "text-slate-500"}`}>
                        {point.label}
                      </div>
                      
                      {/* Value */}
                      <div className={`text-lg md:text-xl font-bold leading-tight ${point.highlight ? "text-white" : "text-primary"}`}>
                        {point.value}
                      </div>
                      
                      {/* Sublabel if exists */}
                      {point.sublabel && (
                        <div className={`text-sm ${point.highlight ? "text-white/70" : "text-slate-500"}`}>
                          {point.sublabel}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Client Types - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 md:mt-8"
        >
          <div className="bg-primary rounded-lg p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <h3 className="font-bold text-white text-sm md:text-base whitespace-nowrap">
                {t.clientTypes.title}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {t.clientTypes.list.map((client, idx) => (
                  <span
                    key={idx}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs md:text-sm transition-colors"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
