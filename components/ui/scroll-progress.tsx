"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    
    setProgress(Math.min(scrollProgress, 100))
    setIsVisible(scrollTop > 300)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-6 z-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            {/* Circular progress */}
            <button
              onClick={scrollToTop}
              className="relative w-12 h-12 bg-primary group"
              aria-label="Volver arriba"
            >
              {/* SVG Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 48 48"
              >
                {/* Background ring */}
                <rect
                  x="2"
                  y="2"
                  width="44"
                  height="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/10"
                />
                {/* Progress ring */}
                <motion.rect
                  x="2"
                  y="2"
                  width="44"
                  height="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                  strokeDasharray={176}
                  strokeDashoffset={176 - (176 * progress) / 100}
                  transition={{ duration: 0.1 }}
                />
              </svg>

              {/* Inner content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isHovered ? (
                    <motion.div
                      key="arrow"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1 }}
                    >
                      <ChevronUp className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="percent"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.1 }}
                      className="text-[10px] font-bold text-white font-mono"
                    >
                      {Math.round(progress)}%
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <ChevronUp className="w-5 h-5 text-white" />
              </div>
            </button>

            {/* Label on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className="bg-primary text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
                    Volver arriba
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
