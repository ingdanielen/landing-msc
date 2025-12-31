"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { DashboardContent } from "./dashboard-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface DashboardWrapperProps {
  blogCount: number
  galleryCount: number
  recentPosts: Array<{
    slug: string
    title: string
    date: string
    category: string
    published?: boolean
  }>
}

export function DashboardWrapper({ blogCount, galleryCount, recentPosts }: DashboardWrapperProps) {
  const { t } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.dashboard.title}
        description={t.dashboard.description}
      />
      <div className="p-6">
        <DashboardContent 
          blogCount={blogCount}
          galleryCount={galleryCount}
          recentPosts={recentPosts}
        />
      </div>
    </>
  )
}

