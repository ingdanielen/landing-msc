"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit2, Trash2, Eye, MoreVertical, Star, EyeOff, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"

interface GalleryCardProps {
  slug?: string | null
  title?: string | null
  image?: string | null
  alt?: string | null
  category?: string | null
  date?: string | null
  visible?: boolean
  featured?: boolean
  onDelete?: (slug: string) => void
}

export function GalleryCard({
  slug,
  title,
  image,
  alt,
  category,
  visible = true,
  featured = false,
  onDelete
}: GalleryCardProps) {
  // Safe values with fallbacks
  const safeSlug = slug || ""
  const safeTitle = title || "Sin título"
  const safeImage = image && image.trim() ? image : "/placeholder.jpg"
  const safeAlt = alt || safeTitle
  const safeCategory = category || "general"
  
  const [imageError, setImageError] = useState(false)
  
  // Don't render if no slug
  if (!safeSlug) return null
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Calculate menu position
  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const menuWidth = 144 // w-36 = 9rem = 144px
      const menuHeight = 120 // approximate height
      
      let top = rect.bottom + 4
      let left = rect.right - menuWidth
      
      // Check if menu goes off screen bottom
      if (top + menuHeight > window.innerHeight) {
        top = rect.top - menuHeight - 4
      }
      
      // Check if menu goes off screen left
      if (left < 8) {
        left = 8
      }
      
      // Check if menu goes off screen right
      if (left + menuWidth > window.innerWidth - 8) {
        left = window.innerWidth - menuWidth - 8
      }
      
      setMenuPosition({ top, left })
    }
  }, [showMenu])

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setShowMenu(false)
    if (showMenu) {
      window.addEventListener('scroll', handleScroll, true)
      return () => window.removeEventListener('scroll', handleScroll, true)
    }
  }, [showMenu])

  return (
    <div className={cn(
      "group relative bg-white border rounded-lg overflow-hidden transition-all",
      visible 
        ? "border-slate-200/60 hover:border-slate-300 hover:shadow-sm" 
        : "border-slate-200/40 opacity-60"
    )}>
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
        ) : (
          <Image
            src={safeImage}
            alt={safeAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link
            href={`/gallery?image=${safeSlug}`}
            target="_blank"
            className="p-2.5 bg-white/90 text-slate-700 rounded-lg hover:bg-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <Link
            href={`/admin/gallery/${safeSlug}/edit`}
            className="p-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-amber-400 text-amber-900 text-xs font-medium rounded">
            <Star className="w-3 h-3 fill-current" />
            Destacada
          </div>
        )}

        {/* Hidden Badge */}
        {!visible && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-slate-700/80 text-white text-xs font-medium rounded">
            <EyeOff className="w-3 h-3" />
            Oculta
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-slate-900 truncate">{safeTitle}</h3>
            <p className="text-xs text-slate-500 capitalize">{safeCategory}</p>
          </div>
          
          {/* More Menu */}
          <div className="relative shrink-0">
            <button 
              ref={buttonRef}
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && typeof document !== 'undefined' && createPortal(
              <>
                <div 
                  className="fixed inset-0 z-[9999]" 
                  onClick={() => setShowMenu(false)} 
                />
                <div 
                  ref={menuRef}
                  className="fixed w-36 bg-white border border-slate-200 rounded-md shadow-xl z-[10000] py-1"
                  style={{ 
                    top: menuPosition.top, 
                    left: menuPosition.left,
                  }}
                >
                  <Link
                    href={`/admin/gallery/${safeSlug}/edit`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Link>
                  <Link
                    href={`/gallery?image=${safeSlug}`}
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </Link>
                  {onDelete && safeSlug && (
                    <button
                      onClick={() => {
                        setShowMenu(false)
                        onDelete(safeSlug)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  )}
                </div>
              </>,
              document.body
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
