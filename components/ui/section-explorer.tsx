"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { type Language } from "@/lib/content"

interface Section {
  id: string
  label: string
  labelEn: string
  labelZh?: string
}

interface SectionExplorerProps {
  sections: Section[]
  lang: Language
}

export function SectionExplorer({ sections, lang }: SectionExplorerProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-2 transition-all"
            aria-label={lang === "es" ? section.label : lang === "zh" ? (section.labelZh || section.labelEn) : section.labelEn}
          >
            {/* Compact Box with Label and Dot - Only when active */}
            {isActive ? (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 rounded-sm px-2.5 py-1.5 shadow-md border border-slate-200 flex items-center gap-2"
              >
                {/* Section Label */}
                <span className="text-xs font-medium text-primary whitespace-nowrap">
                  {lang === "es" ? section.label : lang === "zh" ? (section.labelZh || section.labelEn) : section.labelEn}
                </span>
                {/* Dot Indicator - Inside box when active */}
                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              </motion.div>
            ) : (
              /* Dot Indicator - Only when inactive */
              <div className="relative shrink-0">
                <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-all duration-300" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
