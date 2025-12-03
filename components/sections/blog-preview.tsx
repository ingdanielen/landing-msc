"use client"

import { type Language } from "@/lib/content"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Calendar, Clock } from "lucide-react"

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
  ],
}

export function BlogPreview({ lang }: { lang: Language }) {
  const posts = blogPosts[lang]

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans uppercase tracking-tight">
            {lang === "es" ? "Noticias y Publicaciones" : "News & Publications"}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Artículos técnicos, noticias de la industria y actualizaciones normativas."
              : "Technical articles, industry news and regulatory updates."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link href="/blog" className="block">
                <article className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-row h-full">
                  {/* Image - Left Side */}
                  <div className="relative overflow-hidden shrink-0 w-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content - Right Side */}
                  <div className="flex-1 flex flex-col p-4">
                    {/* Author and Date - Newspaper style */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                      <span className="font-medium text-slate-700">{post.author}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} {lang === "es" ? "lectura" : "read"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title - Bold, newspaper headline style */}
                    <h3 className="text-lg font-bold text-primary mb-2.5 font-sans group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt - Compact */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer - Just arrow */}
                    <div className="flex items-center justify-end pt-3 border-t border-slate-200">
                      <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link href="/blog">
            <button className="text-accent hover:text-primary font-semibold text-sm uppercase tracking-wide flex items-center gap-2 mx-auto group">
              {lang === "es" ? "Ver todas las publicaciones" : "View all publications"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
