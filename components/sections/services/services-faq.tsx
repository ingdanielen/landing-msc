"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { servicesData, type Language } from "./services-data"

interface ServicesFaqProps {
  lang: Language
}

export function ServicesFaq({ lang }: ServicesFaqProps) {
  const [mounted, setMounted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const t = servicesData[lang] || servicesData.es

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="services-faq" className="py-16 bg-white relative" suppressHydrationWarning>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3 font-hero uppercase tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {t.faq.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100/50 transition-colors"
              >
                <span className="font-semibold text-primary text-sm pr-4">{item.question}</span>
                <div className={`w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center shrink-0 transition-transform ${
                  expandedFaq === idx ? "rotate-180" : ""
                }`}>
                  <ChevronDown className="h-4 w-4 text-primary" />
                </div>
              </button>
              {mounted ? (
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                expandedFaq === idx && (
                  <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-3">
                    {item.answer}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

