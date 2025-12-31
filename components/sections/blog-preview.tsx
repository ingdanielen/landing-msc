"use client"

import { type Language } from "@/lib/content"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Calendar, Tag, FileText } from "lucide-react"
import type { BlogPostPreview } from "@/lib/blog-types"
import { formatBlogDate, getCategoryLabel } from "@/lib/blog-types"
import { useState } from "react"

interface BlogPreviewProps {
  lang: Language
  posts: BlogPostPreview[]
}

// Safe image component
function SafeBlogImage({ 
  src, 
  alt,
  fill = false,
  sizes,
  className
}: { 
  src?: string | null
  alt?: string | null
  fill?: boolean
  sizes?: string
  className?: string
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
      className={className}
      sizes={sizes}
      quality={60}
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}

// Get safe post data
function getSafePost(post: BlogPostPreview | null | undefined) {
  if (!post) return null
  
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

/** Card grande para artículo destacado */
function FeaturedCard({ post: rawPost, lang }: { post: BlogPostPreview; lang: Language }) {
  const post = getSafePost(rawPost)
  
  if (!post || !post.isValid) return null

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <article className="relative h-[420px] overflow-hidden bg-primary">
        {/* Background Image */}
        <SafeBlogImage
          src={post.featured_image}
          alt={post.featured_image_alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Category */}
          <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-medium px-2.5 py-1 rounded w-fit mb-3">
            <Tag className="h-3 w-3" />
            {getCategoryLabel(post.category)}
          </span>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-hero group-hover:text-accent transition-colors line-clamp-3">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          {/* Meta */}
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>{post.author}</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatBlogDate(post.date)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

/** Card pequeña para artículos secundarios */
function SmallCard({ post: rawPost, lang }: { post: BlogPostPreview; lang: Language }) {
  const post = getSafePost(rawPost)
  
  if (!post || !post.isValid) return null

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="flex gap-4 h-[120px] bg-white border border-slate-200 hover:border-accent/50 transition-all overflow-hidden">
        {/* Image */}
        <div className="relative w-[140px] shrink-0 overflow-hidden bg-slate-100">
          <SafeBlogImage
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="140px"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col justify-center py-3 pr-4 min-w-0">
          {/* Category & Date */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-accent font-medium truncate">
              {getCategoryLabel(post.category)}
            </span>
            <span className="text-xs text-slate-500 shrink-0">
              {formatBlogDate(post.date)}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
            {post.title}
          </h3>
          
          {/* Author */}
          <span className="text-xs text-slate-500">
            {post.author}
          </span>
        </div>
      </article>
    </Link>
  )
}

export function BlogPreview({ lang, posts }: BlogPreviewProps) {
  // Filter valid posts
  const validPosts = (posts || [])
    .filter(post => post && post.slug)
  
  // Necesitamos al menos 1 post para mostrar
  if (validPosts.length === 0) return null
  
  // El primer post es el destacado, los siguientes 3 son los pequeños
  const featuredPost = validPosts[0]
  const smallPosts = validPosts.slice(1, 4)

  return (
    <section id="blog" className="py-24 section-ocean-alt">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
            {lang === "es" ? "Noticias y Publicaciones" : lang === "zh" ? "新闻与出版物" : "News and Publications"}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Artículos técnicos, noticias de la industria y actualizaciones normativas."
              : lang === "zh"
              ? "技术文章、行业新闻和法规更新。"
              : "Technical articles, industry news and regulatory updates."}
          </p>
        </motion.div>

        {/* Grid: 1 grande a la izquierda + 3 pequeños a la derecha */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Featured Article - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <FeaturedCard post={featuredPost} lang={lang} />
          </motion.div>
          
          {/* Small Articles - Right */}
          <div className="flex flex-col gap-4">
            {smallPosts.map((post, idx) => (
              <motion.div
                key={post.slug || idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <SmallCard post={post} lang={lang} />
              </motion.div>
            ))}
            
            {/* Si no hay suficientes posts, rellenar con placeholder */}
            {smallPosts.length < 3 && (
              <div className="flex-1 flex items-center justify-center border border-dashed border-slate-300 bg-slate-50/50 min-h-[120px]">
                <span className="text-slate-500 text-sm">
                  {lang === "es" ? "Más artículos próximamente" : "More articles coming soon"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blog">
            <button className="text-accent hover:text-primary font-semibold text-sm uppercase tracking-wide flex items-center gap-2 mx-auto group">
              {lang === "es" ? "Ver todas las publicaciones" : lang === "zh" ? "查看所有出版物" : "View all publications"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
