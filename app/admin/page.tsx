import { DashboardWrapper } from "./dashboard-wrapper"
import { getAllBlogPosts } from "@/lib/blog"
import { getAllGalleryItems } from "@/lib/gallery"

export default function AdminDashboard() {
  const blogPosts = getAllBlogPosts(true)
  const galleryItems = getAllGalleryItems()

  return (
    <DashboardWrapper 
      blogCount={blogPosts.length}
      galleryCount={galleryItems.length}
      recentPosts={blogPosts.slice(0, 5)}
    />
  )
}
