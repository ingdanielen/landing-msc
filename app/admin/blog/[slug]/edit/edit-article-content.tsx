"use client"

import { useRouter } from "next/navigation"
import { ArticleForm } from "@/components/admin/blog/article-form"

interface EditArticleContentProps {
  initialData: {
    slug: string
    title: string
    date: string
    category: string
    featured_image: string
    featured_image_alt: string
    excerpt: string
    author?: string
    content: string
    seo_title?: string
    seo_description?: string
  }
}

export function EditArticleContent({ initialData }: EditArticleContentProps) {
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
    const response = await fetch(`/api/admin/blog/${initialData.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al actualizar el artículo")
    }

    return response.json()
  }

  return (
    <ArticleForm 
      initialData={{
        ...initialData,
        author: initialData.author || "MSC Team",
        seo_title: initialData.seo_title || "",
        seo_description: initialData.seo_description || "",
        published: true
      }} 
      isEditing 
      onSubmit={handleSubmit} 
    />
  )
}

