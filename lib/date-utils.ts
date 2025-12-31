/**
 * Utilidades de fecha - Client-safe
 * No depende de módulos de Node.js
 */

/**
 * Formatea una fecha ISO a formato legible en español.
 * 
 * @param dateString - Fecha en formato ISO o YYYY-MM-DD
 * @param locale - Locale para el formato (default: 'es-PA')
 * @returns Fecha formateada "15 de enero de 2025"
 */
export function formatDate(dateString: string, locale: string = 'es-PA'): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Formatea una fecha a formato corto
 * 
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada "15 ene 2025"
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-PA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Formatea una fecha relativa (hace X días)
 * 
 * @param dateString - Fecha en formato ISO
 * @returns Texto relativo como "hace 3 días"
 */
export function formatDateRelative(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Ayer'
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
    return `Hace ${Math.floor(diffDays / 365)} años`
  } catch {
    return dateString
  }
}

