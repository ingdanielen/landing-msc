"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Shield } from "lucide-react"
import { type Language, content } from "@/lib/content"
import { memo, useEffect, useRef } from "react"
import Link from "next/link"

// Olas CSS puras - más performantes que SVG
const AnimatedWaves = memo(function AnimatedWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 overflow-hidden z-5 pointer-events-none">
      <div 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 2880 120\'%3E%3Cpath fill=\'rgba(255,255,255,0.15)\' d=\'M0,60 C360,40 720,80 1080,60 C1440,40 1800,80 2160,60 C2520,40 2880,80 2880,60 L2880,120 L0,120 Z\'/%3E%3C/svg%3E") repeat-x bottom/2880px 100%',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 2880 120\'%3E%3Cpath fill=\'rgba(255,255,255,0.3)\' d=\'M0,80 C360,60 720,100 1080,80 C1440,60 1800,100 2160,80 C2520,60 2880,100 2880,80 L2880,120 L0,120 Z\'/%3E%3C/svg%3E") repeat-x bottom/2880px 100%',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 2880 120\'%3E%3Cpath fill=\'rgba(255,255,255,0.6)\' d=\'M0,95 C360,85 720,105 1080,95 C1440,85 1800,105 2160,95 C2520,85 2880,105 2880,95 L2880,120 L0,120 Z\'/%3E%3C/svg%3E") repeat-x bottom/2880px 100%',
          willChange: 'transform',
        }}
      />
    </div>
  )
})

// Contenido memoizado para evitar re-renders
const HeroContent = memo(function HeroContent({ 
  t, 
  fadeIn 
}: { 
  t: { title: string; subtitle: string; description: string; ctaPrimary: string; ctaSecondary: string }
  fadeIn: { initial: { opacity: number; y: number }; animate: { opacity: number; y: number } }
}) {
  return (
    <div className="container mx-auto relative z-10 px-4 md:px-6 pt-28 pb-40">
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
          <Link href="/contact">
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

export function Hero({ lang }: { lang: Language }) {
  const t = content[lang].hero
  const videoRef = useRef<HTMLVideoElement>(null)

  // Optimización: forzar reproducción inmediata
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    // Forzar inicio de reproducción
    const playVideo = () => {
      video.play().catch(() => {
        // Retry silencioso si falla
        setTimeout(() => video.play().catch(() => {}), 100)
      })
    }
    
    if (video.readyState >= 2) {
      playVideo()
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true })
    }
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      {/* Background - Video ultra optimizado */}
      <div 
        className="absolute inset-0 z-0 bg-primary"
        style={{ contain: 'strict' }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            willChange: 'auto',
            transform: 'translateZ(0)', // Force GPU
          }}
          aria-hidden="true"
        >
          <source src="/images/videos/hero-1.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay degradado - GPU optimizado */}
        <div 
          className="absolute inset-0 bg-linear-to-b from-primary/85 via-primary/70 to-primary/50"
          style={{ willChange: 'auto' }}
        />
      </div>

      {/* Animated Waves - CSS optimizado */}
      <AnimatedWaves />

      {/* Content - Memoizado */}
      <HeroContent t={t} fadeIn={fadeIn} />
    </section>
  )
}
