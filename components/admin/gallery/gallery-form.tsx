"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  Save, 
  ArrowLeft, 
  X, 
  Tag,
  MapPin,
  Calendar,
  Star,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

interface GalleryFormData {
  title: string
  slug: string
  image: string
  alt: string
  category: string
  date: string
  description: string
  location: string
  visible: boolean
  featured: boolean
}

interface GalleryFormProps {
  initialData?: Partial<GalleryFormData>
  isEditing?: boolean
  onSubmit: (data: GalleryFormData) => Promise<void>
}

const categories = [
  { label: "Buques", value: "buques" },
  { label: "Carga", value: "carga" },
  { label: "Puertos", value: "puertos" },
  { label: "Consultoría", value: "consultoria" },
  { label: "Operaciones", value: "operaciones" },
  { label: "Equipo", value: "equipo" },
]

export function GalleryForm({ initialData, isEditing, onSubmit }: GalleryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<GalleryFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    image: initialData?.image || "",
    alt: initialData?.alt || "",
    category: initialData?.category || "operaciones",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    description: initialData?.description || "",
    location: initialData?.location || "",
    visible: initialData?.visible ?? true,
    featured: initialData?.featured ?? false,
  })

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }, [])

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? generateSlug(title) : prev.slug,
      alt: !prev.alt ? title : prev.alt
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await onSubmit(formData)
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/gallery")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between sticky top-0 z-20 bg-[#f8fafc] -mx-6 px-6 py-4 -mt-6 border-b border-slate-200/60">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={isLoading || !formData.title || !formData.image}
            className="bg-accent hover:bg-accent/90 text-white gap-2 h-9"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <button type="button" onClick={() => setError(null)} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">
            {isEditing ? "Imagen actualizada correctamente" : "Imagen guardada correctamente"}
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Imagen
            </label>
            <ImageUpload
              value={formData.image}
              onChange={(image) => setFormData(prev => ({ ...prev, image }))}
              aspectRatio="square"
            />
          </div>

          {/* Alt Text */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Texto alternativo (Alt)
            </label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="Describe la imagen para accesibilidad..."
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
            <p className="mt-1 text-xs text-slate-400">
              Importante para SEO y accesibilidad
            </p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título de la imagen..."
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Category */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Tag className="w-4 h-4" />
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <MapPin className="w-4 h-4" />
              Ubicación
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Ej: Puerto de Panamá"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Date */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar className="w-4 h-4" />
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción opcional de la imagen..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
            />
          </div>

          {/* Visibility & Featured */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4 space-y-4">
            {/* Visible Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {formData.visible ? (
                  <Eye className="w-4 h-4 text-slate-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-700">Visible</p>
                  <p className="text-xs text-slate-500">Mostrar en la galería pública</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, visible: !prev.visible }))}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  formData.visible ? "bg-emerald-500" : "bg-slate-300"
                )}
              >
                <span className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                  formData.visible && "translate-x-5"
                )} />
              </button>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Star className={cn(
                  "w-4 h-4",
                  formData.featured ? "text-amber-500 fill-amber-500" : "text-slate-500"
                )} />
                <div>
                  <p className="text-sm font-medium text-slate-700">Destacada</p>
                  <p className="text-xs text-slate-500">Aparecerá en la galería de Home</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  formData.featured ? "bg-amber-500" : "bg-slate-300"
                )}
              >
                <span className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                  formData.featured && "translate-x-5"
                )} />
              </button>
            </div>
            
            {/* Featured limit note */}
            {formData.featured && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-700">
                  <strong>Nota:</strong> Solo las últimas 12 imágenes destacadas se muestran en Home. Si hay más de 12, se mostrarán las más recientes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

