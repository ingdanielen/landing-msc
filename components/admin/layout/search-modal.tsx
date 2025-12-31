"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  X, 
  FileText, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Settings,
  ArrowRight,
  Clock,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface SearchResult {
  id: string
  title: string
  type: "article" | "function"
  href: string
  icon: React.ReactNode
  description?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const { t } = useAdminLang()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Panel functions that are always searchable
  const panelFunctions: SearchResult[] = [
    {
      id: "dashboard",
      title: t.nav.dashboard,
      type: "function",
      href: "/admin",
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: t.dashboard.description
    },
    {
      id: "articles",
      title: t.nav.articles,
      type: "function",
      href: "/admin/blog",
      icon: <FileText className="w-4 h-4" />,
      description: t.articles.description
    },
    {
      id: "new-article",
      title: t.dashboard.createArticle,
      type: "function",
      href: "/admin/blog/new",
      icon: <FileText className="w-4 h-4" />,
      description: t.articleForm.titlePlaceholder
    },
    {
      id: "gallery",
      title: t.nav.gallery,
      type: "function",
      href: "/admin/gallery",
      icon: <ImageIcon className="w-4 h-4" />,
      description: t.gallery.description
    },
    {
      id: "new-image",
      title: t.dashboard.uploadImage,
      type: "function",
      href: "/admin/gallery/new",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: "settings",
      title: t.nav.settings,
      type: "function",
      href: "/admin/settings",
      icon: <Settings className="w-4 h-4" />,
      description: t.settings.description
    },
  ]

  // Search articles from API
  const searchArticles = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return []
    
    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) return []
      const data = await response.json()
      return data.articles?.map((article: any) => ({
        id: article.slug,
        title: article.title,
        type: "article" as const,
        href: `/admin/blog/${article.slug}/edit`,
        icon: <FileText className="w-4 h-4" />,
        description: article.excerpt || article.category
      })) || []
    } catch {
      return []
    }
  }, [])

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults(panelFunctions.slice(0, 4))
        return
      }

      setIsLoading(true)
      
      // Filter panel functions
      const filteredFunctions = panelFunctions.filter(
        f => f.title.toLowerCase().includes(query.toLowerCase()) ||
             f.description?.toLowerCase().includes(query.toLowerCase())
      )

      // Search articles
      const articles = await searchArticles(query)

      setResults([...filteredFunctions, ...articles].slice(0, 8))
      setSelectedIndex(0)
      setIsLoading(false)
    }

    const debounce = setTimeout(performSearch, 200)
    return () => clearTimeout(debounce)
  }, [query, searchArticles])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery("")
      setResults(panelFunctions.slice(0, 4))
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex(i => Math.min(i + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex(i => Math.max(i - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            onClose()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, router, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex items-start justify-center pt-[15vh]">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-slate-200">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 py-4 text-lg bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
            ) : query && (
              <button 
                onClick={() => setQuery("")}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
            <kbd className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-100 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {results.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">{t.search.noResults}</p>
                <p className="text-sm text-slate-400">{t.search.noResultsDescription}</p>
              </div>
            ) : (
              <div className="py-2">
                {/* Functions Section */}
                {results.some(r => r.type === "function") && (
                  <div className="px-3 py-2">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {t.search.functions}
                    </p>
                  </div>
                )}
                {results
                  .filter(r => r.type === "function")
                  .map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        router.push(result.href)
                        onClose()
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        selectedIndex === index
                          ? "bg-accent/10 text-accent"
                          : "hover:bg-slate-50"
                      )}
                    >
                      <span className={cn(
                        "p-2 rounded-lg",
                        selectedIndex === index
                          ? "bg-accent/20 text-accent"
                          : "bg-slate-100 text-slate-500"
                      )}>
                        {result.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        {result.description && (
                          <p className="text-sm text-slate-500 truncate">{result.description}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}

                {/* Articles Section */}
                {results.some(r => r.type === "article") && (
                  <div className="px-3 py-2 mt-2 border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {t.search.articles}
                    </p>
                  </div>
                )}
                {results
                  .filter(r => r.type === "article")
                  .map((result, index) => {
                    const actualIndex = results.filter(r => r.type === "function").length + index
                    return (
                      <button
                        key={result.id}
                        onClick={() => {
                          router.push(result.href)
                          onClose()
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                          selectedIndex === actualIndex
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-slate-50"
                        )}
                      >
                        <span className={cn(
                          "p-2 rounded-lg",
                          selectedIndex === actualIndex
                            ? "bg-accent/20 text-accent"
                            : "bg-slate-100 text-slate-500"
                        )}>
                          {result.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{result.title}</p>
                          {result.description && (
                            <p className="text-sm text-slate-500 truncate">{result.description}</p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </button>
                    )
                  })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-sm">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-sm">↓</kbd>
                {t.common.search}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-sm">↵</kbd>
                {t.common.view}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

