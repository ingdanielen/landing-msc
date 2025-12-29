"use client"

import { useMemo } from "react"

interface HeroTextProps {
  /** Texto a renderizar (puede usar children o text) */
  children?: string
  text?: string
  /** Clases CSS adicionales */
  className?: string
  /** Elemento HTML a usar */
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div"
}

/**
 * Componente que renderiza texto con la fuente Reversal,
 * pero usa una fuente de sistema para caracteres especiales
 * (puntuación, símbolos, etc.) ya que la fuente Reversal demo
 * no los soporta correctamente.
 * 
 * @example
 * <HeroText as="h1" className="text-4xl">
 *   News & Insights
 * </HeroText>
 * 
 * @example
 * <HeroText text="Pre-Compra de Buques" as="h2" />
 */
export function HeroText({ 
  children, 
  text,
  className = "", 
  as: Component = "h1" 
}: HeroTextProps) {
  const content = text || children || ""
  
  const segments = useMemo(() => {
    if (!content) return []
    
    // Regex para separar letras/números de caracteres especiales
    // Letras (incluyendo acentuadas) y números van con Reversal
    // Todo lo demás (espacios, puntuación, símbolos) va con fuente de sistema
    const regex = /([a-zA-Z0-9\u00C0-\u024F]+)|([^a-zA-Z0-9\u00C0-\u024F]+)/g
    const parts: { text: string; isAlphanumeric: boolean }[] = []
    
    let match
    while ((match = regex.exec(content)) !== null) {
      const isAlphanumeric = !!match[1]
      parts.push({
        text: match[0],
        isAlphanumeric,
      })
    }
    
    return parts
  }, [content])

  if (!content) return null

  return (
    <Component className={className}>
      {segments.map((segment, idx) => (
        <span
          key={idx}
          style={{
            fontFamily: segment.isAlphanumeric 
              ? "'Reversal', ui-sans-serif, system-ui, sans-serif" 
              : "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: segment.isAlphanumeric ? 'normal' : 'inherit',
          }}
        >
          {segment.text}
        </span>
      ))}
    </Component>
  )
}
