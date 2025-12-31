import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { NewGalleryContent } from "./new-gallery-content"

export default function NewGalleryPage() {
  return (
    <>
      <AdminHeader 
        title="Nueva imagen" 
        description="Añade una nueva imagen a la galería"
      />
      <div className="p-6">
        <AdminBreadcrumb 
          items={[
            { label: "Galería", href: "/admin/gallery" },
            { label: "Nueva" }
          ]} 
        />
        <NewGalleryContent />
      </div>
    </>
  )
}

