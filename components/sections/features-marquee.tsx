"use client"

import Image from "next/image"
import Link from "next/link"
import { type Language } from "@/lib/content"
import { motion } from "framer-motion"
import { HeroText } from "@/components/ui/hero-text"
import { useState, useMemo } from "react"
import { ArrowRight, ImageIcon } from "lucide-react"

// Feature items with verified images
const featuresData = {
  es: {
    title: "Lo que nos",
    titleHighlight: "define",
    row1: [
      { text: "Inspecciones de Buques", image: "/images/footage/IMG_20190406_172726.webp" },
      { text: "Draft Surveys", image: "/images/footage/IMG_20190405_150150.webp" },
      { text: "Auditorias ISM ISPS", image: "/images/footage/IMG_20190406_095637.webp" },
      { text: "Peritajes Tecnicos", image: "/images/footage/IMG_20181207_111709.webp" },
      { text: "Supervision de Carga", image: "/images/footage/IMG_20190406_180251.webp" },
      { text: "Consultoria Maritima", image: "/images/footage/IMG_20190406_180318.webp" },
      { text: "Pre compra de Buques", image: "/images/footage/IMG_20190406_174944.webp" },
      { text: "On Off Hire Surveys", image: "/images/footage/IMG_20190406_175102.webp" },
    ],
    row2: [
      { text: "480 Servicios Realizados", image: "/images/footage/IMG_20190406_180706.webp" },
      { text: "95 Satisfaccion", image: "/images/footage/IMG_20190406_182100.webp" },
      { text: "Respuesta 24 7", image: "/images/footage/IMG_20190506_163718.webp" },
      { text: "ISO 9001 Certificado", image: "/images/footage/IMG_20190406_181306.webp" },
      { text: "120 Clientes Corporativos", image: "/images/footage/IMG_20190405_150223.webp" },
      { text: "Informes Imparciales", image: "/images/footage/IMG_20190406_095747.webp" },
      { text: "Inspeccion con Drones", image: "/images/footage/IMG_20190406_180248.webp" },
      { text: "Cumplimiento IMO", image: "/images/footage/IMG_20190406_172734.webp" },
    ]
  },
  en: {
    title: "What",
    titleHighlight: "defines us",
    row1: [
      { text: "Vessel Inspections", image: "/images/footage/IMG_20190406_172726.webp" },
      { text: "Draft Surveys", image: "/images/footage/IMG_20190405_150150.webp" },
      { text: "ISM ISPS Audits", image: "/images/footage/IMG_20190406_095637.webp" },
      { text: "Technical Assessments", image: "/images/footage/IMG_20181207_111709.webp" },
      { text: "Cargo Supervision", image: "/images/footage/IMG_20190406_180251.webp" },
      { text: "Maritime Consultancy", image: "/images/footage/IMG_20190406_180318.webp" },
      { text: "Pre Purchase Surveys", image: "/images/footage/IMG_20190406_174944.webp" },
      { text: "On Off Hire Surveys", image: "/images/footage/IMG_20190406_175102.webp" },
    ],
    row2: [
      { text: "480 Services Completed", image: "/images/footage/IMG_20190406_180706.webp" },
      { text: "95 Satisfaction Rate", image: "/images/footage/IMG_20190406_182100.webp" },
      { text: "24 7 Response", image: "/images/footage/IMG_20190506_163718.webp" },
      { text: "ISO 9001 Certified", image: "/images/footage/IMG_20190406_181306.webp" },
      { text: "120 Corporate Clients", image: "/images/footage/IMG_20190405_150223.webp" },
      { text: "Impartial Reports", image: "/images/footage/IMG_20190406_095747.webp" },
      { text: "Drone Inspections", image: "/images/footage/IMG_20190406_180248.webp" },
      { text: "IMO Compliance", image: "/images/footage/IMG_20190406_172734.webp" },
    ]
  },
  zh: {
    title: "我们的",
    titleHighlight: "定义",
    row1: [
      { text: "船舶检验", image: "/images/footage/IMG_20190406_172726.webp" },
      { text: "吃水勘测", image: "/images/footage/IMG_20190405_150150.webp" },
      { text: "ISM ISPS审核", image: "/images/footage/IMG_20190406_095637.webp" },
      { text: "技术评估", image: "/images/footage/IMG_20181207_111709.webp" },
      { text: "货物监督", image: "/images/footage/IMG_20190406_180251.webp" },
      { text: "海事咨询", image: "/images/footage/IMG_20190406_180318.webp" },
      { text: "购前检验", image: "/images/footage/IMG_20190406_174944.webp" },
      { text: "租船检验", image: "/images/footage/IMG_20190406_175102.webp" },
    ],
    row2: [
      { text: "480 服务完成", image: "/images/footage/IMG_20190406_180706.webp" },
      { text: "95 满意率", image: "/images/footage/IMG_20190406_182100.webp" },
      { text: "24 7 响应", image: "/images/footage/IMG_20190506_163718.webp" },
      { text: "ISO 9001 认证", image: "/images/footage/IMG_20190406_181306.webp" },
      { text: "120 企业客户", image: "/images/footage/IMG_20190405_150223.webp" },
      { text: "公正报告", image: "/images/footage/IMG_20190406_095747.webp" },
      { text: "无人机检验", image: "/images/footage/IMG_20190406_180248.webp" },
      { text: "IMO 合规", image: "/images/footage/IMG_20190406_172734.webp" },
    ]
  }
}

