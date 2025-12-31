"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Edit2, Trash2, Eye, MoreVertical, FileText } from "lucide-react"
import { StatusBadge } from "../shared/status-badge"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

interface ArticleCardProps {
  slug?: string | null
  title?: string | null
  excerpt?: string | null
  date?: string | null
  dateFormatted?: string | null
  category?: string | null
  featured_image?: string | null
  published?: boolean
  onDelete?: (slug: string) => void
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  dateFormatted,
  category,
  featured_image,
  published = true,
  onDelete
}: ArticleCardProps) {
  // Safe values with fallbacks
  const safeSlug = slug || ""
  const safeTitle = title || "Sin título"
  const safeExcerpt = excerpt || ""
  const safeDateFormatted = dateFormatted || new Date().toLocaleDateString('es-ES')
  const safeCategory = category || "General"
  const safeImage = featured_image && featured_image.trim() ? featured_image : "/placeholder.jpg"
  
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const [imageError, setImageError] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Don't render if no slug
  if (!safeSlug) return null

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
    <div className="group bg-white border border-slate-200/60 rounded-lg overflow-hidden transition-all hover:border-slate-300 hover:shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
        ) : (
          <Image
            src={safeImage}
            alt={safeTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick Actions Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/blog/${safeSlug}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded hover:bg-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Ver
          </Link>
          <Link
            href={`/admin/blog/${safeSlug}/edit`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded hover:bg-accent/90 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Editar
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-medium text-slate-700 rounded">
            {safeCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
            {safeTitle}
          </h3>
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
                    href={`/admin/blog/${safeSlug}/edit`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Link>
                  <Link
                    href={`/blog/${safeSlug}`}
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
        
        {safeExcerpt && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{safeExcerpt}</p>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {safeDateFormatted}
          </div>
          <StatusBadge status={published ? "published" : "draft"} />
        </div>
      </div>
    </div>
  )
}
