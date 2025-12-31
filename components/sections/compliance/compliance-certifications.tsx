"use client"

import { motion } from "framer-motion"
import { 
  Award, 
  Shield, 
  CheckCircle2, 
  Anchor,
  Building,
  FileCheck,
  Globe2,
  Ship,
  Scale,
  Leaf
} from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"

const certificationsContent = {
  es: {
    badge: "CERTIFICACIONES",
    title: "Reconocimientos y",
    titleHighlight: "Acreditaciones",
    subtitle: "Operamos bajo los más altos estándares de calidad reconocidos internacionalmente",
    categories: [
      {
        name: "Sistemas de Gestión",
        certifications: [
          { name: "ISO 9001:2015", icon: Shield, status: "Certificado" },
        ],
      },
      {
        name: "Convenios Marítimos Internacionales",
        certifications: [
          { name: "SOLAS", icon: Ship, status: "Cumplimiento" },
          { name: "MARPOL", icon: Leaf, status: "Cumplimiento" },
          { name: "MLC 2006", icon: Scale, status: "Cumplimiento" },
          { name: "ISM Code", icon: FileCheck, status: "Cumplimiento" },
          { name: "ISPS Code", icon: Shield, status: "Cumplimiento" },
        ],
      },
      {
        name: "Autoridades Marítimas",
        certifications: [
          { name: "Autoridad Marítima de Panamá (AMP)", icon: Building, status: "Registrado" },
        ],
      },
    ],
    principles: [
      {
        icon: CheckCircle2,
        title: "Integridad",
        description: "Actuamos con honestidad y transparencia en cada evaluación",
      },
      {
        icon: Scale,
        title: "Imparcialidad",
        description: "Informes objetivos sin conflictos de interés",
      },
      {
        icon: Award,
        title: "Excelencia",
        description: "Compromiso con los más altos estándares técnicos",
      },
      {
        icon: Shield,
        title: "Confidencialidad",
        description: "Protección absoluta de la información del cliente",
      },
    ],
    cta: {
      title: "¿Necesita verificar nuestras certificaciones?",
      button: "Solicitar documentación",
    },
  },
  en: {
    badge: "CERTIFICATIONS",
    title: "Recognitions &",
    titleHighlight: "Accreditations",
    subtitle: "We operate under the highest internationally recognized quality standards",
    categories: [
      {
        name: "Management Systems",
        certifications: [
          { name: "ISO 9001:2015", icon: Shield, status: "Certified" },
        ],
      },
      {
        name: "International Maritime Conventions",
        certifications: [
          { name: "SOLAS", icon: Ship, status: "Compliant" },
          { name: "MARPOL", icon: Leaf, status: "Compliant" },
          { name: "MLC 2006", icon: Scale, status: "Compliant" },
          { name: "ISM Code", icon: FileCheck, status: "Compliant" },
          { name: "ISPS Code", icon: Shield, status: "Compliant" },
        ],
      },
      {
        name: "Maritime Authorities",
        certifications: [
          { name: "Panama Maritime Authority (AMP)", icon: Building, status: "Registered" },
        ],
      },
    ],
    principles: [
      {
        icon: CheckCircle2,
        title: "Integrity",
        description: "We act with honesty and transparency in every assessment",
      },
      {
        icon: Scale,
        title: "Impartiality",
        description: "Objective reports without conflicts of interest",
      },
      {
        icon: Award,
        title: "Excellence",
        description: "Commitment to the highest technical standards",
      },
      {
        icon: Shield,
        title: "Confidentiality",
        description: "Absolute protection of client information",
      },
    ],
    cta: {
      title: "Need to verify our certifications?",
      button: "Request documentation",
    },
  },
  zh: {
    badge: "认证资质",
    title: "认可与",
    titleHighlight: "资质认证",
    subtitle: "我们在国际公认的最高质量标准下运营",
    categories: [
      {
        name: "管理体系",
        certifications: [
          { name: "ISO 9001:2015", icon: Shield, status: "已认证" },
        ],
      },
      {
        name: "国际海事公约",
        certifications: [
          { name: "SOLAS", icon: Ship, status: "合规" },
          { name: "MARPOL", icon: Leaf, status: "合规" },
          { name: "MLC 2006", icon: Scale, status: "合规" },
          { name: "ISM规则", icon: FileCheck, status: "合规" },
          { name: "ISPS规则", icon: Shield, status: "合规" },
        ],
      },
      {
        name: "海事主管机关",
        certifications: [
          { name: "巴拿马海事局(AMP)", icon: Building, status: "已注册" },
        ],
      },
    ],
    principles: [
      {
        icon: CheckCircle2,
        title: "诚信",
        description: "在每次评估中以诚实和透明行事",
      },
      {
        icon: Scale,
        title: "公正",
        description: "无利益冲突的客观报告",
      },
      {
        icon: Award,
        title: "卓越",
        description: "致力于最高技术标准",
      },
      {
        icon: Shield,
        title: "保密",
        description: "绝对保护客户信息",
      },
    ],
    cta: {
      title: "需要验证我们的认证资质？",
      button: "请求文档",
    },
  },
}

export function ComplianceCertifications({ lang }: { lang: Language }) {
  const t = certificationsContent[lang as keyof typeof certificationsContent] || certificationsContent.en

  return (
    <section className="py-24 md:py-32 bg-[#00111f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wider">
              {t.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <HeroText 
              as="h2" 
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            >
              {`${t.title} ${t.titleHighlight}`}
            </HeroText>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {t.categories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                {category.name}
              </h3>
              
              <div className="space-y-4">
                {category.certifications.map((cert, idx) => {
                  const Icon = cert.icon
                  return (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-2.5 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{cert.name}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                        {cert.status}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.principles.map((principle, idx) => {
            const Icon = principle.icon
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-4 bg-accent/10 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {principle.title}
                </h4>
                <p className="text-sm text-white/50">
                  {principle.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-4">{t.cta.title}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
          >
            {t.cta.button}
            <Globe2 className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

