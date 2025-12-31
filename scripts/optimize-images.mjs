/**
 * Script para optimizar imágenes pesadas
 * Ejecutar: node scripts/optimize-images.mjs
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const imagesToOptimize = [
  {
    input: 'public/images/stock/front-msc.jpg',
    output: 'public/images/stock/front-msc-poster.webp',
    width: 1920,
    quality: 60,
  },
  {
    input: 'public/images/stock/sea-msc.jpg', 
    output: 'public/images/stock/sea-msc-optimized.webp',
    width: 1200,
    quality: 70,
  },
]

console.log('🖼️  Optimizing images for web performance...\n')

// Check if sharp is available
try {
  const sharp = await import('sharp')
  
  for (const img of imagesToOptimize) {
    if (!existsSync(img.input)) {
      console.log(`⚠️  Skipping ${img.input} - file not found`)
      continue
    }
    
    await sharp.default(img.input)
      .resize(img.width, null, { withoutEnlargement: true })
      .webp({ quality: img.quality })
      .toFile(img.output)
    
    console.log(`✅ Created ${img.output}`)
  }
  
  console.log('\n✨ Image optimization complete!')
} catch (error) {
  console.log('⚠️  Sharp not available. Please install: npm install sharp')
  console.log('   Or manually convert images to WebP using an online tool.')
  console.log('\n   Recommended specs:')
  imagesToOptimize.forEach(img => {
    console.log(`   - ${img.input}: ${img.width}px wide, WebP quality ${img.quality}`)
  })
}

