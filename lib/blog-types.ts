/**
 * ============================================
 * BLOG TYPES & UTILITIES - MSC Marine Surveyors
 * ============================================
 * 
 * Tipos y utilidades que pueden usarse tanto en server como en client components.
 * NO contiene código que dependa de Node.js (fs, path).
 * 
 * ============================================
 */

// ============================================
// TIPOS
// ============================================

/** Categorías del blog - ahora acepta cualquier string personalizado */
export type BlogCategory = string

/** Metadatos del frontmatter de un artículo */
export interface BlogPostMeta {
  /** Título del artículo */
  title: string
  /** Fecha de publicación en formato ISO */
  date: string
  /** Categoría del artículo (personalizable) */
  category: BlogCategory
  /** Ruta a la imagen destacada */
  featured_image: string
  /** Alt text de la imagen destacada */
  featured_image_alt: string
  /** Extracto/resumen del artículo */
  excerpt: string
  /** Nombre del autor (opcional) */
  author?: string
  /** Título SEO alternativo (opcional) */
  seo_title?: string
  /** Descripción SEO (opcional) */
  seo_description?: string
}

/** Artículo completo incluyendo contenido y slug */
export interface BlogPost extends BlogPostMeta {
  /** Slug único derivado del nombre del archivo */
  slug: string
  /** Contenido en Markdown */
  content: string
}

/** Artículo para listados (sin contenido completo) */
export interface BlogPostPreview extends BlogPostMeta {
  /** Slug único derivado del nombre del archivo */
  slug: string
}

// ============================================
// UTILIDADES (Client-safe)
// ============================================

/** Mapeo de categorías predefinidas a etiquetas con emojis */
const PREDEFINED_CATEGORIES: Record<string, { label: string; emoji: string; color: string }> = {
  // Español
  'noticias': { label: 'Noticias', emoji: '📰', color: 'blue' },
  'normativas': { label: 'Normativas', emoji: '📋', color: 'purple' },
  'tecnico': { label: 'Técnico', emoji: '🔧', color: 'orange' },
  'empresa': { label: 'Empresa', emoji: '🏢', color: 'green' },
  'educativo': { label: 'Educativo', emoji: '📚', color: 'teal' },
  // Variantes con mayúsculas/acentos
  'Noticias': { label: 'Noticias', emoji: '📰', color: 'blue' },
  'Normativas': { label: 'Normativas', emoji: '📋', color: 'purple' },
  'Técnico': { label: 'Técnico', emoji: '🔧', color: 'orange' },
  'Empresa': { label: 'Empresa', emoji: '🏢', color: 'green' },
  'Educativo': { label: 'Educativo', emoji: '📚', color: 'teal' },
  // Inglés
  'news': { label: 'News', emoji: '📰', color: 'blue' },
  'regulations': { label: 'Regulations', emoji: '📋', color: 'purple' },
  'technical': { label: 'Technical', emoji: '🔧', color: 'orange' },
  'company': { label: 'Company', emoji: '🏢', color: 'green' },
  'educational': { label: 'Educational', emoji: '📚', color: 'teal' },
}

/**
 * Obtiene la etiqueta legible de una categoría.
 * Si es una categoría predefinida, devuelve su label.
 * Si es personalizada, capitaliza la primera letra.
 */
export function getCategoryLabel(category: BlogCategory): string {
  const predefined = PREDEFINED_CATEGORIES[category.toLowerCase()]
  if (predefined) return predefined.label
  
  // Capitalizar primera letra para categorías personalizadas
  return category.charAt(0).toUpperCase() + category.slice(1)
}

/**
 * Obtiene el emoji de una categoría.
 * Si no tiene uno predefinido, devuelve un emoji genérico.
 */
export function getCategoryEmoji(category: BlogCategory): string {
  const predefined = PREDEFINED_CATEGORIES[category.toLowerCase()]
  return predefined?.emoji || '📄'
}

/**
 * Obtiene el color de una categoría para badges.
 * Si no tiene uno predefinido, devuelve 'slate'.
 */
export function getCategoryColor(category: BlogCategory): string {
  const predefined = PREDEFINED_CATEGORIES[category.toLowerCase()]
  return predefined?.color || 'slate'
}

/**
 * Formatea una fecha ISO a formato legible.
 */
export function formatBlogDate(dateString: string, locale: string = 'es-PA'): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calcula tiempo estimado de lectura.
 */
export function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(2, Math.ceil(words / 200))
}
