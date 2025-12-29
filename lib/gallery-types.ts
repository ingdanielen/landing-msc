/**
 * ============================================
 * GALLERY TYPES & UTILITIES - MSC Marine Surveyors
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

/** Categorías disponibles para imágenes de la galería */
export type GalleryCategory = 
  | 'buques' 
  | 'carga' 
  | 'puertos' 
  | 'consultoria' 
  | 'operaciones' 
  | 'equipo'

/** Metadatos de una imagen de la galería */
export interface GalleryItemMeta {
  /** Ruta a la imagen */
  image: string
  /** Título de la imagen */
  title: string
  /** Alt text de la imagen */
  alt: string
  /** Categoría de la imagen */
  category: GalleryCategory
  /** Fecha en que se tomó la foto */
  date: string
  /** Descripción adicional (opcional) */
  description?: string
  /** Ubicación donde se tomó (opcional) */
  location?: string
  /** Si es imagen destacada */
  featured?: boolean
}

/** Imagen completa con slug */
export interface GalleryItem extends GalleryItemMeta {
  /** Slug único derivado del nombre del archivo */
  slug: string
}

// ============================================
// UTILIDADES (Client-safe)
// ============================================

/** Mapeo de categorías a etiquetas legibles */
export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  buques: 'Inspecciones de Buques',
  carga: 'Inspecciones de Carga',
  puertos: 'Puertos y Terminales',
  consultoria: 'Consultoría',
  operaciones: 'Operaciones de Campo',
  equipo: 'Equipo MSC',
}

/** Mapeo de categorías a emojis para UI */
export const GALLERY_CATEGORY_ICONS: Record<GalleryCategory, string> = {
  buques: '🚢',
  carga: '📦',
  puertos: '⚓',
  consultoria: '🔍',
  operaciones: '🛠',
  equipo: '👥',
}

/**
 * Obtiene la etiqueta legible de una categoría.
 * 
 * @param category - La categoría
 * @returns Etiqueta en español
 */
export function getCategoryLabel(category: GalleryCategory): string {
  return GALLERY_CATEGORY_LABELS[category] || category
}

/**
 * Obtiene el emoji de una categoría.
 * 
 * @param category - La categoría
 * @returns Emoji representativo
 */
export function getCategoryIcon(category: GalleryCategory): string {
  return GALLERY_CATEGORY_ICONS[category] || '📷'
}

/**
 * Formatea una fecha ISO a formato legible.
 * 
 * @param dateString - Fecha en formato ISO o YYYY-MM-DD
 * @param locale - Locale para el formato (default: 'es-PA')
 * @returns Fecha formateada
 * 
 * @example
 * formatGalleryDate('2024-12-10')
 * // '10 de diciembre de 2024'
 */
export function formatGalleryDate(dateString: string, locale: string = 'es-PA'): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

