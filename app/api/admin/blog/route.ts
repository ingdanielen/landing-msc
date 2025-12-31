import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog')

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Create frontmatter
    const date = new Date(data.date).toISOString()
    const frontmatter = `---
published: ${data.published}
title: "${data.title}"
date: "${date}"
category: "${data.category}"
featured_image: "${data.featured_image}"
featured_image_alt: "${data.featured_image_alt}"
excerpt: "${data.excerpt}"
author: "${data.author}"
${data.seo_title ? `seo_title: "${data.seo_title}"` : ''}
${data.seo_description ? `seo_description: "${data.seo_description}"` : ''}
---

${data.content}`

    // Generate filename with date prefix
    const datePrefix = data.date.split('T')[0]
    const filename = `${datePrefix}-${data.slug}.md`
    const filePath = path.join(BLOG_DIRECTORY, filename)

    // Ensure directory exists
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      fs.mkdirSync(BLOG_DIRECTORY, { recursive: true })
    }

    // Write file
    fs.writeFileSync(filePath, frontmatter, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      slug: `${datePrefix}-${data.slug}`,
      message: "Artículo creado correctamente" 
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { message: "Error al crear el artículo" },
      { status: 500 }
    )
  }
}

