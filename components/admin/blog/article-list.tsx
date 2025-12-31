"use client"

import { useState, useMemo } from "react"
import { ArticleCard } from "./article-card"
import { EmptyState } from "../shared/empty-state"
import { FileText, Plus, Search, Filter, Grid, List, Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { getCategoryLabelByKey } from "@/lib/admin/i18n"

interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  dateFormatted: string
  category: string
  featured_image: string
  published?: boolean
}

interface ArticleListProps {
  articles: Article[]
  onDelete?: (slug: string) => void
}

export function ArticleList({ articles, onDelete }: ArticleListProps) {
  const { t, lang } = useAdminLang()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [
    { label: t.common.all, value: "all" },
    { label: t.categories.news, value: "Noticias" },
    { label: t.categories.technical, value: "Tecnico" },
    { label: t.categories.regulations, value: "Normativas" },
    { label: t.categories.company, value: "Empresa" },
    { label: t.categories.educational, value: "Educativo" },
  ]

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = 
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = 
        categoryFilter === "all" || article.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [articles, search, categoryFilter])

  if (articles.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="w-8 h-8" />}
        title={t.articles.noArticles}
        description={t.articles.noArticlesDescription}
        action={{
          label: t.articles.createFirst,
          href: "/admin/blog/new",
          icon: <Plus className="w-4 h-4" />
        }}
      />
    )
  }

  const resultsText = lang === "es" 
    ? `${filteredArticles.length} de ${articles.length} artículos`
    : `${filteredArticles.length} of ${articles.length} articles`

  const noResultsText = lang === "es" 
    ? "No se encontraron artículos"
    : "No articles found"

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.articles.search}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-md p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === "grid" 
                ? "bg-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === "list" 
                ? "bg-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-slate-500">{resultsText}</p>
      </div>

      {/* Articles Grid/List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">{noResultsText}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              {...article}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredArticles.map((article) => (
            <ArticleListItem
              key={article.slug}
              {...article}
              onDelete={onDelete}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// List View Item Component
function ArticleListItem({
  slug,
  title,
  excerpt,
  dateFormatted,
  category,
  featured_image,
  published = true,
  onDelete,
  lang
}: Article & { onDelete?: (slug: string) => void; lang: "es" | "en" }) {
  const publishedLabel = lang === "es" ? "Publicado" : "Published"
  const draftLabel = lang === "es" ? "Borrador" : "Draft"

  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200/60 rounded-lg hover:border-slate-300 transition-all group">
      {/* Thumbnail */}
      <div className="relative w-24 h-16 rounded overflow-hidden shrink-0 bg-slate-100">
        <img
          src={featured_image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-slate-900 truncate">{title}</h3>
          <span className="text-xs text-slate-400 shrink-0">· {getCategoryLabelByKey(category, lang)}</span>
        </div>
        <p className="text-xs text-slate-500 truncate">{excerpt}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <span className="text-xs text-slate-400">{dateFormatted}</span>
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium rounded",
          published 
            ? "bg-emerald-50 text-emerald-700" 
            : "bg-amber-50 text-amber-700"
        )}>
          {published ? publishedLabel : draftLabel}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={`/admin/blog/${slug}/edit`}
          className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </a>
        {onDelete && (
          <button
            onClick={() => onDelete(slug)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
