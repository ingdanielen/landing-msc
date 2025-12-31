import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const GALLERY_DIRECTORY = path.join(process.cwd(), 'content', 'gallery')

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.slug || !data.image) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Create frontmatter
    const frontmatter = `---
visible: ${data.visible}
featured: ${data.featured}
image: "${data.image}"
title: "${data.title}"
alt: "${data.alt}"
category: "${data.category}"
date: "${data.date}"
${data.description ? `description: "${data.description}"` : ''}
${data.location ? `location: "${data.location}"` : ''}
---
`

    const filename = `${data.slug}.md`
    const filePath = path.join(GALLERY_DIRECTORY, filename)

    // Ensure directory exists
    if (!fs.existsSync(GALLERY_DIRECTORY)) {
      fs.mkdirSync(GALLERY_DIRECTORY, { recursive: true })
    }

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Ya existe una imagen con ese slug" },
        { status: 400 }
      )
    }

    // Write file
    fs.writeFileSync(filePath, frontmatter, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      slug: data.slug,
      message: "Imagen guardada correctamente" 
    })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { message: "Error al guardar la imagen" },
      { status: 500 }
    )
  }
}

