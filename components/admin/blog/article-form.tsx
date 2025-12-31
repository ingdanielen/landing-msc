"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  X, 
  Calendar,
  User,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  Type,
  Link2,
  Image as ImageIcon,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarkdownEditor } from "./markdown-editor"
import { ArticlePreview } from "./article-preview"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { cn } from "@/lib/utils"

interface ArticleFormData {
  title: string
  slug: string
  date: string
  category: string
  featured_image: string
  featured_image_alt: string
  excerpt: string
  author: string
  content: string
  published: boolean
  seo_title: string
  seo_description: string
}

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>
  isEditing?: boolean
  onSubmit: (data: ArticleFormData) => Promise<void>
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB

export function ArticleForm({ initialData, isEditing, onSubmit }: ArticleFormProps) {
  const router = useRouter()
  const { t, lang } = useAdminLang()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "preview">("content")
  const [customCategory, setCustomCategory] = useState("")
  const [useCustomCategory, setUseCustomCategory] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const categories = [
    { label: t.categories.news, value: "Noticias" },
    { label: t.categories.technical, value: "Tecnico" },
    { label: t.categories.regulations, value: "Normativas" },
    { label: t.categories.company, value: "Empresa" },
    { label: t.categories.educational, value: "Educativo" },
  ]

  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    category: initialData?.category || "Noticias",
    featured_image: initialData?.featured_image || "",
    featured_image_alt: initialData?.featured_image_alt || "",
    excerpt: initialData?.excerpt || "",
    author: initialData?.author || "MSC Team",
    content: initialData?.content || "",
    published: initialData?.published ?? true,
    seo_title: initialData?.seo_title || "",
    seo_description: initialData?.seo_description || "",
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
      slug: !isEditing ? generateSlug(title) : prev.slug
    }))
  }

  const handleCategoryChange = (value: string) => {
    if (value === "__custom__") {
      setUseCustomCategory(true)
    } else {
      setUseCustomCategory(false)
      setFormData(prev => ({ ...prev, category: value }))
    }
  }

  const handleCustomCategoryChange = (value: string) => {
    setCustomCategory(value)
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await onSubmit(formData)
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/blog")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setIsLoading(false)
    }
  }

  const validateAndUploadImage = async (file: File): Promise<boolean> => {
    setImageError(null)
    
    // Validar tamaño
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError(`La imagen excede el tamaño máximo de 2MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return false
    }

    // Validar tipo
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setImageError(`Formato no soportado. Use WebP, JPG o PNG.`)
      return false
    }

    return true
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isValid = await validateAndUploadImage(file)
    if (!isValid) return

    const imageUrl = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, featured_image: imageUrl }))
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
          {t.articleForm.back}
        </button>

        <div className="flex items-center gap-3">
          {/* Status Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-slate-600">
              {formData.published ? t.articles.published : t.articles.draft}
            </span>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors",
                formData.published ? "bg-emerald-500" : "bg-slate-300"
              )}
            >
              <span className={cn(
                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm",
                formData.published && "translate-x-5"
              )} />
            </button>
          </label>

          <Button
            type="submit"
            disabled={isLoading || !formData.title || !formData.content}
            className="bg-accent hover:bg-accent/90 text-white gap-2 h-9"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEditing ? t.articleForm.update : t.articleForm.publish}
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
            {isEditing ? t.articles.updateSuccess : t.articles.saveSuccess}
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Type className="w-4 h-4 text-accent" />
              {t.articleForm.titleLabel}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={t.articleForm.titlePlaceholder}
              className="w-full px-4 py-3 text-lg font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Slug */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Link2 className="w-4 h-4 text-accent" />
              {t.articleForm.urlLabel}
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 text-sm text-slate-500 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                /blog/
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-del-articulo"
                className="flex-1 px-3 py-2.5 text-sm border border-slate-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "content"
                    ? "text-accent border-accent"
                    : "text-slate-500 border-transparent hover:text-slate-700"
                )}
              >
                <FileText className="w-4 h-4 inline-block mr-2" />
                {t.articleForm.tabContent}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "seo"
                    ? "text-accent border-accent"
                    : "text-slate-500 border-transparent hover:text-slate-700"
                )}
              >
                <Tag className="w-4 h-4 inline-block mr-2" />
                {t.articleForm.tabSeo}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "preview"
                    ? "text-accent border-accent"
                    : "text-slate-500 border-transparent hover:text-slate-700"
                )}
              >
                <Eye className="w-4 h-4 inline-block mr-2" />
                {t.articleForm.tabPreview}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "content" ? (
            <div className="space-y-6">
              {/* Excerpt */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.articleForm.excerptLabel}
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder={t.articleForm.excerptPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all resize-none"
                />
                <p className="mt-2 text-xs text-slate-400">
                  {formData.excerpt.length}/200 {t.articleForm.characters}
                </p>
              </div>

              {/* Markdown Editor */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.articleForm.contentLabel}
                </label>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                />
              </div>
            </div>
          ) : activeTab === "seo" ? (
            <div className="space-y-6">
              {/* SEO Title */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.articleForm.seoTitleLabel}
                </label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
                  placeholder={formData.title || t.articleForm.seoTitlePlaceholder}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all"
                />
                <p className="mt-2 text-xs text-slate-400">
                  {(formData.seo_title || formData.title).length}/60 {t.articleForm.charactersRecommended}
                </p>
              </div>

              {/* SEO Description */}
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.articleForm.seoDescLabel}
                </label>
                <textarea
                  value={formData.seo_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
                  placeholder={formData.excerpt || t.articleForm.seoDescPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all resize-none"
                />
                <p className="mt-2 text-xs text-slate-400">
                  {(formData.seo_description || formData.excerpt).length}/160 {t.articleForm.charactersRecommended}
                </p>
              </div>

              {/* SEO Preview - Google Style */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{t.articleForm.seoPreview}</p>
                </div>
                <div className="space-y-1.5 pl-1">
                  <p className="text-[#1a0dab] text-xl font-medium truncate hover:underline cursor-pointer">
                    {formData.seo_title || formData.title || t.articleForm.titleLabel}
                  </p>
                  <p className="text-[#006621] text-sm truncate">
                    mscsurveyors.org › blog › {formData.slug || "url-del-articulo"}
                  </p>
                  <p className="text-[#545454] text-sm line-clamp-2 leading-relaxed">
                    {formData.seo_description || formData.excerpt || t.articleForm.seoDescPlaceholder}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Preview Tab */
            <ArticlePreview data={formData} />
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <ImageIcon className="w-4 h-4 text-accent" />
              {t.articleForm.featuredImage}
            </label>
            
            {/* Image Error */}
            {imageError && (
              <div className="flex items-start gap-2 p-3 mb-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">{imageError}</p>
                </div>
              </div>
            )}

            {formData.featured_image ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 mb-3">
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, featured_image: "" }))
                    setImageError(null)
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all mb-3">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">{t.articleForm.uploadImage}</span>
                <span className="text-xs text-slate-400 mt-1">Máx. 2MB</span>
                <span className="text-xs text-emerald-600 font-medium mt-1">Recomendado: WebP, JPG, PNG</span>
                <input
                  type="file"
                  accept="image/webp,image/jpeg,image/jpg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            <input
              type="text"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder={t.articleForm.imagePlaceholder}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all mb-3"
            />
            <input
              type="text"
              value={formData.featured_image_alt}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image_alt: e.target.value }))}
              placeholder={t.articleForm.imageAltPlaceholder}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Category */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <Tag className="w-4 h-4 text-accent" />
              {t.articleForm.category}
            </label>
            
            {!useCustomCategory ? (
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer mb-2"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
                <option value="__custom__">+ Escribir categoría personalizada</option>
              </select>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => handleCustomCategoryChange(e.target.value)}
                  placeholder="Escribe una categoría..."
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setUseCustomCategory(false)
                    setFormData(prev => ({ ...prev, category: "Noticias" }))
                    setCustomCategory("")
                  }}
                  className="text-xs text-accent hover:underline"
                >
                  ← Volver a categorías predefinidas
                </button>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <Calendar className="w-4 h-4 text-accent" />
              {t.articleForm.date}
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Author */}
          <div className="bg-white border border-slate-200/60 rounded-lg p-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <User className="w-4 h-4 text-accent" />
              {t.articleForm.author}
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder={t.articleForm.authorPlaceholder}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
