"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Anchor } from "lucide-react"
import { type Language, content } from "@/lib/content"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function Hero({ lang }: { lang: Language }) {
  const t = content[lang].hero
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isReversing = false

    const handleTimeUpdate = () => {
      // Cuando el video está cerca del final, hacer efecto de rebote
      if (video.currentTime >= video.duration - 0.2 && !isReversing) {
        isReversing = true
        // Reducir velocidad para efecto suave
        video.playbackRate = 0.3
      } else if (video.currentTime >= video.duration - 0.05) {
        // Reiniciar suavemente
        isReversing = false
        video.playbackRate = 1
        video.currentTime = 0
      } else if (video.currentTime < video.duration - 0.5) {
        // Restaurar velocidad normal cuando no está cerca del final
        isReversing = false
        video.playbackRate = 1
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative h-[90dvh] flex items-center justify-center overflow-hidden bg-secondary pt-8"
    >
      {/* Background Effect - Simulating Ocean Depth */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/videos/hero-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center space-y-6 w-full"
          >
            <div className="inline-flex items-center rounded-md bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground backdrop-blur-sm">
            <Image
            src="/brand/logo-white.png"
            alt="MSC Logo"
            width={1000}
            height={1000}
            className="h-28 w-auto"
            priority
          />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-7xl/none font-sans">
                {t.title.split(".")[0]}. <br />
                <span className="text-accent">{t.title.split(".")[1]}</span>
              </h1>
              <p className="text-gray-300 md:text-xl leading-relaxed font-light mx-auto">{t.description}</p>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              <Button
                size="lg"
                className="bg-accent rounded-md hover:bg-accent/90 text-white font-sans font-bold rounded-none uppercase tracking-wider cursor-pointer"
              >
                {t.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
