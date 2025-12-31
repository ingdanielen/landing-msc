"use client"

import { useLang } from "@/components/lang-provider"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, ChevronRight, FileText } from "lucide-react"
import { type BlogPost, getCategoryLabel, estimateReadTime } from "@/lib/blog-types"
import { HeroText } from "@/components/ui/hero-text"

interface BlogPostClientProps {
  post: BlogPost & { dateFormatted: string }
}

// Safe image component
function SafeHeroImage({ 
  src, 
  alt,
  style
}: { 
  src?: string | null
  alt?: string | null
  style?: React.CSSProperties
}) {
  const [error, setError] = useState(false)
  const safeSrc = src && src.trim() ? src : "/placeholder.jpg"
  const safeAlt = alt || "Imagen del artículo"

  if (error) {
    return (
      <div className="absolute inset-0 bg-slate-700 flex items-center justify-center" style={style}>
        <FileText className="w-20 h-20 text-slate-500" />
      </div>
    )
  }

  return (
    <Image
      src={safeSrc}
      alt={safeAlt}
      fill
      priority
      className="object-cover"
      sizes="100vw"
      onError={() => setError(true)}
    />
  )
}

// Get safe post data
function getSafePost(post: (BlogPost & { dateFormatted: string }) | null | undefined, lang: string) {
  const defaultPost = {
    slug: "",
    title: lang === "es" ? "Sin título" : "No title",
    excerpt: "",
    content: "",
    date: new Date().toISOString(),
    dateFormatted: new Date().toLocaleDateString(),
    category: "Noticias",
    featured_image: "/placeholder.jpg",
    featured_image_alt: "Imagen del artículo",
    author: "MSC Team",
    reading_time: undefined as string | undefined,
    isValid: false
  }

  if (!post) return defaultPost
  
  return {
    slug: post.slug || "",
    title: post.title || defaultPost.title,
    excerpt: post.excerpt || "",
    content: post.content || "",
    date: post.date || defaultPost.date,
    dateFormatted: post.dateFormatted || defaultPost.dateFormatted,
    category: post.category || "Noticias",
    featured_image: post.featured_image || defaultPost.featured_image,
    featured_image_alt: post.featured_image_alt || post.title || defaultPost.featured_image_alt,
    author: post.author || "MSC Team",
    reading_time: post.reading_time,
    isValid: Boolean(post.slug)
  }
}

/**
 * Aplica Reversal solo a caracteres alfanuméricos en un texto.
 * Para caracteres especiales usa fuente de sistema.
 */
function applyReversalFont(text: string): string {
  if (!text) return ""
  const regex = /([a-zA-Z0-9\u00C0-\u024F]+)|([^a-zA-Z0-9\u00C0-\u024F]+)/g
  let result = ''
  let match
  
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      // Alfanumérico - usar Reversal
      result += `<span style="font-family: 'Reversal', ui-sans-serif, system-ui, sans-serif;">${match[0]}</span>`
    } else {
      // Caracteres especiales - usar sistema
      result += `<span style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;">${match[0]}</span>`
    }
  }
  
  return result
}

