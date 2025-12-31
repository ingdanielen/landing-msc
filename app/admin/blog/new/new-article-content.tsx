"use client"

import { useRouter } from "next/navigation"
import { ArticleForm } from "@/components/admin/blog/article-form"

export function NewArticleContent() {
  const router = useRouter()

  const handleSubmit = async (data: {
    title: string
    slug: string
    date: string
    category: string
    featured_image: string
    featured_image_alt: string
    excerpt: string
    author: string
    content: string
    published: boolean
    seo_title: string
    seo_description: string
  }) => {
    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al crear el artículo")
    }

    return response.json()
  }

  return <ArticleForm onSubmit={handleSubmit} />
}

