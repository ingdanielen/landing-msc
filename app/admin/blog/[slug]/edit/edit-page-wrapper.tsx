"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { EditArticleContent } from "./edit-article-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface EditPageWrapperProps {
  initialData: {
    title: string
    slug: string
    date: string
    category: string
    featured_image: string
    featured_image_alt: string
    excerpt: string
    author: string
    content: string
    published?: boolean
    seo_title?: string
    seo_description?: string
  }
}

export function EditPageWrapper({ initialData }: EditPageWrapperProps) {
  const { t } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.articles.edit}
        description={initialData.title}
      />
      <div className="p-6">
        <AdminBreadcrumb 
          items={[
            { label: t.nav.articles, href: "/admin/blog" },
            { label: t.breadcrumb.edit }
          ]} 
        />
        <EditArticleContent initialData={initialData} />
      </div>
    </>
  )
}

