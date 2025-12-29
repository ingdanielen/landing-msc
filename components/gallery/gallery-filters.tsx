"use client"

import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import type { GalleryCategory } from "@/lib/gallery-types"
import { getCategoryLabel } from "@/lib/gallery-types"
import { type Language } from "@/lib/content"

interface GalleryFiltersProps {
  categories: GalleryCategory[]
  selectedCategory: GalleryCategory | "all"
  onCategoryChange: (category: GalleryCategory | "all") => void
  totalItems: number
  itemsByCategory: Record<string, number>
  lang: Language
}

const labels = {
  filter: { es: "Filtrar", en: "Filter", zh: "筛选" },
  all: { es: "Todas", en: "All", zh: "全部" },
}

export function GalleryFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  totalItems,
  itemsByCategory,
  lang,
}: GalleryFiltersProps) {
  return (
    <section className="py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-16 z-30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-slate-500 text-sm shrink-0 pr-2 border-r border-slate-200">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">{labels.filter[lang]}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {labels.all[lang]}
            <span className="ml-1.5 text-xs opacity-70">({totalItems})</span>
          </motion.button>
          
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {getCategoryLabel(cat)}
              <span className="ml-1.5 text-xs opacity-70">({itemsByCategory[cat] || 0})</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

