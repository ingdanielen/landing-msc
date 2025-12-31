"use client"

import { useRouter } from "next/navigation"
import { ArticleList } from "@/components/admin/blog/article-list"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  dateFormatted: string
  category: string
  featured_image: string
  published?: boolean
}

interface BlogListContentProps {
  articles: Article[]
}

export function BlogListContent({ articles }: BlogListContentProps) {
  const router = useRouter()
  const { t } = useAdminLang()

  const handleDelete = async (slug: string) => {
    if (!confirm(t.articles.confirmDelete)) return
    
    try {
      const response = await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE"
      })
      
      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting article:", error)
    }
  }

  return <ArticleList articles={articles} onDelete={handleDelete} />
}
