import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog')

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await request.json()
    
    // Find existing file
    const existingFile = `${slug}.md`
    const existingPath = path.join(BLOG_DIRECTORY, existingFile)

    if (!fs.existsSync(existingPath)) {
      return NextResponse.json(
        { message: "Artículo no encontrado" },
        { status: 404 }
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

    // Write file
    fs.writeFileSync(existingPath, frontmatter, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      slug,
      message: "Artículo actualizado correctamente" 
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { message: "Error al actualizar el artículo" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Artículo no encontrado" },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ 
      success: true, 
      message: "Artículo eliminado correctamente" 
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { message: "Error al eliminar el artículo" },
      { status: 500 }
    )
  }
}

