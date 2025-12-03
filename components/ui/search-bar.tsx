"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"
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
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    } else {
      setSearchQuery("")
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

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

  return (
    <div className="relative">
      {/* Search Button - Hidden when search is open */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white hover:text-accent transition-colors p-2"
          aria-label={lang === "es" ? "Buscar" : "Search"}
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      {/* Search Input Overlay - Absolute positioned, doesn't affect layout */}
      {isOpen && (
        <div 
          ref={searchRef} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-80"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "es" ? "Buscar..." : "Search..."}
                className="w-full pl-10 pr-10 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent shadow-lg transition-all duration-300"
              />
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSearchQuery("")
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results Dropdown - Below Input */}
            {searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
                {results.length > 0 ? (
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {results.map((result, idx) => (
                      <Link
                        key={idx}
                        href={result.href}
                        onClick={handleResultClick}
                        className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span className="text-sm text-slate-700">{result.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-slate-500">
                    {lang === "es" ? "No se encontraron resultados" : "No results found"}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
