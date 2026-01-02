"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import {
  type Language,
  DEFAULT_LANGUAGE,
  detectLanguageFromUrl,
  translateRoute,
  getBaseRoute,
} from "@/lib/route-translations"

// Re-export Language type for backwards compatibility
export type { Language }

type LangContextType = {
  lang: Language
  setLang: (lang: Language) => void
  translatePath: (path: string) => string
  getBasePath: (path: string) => string
}

const LangContext = createContext<LangContextType | undefined>(undefined)

// Storage key for language preference
const LANG_STORAGE_KEY = "msc-preferred-language"

interface LangProviderProps {
  children: React.ReactNode
}

export function LangProvider({ children }: LangProviderProps) {
  const pathname = usePathname()
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize language from URL or localStorage
  useEffect(() => {
    if (isInitialized) return

    // First, try to detect language from URL
    const urlLang = detectLanguageFromUrl(pathname)
    
    // Then check localStorage for saved preference
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language | null
    
    // URL takes precedence, then localStorage, then default
    const initialLang = urlLang !== DEFAULT_LANGUAGE ? urlLang : (savedLang || DEFAULT_LANGUAGE)
    
    setLangState(initialLang)
    setIsInitialized(true)

    // If URL language differs from what we detected, save it
    if (urlLang !== DEFAULT_LANGUAGE) {
      localStorage.setItem(LANG_STORAGE_KEY, urlLang)
    }
  }, [pathname, isInitialized])

  // Update URL when language changes
  const setLang = useCallback((newLang: Language) => {
    if (newLang === lang) return

    // Save to localStorage
    localStorage.setItem(LANG_STORAGE_KEY, newLang)
    
    // Update state
    setLangState(newLang)

    // Translate current URL to new language
    const newPath = translateRoute(pathname, newLang)
    
    // Update URL without page reload using pushState
    if (newPath !== pathname) {
      window.history.pushState({ lang: newLang }, "", newPath)
    }
  }, [lang, pathname])

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentPath = window.location.pathname
      const detectedLang = detectLanguageFromUrl(currentPath)
      
      if (detectedLang !== lang) {
        setLangState(detectedLang)
        localStorage.setItem(LANG_STORAGE_KEY, detectedLang)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [lang])

  // Helper function to translate a path to current language
  const translatePath = useCallback((path: string): string => {
    return translateRoute(path, lang)
  }, [lang])

  // Helper function to get base path from any translated path
  const getBasePath = useCallback((path: string): string => {
    const routeInfo = getBaseRoute(path)
    return routeInfo?.baseRoute || path
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, translatePath, getBasePath }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider")
  }
  return context
}
