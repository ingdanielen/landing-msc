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
 * Componente que renderiza texto con la fuente Reversal SOLO para LETRAS,
 * y usa Space Grotesk para TODO lo demás (números, espacios, símbolos, puntuación).
 * 
 * La fuente Reversal demo no soporta caracteres especiales correctamente,
 * por lo que solo se aplica a letras A-Z y a-z.
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
    
    const result: { char: string; useReversal: boolean }[] = []
    
    for (const char of content) {
      // SOLO letras A-Z y a-z usan Reversal
      // Todo lo demás (números, espacios, tildes, símbolos, puntuación) usa Space Grotesk
      const isLetter = /^[a-zA-Z]$/.test(char)
      result.push({
        char,
        useReversal: isLetter,
      })
    }
    
    return result
  }, [content])

  if (!content) return null

  return (
    <Component className={className}>
      {segments.map((segment, idx) => (
        <span
          key={idx}
          style={{
            fontFamily: segment.useReversal 
              ? "'Reversal', var(--font-space-grotesk), system-ui, sans-serif" 
              : "var(--font-space-grotesk), system-ui, sans-serif",
            fontWeight: 'inherit',
          }}
        >
          {segment.char}
        </span>
      ))}
    </Component>
  )
}
