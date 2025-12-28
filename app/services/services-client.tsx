"use client"

import { useLang } from "@/components/lang-provider"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesStats } from "@/components/sections/services/services-stats"
import { ServicesCatalog } from "@/components/sections/services/services-catalog"
import { ServicesProcess } from "@/components/sections/services/services-process"
import { ServicesSuccess } from "@/components/sections/services/services-success"
import { ServicesCertifications } from "@/components/sections/services/services-certifications"
import { ServicesWhy } from "@/components/sections/services/services-why"
import { ServicesFaq } from "@/components/sections/services/services-faq"
import { ServicesCta } from "@/components/sections/services/services-cta"
import { type Language } from "@/components/sections/services/services-data"

export function ServicesPageClient() {
  const { lang } = useLang()
  const currentLang = (lang as Language) || "es"

  const sections = [
    { id: "services-hero", label: currentLang === "es" ? "Inicio" : currentLang === "zh" ? "首页" : "Hero", labelEn: "Hero" },
    { id: "services-stats", label: currentLang === "es" ? "Estadísticas" : currentLang === "zh" ? "统计" : "Stats", labelEn: "Stats" },
    { id: "services-catalog", label: currentLang === "es" ? "Servicios" : currentLang === "zh" ? "服务" : "Services", labelEn: "Services" },
    { id: "services-process", label: currentLang === "es" ? "Proceso" : currentLang === "zh" ? "流程" : "Process", labelEn: "Process" },
    { id: "services-success", label: currentLang === "es" ? "Casos de Éxito" : currentLang === "zh" ? "成功案例" : "Success", labelEn: "Success" },
    { id: "services-certifications", label: currentLang === "es" ? "Certificaciones" : currentLang === "zh" ? "认证" : "Certifications", labelEn: "Certifications" },
    { id: "services-why", label: currentLang === "es" ? "Por Qué" : currentLang === "zh" ? "为什么" : "Why Us", labelEn: "Why Us" },
    { id: "services-faq", label: "FAQ", labelEn: "FAQ" },
    { id: "services-cta", label: currentLang === "es" ? "Contacto" : currentLang === "zh" ? "联系" : "Contact", labelEn: "Contact" },
  ]

  return (
    <div className="flex flex-col gap-0 relative overflow-x-hidden">
      <SectionExplorer sections={sections} lang={currentLang as "es" | "en"} />
      <ServicesHero lang={currentLang} />
      <ServicesStats lang={currentLang} />
      <ServicesCatalog lang={currentLang} />
      <ServicesProcess lang={currentLang} />
      <ServicesSuccess lang={currentLang} />
      <ServicesCertifications lang={currentLang} />
      <ServicesWhy lang={currentLang} />
      <ServicesFaq lang={currentLang} />
      <ServicesCta lang={currentLang} />
    </div>
  )
}
