"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { 
  TrendingUp, 
  Users, 
  Clock, 
  ThumbsUp, 
  RefreshCcw,
  BarChart3,
  Zap,
  ArrowUpRight
} from "lucide-react"
import { type Language } from "@/lib/content"
import { HeroText } from "@/components/ui/hero-text"

const metricsContent = {
  es: {
    badge: "MÉTRICAS DE EXCELENCIA",
    title: "Resultados que Respaldan Nuestra",
    titleHighlight: "Trayectoria",
    subtitle: "Cifras consolidadas que demuestran nuestro compromiso con la eficiencia, confiabilidad y excelencia técnica desde 2019.",
    metrics: [
      {
        icon: BarChart3,
        value: 480,
        suffix: "+",
        label: "Servicios Técnicos",
        description: "Inspecciones y consultorías completadas",
        color: "accent",
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        icon: Users,
        value: 120,
        suffix: "+",
        label: "Clientes Corporativos",
        description: "Empresas que confían en nosotros",
        color: "emerald",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: RefreshCcw,
        value: 78,
        suffix: "%",
        label: "Tasa de Recurrencia",
        description: "Clientes que repiten servicios",
        color: "cyan",
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        icon: ThumbsUp,
        value: 95,
        suffix: "%",
        label: "Índice de Satisfacción",
        description: "Según retroalimentación post-servicio",
        color: "amber",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: TrendingUp,
        value: 22,
        suffix: "%",
        label: "Crecimiento Anual",
        description: "Promedio en volumen de servicios",
        color: "violet",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Clock,
        value: 24,
        suffix: "-72h",
        label: "Tiempo de Entrega",
        description: "Según complejidad del informe",
        color: "rose",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    note: "* Cifras consolidadas 2019-2025",
  },
  en: {
    badge: "EXCELLENCE METRICS",
    title: "Results that Back Our",
    titleHighlight: "Track Record",
    subtitle: "Consolidated figures demonstrating our commitment to efficiency, reliability, and technical excellence since 2019.",
    metrics: [
      {
        icon: BarChart3,
        value: 480,
        suffix: "+",
        label: "Technical Services",
        description: "Inspections and consultancies completed",
        color: "accent",
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        icon: Users,
        value: 120,
        suffix: "+",
        label: "Corporate Clients",
        description: "Companies that trust us",
        color: "emerald",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: RefreshCcw,
        value: 78,
        suffix: "%",
        label: "Recurrence Rate",
        description: "Clients who repeat services",
        color: "cyan",
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        icon: ThumbsUp,
        value: 95,
        suffix: "%",
        label: "Satisfaction Index",
        description: "Based on post-service feedback",
        color: "amber",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: TrendingUp,
        value: 22,
        suffix: "%",
        label: "Annual Growth",
        description: "Average service volume growth",
        color: "violet",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Clock,
        value: 24,
        suffix: "-72h",
        label: "Delivery Time",
        description: "Depending on report complexity",
        color: "rose",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    note: "* Consolidated figures 2019-2025",
  },
  zh: {
    badge: "卓越指标",
    title: "支撑我们业绩的",
    titleHighlight: "成果",
    subtitle: "自2019年以来，综合数据证明我们对效率、可靠性和技术卓越的承诺。",
    metrics: [
      {
        icon: BarChart3,
        value: 480,
        suffix: "+",
        label: "技术服务",
        description: "已完成的检验和咨询",
        color: "accent",
        image: "/images/footage/IMG_20190406_095637.webp",
      },
      {
        icon: Users,
        value: 120,
        suffix: "+",
        label: "企业客户",
        description: "信任我们的公司",
        color: "emerald",
        image: "/images/footage/IMG_20190405_150150.webp",
      },
      {
        icon: RefreshCcw,
        value: 78,
        suffix: "%",
        label: "复购率",
        description: "重复服务的客户",
        color: "cyan",
        image: "/images/footage/IMG_20190406_172726.webp",
      },
      {
        icon: ThumbsUp,
        value: 95,
        suffix: "%",
        label: "满意度指数",
        description: "基于服务后反馈",
        color: "amber",
        image: "/images/footage/IMG_20181207_111709.webp",
      },
      {
        icon: TrendingUp,
        value: 22,
        suffix: "%",
        label: "年增长率",
        description: "平均服务量增长",
        color: "violet",
        image: "/images/footage/IMG_20190406_180251.webp",
      },
      {
        icon: Clock,
        value: 24,
        suffix: "-72h",
        label: "交付时间",
        description: "取决于报告复杂性",
        color: "rose",
        image: "/images/footage/IMG_20190406_180318.webp",
      },
    ],
    note: "* 2019-2025年综合数据",
  },
}

// Componente de contador con efecto mecánico
function MechanicalCounter({ 
  value, 
  suffix, 
  duration = 2.5 
}: { 
  value: number
  suffix: string
  duration?: number 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing exponencial para efecto dramático
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplayValue(Math.floor(easeOutExpo * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])
  
  const digits = displayValue.toString().split('')
  
  return (
    <div ref={ref} className="flex items-baseline">
      <div className="flex">
        {digits.map((digit, idx) => (
          <motion.span
            key={`${idx}-${digit}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: idx * 0.05,
              type: "spring",
              stiffness: 200
            }}
            className="inline-block tabular-nums"
            style={{ 
              textShadow: '0 0 40px rgba(46, 134, 193, 0.5)',
            }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
      <span className="text-accent ml-1">{suffix}</span>
    </div>
  )
}

// Componente de partículas flotantes
function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  )
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Componente de líneas de grid animadas
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Líneas horizontales */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
            style={{ top: `${(i + 1) * 10}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </div>
      {/* Líneas verticales */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent"
            style={{ left: `${(i + 1) * 10}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}

// Componente de métrica individual
function MetricCard({ 
  metric, 
  index, 
  activeIndex,
  setActiveIndex 
}: { 
  metric: typeof metricsContent.en.metrics[0]
  index: number
  activeIndex: number
  setActiveIndex: (index: number) => void
}) {
  const Icon = metric.icon
  const isActive = activeIndex === index
  const ref = useRef<HTMLDivElement>(null)
  
  const colorMap: Record<string, { 
    gradient: string
    glow: string
    text: string
    bg: string
  }> = {
    accent: { 
      gradient: "from-accent to-blue-400",
      glow: "shadow-accent/50",
      text: "text-accent",
      bg: "bg-accent/20"
    },
    emerald: { 
      gradient: "from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/50",
      text: "text-emerald-400",
      bg: "bg-emerald-500/20"
    },
    cyan: { 
      gradient: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/50",
      text: "text-cyan-400",
      bg: "bg-cyan-500/20"
    },
    amber: { 
      gradient: "from-amber-400 to-orange-500",
      glow: "shadow-amber-500/50",
      text: "text-amber-400",
      bg: "bg-amber-500/20"
    },
    violet: { 
      gradient: "from-violet-400 to-purple-500",
      glow: "shadow-violet-500/50",
      text: "text-violet-400",
      bg: "bg-violet-500/20"
    },
    rose: { 
      gradient: "from-rose-400 to-pink-500",
      glow: "shadow-rose-500/50",
      text: "text-rose-400",
      bg: "bg-rose-500/20"
    },
  }
  
  const colors = colorMap[metric.color] || colorMap.accent
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setActiveIndex(index)}
      className={`
        relative group cursor-pointer
        ${index === 0 || index === 5 ? 'md:col-span-2 lg:col-span-1' : ''}
      `}
    >
      {/* Card Container */}
      <div className={`
        relative h-full min-h-[280px] rounded-2xl overflow-hidden
        border border-white/10 backdrop-blur-sm
        transition-all duration-500 ease-out
        ${isActive 
          ? `bg-gradient-to-br from-white/10 to-white/5 shadow-2xl ${colors.glow}` 
          : 'bg-white/5 hover:bg-white/10'
        }
      `}>
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={metric.image}
            alt={metric.label}
            fill
            className={`
              object-cover transition-all duration-700
              ${isActive ? 'scale-110 opacity-30' : 'scale-100 opacity-10'}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00111f] via-[#00111f]/80 to-transparent" />
        </div>
        
        {/* Animated Border Gradient */}
        <motion.div
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          `}
          style={{
            background: `linear-gradient(135deg, transparent, ${metric.color === 'accent' ? 'rgba(46, 134, 193, 0.3)' : `var(--${metric.color}-500, rgba(46, 134, 193, 0.3))`}, transparent)`,
            padding: '1px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`
                p-3 rounded-xl ${colors.bg} backdrop-blur-sm
                border border-white/10
              `}
            >
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: isActive ? 1 : 0, 
                x: isActive ? 0 : -10 
              }}
              className={`p-2 rounded-full ${colors.bg}`}
            >
              <ArrowUpRight className={`w-4 h-4 ${colors.text}`} />
            </motion.div>
          </div>
          
          {/* Bottom Section */}
          <div>
            {/* Value */}
            <div className={`
              text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2
              tracking-tighter
            `}>
              <MechanicalCounter value={metric.value} suffix={metric.suffix} />
            </div>
            
            {/* Label */}
            <h3 className={`
              text-lg md:text-xl font-semibold mb-1
              bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent
            `}>
              {metric.label}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed">
              {metric.description}
            </p>
          </div>
        </div>
        
        {/* Hover Glow Effect */}
        <motion.div
          className={`
            absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl
            bg-gradient-to-r ${colors.gradient}
            opacity-0 group-hover:opacity-30
            transition-opacity duration-700
          `}
        />
      </div>
    </motion.div>
  )
}

// Componente de número destacado gigante
function HeroNumber({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div 
        className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none tracking-tighter"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(46,134,193,0.6) 50%, rgba(255,255,255,0.2) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 80px rgba(46, 134, 193, 0.3)',
        }}
      >
        {value}
      </div>
      <div className="text-xl md:text-2xl text-white/60 uppercase tracking-[0.3em] -mt-4 md:-mt-8">
        {label}
      </div>
    </motion.div>
  )
}

export function ComplianceMetrics({ lang }: { lang: Language }) {
  const t = metricsContent[lang as keyof typeof metricsContent] || metricsContent.en
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 bg-[#00111f] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <AnimatedGrid />
      <FloatingParticles />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#00111f_70%)]" />
      
      {/* Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
      
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-semibold text-accent tracking-[0.2em] uppercase">
              {t.badge}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <HeroText 
              as="h2" 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6"
            >
              {`${t.title} ${t.titleHighlight}`}
            </HeroText>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>
        
        {/* Featured Number - Hero Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-20 md:mb-28"
        >
          <HeroNumber 
            value="480+" 
            label={lang === "es" ? "Servicios Completados" : lang === "zh" ? "已完成服务" : "Services Completed"} 
          />
        </motion.div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {t.metrics.map((metric, idx) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={idx}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
        
        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-white/30 tracking-wider">
            {t.note}
          </p>
        </motion.div>
      </motion.div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00111f] to-transparent" />
    </section>
  )
}
