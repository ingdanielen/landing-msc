"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Target, Anchor, Shield, Zap, Briefcase, Users, Leaf } from "lucide-react"
import { type Language, content } from "@/lib/content"
import Image from "next/image"

const valueIcons = {
  "Integridad e Imparcialidad": Shield,
  "Integrity & Impartiality": Shield,
  "Excelencia Técnica": Zap,
  "Technical Excellence": Zap,
  "Seguridad y Cumplimiento": Shield,
  "Safety & Compliance": Shield,
  "Profesionalismo y Responsabilidad": Briefcase,
  "Professionalism & Responsibility": Briefcase,
  "Servicio Enfocado en el Cliente": Users,
  "Client-Focused Service": Users,
  "Innovación y Mejora Continua": Zap,
  "Innovation & Continuous Improvement": Zap,
  "Protección del Medio Ambiente": Leaf,
  "Environmental Protection": Leaf,
}

// Images from footage folder
const footageImages = [
  "/images/footage/IMG_20181207_111709.webp",
  "/images/footage/IMG_20190405_150150.webp",
  "/images/footage/IMG_20190406_095637.webp",
  "/images/footage/IMG_20190406_172726.webp",
  "/images/footage/IMG_20181207_111716.webp",
  "/images/footage/IMG_20190405_150153.webp",
  "/images/footage/IMG_20190406_095657.webp",
  "/images/footage/IMG_20190406_172728.webp",
  "/images/footage/IMG_20181207_111733.webp",
]

export function ValuesCarousel({ lang }: { lang: Language }) {
  const t = content[lang].about
  const [currentIndex, setCurrentIndex] = useState(0)

  // Create carousel items: values + mission + vision
  const carouselItems = [
    ...t.values.map((value, idx) => ({
      type: "value" as const,
      title: typeof value === "string" ? value : value.title,
      content: typeof value === "string" ? "" : value.description,
      icon: valueIcons[(typeof value === "string" ? value : value.title) as keyof typeof valueIcons] || Shield,
      image: footageImages[idx % footageImages.length],
    })),
    {
      type: "mission" as const,
      title: t.mission.title,
      content: t.mission.text,
      icon: Target,
      image: footageImages[7],
    },
    {
      type: "vision" as const,
      title: t.vision.title,
      content: t.vision.text,
      icon: Anchor,
      image: footageImages[8],
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentItem = carouselItems[currentIndex]
  const Icon = currentItem.icon

  return (
    <section id="values-mission-vision" className="py-0 section-ocean-alt relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
          {lang === "es" ? "Nuestros Valores, Misión y Visión" : "Our Values, Mission & Vision"}
        </h2>
        <div className="w-24 h-1 bg-accent mx-auto"></div>
      </motion.div>

      {/* Carousel Container - Full Width, No Rounded */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full min-h-[600px] overflow-hidden"
          >
            {/* Background Image - Full Width */}
            <div className="absolute inset-0">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-linear-to-br from-primary/85 via-primary/75 to-secondary/90" />
            </div>

            {/* Content - Improved Layout */}
            <div className="relative z-10 min-h-[600px] flex items-center">
              <div className="container mx-auto px-4 md:px-6 lg:px-12 py-16">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 text-center"
                  >
                    <div className="h-20 w-20 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/50">
                      <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-hero uppercase tracking-tight text-white drop-shadow-lg text-center"
                  >
                    {currentItem.title}
                  </motion.h3>

                  {currentItem.content && (
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-base md:text-lg lg:text-xl text-white/95 leading-relaxed max-w-4xl mx-auto drop-shadow-md font-light text-center"
                    >
                      {currentItem.content}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 transition-all border border-white/30 shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 transition-all border border-white/30 shadow-lg"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 py-8">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex ? "w-10 bg-accent" : "w-2.5 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
