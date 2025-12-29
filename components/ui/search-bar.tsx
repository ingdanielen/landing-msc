"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, FileText, Image as ImageIcon, Globe, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import Link from "next/link"
import NextImage from "next/image"

interface SearchResult {
  id: string
  title: string
  description: string
  href: string
  type: "page" | "blog" | "gallery"
  image?: string
  category?: string
}

interface SearchBarProps {
  lang: Language
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const typeIcons = {
  page: Globe,
  blog: FileText,
  gallery: ImageIcon,
}

const typeLabels = {
  page: { es: "Pagina", en: "Page", zh: "页面" },
  blog: { es: "Articulo", en: "Article", zh: "文章" },
  gallery: { es: "Galeria", en: "Gallery", zh: "图库" },
}

export function SearchBar({ lang, isOpen, setIsOpen }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(timer)
    } else {
      setSearchQuery("")
      setResults([])
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, setIsOpen])

  // Search with debounce
  const performSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }
    
    setIsLoading(true)
    debounceRef.current = setTimeout(() => {
      performSearch(searchQuery)
    }, 300)
    
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchQuery, performSearch])

  const handleResultClick = () => {
    setIsOpen(false)
    setSearchQuery("")
  }

  const closeSearch = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    setSearchQuery("")
  }

  const labels = {
    placeholder: { es: "Buscar articulos, galeria...", en: "Search articles, gallery...", zh: "搜索文章、图库..." },
    noResults: { es: "Sin resultados", en: "No results", zh: "无结果" },
    searching: { es: "Buscando...", en: "Searching...", zh: "搜索中..." },
    hint: { es: "Escribe para buscar", en: "Type to search", zh: "输入搜索" },
  }

  const ResultItem = ({ result }: { result: SearchResult }) => {
    const Icon = typeIcons[result.type]
    return (
      <Link
        href={result.href}
        onClick={handleResultClick}
        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        {result.image ? (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
            <NextImage src={result.image} alt="" fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-900 truncate">{result.title}</span>
            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
              {typeLabels[result.type][lang]}
            </span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{result.description}</p>
        </div>
      </Link>
    )
  }

  // Mobile version
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-white hover:text-accent transition-colors rounded-lg hover:bg-white/10"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 flex items-center bg-white/10 rounded-lg border border-white/20 overflow-hidden">
                    <div className="pl-4 text-white/60">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={labels.placeholder[lang]}
                      className="flex-1 px-3 py-4 bg-transparent text-white placeholder:text-white/50 focus:outline-none w-full"
                    />
                  </div>
                  <button
                    onClick={closeSearch}
                    className="p-3 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {searchQuery.length >= 2 && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                    {isLoading ? (
                      <div className="px-5 py-8 text-center text-slate-500">{labels.searching[lang]}</div>
                    ) : results.length > 0 ? (
                      <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
                        {results.map((result) => <ResultItem key={result.id} result={result} />)}
                      </div>
                    ) : (
                      <div className="px-5 py-8 text-center text-slate-500">{labels.noResults[lang]}</div>
                    )}
                  </div>
                )}

                {searchQuery.length < 2 && (
                  <div className="text-center text-white/50 py-8">{labels.hint[lang]}</div>
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
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    )
  }

  return (
    <motion.div
      initial={{ width: 40, opacity: 0.5 }}
      animate={{ width: 280, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative"
    >
      <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="pl-3 text-white/60">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={labels.placeholder[lang]}
          className="flex-1 px-2 py-2 bg-transparent text-white text-sm placeholder:text-white/50 focus:outline-none w-full"
        />
        <button onClick={closeSearch} className="p-2 text-white/60 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {searchQuery.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 w-[340px]"
          >
            {isLoading ? (
              <div className="px-4 py-6 text-center text-sm text-slate-500">{labels.searching[lang]}</div>
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {results.map((result) => <ResultItem key={result.id} result={result} />)}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-slate-500">{labels.noResults[lang]}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
