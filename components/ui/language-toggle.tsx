"use client"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/content"

interface LanguageToggleProps {
  lang: Language
  setLang: (lang: Language) => void
}

export function LanguageToggle({ lang, setLang }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="gap-2 bg-white/10 rounded-md text-white hover:text-accent font-sans font-semibold cursor-pointer"
    >
      <Globe className="h-4 w-4" />
      {lang === "es" ? "ES" : "EN"}
    </Button>
  )
}
