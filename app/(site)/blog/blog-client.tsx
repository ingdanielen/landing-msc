"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { BlogCard } from "@/components/sections/blog-card"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { HeroText } from "@/components/ui/hero-text"
import { Newspaper } from "lucide-react"
import type { BlogPostPreview } from "@/lib/blog-types"

interface BlogPageClientProps {
  posts: BlogPostPreview[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const { lang } = useLang()
  const t = content[lang].blog

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "featured", label: "Destacado", labelEn: "Featured" },
    { id: "posts", label: "Publicaciones", labelEn: "Posts" },
  ]

  // Separar el primer post como destacado
  const [featuredPost, ...restPosts] = posts

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      
      {/* Hero Section */}
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
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/90 to-primary/80" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <Newspaper className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">
              {lang === "es" ? "Noticias y Artículos" : lang === "zh" ? "新闻与文章" : "News & Articles"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <HeroText as="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
              {t.title}
            </HeroText>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden z-[5]">
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(248,250,252,0.3)" d="M0,35 C360,20 720,50 1080,35 C1440,20 1800,50 2160,35 C2520,20 2880,50 2880,35 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="rgba(248,250,252,0.5)" d="M0,45 C360,35 720,55 1080,45 C1440,35 1800,55 2160,45 C2520,35 2880,55 2880,45 L2880,70 L0,70 Z"/>
          </svg>
          <svg className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-fast" viewBox="0 0 2880 70" preserveAspectRatio="none">
            <path fill="#f8fafc" d="M0,55 C360,48 720,62 1080,55 C1440,48 1800,62 2160,55 C2520,48 2880,62 2880,55 L2880,70 L0,70 Z"/>
          </svg>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredPost && (
        <section id="featured" className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-primary">
                {lang === "es" ? "Artículo Destacado" : lang === "zh" ? "精选文章" : "Featured Article"}
              </h2>
              <p className="text-sm text-slate-500">
                {lang === "es" ? "Nuestra publicación más reciente" : lang === "zh" ? "我们最新的出版物" : "Our most recent publication"}
              </p>
            </motion.div>

            {/* Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <BlogCard post={featuredPost} lang={lang} variant="featured" />
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts Grid Section */}
      <section id="posts" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <HeroText as="h2" className="text-2xl md:text-3xl text-primary">
              {lang === "es" ? "Todas las Publicaciones" : lang === "zh" ? "所有出版物" : "All Publications"}
            </HeroText>
          </motion.div>

          {/* Posts Grid */}
          {restPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {restPosts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <BlogCard post={post} lang={lang} variant="standard" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500">
                {lang === "es" 
                  ? "No hay más artículos disponibles por el momento." 
                  : lang === "zh" 
                    ? "目前没有更多文章可用。" 
                    : "No more articles available at this time."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-hero">
                {lang === "es" 
                  ? "Mantente Informado" 
                  : lang === "zh" 
                    ? "保持知情" 
                    : "Stay Informed"}
              </h2>
              <p className="text-white/70 text-lg mb-8">
                {lang === "es"
                  ? "Suscríbete para recibir las últimas noticias y actualizaciones de la industria marítima."
                  : lang === "zh"
                    ? "订阅以接收海事行业的最新新闻和更新。"
                    : "Subscribe to receive the latest news and updates from the maritime industry."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder={lang === "es" ? "Tu correo electrónico" : lang === "zh" ? "您的电子邮件" : "Your email address"}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
              <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                {lang === "es" ? "Suscribirse" : lang === "zh" ? "订阅" : "Subscribe"}
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-xs mt-4"
            >
              {lang === "es"
                ? "Sin spam. Puedes cancelar en cualquier momento."
                : lang === "zh"
                  ? "没有垃圾邮件。您可以随时取消。"
                  : "No spam. You can unsubscribe at any time."}
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  )
}
