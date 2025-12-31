import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const GALLERY_DIRECTORY = path.join(process.cwd(), 'content', 'gallery')

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await request.json()
    
    const filePath = path.join(GALLERY_DIRECTORY, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Imagen no encontrada" },
        { status: 404 }
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

    // Write file
    fs.writeFileSync(filePath, frontmatter, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      slug,
      message: "Imagen actualizada correctamente" 
    })
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { message: "Error al actualizar la imagen" },
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
    
    const filePath = path.join(GALLERY_DIRECTORY, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Imagen no encontrada" },
        { status: 404 }
      )
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ 
      success: true, 
      message: "Imagen eliminada correctamente" 
    })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { message: "Error al eliminar la imagen" },
      { status: 500 }
    )
  }
}

