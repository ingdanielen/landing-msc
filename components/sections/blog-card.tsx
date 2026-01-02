"use client"

import { LocalizedLink } from "@/components/ui/localized-link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Tag, Clock, User, ArrowUpRight, FileText } from "lucide-react"
import type { BlogPostPreview } from "@/lib/blog-types"
import { formatBlogDate, getCategoryLabel } from "@/lib/blog-types"
import { useState } from "react"

interface BlogCardProps {
  post: BlogPostPreview
  lang: "es" | "en" | "zh"
  variant?: "featured" | "standard" | "compact"
}

// Safe image component with fallback
function SafeImage({ 
  src, 
  alt, 
  fill = false,
  priority = false,
  className = "",
  sizes
}: { 
  src?: string | null
  alt?: string | null
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}) {
  const [error, setError] = useState(false)
  const safeSrc = src && src.trim() ? src : "/placeholder.jpg"
  const safeAlt = alt || "Imagen del artículo"

  if (error) {
    return (
      <div className={`bg-slate-200 flex items-center justify-center ${fill ? 'absolute inset-0' : ''}`}>
        <FileText className="w-10 h-10 text-slate-400" />
      </div>
    )
  }

  return (
    <Image
      src={safeSrc}
      alt={safeAlt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
    />
  )
}

// Validate and get safe post data
function getSafePost(post: BlogPostPreview | null | undefined) {
  if (!post) {
    return {
      slug: "",
      title: "Sin título",
      excerpt: "",
      date: new Date().toISOString(),
      category: "Noticias",
      featured_image: "/placeholder.jpg",
      featured_image_alt: "Imagen del artículo",
      author: "MSC Team",
      reading_time: undefined,
      isValid: false
    }
  }

  return {
    slug: post.slug || "",
    title: post.title || "Sin título",
    excerpt: post.excerpt || "",
    date: post.date || new Date().toISOString(),
    category: post.category || "Noticias",
    featured_image: post.featured_image || "/placeholder.jpg",
    featured_image_alt: post.featured_image_alt || post.title || "Imagen del artículo",
    author: post.author || "MSC Team",
    reading_time: post.reading_time,
    isValid: Boolean(post.slug)
  }
}

// Card Featured - Diseño brutal a pantalla completa
function FeaturedCard({ post: rawPost, lang }: { post: BlogPostPreview; lang: string }) {
  const post = getSafePost(rawPost)
  const formattedDate = formatBlogDate(post.date)
  const categoryLabel = getCategoryLabel(post.category)

  if (!post.isValid) return null

  return (
    <LocalizedLink href={`/blog/${post.slug}`} className="block group">
      <article className="relative h-[550px] md:h-[650px] overflow-hidden rounded-sm">
        {/* Background Image */}
        <div className="absolute inset-0">
          <SafeImage
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
          {/* Overlay dramático */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00111f] via-[#00111f]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00111f]/70 via-transparent to-transparent" />
          {/* Línea de acento */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/20 rotate-45 group-hover:bg-accent/40 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-accent text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-[1.1] font-hero max-w-4xl group-hover:text-accent transition-colors duration-500"
          >
            {post.title}
          </motion.h2>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-2xl line-clamp-2"
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Meta & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              {post.reading_time && (
                <>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.reading_time}
                  </span>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
              {lang === "es" ? "Leer artículo" : lang === "zh" ? "阅读文章" : "Read article"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.div>
        </div>
      </article>
    </LocalizedLink>
  )
}

// Card Standard - Diseño brutal con bordes afilados
function StandardCard({ post: rawPost, lang }: { post: BlogPostPreview; lang: string }) {
  const post = getSafePost(rawPost)
  const formattedDate = formatBlogDate(post.date)
  const categoryLabel = getCategoryLabel(post.category)

  if (!post.isValid) return null

  return (
    <LocalizedLink href={`/blog/${post.slug}`} className="block group h-full">
      <article className="relative h-full bg-white border-l-2 border-l-transparent hover:border-l-accent overflow-hidden transition-all duration-500 flex flex-col shadow-[0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
        {/* Image */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-slate-100">
          <SafeImage
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-0">
            <span className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">
              <Tag className="h-2.5 w-2.5" />
              {categoryLabel}
            </span>
          </div>

          {/* Hover Arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            {post.reading_time && (
              <>
                <span className="w-px h-3 bg-slate-200" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.reading_time}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <ArrowRight className="h-4 w-4 text-accent transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </article>
    </LocalizedLink>
  )
}

// Card Compact - Diseño minimalista y afilado
function CompactCard({ post: rawPost, lang }: { post: BlogPostPreview; lang: string }) {
  const post = getSafePost(rawPost)
  const formattedDate = formatBlogDate(post.date)
  const categoryLabel = getCategoryLabel(post.category)

  if (!post.isValid) return null

  return (
    <LocalizedLink href={`/blog/${post.slug}`} className="block group">
      <article className="flex gap-4 p-4 bg-white border-l-2 border-transparent hover:border-accent hover:bg-slate-50/50 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden bg-slate-100">
          <SafeImage
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="112px"
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0 justify-center">
          {/* Category & Date */}
          <div className="flex items-center gap-2 text-[10px] mb-2 uppercase tracking-wider">
            <span className="text-accent font-bold">
              {categoryLabel}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-slate-400">{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-primary text-sm md:text-base leading-snug group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Author */}
          <span className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 uppercase tracking-wider">
            <User className="h-2.5 w-2.5" />
            {post.author}
          </span>
        </div>
      </article>
    </LocalizedLink>
  )
}

export function BlogCard({ post, lang, variant = "standard" }: BlogCardProps) {
  // Return null if no post provided
  if (!post) return null

  switch (variant) {
    case "featured":
      return <FeaturedCard post={post} lang={lang} />
    case "compact":
      return <CompactCard post={post} lang={lang} />
    default:
      return <StandardCard post={post} lang={lang} />
  }
}
