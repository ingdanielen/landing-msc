"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Phone, Shield } from "lucide-react"
import { type Language, content } from "@/lib/content"
import { memo, useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { useLang } from "@/components/lang-provider"

// Olas CSS puras - posicionadas exactamente en el bottom
const AnimatedWaves = memo(function AnimatedWaves() {
  return (
    <div 
      className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
      style={{ height: '120px' }}
    >
      {/* Wave 1 - más lenta y transparente */}
      <svg 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow"
        viewBox="0 0 2880 120" 
        preserveAspectRatio="none"
      >
        <path 
          fill="rgba(255,255,255,0.15)" 
          d="M0,40 C360,20 720,60 1080,40 C1440,20 1800,60 2160,40 C2520,20 2880,60 2880,40 L2880,120 L0,120 Z"
        />
      </svg>
      
      {/* Wave 2 - velocidad media */}
      <svg 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium"
        viewBox="0 0 2880 120" 
        preserveAspectRatio="none"
      >
        <path 
          fill="rgba(255,255,255,0.3)" 
          d="M0,60 C360,45 720,75 1080,60 C1440,45 1800,75 2160,60 C2520,45 2880,75 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
      
      {/* Wave 3 - más rápida y opaca (la que está más al frente) */}
      <svg 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast"
        viewBox="0 0 2880 120" 
        preserveAspectRatio="none"
      >
        <path 
          fill="rgba(255,255,255,0.6)" 
          d="M0,80 C360,70 720,90 1080,80 C1440,70 1800,90 2160,80 C2520,70 2880,90 2880,80 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  )
})

// Contenido memoizado para evitar re-renders
const HeroContent = memo(function HeroContent({ 
  t,
  translatePath,
  fadeIn 
}: { 
  t: { title: string; subtitle: string; description: string; ctaPrimary: string; ctaSecondary: string }
  translatePath: (path: string) => string
  fadeIn: { initial: { opacity: number; y: number }; animate: { opacity: number; y: number } }
}) {
  return (
    <div className="container mx-auto relative z-10 px-4 md:px-6 pt-28 pb-48">
      <div className="max-w-4xl">
        {/* Tagline */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center text-accent text-sm font-medium tracking-widest uppercase">
            Marine Surveyors & Consultants
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-4"
        >
          {t.title.split(".")[0]}.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeIn}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-accent italic mb-6"
        >
          {t.title.split(".")[1] || t.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeIn}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mb-8"
        >
          {t.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <Link href={translatePath("/contact")}>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-accent rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02]">
              <span className="relative z-10 flex items-center gap-2">
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-accent to-accent/80" />
            </button>
          </Link>
          <Link href="tel:+50765980679">
            <button className="group inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-white/5 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30">
              <Phone className="mr-2 h-4 w-4" />
              {t.ctaSecondary}
            </button>
          </Link>
        </motion.div>

        {/* Certifications */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex items-center gap-3 text-white/40 text-xs"
        >
          <Shield className="h-3.5 w-3.5" />
          <span className="font-medium tracking-wide">ISO 9001:2015</span>
          <span className="text-white/20">•</span>
          <span className="font-medium tracking-wide">IMO</span>
          <span className="text-white/20">•</span>
          <span className="font-medium tracking-wide">SOLAS</span>
        </motion.div>
      </div>
    </div>
  )
})

// Hook para manejar el crossfade de videos (solo desktop)
function useVideoLoop() {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleVideoEnd = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // Preparar el siguiente video
    const nextVideo = activeVideo === 'A' ? videoBRef.current : videoARef.current
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play().catch(() => {})
    }
    
    // Cambiar al siguiente video con crossfade
    setTimeout(() => {
      setActiveVideo(prev => prev === 'A' ? 'B' : 'A')
      setIsTransitioning(false)
    }, 50)
  }, [activeVideo, isTransitioning])

  useEffect(() => {
    const videoA = videoARef.current
    const videoB = videoBRef.current
    
    if (!videoA || !videoB) return

    // Iniciar video A
    videoA.play().catch(() => {
      setTimeout(() => videoA.play().catch(() => {}), 100)
    })

    // Detectar cuando el video está por terminar para hacer crossfade
    const checkTime = () => {
      const currentVideo = activeVideo === 'A' ? videoA : videoB
      if (!currentVideo.duration) return
      
      const timeLeft = currentVideo.duration - currentVideo.currentTime
      if (timeLeft <= 0.6 && !isTransitioning) {
        handleVideoEnd()
      }
    }

    const interval = setInterval(checkTime, 100)
    return () => clearInterval(interval)
  }, [activeVideo, isTransitioning, handleVideoEnd])

  return { videoARef, videoBRef, activeVideo }
}

export function Hero({ lang }: { lang: Language }) {
  const t = content[lang].hero
  const { translatePath } = useLang()
  const { videoARef, videoBRef, activeVideo } = useVideoLoop()

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center"
    >
      {/* Background - Videos con crossfade seamless */}
      <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
        {/* Video para Desktop */}
        <video
          ref={videoARef}
          src="/videos/right-hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out hidden md:block"
          style={{ 
            transform: 'translateZ(0)',
            opacity: activeVideo === 'A' ? 1 : 0 
          }}
          aria-hidden="true"
        />
        
        {/* Video B Desktop (clon para crossfade) */}
        <video
          ref={videoBRef}
          src="/videos/right-hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out hidden md:block"
          style={{ 
            transform: 'translateZ(0)',
            opacity: activeVideo === 'B' ? 1 : 0 
          }}
          aria-hidden="true"
        />
        
        {/* Video para Mobile - loop simple */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          style={{ transform: 'translateZ(0)' }}
          aria-hidden="true"
        >
          <source src="/videos/hero-sections.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/85 via-primary/70 to-primary/40" />
      </div>

      {/* Animated Waves - exactamente en el bottom */}
      <AnimatedWaves />

      {/* Content */}
      <HeroContent t={t} translatePath={translatePath} fadeIn={fadeIn} />
    </section>
  )
}
