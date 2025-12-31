"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Ship, 
  Anchor, 
  GraduationCap, 
  Scale, 
  Compass,
  Shield,
  Users,
  Award,
  Globe,
  ChevronRight
} from "lucide-react"

interface TeamExpertiseProps {
  lang: string
}

const content = {
  es: {
    badge: "EQUIPO DE EXPERTOS",
    title: "Profesionales de Elite",
    titleAccent: "en Inspeccion Maritima",
    subtitle: "Nuestro equipo combina decadas de experiencia en campo con conocimiento tecnico de vanguardia para ofrecer evaluaciones imparciales y confiables de clase mundial.",
    stats: [
      { value: "50+", label: "Anos de experiencia combinada" },
      { value: "15+", label: "Especialidades tecnicas" },
      { value: "100%", label: "Certificaciones actualizadas" },
    ],
    expertise: [
      {
        id: "naval",
        icon: Ship,
        title: "Arquitectura Naval",
        description: "Diseno, construccion y evaluacion estructural de buques con los mas altos estandares internacionales.",
        skills: ["Analisis de estabilidad", "Diseno de cascos", "Inspeccion de soldaduras", "Evaluacion de danos"]
      },
      {
        id: "engineering",
        icon: Compass,
        title: "Ingenieria Maritima",
        description: "Sistemas de propulsion, maquinaria naval y evaluacion tecnica de equipos maritimos.",
        skills: ["Propulsion", "Sistemas electricos", "Automatizacion", "Eficiencia energetica"]
      },
      {
        id: "port",
        icon: Anchor,
        title: "Operaciones Portuarias",
        description: "Gestion portuaria integral, logistica maritima y operaciones de terminales.",
        skills: ["Gestion de terminales", "Optimizacion de carga", "Seguridad portuaria", "Documentacion"]
      },
      {
        id: "nautical",
        icon: GraduationCap,
        title: "Ciencias Nauticas",
        description: "Capitanes y oficiales con vasta experiencia en navegacion y seguridad maritima.",
        skills: ["Navegacion avanzada", "Gestion de tripulacion", "Protocolos de seguridad", "Operaciones de puente"]
      },
      {
        id: "legal",
        icon: Scale,
        title: "Derecho Maritimo",
        description: "Especialistas en normativa maritima internacional y cumplimiento regulatorio.",
        skills: ["IMO/SOLAS", "Contratos maritimos", "Arbitraje", "Seguros P&I"]
      },
    ],
    ctaTitle: "Red Global de Expertos",
    ctaDescription: "Nuestra red de profesionales esta disponible 24/7 en puertos estrategicos alrededor del mundo.",
  },
  en: {
    badge: "EXPERT TEAM",
    title: "Elite Professionals",
    titleAccent: "in Maritime Inspection",
    subtitle: "Our team combines decades of field experience with cutting-edge technical knowledge to deliver world-class impartial and reliable assessments.",
    stats: [
      { value: "50+", label: "Years combined experience" },
      { value: "15+", label: "Technical specialties" },
      { value: "100%", label: "Updated certifications" },
    ],
    expertise: [
      {
        id: "naval",
        icon: Ship,
        title: "Naval Architecture",
        description: "Design, construction and structural evaluation of vessels with the highest international standards.",
        skills: ["Stability analysis", "Hull design", "Weld inspection", "Damage assessment"]
      },
      {
        id: "engineering",
        icon: Compass,
        title: "Maritime Engineering",
        description: "Propulsion systems, naval machinery and technical evaluation of maritime equipment.",
        skills: ["Propulsion", "Electrical systems", "Automation", "Energy efficiency"]
      },
      {
        id: "port",
        icon: Anchor,
        title: "Port Operations",
        description: "Comprehensive port management, maritime logistics and terminal operations.",
        skills: ["Terminal management", "Cargo optimization", "Port security", "Documentation"]
      },
      {
        id: "nautical",
        icon: GraduationCap,
        title: "Nautical Sciences",
        description: "Captains and officers with vast experience in navigation and maritime safety.",
        skills: ["Advanced navigation", "Crew management", "Safety protocols", "Bridge operations"]
      },
      {
        id: "legal",
        icon: Scale,
        title: "Maritime Law",
        description: "Specialists in international maritime regulations and regulatory compliance.",
        skills: ["IMO/SOLAS", "Maritime contracts", "Arbitration", "P&I Insurance"]
      },
    ],
    ctaTitle: "Global Expert Network",
    ctaDescription: "Our network of professionals is available 24/7 at strategic ports around the world.",
  },
}

export function TeamExpertise({ lang }: TeamExpertiseProps) {
  const t = content[lang as keyof typeof content] || content.es
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00111f] via-[#0a2a43] to-[#00111f]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-l-2 border-accent mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-[11px] font-bold text-accent tracking-[0.15em] uppercase">{t.badge}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="font-hero tracking-tight">{t.title}</span>
              <br />
              <span className="text-accent font-hero">{t.titleAccent}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 md:gap-16 mt-10"
          >
            {t.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-accent">
                  {/* Render + and % with system font, numbers with Reversal */}
                  {stat.value.split(/(\d+)/).map((part, i) => (
                    <span key={i} className={/^\d+$/.test(part) ? "font-hero" : "font-sans"}>
                      {part}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Expertise Cards - Grid estable sin expansión */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {t.expertise.map((item, idx) => {
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="group relative bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
              >
                {/* Content */}
                <div className="relative p-6 h-full min-h-[280px] flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <span className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-accent/10 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-1.5">
                    {item.skills.slice(0, 3).map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-2 text-xs text-white/40">
                        <ChevronRight className="w-3 h-3 text-accent" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 group-hover:bg-accent transition-colors duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="relative bg-white/5 border border-white/10 overflow-hidden">
            {/* Content */}
            <div className="relative px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-accent/20 flex items-center justify-center">
                  <Globe className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{t.ctaTitle}</h3>
                  <p className="text-white/50 text-sm">{t.ctaDescription}</p>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-white">ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-white">IMO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
