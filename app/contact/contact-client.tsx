"use client"

import { useLang } from "@/components/lang-provider"
import { SectionExplorer } from "@/components/ui/section-explorer"
import {
  ContactHero,
  ContactInfo,
  ContactFormSection,
  LocationMap,
} from "@/components/sections/contact"

export function ContactPageClient() {
  const { lang } = useLang()

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "info", label: "Información", labelEn: "Info" },
    { id: "form", label: "Formulario", labelEn: "Form" },
    { id: "location", label: "Ubicación", labelEn: "Location" },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      
      <div id="hero">
        <ContactHero lang={lang} />
      </div>

      <div id="info">
        <ContactInfo lang={lang} />
      </div>

      <div id="form">
        <ContactFormSection lang={lang} />
      </div>

      <div id="location">
        <LocationMap lang={lang} />
      </div>
    </div>
  )
}
