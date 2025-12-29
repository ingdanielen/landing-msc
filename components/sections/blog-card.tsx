"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import type { BlogPostPreview } from "@/lib/blog-types"
import { formatBlogDate, getCategoryLabel } from "@/lib/blog-types"

interface BlogCardProps {
  post: BlogPostPreview
  lang: "es" | "en" | "zh"
  variant?: "preview" | "full"
}

export function BlogCard({ post, lang, variant = "full" }: BlogCardProps) {
  const formattedDate = formatBlogDate(post.date)
  const categoryLabel = getCategoryLabel(post.category)

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      {/* 
        Card responsive:
        - Mobile: vertical (imagen arriba, contenido abajo)
        - Tablet+: horizontal (imagen izquierda, contenido derecha)
      */}
      <article className="bg-white border border-slate-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-auto sm:h-[180px] md:h-[200px]">
        {/* Image - Responsive */}
        <div className="relative overflow-hidden shrink-0 h-[180px] sm:h-full sm:w-[160px] md:w-[200px] lg:w-[220px]">
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 220px"
          />
          {/* Category badge en mobile sobre la imagen */}
          <div className="absolute top-3 left-3 sm:hidden">
            <span className="inline-flex items-center gap-1 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4 min-w-0">
          {/* Category & Date - Desktop */}
          <div className="hidden sm:flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Date en mobile */}
          <div className="flex sm:hidden items-center gap-1 text-xs text-slate-400 mb-2">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-primary text-base sm:text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt - Oculto en mobile muy pequeño */}
          <p className="hidden xs:block text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-100 sm:border-0 sm:pt-0">
            <span className="text-xs text-slate-400">{post.author || "MSC Team"}</span>
            <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}
