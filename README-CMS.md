# 📝 Panel de Administración - Decap CMS

Este documento explica cómo funciona el sistema de gestión de contenido para el Blog y la Galería de MSC.

---

## 🚀 Flujo de Contenido

```
┌─────────────────┐      ┌──────────┐      ┌────────┐      ┌──────────┐
│   Decap CMS     │ ──▶  │  GitHub  │ ──▶  │ Vercel │ ──▶  │  Next.js │
│   (/admin)      │      │  (repo)  │      │ (build)│      │   (UI)   │
└─────────────────┘      └──────────┘      └────────┘      └──────────┘
     Usuario               Commit           Redeploy        Contenido
     edita                automático        automático      visible
```

1. **El usuario edita contenido** en `/admin` (Decap CMS)
2. **Decap CMS crea un commit** automáticamente en GitHub
3. **Vercel detecta el cambio** y redespliega el sitio
4. **El contenido aparece** en la web en ~1-2 minutos

---

## ⚙️ Configuración Inicial (Una sola vez)

### 1. Configurar el repositorio en `config.yml`

Edita `public/admin/config.yml` y reemplaza la línea del repositorio:

```yaml
backend:
  name: github
  repo: TU-USUARIO/TU-REPOSITORIO  # ← Reemplazar aquí
  branch: main
```

### 2. Registrar OAuth App en GitHub

1. Ve a **GitHub** → **Settings** → **Developer Settings** → **OAuth Apps**
2. Click en **"New OAuth App"**
3. Completa los campos:
   - **Application name**: `MSC Admin Panel`
   - **Homepage URL**: `https://tu-dominio.vercel.app`
   - **Authorization callback URL**: `https://tu-dominio.vercel.app/admin/`
4. Guarda el **Client ID** y **Client Secret**

### 3. Configurar Variables en Vercel

En tu proyecto de Vercel, agrega estas variables de entorno:

| Variable | Valor |
|----------|-------|
| `OAUTH_GITHUB_CLIENT_ID` | Tu Client ID de GitHub |
| `OAUTH_GITHUB_CLIENT_SECRET` | Tu Client Secret de GitHub |

> **Nota**: Si usas Netlify Identity o otro provider, la configuración será diferente.

---

## 📁 Estructura de Archivos

```
📁 project/
├── 📁 public/
│   ├── 📁 admin/
│   │   ├── index.html      # Carga Decap CMS
│   │   └── config.yml      # Configuración del CMS
│   └── 📁 uploads/
│       ├── 📁 blog/        # Imágenes de artículos
│       └── 📁 gallery/     # Imágenes de galería
│
├── 📁 content/
│   ├── 📁 blog/            # Archivos .md del blog
│   │   └── YYYY-MM-DD-slug.md
│   └── 📁 gallery/         # Archivos .md de galería
│       └── slug.md
│
└── 📁 lib/
    ├── blog.ts             # Helpers para leer blog
    └── gallery.ts          # Helpers para leer galería
```

---

## 📖 Uso de los Helpers

### Blog

```typescript
import { 
  getAllBlogPosts, 
  getBlogPostBySlug,
  getRecentBlogPosts,
  formatBlogDate 
} from '@/lib/blog'

// Obtener todos los artículos (para listado)
const posts = getAllBlogPosts()

// Obtener un artículo específico (para página de detalle)
const post = getBlogPostBySlug('2025-01-15-mi-articulo')

// Obtener los 3 más recientes (para homepage)
const recent = getRecentBlogPosts(3)

// Formatear fecha
const fecha = formatBlogDate(post.date) // "15 de enero de 2025"
```

### Galería

```typescript
import { 
  getAllGalleryItems, 
  getGalleryItemsByCategory,
  getFeaturedGalleryItems,
  getCategoryLabel 
} from '@/lib/gallery'

// Obtener todas las imágenes
const items = getAllGalleryItems()

// Filtrar por categoría
const vesselPhotos = getGalleryItemsByCategory('buques')

// Solo destacadas
const featured = getFeaturedGalleryItems()

// Etiqueta legible
const label = getCategoryLabel('buques') // "Inspecciones de Buques"
```

---

## 🖼 Uso con next/image

```tsx
import Image from 'next/image'
import { getAllGalleryItems } from '@/lib/gallery'

export default function Gallery() {
  const items = getAllGalleryItems()
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Image
          key={item.slug}
          src={item.image}
          alt={item.alt}
          width={400}
          height={300}
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  )
}
```

---

## 🔄 ISR (Incremental Static Regeneration)

Para que el contenido se actualice sin redeployar manualmente:

```typescript
// En app/blog/page.tsx
export const revalidate = 3600 // Revalidar cada hora

// O para revalidación on-demand:
export const dynamic = 'force-static'
```

---

## 🛠 Solución de Problemas

### El contenido no aparece después de editar

1. Verifica que el commit llegó a GitHub
2. Revisa el deployment en Vercel
3. Espera ~1-2 minutos para el redeploy

### Error de autenticación en /admin

1. Verifica que el OAuth App está configurado
2. Comprueba que la callback URL es correcta
3. Asegúrate de que las variables de entorno están en Vercel

### Las imágenes no cargan

1. Verifica que las imágenes están en `public/uploads/`
2. Comprueba que las rutas en el frontmatter son correctas
3. Las rutas deben empezar con `/uploads/` (sin `public/`)

---

## 📞 Soporte

Para problemas técnicos con el CMS, contactar al desarrollador.

---

**Última actualización**: Diciembre 2024

