"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { BlogListContent } from "./blog-list-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { Plus } from "lucide-react"

interface BlogPageWrapperProps {
  articles: Array<{
    slug: string
    title: string
    date: string
    dateFormatted: string
    category: string
    excerpt: string
    featured_image: string
    published: boolean
  }>
}

export function BlogPageWrapper({ articles }: BlogPageWrapperProps) {
  const { t, lang } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.articles.title}
        description={lang === "es" 
          ? `${articles.length} artículos en el blog`
          : `${articles.length} articles in the blog`
        }
        action={{
          label: t.articles.new,
          href: "/admin/blog/new",
          icon: <Plus className="w-4 h-4" />
        }}
      />
      <div className="p-6">
        <AdminBreadcrumb items={[{ label: t.nav.articles }]} />
        <BlogListContent articles={articles} />
      </div>
    </>
  )
}

