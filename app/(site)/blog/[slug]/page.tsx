import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { 
  getAllBlogSlugs, 
  getBlogPostBySlug, 
  formatBlogDate,
  getCategoryLabel 
} from "@/lib/blog"
import { BlogPostClient } from "./blog-post-client"
import { ArticleSchema } from "@/components/seo/schema-org"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

// ISR: Revalidar cada hora
export const revalidate = 3600

// Generar rutas estáticas para todos los posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generar metadata dinámica
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Artículo no encontrado | MSC",
    }
  }
  
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt
  
  return {
    title: `${title} | MSC Blog`,
    description,
    keywords: [
      "inspecciones marítimas",
      "industria marítima",
      getCategoryLabel(post.category),
      "MSC",
    ],
    openGraph: {
      title: `${title} | MSC`,
      description,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : ["MSC Team"],
      images: [
        {
          url: post.featured_image.startsWith("http") 
            ? post.featured_image 
            : `${siteUrl}${post.featured_image}`,
          width: 1200,
          height: 630,
          alt: post.featured_image_alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MSC`,
      description,
      images: [post.featured_image],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        image={post.featured_image.startsWith("http") 
          ? post.featured_image 
          : `${siteUrl}${post.featured_image}`}
        datePublished={post.date}
        authorName={post.author || "MSC Team"}
        url={`${siteUrl}/blog/${slug}`}
      />
      <BlogPostClient 
        post={{
          ...post,
          dateFormatted: formatBlogDate(post.date),
        }} 
      />
    </>
  )
}

