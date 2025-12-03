"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const videoShowcaseContent = {
  es: {
    quote:
      "Pasión genuina por la excelencia marítima, legado innegable de integridad técnica y un compromiso inquebrantable con la seguridad, la transparencia y la confianza de nuestros clientes.",
    cta: "Solicite su inspección",
  },
  en: {
    quote:
      "Genuine passion for maritime excellence, undeniable legacy of technical integrity, and an unfaltering commitment to safety, transparency, and our clients' trust.",
    cta: "Request your inspection",
  },
}

export function VideoShowcase({ lang }: { lang: Language }) {
  const t = videoShowcaseContent[lang]

  return (
    <section id="video" className="relative w-full h-[70vh] min-h-[600px] overflow-hidden -mb-12">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/videos/sea-video.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay - More aggressive top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-secondary" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-transparent via-transparent to-secondary/95" />
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
            <div className="inline-block mb-6">
            </div>
            <p className="text-2xl md:text-4xl lg:text-5xl text-white mb-8 font-sans font-normal tracking-normal leading-[1.1] drop-shadow-lg">
              {t.quote}
            </p>
            <div className="w-24 h-1 bg-accent mx-auto"></div>

            <div className="mt-10">
                
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 group shadow-lg"
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="inline-block mt-8">
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