/** Renderizar Markdown con estilos editoriales */
function renderMarkdown(content: string): string {
  if (!content) return ""
  
  return content
    // Headers con Reversal para títulos principales
    .replace(/^#### (.*$)/gim, '<h4 class="article-h4">$1</h4>')
    .replace(/^### (.*$)/gim, (_match, p1) => `<h3 class="article-h3">${applyReversalFont(p1)}</h3>`)
    .replace(/^## (.*$)/gim, (_match, p1) => `<h2 class="article-h2">${applyReversalFont(p1)}</h2>`)
    .replace(/^# (.*$)/gim, (_match, p1) => `<h1 class="article-h1">${applyReversalFont(p1)}</h1>`)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-semibold italic">$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="article-li">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="article-li-num">$1</li>')
    .replace(/^> (.*$)/gim, '<blockquote class="article-quote">$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="article-link" target="_blank" rel="noopener">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="article-image" loading="lazy" />')
    .replace(/^---$/gim, '<hr class="article-hr" />')
    .replace(/`([^`]+)`/g, '<code class="article-code">$1</code>')
    .replace(/^(?!<[hlubc]|<bl|<li|<hr|<img)(.*$)/gim, (match) => {
      if (match.trim() === '' || match.startsWith('<')) return match
      return `<p class="article-p">${match}</p>`
    })
    .replace(/<p class="[^"]*"><\/p>/g, '')
}

/** Determina el tamaño del título basado en su longitud */
function getTitleSizeClass(title: string): string {
  const length = (title || "").length
  
  if (length < 40) {
    return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
  } else if (length < 70) {
    return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
  } else if (length < 100) {
    return "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
  } else {
    return "text-lg sm:text-xl md:text-2xl lg:text-3xl"
  }
}

export function BlogPostClient({ post: rawPost }: BlogPostClientProps) {
  const { lang } = useLang()
  const heroRef = useRef<HTMLElement>(null)
  
  const post = getSafePost(rawPost, lang)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  const readTime = post.content ? estimateReadTime(post.content) : 5
  const categoryLabel = getCategoryLabel(post.category)
  const titleSizeClass = getTitleSizeClass(post.title)
  
  const labels = {
    back: { es: "Volver al blog", en: "Back to blog", zh: "返回博客" },
    minRead: { es: "min de lectura", en: "min read", zh: "分钟阅读" },
    share: { es: "Compartir", en: "Share", zh: "分享" },
    writtenBy: { es: "Escrito por", en: "Written by", zh: "作者" },
    noContent: { es: "Contenido no disponible", en: "Content not available", zh: "内容不可用" },
  }

  // If post is not valid, show a fallback
  if (!post.isValid) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-600 mb-2">
            {lang === "es" ? "Artículo no encontrado" : "Article not found"}
          </h1>
          <Link 
            href="/blog"
            className="text-accent hover:underline"
          >
            {labels.back[lang]}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con efecto parallax */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background Image con parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <SafeHeroImage
            src={post.featured_image}
            alt={post.featured_image_alt}
          />
        </motion.div>
        
        {/* Overlay con gradiente dramático - se integra con el navbar transparente */}
        <div className="absolute inset-0 z-[1]">
          {/* Gradiente principal desde abajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00111f] via-[#00111f]/60 to-[#00111f]/20" />
          {/* Gradiente lateral para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00111f]/40 via-transparent to-[#00111f]/20" />
        </div>
        
        {/* Content */}
        <motion.div 
          style={{ y: contentY }}
          className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pb-16 md:pb-20"
        >
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/50 text-xs md:text-sm mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/70 truncate max-w-[200px]">{categoryLabel}</span>
          </motion.nav>
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-accent px-4 py-1.5 rounded text-sm font-semibold text-white uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              {categoryLabel}
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HeroText
              as="h1"
              className={`${titleSizeClass} text-white leading-[1.1] max-w-5xl mb-6`}
            >
              {post.title}
            </HeroText>
          </motion.div>
          
          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-base md:text-lg lg:text-xl max-w-3xl mb-8 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          )}
          
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.dateFormatted}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} {labels.minRead[lang]}
              </span>
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Waves animadas */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 z-[5]">
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slower" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.15)" d="M0,40 C360,25 720,55 1080,40 C1440,25 1800,55 2160,40 C2520,25 2880,55 2880,40 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.3)" d="M0,50 C360,38 720,62 1080,50 C1440,38 1800,62 2160,50 C2520,38 2880,62 2880,50 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.5)" d="M0,58 C360,50 720,66 1080,58 C1440,50 1800,66 2160,58 C2520,50 2880,66 2880,58 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="white" d="M0,68 C360,62 720,74 1080,68 C1440,62 1800,74 2160,68 C2520,62 2880,74 2880,68 L2880,80 L0,80 Z"/>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            {post.content ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="article-content"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />
            ) : (
              <div className="text-center py-12 text-slate-400">
                {labels.noContent[lang]}
              </div>
            )}
            
            {/* Author Card */}
            {post.author && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 p-6 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {(post.author || "M").charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      {labels.writtenBy[lang]}
                    </p>
                    <p className="text-lg font-semibold text-primary">{post.author}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Footer Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between"
            >
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {labels.back[lang]}
              </Link>
              
              <button 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors text-sm"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href })
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                {labels.share[lang]}
              </button>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  )
}
