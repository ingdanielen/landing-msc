"use client"

import { useLang } from "@/components/lang-provider"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesIntro } from "@/components/sections/services/services-intro"
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
    { id: "services-intro", label: currentLang === "es" ? "Introducción" : currentLang === "zh" ? "介绍" : "Intro", labelEn: "Intro" },
    { id: "services-catalog", label: currentLang === "es" ? "Servicios" : currentLang === "zh" ? "服务" : "Services", labelEn: "Services" },
    { id: "services-stats", label: currentLang === "es" ? "Resultados" : currentLang === "zh" ? "结果" : "Results", labelEn: "Results" },
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
      
      {/* Hero - Impactante visual inicial */}
      <section id="services-hero">
        <ServicesHero lang={currentLang} />
      </section>
      
      {/* Intro - Copy de marketing */}
      <section id="services-intro">
        <ServicesIntro lang={currentLang} />
      </section>
      
      {/* Catalog - Our Services (ahora antes de stats) */}
      <section id="services-catalog">
        <ServicesCatalog lang={currentLang} />
      </section>
      
      {/* Stats - Backed by Results */}
      <section id="services-stats">
        <ServicesStats lang={currentLang} />
      </section>
      
      {/* Process */}
      <section id="services-process">
        <ServicesProcess lang={currentLang} />
      </section>
      
      {/* Success Stories */}
      <section id="services-success">
        <ServicesSuccess lang={currentLang} />
      </section>
      
      {/* Certifications */}
      <section id="services-certifications">
        <ServicesCertifications lang={currentLang} />
      </section>
      
      {/* Why Choose Us */}
      <section id="services-why">
        <ServicesWhy lang={currentLang} />
      </section>
      
      {/* FAQ */}
      <section id="services-faq">
        <ServicesFaq lang={currentLang} />
      </section>
      
      {/* CTA */}
      <section id="services-cta">
        <ServicesCta lang={currentLang} />
      </section>
    </div>
  )
}
