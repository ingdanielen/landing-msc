"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { BlogCard } from "@/components/sections/blog-card"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { HeroText } from "@/components/ui/hero-text"
import type { BlogPostPreview } from "@/lib/blog-types"

interface BlogPageClientProps {
  posts: BlogPostPreview[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const { lang } = useLang()
  const t = content[lang].blog

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HeroText as="h1" className="text-3xl sm:text-4xl md:text-5xl text-white mb-3 tracking-tight">
              {t.title}
            </HeroText>
          </motion.div>
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
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <BlogCard post={post} lang={lang} variant="full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
