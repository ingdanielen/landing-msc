"use client"

import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from "lucide-react"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { getCategoryLabelByKey } from "@/lib/admin/i18n"

interface ArticlePreviewProps {
  data: {
    title: string
    slug: string
    date: string
    category: string
    featured_image: string
    featured_image_alt: string
    excerpt: string
    author: string
    content: string
  }
}

/** Estimar tiempo de lectura */
function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
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
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold text-slate-800 mt-6 mb-3">$1</h4>')
    .replace(/^### (.*$)/gim, (_match, p1) => `<h3 class="text-xl font-semibold text-slate-800 mt-8 mb-4 font-display">${applyReversalFont(p1)}</h3>`)
    .replace(/^## (.*$)/gim, (_match, p1) => `<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4 font-display">${applyReversalFont(p1)}</h2>`)
    .replace(/^# (.*$)/gim, (_match, p1) => `<h1 class="text-3xl font-bold text-slate-900 mt-12 mb-5 font-display">${applyReversalFont(p1)}</h1>`)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-semibold italic">$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2 text-slate-600 list-disc">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-slate-600 list-decimal">$1</li>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-accent pl-4 my-6 text-slate-500 italic">$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/^---$/gim, '<hr class="my-8 border-slate-200" />')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-700">$1</code>')
    .replace(/^(?!<[hlubc]|<bl|<li|<hr)(.*$)/gim, (match) => {
      if (match.trim() === '' || match.startsWith('<')) return match
      return `<p class="text-slate-600 leading-relaxed mb-4">${match}</p>`
    })
    .replace(/<p class="[^"]*"><\/p>/g, '')
}

/** Formatear fecha */
function formatDate(dateStr: string, lang: "es" | "en"): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === "es" ? "es-PA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

/** Determinar el tamaño del título */
function getTitleSizeClass(title: string): string {
  const length = title.length
  if (length < 40) return "text-2xl md:text-3xl lg:text-4xl"
  if (length < 70) return "text-xl md:text-2xl lg:text-3xl"
  if (length < 100) return "text-lg md:text-xl lg:text-2xl"
  return "text-base md:text-lg lg:text-xl"
}

export function ArticlePreview({ data }: ArticlePreviewProps) {
  const { t, lang } = useAdminLang()
  
  const readTime = estimateReadTime(data.content)
  const categoryLabel = getCategoryLabelByKey(data.category, lang)
  const titleSizeClass = getTitleSizeClass(data.title)
  const dateFormatted = formatDate(data.date, lang)
  const hasImage = data.featured_image && data.featured_image.trim() !== ""

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {/* Preview Note */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <p className="text-xs text-amber-700 font-medium text-center">
          {t.articleForm.previewNote}
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {hasImage ? (
            <img
              src={data.featured_image}
              alt={data.featured_image_alt || "Preview"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs mb-4">
            <span>Home</span>
            <span className="text-white/30">/</span>
            <span>Blog</span>
            <span className="text-white/30">/</span>
            <span className="text-white/70 truncate max-w-[200px]">
              {data.title || (lang === "es" ? "Sin título" : "No title")}
            </span>
          </nav>
          
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-medium px-3 py-1.5 rounded">
              <Tag className="w-3 h-3" />
              {categoryLabel}
            </span>
          </div>
          
          {/* Title with Reversal font */}
          <h1 
            className={`${titleSizeClass} text-white font-bold leading-tight mb-4 max-w-4xl font-display`}
            dangerouslySetInnerHTML={{ 
              __html: applyReversalFont(data.title || (lang === "es" ? "Sin título" : "No title")) 
            }}
          />
          
          {/* Excerpt */}
          {data.excerpt && (
            <p className="text-white/75 text-sm md:text-base max-w-2xl mb-4 leading-relaxed line-clamp-2">
              {data.excerpt}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {dateFormatted}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime} {t.common.readingTime}
            </span>
            {data.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {data.author}
              </span>
            )}
          </div>
        </div>

        {/* Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-12 z-[5]">
          <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.4)" d="M0,25 C360,15 720,35 1080,25 C1440,15 1440,40 1440,40 L0,40 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path fill="white" d="M0,32 C360,25 720,38 1080,32 C1440,25 1440,40 1440,40 L0,40 Z"/>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          {data.content ? (
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(data.content) }}
            />
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">
                {lang === "es" 
                  ? "El contenido del artículo aparecerá aquí..."
                  : "Article content will appear here..."
                }
              </p>
            </div>
          )}
          
          {/* Author Card */}
          {data.author && (
            <div className="mt-10 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {data.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">
                    {t.common.writtenBy}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">{data.author}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              {t.common.backToBlog}
            </span>
            
            <span className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <Share2 className="w-4 h-4" />
              {t.common.share}
            </span>
          </div>
        </div>
      </article>
    </div>
  )
}
