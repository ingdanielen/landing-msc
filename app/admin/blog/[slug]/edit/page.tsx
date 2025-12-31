import { notFound } from "next/navigation"
import { EditPageWrapper } from "./edit-page-wrapper"
import { getBlogPostBySlug } from "@/lib/blog"

interface EditArticlePageProps {
  params: Promise<{ slug: string }>
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <EditPageWrapper initialData={post} />
}
