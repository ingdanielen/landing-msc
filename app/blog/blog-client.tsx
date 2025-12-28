"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { BlogCard } from "@/components/sections/blog-card"
import { SectionExplorer } from "@/components/ui/section-explorer"

// Mock blog posts data - En producción esto vendría de un CMS o API
const blogPosts = {
  es: [
    {
      id: 1,
      title: "La Industria Marítima: Un Viaje de Desafíos y Oportunidades",
      excerpt:
        "Exploramos la dedicación y resiliencia en la industria marítima, destacando soluciones innovadoras y el compromiso con la excelencia técnica.",
      author: "Equipo MSC",
      date: "15 Jul, 2024",
      readTime: "4 min",
      image: "/images/footage/IMG_20181207_111709.webp",
      views: 184,
      comments: 73,
      likes: 1,
    },
    {
      id: 2,
      title: "Historias Inspiradoras: Un Viaje de Crecimiento y Adaptación",
      excerpt:
        "Descubre el viaje inspirador en la industria marítima, navegando con resiliencia y adaptación constante a los desafíos del sector.",
      author: "Equipo MSC",
      date: "28 Jun, 2024",
      readTime: "3 min",
      image: "/images/footage/IMG_20190405_150150.webp",
      views: 197,
      comments: 65,
      likes: 3,
    },
    {
      id: 3,
      title: "Innovación en Inspecciones Marítimas: Tecnología y Precisión",
      excerpt:
        "Cómo la tecnología avanzada y las metodologías modernas están transformando el futuro de las inspecciones marítimas.",
      author: "Equipo MSC",
      date: "10 Jun, 2024",
      readTime: "5 min",
      image: "/images/footage/IMG_20190406_095637.webp",
      views: 156,
      comments: 42,
      likes: 8,
    },
    {
      id: 4,
      title: "Cumplimiento Normativo: Navegando las Regulaciones IMO",
      excerpt:
        "Una guía completa sobre las regulaciones internacionales y cómo mantenerse al día con los estándares de cumplimiento.",
      author: "Equipo MSC",
      date: "25 May, 2024",
      readTime: "6 min",
      image: "/images/footage/IMG_20190406_172726.webp",
      views: 203,
      comments: 58,
      likes: 12,
    },
  ],
  en: [
    {
      id: 1,
      title: "The Maritime Industry: A Journey of Challenges and Opportunities",
      excerpt:
        "We explore dedication and resilience in the maritime industry, highlighting innovative solutions and commitment to technical excellence.",
      author: "MSC Team",
      date: "Jul 15, 2024",
      readTime: "4 min",
      image: "/images/footage/IMG_20181207_111709.webp",
      views: 184,
      comments: 73,
      likes: 1,
    },
    {
      id: 2,
      title: "Inspirational Stories: A Journey of Growth and Adaptation",
      excerpt:
        "Discover the inspiring journey in the maritime industry, navigating with resilience and constant adaptation to sector challenges.",
      author: "MSC Team",
      date: "Jun 28, 2024",
      readTime: "3 min",
      image: "/images/footage/IMG_20190405_150150.webp",
      views: 197,
      comments: 65,
      likes: 3,
    },
    {
      id: 3,
      title: "Innovation in Maritime Inspections: Technology and Precision",
      excerpt:
        "How advanced technology and modern methodologies are transforming the future of maritime inspections.",
      author: "MSC Team",
      date: "Jun 10, 2024",
      readTime: "5 min",
      image: "/images/footage/IMG_20190406_095637.webp",
      views: 156,
      comments: 42,
      likes: 8,
    },
    {
      id: 4,
      title: "Regulatory Compliance: Navigating IMO Regulations",
      excerpt:
        "A comprehensive guide to international regulations and how to stay up to date with compliance standards.",
      author: "MSC Team",
      date: "May 25, 2024",
      readTime: "6 min",
      image: "/images/footage/IMG_20190406_172726.webp",
      views: 203,
      comments: 58,
      likes: 12,
    },
  ],
}

export function BlogPageClient() {
  const { lang } = useLang()
  const t = content[lang].blog
  const posts = blogPosts[lang]

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "posts", label: "Publicaciones", labelEn: "Posts" },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      <section id="hero" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-hero text-3xl sm:text-4xl md:text-5xl text-white mb-3 tracking-tight"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-base md:text-lg text-accent italic"
          >
            {t.subtitle}
          </motion.p>
        </div>
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden z-[5]">
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.3)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1800,50 2160,35 C2520,20 2880,50 2880,35 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.5)" d="M0,45 C360,35 720,55 1080,45 C1440,35 1800,55 2160,45 C2520,35 2880,55 2880,45 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.8)" d="M0,55 C360,48 720,62 1080,55 C1440,48 1800,62 2160,55 C2520,48 2880,62 2880,55 L2880,70 L0,70 Z"/>
          </svg>
        </div>
      </section>

      <section id="posts" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <BlogCard {...post} lang={lang} variant="full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
