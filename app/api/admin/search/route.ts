import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content/blog")

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    if (!query) {
      return NextResponse.json({ articles: [] })
    }

    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      return NextResponse.json({ articles: [] })
    }

    const files = fs.readdirSync(contentDir).filter(file => file.endsWith(".md"))
    
    const articles = files
      .map(file => {
        const filePath = path.join(contentDir, file)
        const fileContent = fs.readFileSync(filePath, "utf-8")
        const { data } = matter(fileContent)
        
        return {
          slug: file.replace(".md", ""),
          title: data.title || "",
          excerpt: data.excerpt || "",
          category: data.category || "",
          date: data.date || "",
          published: data.published !== false
        }
      })
      .filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.slug.toLowerCase().includes(query)
      )
      .slice(0, 5) // Limit to 5 results

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ articles: [] })
  }
}

