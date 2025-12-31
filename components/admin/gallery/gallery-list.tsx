"use client"

import { useState, useMemo } from "react"
import { GalleryCard } from "./gallery-card"
import { EmptyState } from "../shared/empty-state"
import { Image as ImageIcon, Plus, Search, Filter, Grid, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface GalleryItem {
  slug: string
  title: string
  image: string
  alt: string
  category: string
  date: string
  visible?: boolean
  featured?: boolean
}

interface GalleryListProps {
  items: GalleryItem[]
  onDelete?: (slug: string) => void
}

export function GalleryList({ items, onDelete }: GalleryListProps) {
  const { t, lang } = useAdminLang()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [gridSize, setGridSize] = useState<"small" | "large">("large")

  const categories = lang === "es" ? [
    { label: "Todas", value: "all" },
    { label: "Buques", value: "buques" },
    { label: "Carga", value: "carga" },
    { label: "Puertos", value: "puertos" },
    { label: "Consultoría", value: "consultoria" },
    { label: "Operaciones", value: "operaciones" },
    { label: "Equipo", value: "equipo" },
  ] : [
    { label: "All", value: "all" },
    { label: "Vessels", value: "buques" },
    { label: "Cargo", value: "carga" },
    { label: "Ports", value: "puertos" },
    { label: "Consulting", value: "consultoria" },
    { label: "Operations", value: "operaciones" },
    { label: "Team", value: "equipo" },
  ]

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.alt.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = 
        categoryFilter === "all" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [items, search, categoryFilter])

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ImageIcon className="w-8 h-8" />}
        title={t.gallery.noImages}
        description={t.gallery.noImagesDescription}
        action={{
          label: t.gallery.uploadFirst,
          href: "/admin/gallery/new",
          icon: <Plus className="w-4 h-4" />
        }}
      />
    )
  }

  const searchPlaceholder = lang === "es" ? "Buscar imágenes..." : "Search images..."
  const resultsText = lang === "es" 
    ? `${filteredItems.length} de ${items.length} imágenes`
    : `${filteredItems.length} of ${items.length} images`
  const noResultsText = lang === "es" ? "No se encontraron imágenes" : "No images found"

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
            placeholder={searchPlaceholder}
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

        {/* Grid Size Toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-md p-1">
          <button
            onClick={() => setGridSize("large")}
            className={cn(
              "p-2 rounded transition-colors",
              gridSize === "large" 
                ? "bg-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridSize("small")}
            className={cn(
              "p-2 rounded transition-colors",
              gridSize === "small" 
                ? "bg-slate-100 text-slate-900" 
                : "text-slate-400 hover:text-slate-600"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-slate-500">{resultsText}</p>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">{noResultsText}</p>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4",
          gridSize === "large" 
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
        )}>
          {filteredItems.map((item) => (
            <GalleryCard
              key={item.slug}
              {...item}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
