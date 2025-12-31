"use client"

import { useRouter } from "next/navigation"
import { GalleryForm } from "@/components/admin/gallery/gallery-form"

export function NewGalleryContent() {
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
    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Error al guardar la imagen")
    }

    return response.json()
  }

  return <GalleryForm onSubmit={handleSubmit} />
}

