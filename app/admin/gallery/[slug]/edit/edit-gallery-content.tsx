"use client"

import { useRouter } from "next/navigation"
import { GalleryForm } from "@/components/admin/gallery/gallery-form"

interface EditGalleryContentProps {
  initialData: {
    slug: string
    title: string
    image: string
    alt: string
    category: string
    date: string
    description?: string
    location?: string
    visible?: boolean
    featured?: boolean
  }
}

export function EditGalleryContent({ initialData }: EditGalleryContentProps) {
  const router = useRouter()

  const handleSubmit = async (data: {
    title: string
    slug: string
    image: string
    alt: string
    category: string
    date: string
    description: string
    location: string
    visible: boolean
    featured: boolean
  }) => {
    const response = await fetch(`/api/admin/gallery/${initialData.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al actualizar la imagen")
    }

    return response.json()
  }

  return (
    <GalleryForm 
      initialData={{
        ...initialData,
        description: initialData.description || "",
        location: initialData.location || "",
        visible: initialData.visible ?? true,
        featured: initialData.featured ?? false
      }} 
      isEditing 
      onSubmit={handleSubmit} 
    />
  )
}