interface FeatureItem {
  text: string
  image: string
}

/**
 * Renderiza texto con Reversal Light SOLO para LETRAS (A-Z, a-z)
 * Todo lo demás (números, espacios, símbolos) usa Space Grotesk
 */
function ReversalLightText({ text, className = "" }: { text: string; className?: string }) {
  const segments = useMemo(() => {
    if (!text) return []
    
    const result: { char: string; useReversal: boolean }[] = []
    
    for (const char of text) {
      // SOLO letras básicas A-Z, a-z usan Reversal (NO números)
      const isLetter = /^[a-zA-Z]$/.test(char)
      result.push({
        char,
        useReversal: isLetter,
      })
    }
    
    return result
  }, [text])

  return (
    <span className={className}>
      {segments.map((segment, idx) => (
        <span
          key={idx}
          className={segment.useReversal ? "" : "font-body"}
          style={{
            fontFamily: segment.useReversal
              ? "'Reversal', var(--font-space-grotesk), system-ui, sans-serif"
              : "var(--font-space-grotesk), system-ui, sans-serif",
            fontWeight: segment.useReversal ? 300 : 500,
          }}
        >
          {segment.char}
        </span>
      ))}
    </span>
  )
}

function FeatureCard({ text, image }: FeatureItem) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link 
      href="/services"
      className="relative flex-shrink-0 w-[300px] h-[110px] group cursor-pointer overflow-hidden rounded-lg bg-white border border-slate-200/80 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 block"
    >
      {/* Image container */}
      <div className="absolute left-0 top-0 bottom-0 w-[110px] overflow-hidden">
        {!imageError ? (
          <Image
            src={image}
            alt={text}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="110px"
            quality={60}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-slate-400" />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-primary/30 group-hover:to-accent/20 transition-colors duration-300" />
      </div>
      
      {/* Content */}
      <div className="absolute left-[110px] right-0 top-0 bottom-0 flex items-center px-4">
        <div className="flex-1 min-w-0">
          {/* Text with Reversal Light */}
          <ReversalLightText 
            text={text} 
            className="text-primary text-[15px] leading-tight block group-hover:text-accent transition-colors duration-300"
          />
          
          {/* Accent underline */}
          <div className="w-0 h-[2px] bg-accent mt-2.5 group-hover:w-10 transition-all duration-300" />
        </div>
        
        {/* Arrow indicator */}
        <div className="shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-3.5 h-3.5 text-accent" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
    </Link>
  )
}

function MarqueeRow({ 
  items, 
  direction = 'left',
  duration = 35
}: { 
  items: FeatureItem[]
  direction?: 'left' | 'right'
  duration?: number
}) {
  // Filter out invalid items
  const validItems = items.filter(item => item && item.text && item.image)
  const duplicatedItems = [...validItems, ...validItems, ...validItems, ...validItems]
  
  if (validItems.length === 0) return null
  
  return (
    <div className="relative overflow-hidden py-2">
      <div 
        className="flex gap-4"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          width: 'max-content'
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <FeatureCard 
            key={`${item.text}-${idx}`} 
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export function FeaturesMarquee({ lang }: { lang: Language }) {
  const t = featuresData[lang] || featuresData.en

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-slate-50/50">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0a2a43 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-accent" />
            <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase">MSC</span>
            <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
          </div>
          
          <div className="flex items-baseline gap-3 flex-wrap">
            <HeroText as="h2" className="text-3xl md:text-4xl lg:text-5xl text-primary">
              {t.title}
            </HeroText>
            <HeroText as="span" className="text-3xl md:text-4xl lg:text-5xl text-accent">
              {t.titleHighlight}
            </HeroText>
          </div>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4">
        <MarqueeRow items={t.row1 as FeatureItem[]} direction="left" duration={45} />
        <MarqueeRow items={t.row2 as FeatureItem[]} direction="right" duration={50} />
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
