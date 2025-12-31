"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, MapPin, Calendar, Tag, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import type { GalleryItem } from "@/lib/gallery-types"
import { getCategoryLabel, formatGalleryDate } from "@/lib/gallery-types"
import { type Language } from "@/lib/content"
import { useCallback, useEffect, useState } from "react"

interface GalleryLightboxProps {
  item: GalleryItem | null
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (item: GalleryItem) => void
  lang: Language
}

const labels = {
  close: { es: "Cerrar", en: "Close", zh: "关闭" },
  location: { es: "Ubicacion", en: "Location", zh: "位置" },
  date: { es: "Fecha", en: "Date", zh: "日期" },
  category: { es: "Categoria", en: "Category", zh: "类别" },
  noTitle: { es: "Sin título", en: "No title", zh: "无标题" },
}

// Safe image component
function SafeLightboxImage({ 
  src, 
  alt 
}: { 
  src?: string | null
  alt?: string | null
}) {
  const [error, setError] = useState(false)
  const safeSrc = src && src.trim() ? src : "/placeholder.jpg"
  const safeAlt = alt || "Imagen de galería"

  if (error) {
    return (
      <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
        <ImageIcon className="w-16 h-16 text-slate-600" />
      </div>
    )
  }

  return (
    <Image
      src={safeSrc}
      alt={safeAlt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 70vw"
      priority
      onError={() => setError(true)}
    />
  )
}

// Get safe item data
function getSafeItem(item: GalleryItem | null | undefined, lang: Language) {
  if (!item) return null
  
  return {
    slug: item.slug || "",
    image: item.image || "/placeholder.jpg",
    alt: item.alt || item.title || "Imagen",
    title: item.title || labels.noTitle[lang],
    category: item.category || "general",
    location: item.location || "",
    date: item.date || "",
    description: item.description || "",
    featured: item.featured || false,
    isValid: Boolean(item.slug)
  }
}

export function GalleryLightbox({ item, items, onClose, onNavigate, lang }: GalleryLightboxProps) {
  // Filter valid items
  const validItems = (items || []).filter(i => i && i.slug)
  const safeItem = getSafeItem(item, lang)
  
  const currentIndex = safeItem ? validItems.findIndex(i => i.slug === safeItem.slug) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < validItems.length - 1

  const goToPrev = useCallback(() => {
    if (hasPrev && validItems[currentIndex - 1]) {
      onNavigate(validItems[currentIndex - 1])
    }
  }, [hasPrev, currentIndex, validItems, onNavigate])

  const goToNext = useCallback(() => {
    if (hasNext && validItems[currentIndex + 1]) {
      onNavigate(validItems[currentIndex + 1])
    }
  }, [hasNext, currentIndex, validItems, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
    }
    
    if (safeItem) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [safeItem, onClose, goToPrev, goToNext])

  // Don't render if no valid item
  if (!safeItem || !safeItem.isValid) return null

  return (
    <AnimatePresence>
      {safeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
            aria-label={labels.close[lang]}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20 hidden md:flex"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20 hidden md:flex"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Content */}
          <div className="h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6">
            {/* Image */}
            <motion.div
              key={safeItem.slug}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex-1 w-full max-w-4xl h-[50vh] md:h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeLightboxImage
                src={safeItem.image}
                alt={safeItem.alt}
              />
            </motion.div>
            
            {/* Info Panel */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="w-full md:w-80 bg-white rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {getCategoryLabel(safeItem.category)}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-3">
                {safeItem.title}
              </h3>
              
              {/* Description */}
              {safeItem.description && (
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                  {safeItem.description}
                </p>
              )}
              
              {/* Meta Info */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {safeItem.location && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{safeItem.location}</span>
                  </div>
                )}
                {safeItem.date && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{formatGalleryDate(safeItem.date, lang)}</span>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="flex gap-2 mt-6 md:hidden">
                <button
                  onClick={goToPrev}
                  disabled={!hasPrev}
                  className="flex-1 py-2 px-4 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className="flex-1 py-2 px-4 bg-slate-100 rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 mx-auto" />
                </button>
              </div>

              {/* Counter */}
              {validItems.length > 0 && (
                <div className="text-center mt-4 text-sm text-slate-400">
                  {currentIndex + 1} / {validItems.length}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
