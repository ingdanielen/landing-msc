/**
 * ============================================
 * BLOG HELPERS - MSC Marine Surveyors
 * ============================================
 * 
 * Helpers para leer y parsear artículos del blog desde /content/blog
 * 
 * ⚠️ IMPORTANTE: Este archivo usa módulos de Node.js (fs, path)
 * Solo debe importarse en Server Components o funciones de servidor.
 * 
 * Para tipos y utilidades en Client Components, usar: lib/blog-types.ts
 * 
 * Flujo de contenido:
 * 1. Usuario crea/edita artículo en Decap CMS (/admin)
 * 2. Decap CMS hace commit a GitHub
 * 3. Vercel detecta el cambio y redespliega
 * 4. Estos helpers leen el contenido en build time (SSG/ISR)
 * 5. El contenido aparece en la UI del sitio
 * 
 * ============================================
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Re-exportar tipos y utilidades para conveniencia
export type { 
  BlogCategory, 
  BlogPostMeta, 
  BlogPost, 
  BlogPostPreview 
} from './blog-types'

export { 
  getCategoryLabel, 
  formatBlogDate 
} from './blog-types'

import type { BlogPost, BlogPostPreview, BlogCategory } from './blog-types'

// ============================================
// CONFIGURACIÓN
// ============================================

/** Directorio donde se almacenan los artículos del blog */
const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog')

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Obtiene todos los slugs de artículos disponibles.
 * Útil para generateStaticParams() en App Router.
 * 
 * @returns Array de slugs sin la extensión .md
 * 
 * @example
 * // En app/blog/[slug]/page.tsx
 * export async function generateStaticParams() {
 *   return getAllBlogSlugs().map((slug) => ({ slug }))
 * }
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIRECTORY)
  
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

/**
 * Obtiene todos los artículos para listados (sin contenido completo).
 * Ordenados por fecha descendente (más recientes primero).
 * 
 * @returns Array de artículos con metadatos y slug
 * 
 * @example
 * // En app/blog/page.tsx
 * const posts = getAllBlogPosts()
 * // Renderizar lista de artículos
 */
export function getAllBlogPosts(includeUnpublished: boolean = false): BlogPostPreview[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIRECTORY)
  
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(BLOG_DIRECTORY, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)
      
      // Filtrar por estado publicado (default: true para compatibilidad)
      const isPublished = data.published !== false
      
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: (data.category || 'Noticias') as BlogCategory,
        featured_image: data.featured_image || '',
        featured_image_alt: data.featured_image_alt || '',
        excerpt: data.excerpt || '',
        author: data.author,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        published: isPublished,
      } as BlogPostPreview & { published: boolean }
    })
    // Filtrar solo publicados a menos que se indique lo contrario
    .filter((post) => includeUnpublished || post.published)
  
  // Ordenar por fecha descendente
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

/**
 * Obtiene un artículo completo por su slug.
 * Incluye el contenido en Markdown.
 * 
 * @param slug - El slug del artículo (nombre del archivo sin .md)
 * @returns El artículo completo o null si no existe
 * 
 * @example
 * // En app/blog/[slug]/page.tsx
 * const post = getBlogPostBySlug(params.slug)
 * if (!post) notFound()
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: (data.category || 'noticias') as BlogCategory,
    featured_image: data.featured_image || '',
    featured_image_alt: data.featured_image_alt || '',
    excerpt: data.excerpt || '',
    author: data.author,
    seo_title: data.seo_title,
    seo_description: data.seo_description,
    content,
  }
}

/**
 * Obtiene artículos filtrados por categoría.
 * 
 * @param category - La categoría por la que filtrar
 * @returns Array de artículos de esa categoría
 * 
 * @example
 * const technicalPosts = getBlogPostsByCategory('tecnico')
 */
export function getBlogPostsByCategory(category: BlogCategory): BlogPostPreview[] {
  return getAllBlogPosts().filter((post) => post.category === category)
}

/**
 * Obtiene los N artículos más recientes.
 * Útil para mostrar en la página de inicio.
 * 
 * @param count - Número de artículos a obtener (default: 3)
 * @returns Array de los artículos más recientes
 * 
 * @example
 * // En la página de inicio
 * const recentPosts = getRecentBlogPosts(3)
 */
export function getRecentBlogPosts(count: number = 3): BlogPostPreview[] {
  return getAllBlogPosts().slice(0, count)
}
