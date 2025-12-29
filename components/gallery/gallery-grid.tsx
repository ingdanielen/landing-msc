"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import type { GalleryItem } from "@/lib/gallery-types"
import { type Language } from "@/lib/content"

interface GalleryGridProps {
  items: GalleryItem[]
  onItemClick: (item: GalleryItem) => void
  lang: Language
}

const labels = {
  noImages: { 
    es: "No hay imagenes en esta categoria", 
    en: "No images in this category", 
    zh: "此类别没有图片" 
  },
  featured: {
    es: "Destacada",
    en: "Featured",
    zh: "精选"
  }
}

export function GalleryGrid({ items, onItemClick, lang }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-500 text-lg">{labels.noImages[lang]}</p>
      </div>
    )
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, idx) => (
          <motion.article
            key={item.slug}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.02, duration: 0.3 }}
            className="group relative aspect-square bg-slate-200 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            onClick={() => onItemClick(item)}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Featured Badge */}
            {item.featured && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent text-white text-xs font-medium rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  {labels.featured[lang]}
                </span>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content on Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                {item.title}
              </h3>
              {item.location && (
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </p>
              )}
            </div>
            
            {/* Bottom Gradient always visible on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

