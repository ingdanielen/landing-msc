"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Language } from "@/lib/content"

type LangContextType = {
  lang: Language
  setLang: (lang: Language) => void
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en")

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const context = useContext(LangContext)
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider")
  }
  return context
}
