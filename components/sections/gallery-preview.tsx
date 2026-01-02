"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { LocalizedLink } from "@/components/ui/localized-link"
import { useRef, useState, useEffect, useCallback } from "react"
import { ArrowRight, Camera, X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"
import type { GalleryItem } from "@/lib/gallery-types"

interface GalleryPreviewProps {
  lang: Language
  items: GalleryItem[]
}

const content = {
  es: {
    badge: "GALERIA",
    title: "Nuestro Trabajo",
    titleAccent: "en Imagenes",
    cta: "Ver galeria",
  },
  en: {
    badge: "GALLERY",
    title: "Our Work",
    titleAccent: "in Images",
    cta: "View gallery",
  },
  zh: {
    badge: "画廊",
    title: "我们的工作",
    titleAccent: "图片展示",
    cta: "查看画廊",
  },
}

// Safe image component with fallback
function SafeImage({ 
  src, 
  alt, 
  fill = false,
  width,
  height,
  className = "",
  priority = false
}: { 
  src?: string | null
  alt?: string | null
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
}) {
  const [error, setError] = useState(false)
  const safeSrc = src && src.trim() ? src : "/placeholder.jpg"
  const safeAlt = alt || "Imagen"

  if (error) {
    return (
      <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
        <Camera className="w-8 h-8 text-slate-400" />
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={safeSrc}
        alt={safeAlt}
        fill
        className={className}
        onError={() => setError(true)}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={safeSrc}
      alt={safeAlt}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  )
}

export function GalleryPreview({ lang, items }: GalleryPreviewProps) {
  const t = content[lang] || content.en
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Filter valid items and limit to 12
  const displayItems = (items || [])
    .filter(item => item && item.slug)
    .slice(0, 12)

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying || displayItems.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, displayItems.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % displayItems.length)
  }, [displayItems.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + displayItems.length) % displayItems.length)
  }, [displayItems.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft') prevSlide()
        if (e.key === 'Escape') setLightboxIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextSlide, prevSlide])

  if (displayItems.length === 0) return null

  const currentItem = displayItems[currentIndex] || {}

  return (
    <>
      <section id="gallery" className="relative py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase">
                  {t.badge}
                </span>
                <div className="h-px w-16 bg-accent/30" />
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <HeroText as="h2" className="text-4xl md:text-5xl text-primary">
                  {t.title}
                </HeroText>
                <HeroText as="span" className="text-4xl md:text-5xl text-accent">
                  {t.titleAccent}
                </HeroText>
              </div>
            </div>

            <LocalizedLink
              href="/gallery"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium hover:bg-accent transition-colors"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedLink>
          </motion.div>

          {/* Main Carousel */}
          <div className="relative">
            {/* Main Image */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-slate-100 cursor-pointer group"
              onClick={() => setLightboxIndex(currentIndex)}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {displayItems.map((item, idx) => (
                <motion.div
                  key={item?.slug || idx}
                  initial={false}
                  animate={{
                    opacity: idx === currentIndex ? 1 : 0,
                    scale: idx === currentIndex ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={item?.image}
                    alt={item?.alt || item?.title}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </motion.div>
              ))}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {currentItem?.category && (
                      <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold uppercase tracking-wider">
                        {currentItem.category}
                      </span>
                    )}
                    {currentItem?.location && (
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur text-white text-xs">
                        {currentItem.location}
                      </span>
                    )}
                  </div>
                  
                  {/* Large index */}
                  <span className="text-[80px] md:text-[120px] font-black text-white/10 leading-none select-none">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <motion.h3
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold text-white mb-4 max-w-2xl"
                  >
                    {currentItem?.title || "Sin título"}
                  </motion.h3>
                  
                  {/* Progress bar */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-0.5 bg-white/20 overflow-hidden">
                      <motion.div
                        key={currentIndex}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isPlaying ? 1 : 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full bg-accent origin-left"
                      />
                    </div>
                    <span className="text-white/60 text-sm font-mono">
                      {currentIndex + 1}/{displayItems.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Play/Pause */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying) }}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-10 h-10 bg-white/10 hover:bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </motion.div>

            {/* Thumbnails Strip */}
            <div className="mt-4 relative">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {displayItems.map((item, idx) => (
                  <button
                    key={item?.slug || idx}
                    onClick={() => goToSlide(idx)}
                    className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden transition-all ${
                      idx === currentIndex 
                        ? "ring-2 ring-accent ring-offset-2" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <SafeImage
                      src={item?.image}
                      alt={item?.alt || item?.title}
                      fill
                      className="object-cover"
                    />
                    {idx === currentIndex && (
                      <div className="absolute inset-0 bg-accent/20" />
                    )}
                    <span className="absolute bottom-1 right-1 text-[10px] font-bold text-white bg-primary/60 px-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dots indicator for mobile */}
            <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
              {displayItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && displayItems[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-accent text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); setLightboxIndex(prev => prev !== null ? (prev - 1 + displayItems.length) % displayItems.length : null) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-accent text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); setLightboxIndex(prev => prev !== null ? (prev + 1) % displayItems.length : null) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-accent text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={displayItems[lightboxIndex]?.image}
              alt={displayItems[lightboxIndex]?.alt || displayItems[lightboxIndex]?.title}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-xl">
                {displayItems[lightboxIndex]?.title || "Sin título"}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-white/70 text-sm">
                {displayItems[lightboxIndex]?.category && (
                  <span className="px-2 py-0.5 bg-accent text-white text-xs uppercase font-bold">
                    {displayItems[lightboxIndex].category}
                  </span>
                )}
                {displayItems[lightboxIndex]?.location && (
                  <span>{displayItems[lightboxIndex].location}</span>
                )}
              </div>
            </div>

            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50">
              <span className="text-white font-bold">
                {lightboxIndex + 1} / {displayItems.length}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
