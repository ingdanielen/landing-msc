"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import dynamic from "next/dynamic"
import { MapPin, Navigation, Globe } from "lucide-react"

// Lazy load del mapa para mejorar LCP
const MSCMap = dynamic(() => import("@/components/ui/msc-map").then(mod => mod.MSCMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-slate-800 animate-pulse flex items-center justify-center">
      <div className="text-slate-400 text-sm">Cargando mapa...</div>
    </div>
  ),
})

const locationContent = {
  es: {
    title: "Nuestra Ubicación",
    subtitle: "Encuéntrenos en el corazón de Panamá",
    address: {
      label: "Dirección",
      value: "Altos de Curundu, Calle River, Edificio 569B, Ancón, Panamá",
    },
    coverage: {
      label: "Cobertura",
      value: "Servicio en todos los puertos de América y el Caribe",
    },
    cta: "Obtener Direcciones",
  },
  en: {
    title: "Our Location",
    subtitle: "Find us in the heart of Panama",
    address: {
      label: "Address",
      value: "Altos de Curundu, Calle River, Building 569B, Ancón, Panama",
    },
    coverage: {
      label: "Coverage",
      value: "Service in all ports of America and the Caribbean",
    },
    cta: "Get Directions",
  },
  zh: {
    title: "我们的位置",
    subtitle: "在巴拿马的心脏地带找到我们",
    address: {
      label: "地址",
      value: "Altos de Curundu, Calle River, 569B号楼, 安孔, 巴拿马",
    },
    coverage: {
      label: "覆盖范围",
      value: "服务覆盖美洲和加勒比海所有港口",
    },
    cta: "获取路线",
  },
}

export function LocationMap({ lang }: { lang: Language }) {
  const t = locationContent[lang]

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Info Section */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
            {/* Left - Title & Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl font-hero font-bold text-white mb-2 tracking-tight">
                {t.title}
              </h2>
              <p className="text-white/60 mb-6">{t.subtitle}</p>

              {/* Info Cards - Horizontal on desktop */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">
                      {t.address.label}
                    </p>
                    <p className="text-white font-medium text-sm leading-relaxed">
                      {t.address.value}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">
                      {t.coverage.label}
                    </p>
                    <p className="text-white font-medium text-sm leading-relaxed">
                      {t.coverage.value}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:shrink-0"
            >
              <a
                href="https://maps.google.com/?q=8.975,-79.5420"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
              >
                <Navigation className="h-4 w-4" />
                {t.cta}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Width Map with Leaflet */}
      <div className="relative">
        <MSCMap lang={lang} height="400px" />
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-linear-gradient(to bottom, var(--color-primary), transparent) pointer-events-none z-10" />
      </div>
    </section>
  )
}
