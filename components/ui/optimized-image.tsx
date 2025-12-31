"use client"

import Image, { ImageProps } from "next/image"
import { useState, memo } from "react"
import { ImageIcon } from "lucide-react"

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackClassName?: string
}

/**
 * Componente de imagen optimizado con:
 * - Fallback automático si la imagen falla
 * - Calidad reducida por defecto (50)
 * - Loading lazy por defecto
 * - Manejo de errores
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  fallbackClassName = "",
  quality = 50,
  loading = "lazy",
  sizes,
  priority,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error || !src) {
    return (
      <div 
        className={`bg-slate-200 flex items-center justify-center ${fallbackClassName || className}`}
        style={!fill ? { width, height } : undefined}
      >
        <ImageIcon className="w-8 h-8 text-slate-400" />
      </div>
    )
  }

  const imageProps: ImageProps = {
    src,
    alt: alt || "",
    className: `${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`,
    quality,
    loading: priority ? undefined : loading,
    onError: () => setError(true),
    onLoad: () => setLoaded(true),
    ...props,
  }

  if (fill) {
    return <Image {...imageProps} fill sizes={sizes || "100vw"} priority={priority} />
  }

  return (
    <Image 
      {...imageProps} 
      width={width || 800} 
      height={height || 600} 
      sizes={sizes}
      priority={priority}
    />
  )
})

/**
 * Placeholder blur data URL para imágenes
 * Genera un placeholder muy pequeño que se puede usar mientras carga la imagen
 */
export const shimmerBlur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwYTJhNDMiLz48L3N2Zz4="
