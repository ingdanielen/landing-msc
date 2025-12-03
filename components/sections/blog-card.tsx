"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface BlogCardProps {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  image: string
  views: number
  comments: number
  likes: number
  lang: "es" | "en"
  variant?: "preview" | "full"
}

export function BlogCard({ variant = "full", ...post }: BlogCardProps) {
  const isPreview = variant === "preview"

  return (
    <Link href="/blog" className="block group">
      <article className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-row h-full">
        {/* Image - Left Side */}
        <div className={`relative overflow-hidden shrink-0 ${isPreview ? "w-48" : "w-64"}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content - Right Side */}
        <div className={`flex-1 flex flex-col ${isPreview ? "p-4" : "p-6"}`}>
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
                <span>
                  {post.readTime} {post.lang === "es" ? "lectura" : "read"}
                </span>
              </div>
            </div>
          </div>

          {/* Title - Bold, newspaper headline style */}
          <h3 className={`font-bold text-primary mb-2.5 font-sans group-hover:text-accent transition-colors line-clamp-2 ${
            isPreview ? "text-lg" : "text-xl"
          }`}>
            {post.title}
          </h3>

          {/* Excerpt - Compact, newspaper style */}
          <p className={`text-slate-600 leading-relaxed mb-3 line-clamp-3 flex-1 ${
            isPreview ? "text-xs" : "text-sm"
          }`}>
            {post.excerpt}
          </p>

          {/* Footer - Just arrow */}
          <div className="flex items-center justify-end pt-3 border-t border-slate-200">
            <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}
