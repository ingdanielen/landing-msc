"use client"
import { Globe, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/content"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LanguageToggleProps {
  lang: Language
  setLang: (lang: Language) => void
}

const languages: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "es", label: "Español", native: "ES" },
  { code: "zh", label: "中文", native: "ZH" },
]

export function LanguageToggle({ lang, setLang }: LanguageToggleProps) {
  const currentLang = languages.find((l) => l.code === lang) || languages[0]

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 px-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white hover:text-white border border-white/20 hover:border-white/40 font-medium transition-all duration-300 group"
        >
          <Globe className="h-4 w-4 mr-2 opacity-80" />
          <span className="text-sm font-bold tracking-wide">{currentLang.native}</span>
          <ChevronDown className="h-3 w-3 ml-1.5 opacity-60 group-hover:opacity-100 transition-all group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[130px] p-1 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-lg overflow-hidden"
        sideOffset={6}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLang(language.code)}
            className={`
              cursor-pointer rounded-md px-2.5 py-1.5 transition-all duration-200
              flex items-center justify-between gap-2
              ${lang === language.code 
                ? "bg-primary/15 text-primary font-semibold" 
                : "hover:bg-slate-100/80 text-slate-700"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <div className={`
                w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold
                ${lang === language.code 
                  ? "bg-primary text-white" 
                  : "bg-slate-200/80 text-slate-600"
                }
              `}>
                {language.native}
              </div>
              <span className="text-xs">{language.label}</span>
            </div>
            {lang === language.code && (
              <Check className="h-3 w-3 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
