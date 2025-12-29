"use client"

import { useLang } from "@/components/lang-provider"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from "lucide-react"
import { type BlogPost, getCategoryLabel, estimateReadTime } from "@/lib/blog-types"
import { HeroText } from "@/components/ui/hero-text"

interface BlogPostClientProps {
  post: BlogPost & { dateFormatted: string }
}

/**
 * Aplica Reversal solo a caracteres alfanuméricos en un texto.
 * Para caracteres especiales usa fuente de sistema.
 */
function applyReversalFont(text: string): string {
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
    .replace(/^---$/gim, '<hr class="article-hr" />')
    .replace(/`([^`]+)`/g, '<code class="article-code">$1</code>')
    .replace(/^(?!<[hlubc]|<bl|<li|<hr)(.*$)/gim, (match) => {
      if (match.trim() === '' || match.startsWith('<')) return match
      return `<p class="article-p">${match}</p>`
    })
    .replace(/<p class="[^"]*"><\/p>/g, '')
}

/** Determina el tamaño del título basado en su longitud */
function getTitleSizeClass(title: string): string {
  const length = title.length
  
  if (length < 40) {
    // Títulos cortos: tamaño grande
    return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
  } else if (length < 70) {
    // Títulos medianos: tamaño medio
    return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
  } else if (length < 100) {
    // Títulos largos: tamaño más pequeño
    return "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
  } else {
    // Títulos muy largos: tamaño mínimo
    return "text-lg sm:text-xl md:text-2xl lg:text-3xl"
  }
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { lang } = useLang()
  
  const readTime = estimateReadTime(post.content)
  const categoryLabel = getCategoryLabel(post.category)
  const titleSizeClass = getTitleSizeClass(post.title)
  
  const labels = {
    back: { es: "Volver al blog", en: "Back to blog", zh: "返回博客" },
    minRead: { es: "min de lectura", en: "min read", zh: "分钟阅读" },
    share: { es: "Compartir", en: "Share", zh: "分享" },
    writtenBy: { es: "Escrito por", en: "Written by", zh: "作者" },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Altura fija, no depende de la imagen */}
      <section className="relative h-[75dvh]  flex items-end overflow-hidden">
        {/* Background Image - Siempre cubre el área completa */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/70 to-primary/40" />
        </div>
        
        {/* Content - Con padding-top para el header transparente */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-28 md:pt-36 pb-16 md:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/50 text-xs md:text-sm mb-5"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70 truncate max-w-[200px]">{post.title}</span>
          </motion.nav>
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-medium px-3 py-1.5 rounded">
              <Tag className="w-3 h-3" />
              {categoryLabel}
            </span>
          </motion.div>
          
          {/* Title - Tamaño dinámico según longitud */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <HeroText
              as="h1"
              className={`${titleSizeClass} text-white leading-[1.15] max-w-6xl mb-5`}
            >
              {post.title}
            </HeroText>
          </motion.div>
          
          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/75 text-sm md:text-base max-w-3xl mb-6 leading-relaxed line-clamp-3"
          >
            {post.excerpt}
          </motion.p>
          
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 text-xs md:text-sm"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.dateFormatted}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} {labels.minRead[lang]}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            )}
          </motion.div>
        </div>

        {/* Waves - Altura fija */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 z-[5]">
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slower" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.2)" d="M0,40 C360,25 720,55 1080,40 C1440,25 1800,55 2160,40 C2520,25 2880,55 2880,40 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.4)" d="M0,50 C360,38 720,62 1080,50 C1440,38 1800,62 2160,50 C2520,38 2880,62 2880,50 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.6)" d="M0,58 C360,50 720,66 1080,58 C1440,50 1800,66 2160,58 C2520,50 2880,66 2880,58 L2880,80 L0,80 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path fill="white" d="M0,68 C360,62 720,74 1080,68 C1440,62 1800,74 2160,68 C2520,62 2880,74 2880,68 L2880,80 L0,80 Z"/>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="article-content"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
            
            {/* Author Card */}
            {post.author && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 pt-6 border-t border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">
                      {labels.writtenBy[lang]}
                    </p>
                    <p className="text-base font-semibold text-slate-800">{post.author}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Footer Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between"
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
                  if (navigator.share) {
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
