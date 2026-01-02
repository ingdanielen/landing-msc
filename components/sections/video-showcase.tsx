"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { LocalizedLink } from "@/components/ui/localized-link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const videoShowcaseContent = {
  es: {
    quote:
      "Pasión genuina por la excelencia marítima, legado innegable de integridad técnica y un compromiso inquebrantable con la seguridad, la transparencia y la confianza de nuestros clientes.",
    cta: "Solicite su inspección",
  },
  en: {
    quote:
      "Genuine passion for maritime excellence, undeniable legacy of technical integrity, and an unfaltering commitment to safety, transparency, and our clients trust.",
    cta: "Request your inspection",
  },
  zh: {
    quote:
      "对海事卓越的真诚热情，技术诚信的不可否认的传承，以及对安全、透明和客户信任的坚定承诺。",
    cta: "申请检验",
  },
}

export function VideoShowcase({ lang }: { lang: Language }) {
  const t = videoShowcaseContent[lang as keyof typeof videoShowcaseContent] as { quote: string; cta: string }
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Lazy load video cuando sea visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          if (videoRef.current) {
            videoRef.current.play()
          }
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="video" className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-primary">
        {isVisible && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-bottom scale-110"
            aria-label="Video decorativo del océano"
          >
            <source src="/images/videos/sea-video.mp4" type="video/mp4" />
            <track kind="captions" src="/captions/hero-video.vtt" srcLang="es" label="Sin audio" default />
          </video>
        )}
        {/* Clean gradient overlay */}
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="text-2xl md:text-4xl lg:text-5xl text-white mb-8 font-hero font-light tracking-wide leading-[1.2] drop-shadow-lg">
              {t.quote}
            </p>
            <div className="w-24 h-1 bg-accent mx-auto"></div>

            <div className="mt-10">
              <LocalizedLink href="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 group shadow-xl hover:shadow-2xl"
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </LocalizedLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
