"use client"

import { useState } from "react"
import { 
  X, 
  BookOpen, 
  FileText, 
  Image, 
  Search, 
  Keyboard, 
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Play,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

interface GuideStep {
  title: string
  description: string
  completed?: boolean
}

interface Guide {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  steps?: GuideStep[]
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const { t, lang } = useAdminLang()
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)

  const guides: Guide[] = [
    {
      id: "getting-started",
      icon: <Play className="w-5 h-5" />,
      title: t.help.gettingStarted,
      description: t.help.gettingStartedDesc,
      steps: lang === "es" ? [
        { title: "Explora el Dashboard", description: "El Dashboard te muestra un resumen de todo tu contenido: artículos publicados, borradores e imágenes." },
        { title: "Navega por el menú", description: "Usa el menú lateral para acceder a Artículos, Galería y Configuración." },
        { title: "Usa el buscador", description: "Presiona Ctrl+K (o ⌘K en Mac) para buscar rápidamente artículos y funciones." },
        { title: "Personaliza tu experiencia", description: "Ve a Configuración para cambiar el idioma y otras preferencias." },
      ] : [
        { title: "Explore the Dashboard", description: "The Dashboard shows you a summary of all your content: published articles, drafts, and images." },
        { title: "Navigate the menu", description: "Use the sidebar menu to access Articles, Gallery, and Settings." },
        { title: "Use the search", description: "Press Ctrl+K (or ⌘K on Mac) to quickly search articles and features." },
        { title: "Customize your experience", description: "Go to Settings to change language and other preferences." },
      ]
    },
    {
      id: "create-article",
      icon: <FileText className="w-5 h-5" />,
      title: t.help.createArticle,
      description: t.help.createArticleDesc,
      steps: lang === "es" ? [
        { title: "Crear nuevo artículo", description: "Ve a Artículos > Nuevo artículo o usa el botón '+' en el header." },
        { title: "Escribe el título", description: "Un buen título es clave. Se generará automáticamente la URL amigable." },
        { title: "Añade contenido", description: "Usa el editor Markdown para dar formato a tu texto. Puedes añadir imágenes, enlaces y más." },
        { title: "Configura SEO", description: "Completa el título SEO y la meta descripción para mejor posicionamiento." },
        { title: "Vista previa", description: "Usa la pestaña 'Vista previa' para ver cómo se verá el artículo publicado." },
        { title: "Publicar", description: "Activa el switch de 'Publicado' y haz clic en 'Publicar'." },
      ] : [
        { title: "Create new article", description: "Go to Articles > New article or use the '+' button in the header." },
        { title: "Write the title", description: "A good title is key. The friendly URL will be generated automatically." },
        { title: "Add content", description: "Use the Markdown editor to format your text. You can add images, links, and more." },
        { title: "Configure SEO", description: "Complete the SEO title and meta description for better ranking." },
        { title: "Preview", description: "Use the 'Preview' tab to see how the published article will look." },
        { title: "Publish", description: "Enable the 'Published' switch and click 'Publish'." },
      ]
    },
    {
      id: "manage-gallery",
      icon: <Image className="w-5 h-5" />,
      title: t.help.manageGallery,
      description: t.help.manageGalleryDesc,
      steps: lang === "es" ? [
        { title: "Subir imagen", description: "Ve a Galería > Nueva imagen y arrastra o selecciona tu archivo." },
        { title: "Añade información", description: "Completa el título, descripción y texto alternativo (alt) para accesibilidad." },
        { title: "Organiza", description: "Las imágenes se muestran ordenadas por fecha. Puedes editar o eliminar desde la vista de lista." },
      ] : [
        { title: "Upload image", description: "Go to Gallery > New image and drag or select your file." },
        { title: "Add information", description: "Complete the title, description, and alt text for accessibility." },
        { title: "Organize", description: "Images are displayed sorted by date. You can edit or delete from the list view." },
      ]
    },
    {
      id: "seo-tips",
      icon: <Search className="w-5 h-5" />,
      title: t.help.seoTips,
      description: t.help.seoTipsDesc,
      steps: lang === "es" ? [
        { title: "Título SEO (50-60 caracteres)", description: "Incluye la palabra clave principal al inicio. Hazlo atractivo para que la gente haga clic." },
        { title: "Meta descripción (150-160 caracteres)", description: "Resume el contenido e incluye un call-to-action. Usa la palabra clave naturalmente." },
        { title: "URL amigable", description: "Mantén las URLs cortas y descriptivas. Evita caracteres especiales." },
        { title: "Imágenes optimizadas", description: "Usa texto alternativo descriptivo en todas las imágenes." },
        { title: "Contenido de calidad", description: "Escribe contenido original, útil y bien estructurado con encabezados." },
      ] : [
        { title: "SEO Title (50-60 characters)", description: "Include the main keyword at the beginning. Make it attractive to get clicks." },
        { title: "Meta description (150-160 characters)", description: "Summarize the content and include a call-to-action. Use the keyword naturally." },
        { title: "Friendly URL", description: "Keep URLs short and descriptive. Avoid special characters." },
        { title: "Optimized images", description: "Use descriptive alt text on all images." },
        { title: "Quality content", description: "Write original, useful, and well-structured content with headings." },
      ]
    },
    {
      id: "shortcuts",
      icon: <Keyboard className="w-5 h-5" />,
      title: t.help.shortcuts,
      description: t.help.shortcutsDesc,
      steps: lang === "es" ? [
        { title: "⌘K / Ctrl+K", description: "Abrir búsqueda rápida" },
        { title: "⌘S / Ctrl+S", description: "Guardar artículo (en el editor)" },
        { title: "⌘B / Ctrl+B", description: "Texto en negrita (en el editor)" },
        { title: "⌘I / Ctrl+I", description: "Texto en cursiva (en el editor)" },
        { title: "ESC", description: "Cerrar modal o cancelar" },
      ] : [
        { title: "⌘K / Ctrl+K", description: "Open quick search" },
        { title: "⌘S / Ctrl+S", description: "Save article (in editor)" },
        { title: "⌘B / Ctrl+B", description: "Bold text (in editor)" },
        { title: "⌘I / Ctrl+I", description: "Italic text (in editor)" },
        { title: "ESC", description: "Close modal or cancel" },
      ]
    },
    {
      id: "support",
      icon: <HelpCircle className="w-5 h-5" />,
      title: t.help.support,
      description: t.help.supportDesc,
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex items-start justify-center pt-[10vh]">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              {selectedGuide && (
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-500"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              )}
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <h2 className="font-semibold text-slate-900">
                  {selectedGuide ? selectedGuide.title : t.help.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {selectedGuide ? selectedGuide.description : t.help.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedGuide ? (
              // Guide Detail View
              <div className="p-6">
                {selectedGuide.steps ? (
                  <div className="space-y-4">
                    {selectedGuide.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">
                      {lang === "es" 
                        ? "¿Necesitas ayuda adicional? Contacta con el equipo de soporte."
                        : "Need additional help? Contact the support team."
                      }
                    </p>
                    <a
                      href="mailto:support@mscsurveyors.org"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      support@mscsurveyors.org
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // Guide List View
              <div className="p-4 grid gap-2">
                {guides.map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide)}
                    className="flex items-center gap-4 p-4 text-left rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="p-3 bg-accent/10 text-accent rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                      {guide.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 mb-0.5">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">
                        {guide.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-accent transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              {lang === "es" 
                ? "Presiona ESC para cerrar • ¿Sugerencias? Escríbenos"
                : "Press ESC to close • Suggestions? Contact us"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

