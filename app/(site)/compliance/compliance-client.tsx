"use client"

import { useLang } from "@/components/lang-provider"
import { SectionExplorer } from "@/components/ui/section-explorer"
import {
  ComplianceHero,
  ComplianceMetrics,
  ComplianceStandards,
  ComplianceProcess,
  ComplianceCertifications,
} from "@/components/sections/compliance"

export function CompliancePageClient() {
  const { lang } = useLang()

  const getSectionLabel = (esLabel: string, enLabel: string, zhLabel: string) => {
    if (lang === "zh") return zhLabel
    if (lang === "en") return enLabel
    return esLabel
  }

  const sections = [
    { 
      id: "compliance-hero", 
      label: getSectionLabel("Inicio", "Hero", "首页"), 
      labelEn: "Hero" 
    },
    { 
      id: "compliance-metrics", 
      label: getSectionLabel("Métricas", "Metrics", "指标"), 
      labelEn: "Metrics" 
    },
    { 
      id: "compliance-standards", 
      label: getSectionLabel("Estándares", "Standards", "标准"), 
      labelEn: "Standards" 
    },
    { 
      id: "compliance-process", 
      label: getSectionLabel("Control de Calidad", "Quality Control", "质量控制"), 
      labelEn: "Quality Control" 
    },
    { 
      id: "compliance-certifications", 
      label: getSectionLabel("Certificaciones", "Certifications", "认证"), 
      labelEn: "Certifications" 
    },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang as "es" | "en"} />
      
      {/* Hero Section - Full viewport height */}
      <section id="compliance-hero">
        <ComplianceHero lang={lang} />
      </section>

      {/* Metrics Section - Shows company statistics */}
      <section id="compliance-metrics">
        <ComplianceMetrics lang={lang} />
      </section>

      {/* Standards Section - Compliance frameworks */}
      <section id="compliance-standards">
        <ComplianceStandards lang={lang} />
      </section>

      {/* Quality Control Process */}
      <section id="compliance-process">
        <ComplianceProcess lang={lang} />
      </section>

      {/* Certifications and Accreditations */}
      <section id="compliance-certifications">
        <ComplianceCertifications lang={lang} />
      </section>
    </div>
  )
}
