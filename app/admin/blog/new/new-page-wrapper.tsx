"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { NewArticleContent } from "./new-article-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

export function NewPageWrapper() {
  const { t } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.articles.new}
        description={t.dashboard.newArticleDesc}
      />
      <div className="p-6">
        <AdminBreadcrumb 
          items={[
            { label: t.nav.articles, href: "/admin/blog" },
            { label: t.breadcrumb.new }
          ]} 
        />
        <NewArticleContent />
      </div>
    </>
  )
}

