import { notFound } from "next/navigation"
import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { EditGalleryContent } from "./edit-gallery-content"
import { getGalleryItemBySlug } from "@/lib/gallery"

interface EditGalleryPageProps {
  params: Promise<{ slug: string }>
}

export default async function EditGalleryPage({ params }: EditGalleryPageProps) {
  const { slug } = await params
  const item = getGalleryItemBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      <AdminHeader 
        title="Editar imagen" 
        description={item.title}
      />
      <div className="p-6">
        <AdminBreadcrumb 
          items={[
            { label: "Galería", href: "/admin/gallery" },
            { label: "Editar" }
          ]} 
        />
        <EditGalleryContent initialData={item} />
      </div>
    </>
  )
}

