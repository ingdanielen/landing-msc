"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Search, Plus, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { SearchModal } from "./search-modal"
import { HelpModal } from "./help-modal"
import { cn } from "@/lib/utils"

interface AdminHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
    icon?: React.ReactNode
  }
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  const { t, lang, setLang } = useAdminLang()
  const [searchOpen, setSearchOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#f8fafc]/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Title */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t.header.search}</span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-slate-400 bg-slate-100 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-lg transition-colors flex items-center gap-1"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">{lang}</span>
              </button>
              
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden min-w-[140px]">
                    <button
                      onClick={() => {
                        setLang("es")
                        setLangMenuOpen(false)
                      }}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors flex items-center gap-2",
                        lang === "es" && "bg-accent/5 text-accent"
                      )}
                    >
                      <span className="text-base">🇪🇸</span>
                      {t.settings.spanish}
                    </button>
                    <button
                      onClick={() => {
                        setLang("en")
                        setLangMenuOpen(false)
                      }}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors flex items-center gap-2",
                        lang === "en" && "bg-accent/5 text-accent"
                      )}
                    >
                      <span className="text-base">🇺🇸</span>
                      {t.settings.english}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Help */}
            <button 
              onClick={() => setHelpOpen(true)}
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-lg transition-colors"
              title={t.header.help}
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Primary Action */}
            {action && (
              <Link href={action.href}>
                <Button className="bg-accent hover:bg-accent/90 text-white gap-2 h-9 px-4 rounded-lg">
                  {action.icon || <Plus className="w-4 h-4" />}
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
