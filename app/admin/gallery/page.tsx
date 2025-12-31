import { GalleryPageWrapper } from "./gallery-page-wrapper"
import { getAllGalleryItems } from "@/lib/gallery"

export default function AdminGalleryPage() {
  const items = getAllGalleryItems()

  return <GalleryPageWrapper items={items} />
}
