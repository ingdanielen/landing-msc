import { BlogPageWrapper } from "./blog-page-wrapper"
import { getAllBlogPosts, formatBlogDate } from "@/lib/blog"

export default function AdminBlogPage() {
  const posts = getAllBlogPosts(true)
  
  const formattedPosts = posts.map(post => ({
    ...post,
    dateFormatted: formatBlogDate(post.date),
    published: (post as { published?: boolean }).published !== false
  }))

  return <BlogPageWrapper articles={formattedPosts} />
}
