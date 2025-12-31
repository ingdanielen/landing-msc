"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { GalleryListContent } from "./gallery-list-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { Plus } from "lucide-react"
import type { GalleryItem } from "@/lib/gallery-types"

interface GalleryPageWrapperProps {
  items: GalleryItem[]
}

export function GalleryPageWrapper({ items }: GalleryPageWrapperProps) {
  const { t, lang } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.gallery.title}
        description={lang === "es" 
          ? `${items.length} imágenes en la galería`
          : `${items.length} images in the gallery`
        }
        action={{
          label: t.gallery.new,
          href: "/admin/gallery/new",
          icon: <Plus className="w-4 h-4" />
        }}
      />
      <div className="p-6">
        <AdminBreadcrumb items={[{ label: t.nav.gallery }]} />
        <GalleryListContent items={items} />
      </div>
    </>
  )
}

