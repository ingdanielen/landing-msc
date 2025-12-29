/**
 * ============================================
 * GALLERY HELPERS - MSC Marine Surveyors
 * ============================================
 * 
 * Helpers para leer y parsear imágenes de la galería desde /content/gallery
 * 
 * ⚠️ IMPORTANTE: Este archivo usa módulos de Node.js (fs, path)
 * Solo debe importarse en Server Components o funciones de servidor.
 * 
 * Para tipos y utilidades en Client Components, usar: lib/gallery-types.ts
 * 
 * Flujo de contenido:
 * 1. Usuario sube/edita imagen en Decap CMS (/admin)
 * 2. Decap CMS hace commit a GitHub
 * 3. Vercel detecta el cambio y redespliega
 * 4. Estos helpers leen el contenido en build time (SSG/ISR)
 * 5. Las imágenes aparecen en la galería del sitio
 * 
 * ============================================
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Re-exportar tipos y utilidades para conveniencia
export type { 
  GalleryCategory, 
  GalleryItemMeta, 
  GalleryItem 
} from './gallery-types'

export { 
  GALLERY_CATEGORY_LABELS, 
  GALLERY_CATEGORY_ICONS,
  getCategoryLabel, 
  getCategoryIcon,
  formatGalleryDate 
} from './gallery-types'

import type { GalleryItem, GalleryCategory } from './gallery-types'

// ============================================
// CONFIGURACIÓN
// ============================================

/** Directorio donde se almacenan los items de la galería */
const GALLERY_DIRECTORY = path.join(process.cwd(), 'content', 'gallery')

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Obtiene todos los slugs de imágenes disponibles.
 * Útil para generateStaticParams() en App Router.
 * 
 * @returns Array de slugs sin la extensión .md
 * 
 * @example
 * // En app/gallery/[slug]/page.tsx
 * export async function generateStaticParams() {
 *   return getAllGallerySlugs().map((slug) => ({ slug }))
 * }
 */
export function getAllGallerySlugs(): string[] {
  if (!fs.existsSync(GALLERY_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(GALLERY_DIRECTORY)
  
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

/**
 * Obtiene todas las imágenes de la galería.
 * Ordenadas por fecha descendente (más recientes primero).
 * 
 * @returns Array de imágenes con metadatos y slug
 * 
 * @example
 * // En app/gallery/page.tsx
 * const items = getAllGalleryItems()
 * // Renderizar galería
 */
export function getAllGalleryItems(includeHidden: boolean = false): GalleryItem[] {
  if (!fs.existsSync(GALLERY_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(GALLERY_DIRECTORY)
  
  const items = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(GALLERY_DIRECTORY, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)
      
      // Filtrar por visibilidad (default: true para compatibilidad)
      const isVisible = data.visible !== false
      
      return {
        slug,
        image: data.image || '',
        title: data.title || '',
        alt: data.alt || data.title || '',
        category: (data.category || 'operaciones') as GalleryCategory,
        date: data.date || '',
        description: data.description,
        location: data.location,
        featured: data.featured || false,
        visible: isVisible,
      } as GalleryItem & { visible: boolean }
    })
    // Filtrar solo visibles a menos que se indique lo contrario
    .filter((item) => includeHidden || item.visible)
  
  // Ordenar por fecha descendente
  return items.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

/**
 * Obtiene una imagen por su slug.
 * 
 * @param slug - El slug de la imagen (nombre del archivo sin .md)
 * @returns La imagen o null si no existe
 * 
 * @example
 * const item = getGalleryItemBySlug('inspeccion-panama')
 * if (!item) notFound()
 */
export function getGalleryItemBySlug(slug: string): GalleryItem | null {
  const filePath = path.join(GALLERY_DIRECTORY, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(fileContent)
  
  return {
    slug,
    image: data.image || '',
    title: data.title || '',
    alt: data.alt || data.title || '',
    category: (data.category || 'operaciones') as GalleryCategory,
    date: data.date || '',
    description: data.description,
    location: data.location,
    featured: data.featured || false,
  }
}

/**
 * Obtiene imágenes filtradas por categoría.
 * 
 * @param category - La categoría por la que filtrar
 * @returns Array de imágenes de esa categoría
 * 
 * @example
 * const vesselPhotos = getGalleryItemsByCategory('buques')
 */
export function getGalleryItemsByCategory(category: GalleryCategory): GalleryItem[] {
  return getAllGalleryItems().filter((item) => item.category === category)
}

/**
 * Obtiene solo las imágenes marcadas como destacadas.
 * 
 * @returns Array de imágenes destacadas
 * 
 * @example
 * const featuredItems = getFeaturedGalleryItems()
 */
export function getFeaturedGalleryItems(): GalleryItem[] {
  return getAllGalleryItems().filter((item) => item.featured)
}

/**
 * Obtiene las N imágenes más recientes.
 * Útil para mostrar en la página de inicio.
 * 
 * @param count - Número de imágenes a obtener (default: 6)
 * @returns Array de las imágenes más recientes
 * 
 * @example
 * // En la página de inicio
 * const recentItems = getRecentGalleryItems(6)
 */
export function getRecentGalleryItems(count: number = 6): GalleryItem[] {
  return getAllGalleryItems().slice(0, count)
}

/**
 * Obtiene todas las categorías únicas que tienen imágenes.
 * 
 * @returns Array de categorías con al menos una imagen
 * 
 * @example
 * const categories = getGalleryCategories()
 * // ['buques', 'carga', 'operaciones']
 */
export function getGalleryCategories(): GalleryCategory[] {
  const items = getAllGalleryItems()
  const categories = new Set(items.map((item) => item.category))
  return Array.from(categories)
}
