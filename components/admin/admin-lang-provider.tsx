"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { AdminLang, adminTranslations, AdminTranslations } from "@/lib/admin/i18n"

interface AdminLangContextType {
  lang: AdminLang
  setLang: (lang: AdminLang) => void
  t: AdminTranslations
}

const AdminLangContext = createContext<AdminLangContextType | undefined>(undefined)

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>("es")

  useEffect(() => {
    const savedLang = localStorage.getItem("admin-lang") as AdminLang | null
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLangState(savedLang)
    }
  }, [])

  const setLang = (newLang: AdminLang) => {
    setLangState(newLang)
    localStorage.setItem("admin-lang", newLang)
  }

  const t = adminTranslations[lang]

  return (
    <AdminLangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </AdminLangContext.Provider>
  )
}

export function useAdminLang() {
  const context = useContext(AdminLangContext)
  if (context === undefined) {
    throw new Error("useAdminLang must be used within an AdminLangProvider")
  }
  return context
}

