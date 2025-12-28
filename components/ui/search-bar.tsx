"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import Link from "next/link"

interface SearchResult {
  title: string
  href: string
  type: "page" | "blog"
}

const searchData: SearchResult[] = [
  { title: "Inicio", href: "/", type: "page" },
  { title: "Sobre Nosotros", href: "/about", type: "page" },
  { title: "Servicios", href: "/services", type: "page" },
  { title: "Calidad y Cumplimiento", href: "/compliance", type: "page" },
  { title: "Nuestro Equipo", href: "/team", type: "page" },
  { title: "Contacto", href: "/contact", type: "page" },
  { title: "Blog", href: "/blog", type: "page" },
]

interface SearchBarProps {
  lang: Language
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function SearchBar({ lang, isOpen, setIsOpen }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    } else {
      setSearchQuery("")
      setResults([])
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  // Filter results
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = searchData.filter((item) => item.title.toLowerCase().includes(query))
    setResults(filtered.slice(0, 5))
  }, [searchQuery])

  const handleResultClick = () => {
    setIsOpen(false)
    setSearchQuery("")
  }

  const closeSearch = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setSearchQuery("")
  }

  // Mobile: Solo mostrar el botón de búsqueda, el modal se muestra como overlay
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-white hover:text-accent transition-colors rounded-lg hover:bg-white/10"
          aria-label={lang === "es" ? "Buscar" : "Search"}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 pt-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 flex items-center bg-white/10 rounded-lg border border-white/20 overflow-hidden">
                    <div className="pl-4 text-white/60">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === "es" ? "Buscar..." : lang === "zh" ? "搜索..." : "Search..."}
                      className="flex-1 px-3 py-4 bg-transparent text-white placeholder:text-white/50 focus:outline-none w-full"
                    />
                  </div>
                  <button
                    onClick={closeSearch}
                    className="p-3 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    type="button"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Results */}
                {searchQuery && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                    {results.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {results.map((result, idx) => (
                          <Link
                            key={idx}
                            href={result.href}
                            onClick={handleResultClick}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                          >
                            <div className="h-2 w-2 rounded-full bg-accent" />
                            <span className="text-base text-slate-700">{result.title}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="px-5 py-8 text-center text-slate-500">
                        {lang === "es" ? "Sin resultados" : lang === "zh" ? "无结果" : "No results"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop version
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:text-accent transition-colors rounded-lg hover:bg-white/10"
        aria-label={lang === "es" ? "Buscar" : "Search"}
      >
        <Search className="h-5 w-5" />
      </button>
    )
  }

  return (
    <motion.div
      initial={{ width: 40, opacity: 0.5 }}
      animate={{ width: 220, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative"
    >
      <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="pl-3 text-white/60">
          <Search className="h-4 w-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === "es" ? "Buscar..." : lang === "zh" ? "搜索..." : "Search..."}
          className="flex-1 px-2 py-2 bg-transparent text-white text-sm placeholder:text-white/50 focus:outline-none w-full"
        />
        <button
          onClick={closeSearch}
          className="p-2 text-white/60 hover:text-white transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Results Dropdown */}
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
        >
          {results.length > 0 ? (
            <div className="py-1 max-h-64 overflow-y-auto">
              {results.map((result, idx) => (
                <Link
                  key={idx}
                  href={result.href}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm text-slate-700">{result.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              {lang === "es" ? "Sin resultados" : lang === "zh" ? "无结果" : "No results"}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
