"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  Ship, 
  Container, 
  ClipboardCheck,
  Anchor,
  Plane,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"
import { LocalizedLink } from "@/components/ui/localized-link"

const servicesContent = {
  es: {
    badge: "LO QUE MSC OFRECE",
    title: "Soluciones Integrales",
    titleHighlight: "Maritimas",
    services: [
      {
        icon: Ship,
        title: "Inspecciones de Buques",
        description: "Pre-compra, condicion, on/off hire, danos y siniestros, P&I.",
        image: "/images/footage/IMG_20181207_112927.webp",
      },
      {
        icon: Container,
        title: "Inspecciones de Carga",
        description: "Pre-embarque, supervision de carga/descarga, draft surveys, conteo.",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: ClipboardCheck,
        title: "Consultoria Maritima",
        description: "Auditorias ISM/ISPS/MLC, asesoria tecnica, investigacion de incidentes.",
        image: "/images/footage/IMG_20190406_175914.webp",
      },
      {
        icon: Anchor,
        title: "Servicios Portuarios",
        description: "Evaluacion de terminales, inspecciones de atraque y amarre.",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: Plane,
        title: "Inspecciones con Drones",
        description: "Inspecciones aereas de areas de dificil acceso.",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Shield,
        title: "Cumplimiento Normativo",
        description: "ISO 9001, IMO, SOLAS, MARPOL, Estado de Bandera.",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    cta: "Ver todos los servicios",
    explore: "Explorar",
  },
  en: {
    badge: "WHAT MSC OFFERS",
    title: "Comprehensive Maritime",
    titleHighlight: "Solutions",
    services: [
      {
        icon: Ship,
        title: "Vessel Inspections",
        description: "Pre-purchase, condition, on/off hire, damage & casualty, P&I.",
        image: "/images/footage/IMG_20181207_112927.webp",
      },
      {
        icon: Container,
        title: "Cargo Inspections",
        description: "Pre-loading, loading/discharge supervision, draft surveys, tally.",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: ClipboardCheck,
        title: "Maritime Consultancy",
        description: "ISM/ISPS/MLC audits, technical advisory, incident investigation.",
        image: "/images/footage/IMG_20190406_175914.webp",
      },
      {
        icon: Anchor,
        title: "Port Services",
        description: "Terminal assessments, berth and mooring inspections.",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: Plane,
        title: "Drone Inspections",
        description: "Aerial inspections of hard-to-reach areas.",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Shield,
        title: "Regulatory Compliance",
        description: "ISO 9001, IMO, SOLAS, MARPOL, Flag State requirements.",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    cta: "View all services",
    explore: "Explore",
  },
  zh: {
    badge: "MSC提供的服务",
    title: "综合海事",
    titleHighlight: "解决方案",
    services: [
      {
        icon: Ship,
        title: "船舶检验",
        description: "购前检验、状况检验、租船/还船、损坏和事故、P&I。",
        image: "/images/footage/IMG_20181207_112927.webp",
      },
      {
        icon: Container,
        title: "货物检验",
        description: "装货前、装卸监督、吃水勘测、计数。",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: ClipboardCheck,
        title: "海事咨询",
        description: "ISM/ISPS/MLC审核、技术咨询、事故调查。",
        image: "/images/footage/IMG_20190406_175914.webp",
      },
      {
        icon: Anchor,
        title: "港口服务",
        description: "码头评估、泊位和系泊检验。",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: Plane,
        title: "无人机检验",
        description: "难以到达区域的航空检验。",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Shield,
        title: "法规合规",
        description: "ISO 9001、IMO、SOLAS、MARPOL、船旗国要求。",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    cta: "查看所有服务",
    explore: "探索",
  },
}

// Card component
function ServiceCard({ 
  service, 
  index, 
  explore 
}: { 
  service: typeof servicesContent.es.services[0]
  index: number
  explore: string
}) {
  const Icon = service.icon
  
  return (
    <LocalizedLink 
      href="/services" 
      className="group block relative h-[400px] md:h-[480px] w-full overflow-hidden"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={50}
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90 group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/50 transition-all duration-500" />
      
      <span className="absolute top-4 right-4 text-[7rem] font-black text-white/5 leading-none select-none group-hover:text-accent/10 transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="absolute top-6 left-6">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-hero font-bold text-white mb-2 tracking-tight leading-tight group-hover:-translate-y-1 transition-transform duration-500">
          {service.title}
        </h3>
        
        <div className="overflow-hidden max-h-0 group-hover:max-h-[100px] transition-all duration-500 ease-out">
          <p className="text-white/90 text-sm leading-relaxed mb-3">
            {service.description}
          </p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
            {explore}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </LocalizedLink>
  )
}

export function ServicesCarousel({ lang }: { lang: Language }) {
  const t = servicesContent[lang] || servicesContent.en
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  const totalSlides = t.services.length

  // Auto-advance cada 4 segundos
  useEffect(() => {
    if (isPaused) return
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPaused, totalSlides])

  const goNext = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides)
  }

  const goPrev = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
  }

  const goTo = (idx: number) => {
    setCurrentSlide(idx)
  }

  // Calcular qué 3 cards mostrar
  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const idx = (currentSlide + i) % totalSlides
      cards.push({ service: t.services[idx], index: idx })
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  return (
    <section className="relative py-16 md:py-24 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border-l-2 border-accent mb-6"
            >
              <span className="text-[11px] font-bold text-accent tracking-[0.15em] uppercase">
                {t.badge}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <HeroText as="h2" className="text-3xl md:text-4xl lg:text-5xl text-white mb-2">
                {t.title}
              </HeroText>
              <HeroText as="span" className="text-3xl md:text-4xl lg:text-5xl text-accent">
                {t.titleHighlight}
              </HeroText>
            </motion.div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <button
              onClick={goPrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:bg-accent hover:border-accent transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:bg-accent hover:border-accent transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Cards Grid - Simple y estable */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {visibleCards.map(({ service, index }, i) => (
          <motion.div
            key={`${service.title}-${currentSlide}-${i}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <ServiceCard 
              service={service} 
              index={index}
              explore={t.explore}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-8">
          {t.services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`h-1.5 transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <LocalizedLink
            href="/services"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white px-8 py-4 font-semibold transition-all group"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  )
}
