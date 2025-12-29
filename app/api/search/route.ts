import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'
import { getAllGalleryItems } from '@/lib/gallery'

export interface SearchResult {
  id: string
  title: string
  description: string
  href: string
  type: 'page' | 'blog' | 'gallery'
  image?: string
  category?: string
}

// Paginas estaticas
const staticPages: SearchResult[] = [
  { id: 'home', title: 'Inicio', description: 'Pagina principal de MSC', href: '/', type: 'page' },
  { id: 'about', title: 'Sobre Nosotros', description: 'Conoce nuestra historia y mision', href: '/about', type: 'page' },
  { id: 'services', title: 'Servicios', description: 'Inspecciones maritimas y consultoria', href: '/services', type: 'page' },
  { id: 'compliance', title: 'Calidad y Cumplimiento', description: 'Certificaciones ISO y estandares', href: '/compliance', type: 'page' },
  { id: 'team', title: 'Nuestro Equipo', description: 'Profesionales maritimos certificados', href: '/team', type: 'page' },
  { id: 'contact', title: 'Contacto', description: 'Comunicate con nosotros', href: '/contact', type: 'page' },
  { id: 'blog', title: 'Blog', description: 'Noticias y publicaciones', href: '/blog', type: 'page' },
  { id: 'gallery', title: 'Galeria', description: 'Imagenes de nuestras operaciones', href: '/gallery', type: 'page' },
  // Servicios especificos
  { id: 'cargo-inspection', title: 'Inspeccion de Carga', description: 'Supervision de carga y descarga', href: '/services#cargo', type: 'page' },
  { id: 'vessel-survey', title: 'Inspeccion de Buques', description: 'Evaluacion tecnica de embarcaciones', href: '/services#vessel', type: 'page' },
  { id: 'pre-purchase', title: 'Inspeccion Pre-Compra', description: 'Due diligence para adquisiciones', href: '/services#pre-purchase', type: 'page' },
  { id: 'p-and-i', title: 'Servicios P&I', description: 'Asistencia a clubes de proteccion', href: '/services#pandi', type: 'page' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const results: SearchResult[] = []
  
  // Buscar en paginas estaticas
  staticPages.forEach(page => {
    if (
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    ) {
      results.push(page)
    }
  })
  
  // Buscar en articulos del blog
  try {
    const blogPosts = getAllBlogPosts()
    blogPosts.forEach(post => {
      if (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      ) {
        results.push({
          id: `blog-${post.slug}`,
          title: post.title,
          description: post.excerpt.substring(0, 100) + '...',
          href: `/blog/${post.slug}`,
          type: 'blog',
          image: post.featured_image,
          category: post.category,
        })
      }
    })
  } catch (e) {
    console.error('Error searching blog:', e)
  }
  
  // Buscar en galeria
  try {
    const galleryItems = getAllGalleryItems()
    galleryItems.forEach(item => {
      if (
        item.title.toLowerCase().includes(query) ||
        (item.description?.toLowerCase().includes(query)) ||
        (item.location?.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query)
      ) {
        results.push({
          id: `gallery-${item.slug}`,
          title: item.title,
          description: item.description || `Imagen de ${item.category}`,
          href: `/gallery?item=${item.slug}`,
          type: 'gallery',
          image: item.image,
          category: item.category,
        })
      }
    })
  } catch (e) {
    console.error('Error searching gallery:', e)
  }
  
  // Limitar resultados
  const limitedResults = results.slice(0, 10)
  
  return NextResponse.json({ results: limitedResults })
}

