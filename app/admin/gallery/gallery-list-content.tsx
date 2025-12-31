"use client"

import { useRouter } from "next/navigation"
import { GalleryList } from "@/components/admin/gallery/gallery-list"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface GalleryItem {
  slug: string
  title: string
  image: string
  alt: string
  category: string
  date: string
  visible?: boolean
  featured?: boolean
}

interface GalleryListContentProps {
  items: GalleryItem[]
}

export function GalleryListContent({ items }: GalleryListContentProps) {
  const router = useRouter()
  const { t } = useAdminLang()

  const handleDelete = async (slug: string) => {
    if (!confirm(t.gallery.confirmDelete)) return
    
    try {
      const response = await fetch(`/api/admin/gallery/${slug}`, {
        method: "DELETE"
      })
      
      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return <GalleryList items={items} onDelete={handleDelete} />
}
