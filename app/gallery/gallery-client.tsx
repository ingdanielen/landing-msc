"use client"

import { useState, useMemo } from "react"
import { useLang } from "@/components/lang-provider"
import type { GalleryItem, GalleryCategory } from "@/lib/gallery-types"
import { 
  GalleryHero, 
  GalleryFilters, 
  GalleryGrid, 
  GalleryLightbox 
} from "@/components/gallery"

interface GalleryPageClientProps {
  items: GalleryItem[]
  categories: GalleryCategory[]
}

export function GalleryPageClient({ items, categories }: GalleryPageClientProps) {
  const { lang } = useLang()
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  // Filtrar items por categoria
  const filteredItems = useMemo(() => {
    return selectedCategory === "all" 
      ? items 
      : items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  // Contar items por categoria
  const itemsByCategory = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [items])

  return (
    <>
      <GalleryHero lang={lang} />
      
      <GalleryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalItems={items.length}
        itemsByCategory={itemsByCategory}
        lang={lang}
      />
      
      <section className="py-10 md:py-14 bg-slate-50 min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          <GalleryGrid 
            items={filteredItems} 
            onItemClick={setSelectedItem}
            lang={lang}
          />
        </div>
      </section>
      
      <GalleryLightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={setSelectedItem}
        lang={lang}
      />
    </>
  )
}
