"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Minus,
  Maximize2,
  Minimize2,
  X,
  Upload,
  ExternalLink,
  AlertCircle,
  Undo,
  Redo,
  Loader2,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

// Convertir Markdown a HTML para el editor visual
function markdownToHtml(markdown: string): string {
  if (!markdown) return ""
  
  let html = markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />')

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`
  }

  return html
}

// Convertir HTML del editor a Markdown
function htmlToMarkdown(html: string): string {
  if (!html) return ""
  
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || ""
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return ""
    }

    const element = node as HTMLElement
    const tagName = element.tagName.toLowerCase()
    const children = Array.from(element.childNodes).map(processNode).join("")

    switch (tagName) {
      case 'h1':
        return `# ${children}\n\n`
      case 'h2':
        return `## ${children}\n\n`
      case 'h3':
        return `### ${children}\n\n`
      case 'strong':
      case 'b':
        return `**${children}**`
      case 'em':
      case 'i':
        return `*${children}*`
      case 'code':
        if (element.parentElement?.tagName.toLowerCase() === 'pre') {
          return children
        }
        return `\`${children}\``
      case 'pre':
        return `\`\`\`\n${children}\n\`\`\`\n\n`
      case 'a':
        const href = element.getAttribute('href') || ''
        return `[${children}](${href})`
      case 'img':
        const src = element.getAttribute('src') || ''
        const alt = element.getAttribute('alt') || ''
        return `\n![${alt}](${src})\n`
      case 'blockquote':
        return `> ${children}\n\n`
      case 'li':
        return `- ${children}\n`
      case 'ul':
      case 'ol':
        return `${children}\n`
      case 'hr':
        return `\n---\n\n`
      case 'br':
        return '\n'
      case 'p':
        return `${children}\n\n`
      case 'div':
        return `${children}\n`
      default:
        return children
    }
  }

  let markdown = processNode(tempDiv)
  // Clean up extra newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim()
  return markdown
}

// Modal para insertar imágenes
function ImageModal({ 
  isOpen, 
  onClose, 
  onInsert 
}: { 
  isOpen: boolean
  onClose: () => void
  onInsert: (url: string, alt: string) => void 
}) {
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen excede 2MB. Comprímela antes de subir.")
      return
    }

    // Validate type
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(file.type)) {
      setError("Solo se permiten WebP, JPG y PNG")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'blog')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      setUrl(data.url)
      setAlt(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "))
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 2000)
    } catch (err) {
      setError("Error al subir la imagen. Intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("La URL de la imagen es requerida")
      return
    }
    onInsert(url.trim(), alt.trim() || "imagen")
    setUrl("")
    setAlt("")
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Insertar imagen</h3>
              <p className="text-xs text-slate-500">Sube una imagen o pega una URL</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Upload area */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Subir imagen local
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                isUploading ? "border-accent bg-accent/5" : "border-slate-200 hover:border-accent/50 hover:bg-accent/5"
              )}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-accent animate-spin mb-2" />
                  <p className="text-sm text-slate-600">Subiendo imagen...</p>
                </div>
              ) : uploadSuccess ? (
                <div className="flex flex-col items-center text-emerald-600">
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">¡Imagen subida!</p>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click para seleccionar</p>
                  <p className="text-xs text-slate-400 mt-1">WebP, JPG, PNG (máx. 2MB)</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/webp,image/jpeg,image/png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200" />
            o pega una URL
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL de la imagen
            </label>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError("") }}
                placeholder="https://ejemplo.com/imagen.jpg"
                className={cn(
                  "w-full px-4 py-2.5 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all",
                  error ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-accent/20 focus:border-accent"
                )}
              />
              <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Texto alternativo (alt)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Descripción de la imagen..."
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Preview */}
          {url && (
            <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border">
              <img src={url} alt={alt || "Preview"} className="w-full h-full object-contain" />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-200 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!url.trim()}
            className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insertar imagen
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// Modal para insertar enlaces
function LinkModal({ 
  isOpen, 
  onClose, 
  onInsert,
  selectedText
}: { 
  isOpen: boolean
  onClose: () => void
  onInsert: (text: string, url: string) => void 
  selectedText: string
}) {
  const [url, setUrl] = useState("")
  const [text, setText] = useState(selectedText)

  useEffect(() => {
    setText(selectedText)
  }, [selectedText])

  const handleSubmit = () => {
    if (!url.trim()) return
    onInsert(text.trim() || url.trim(), url.trim())
    setUrl("")
    setText("")
    onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-slate-900">Insertar enlace</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Texto del enlace</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Texto a mostrar..."
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">URL del enlace *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-200 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600">Cancelar</button>
          <button
            onClick={handleSubmit}
            disabled={!url.trim()}
            className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insertar enlace
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Escribe el contenido del artículo...",
  minHeight = "400px"
}: MarkdownEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const editorRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize editor content from markdown
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = markdownToHtml(value)
      setIsInitialized(true)
    }
  }, [value, isInitialized])

  // Update markdown when editor content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      const markdown = htmlToMarkdown(html)
      onChange(markdown)
    }
  }, [onChange])

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }, [handleInput])

  const getSelection = () => {
    const selection = window.getSelection()
    return selection?.toString() || ""
  }

  const insertHtml = useCallback((html: string) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      const fragment = range.createContextualFragment(html)
      range.insertNode(fragment)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    handleInput()
  }, [handleInput])

  const handleImageInsert = useCallback((url: string, alt: string) => {
    insertHtml(`<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 0.5rem;" />`)
  }, [insertHtml])

  const handleLinkInsert = useCallback((text: string, url: string) => {
    insertHtml(`<a href="${url}" style="color: #0ea5e9; text-decoration: underline;">${text}</a>`)
  }, [insertHtml])

  const openLinkModal = () => {
    setSelectedText(getSelection())
    setShowLinkModal(true)
  }

  // Toolbar actions
  const toolbarButtons = [
    { icon: <Bold className="w-4 h-4" />, label: "Negrita", action: () => execCommand('bold') },
    { icon: <Italic className="w-4 h-4" />, label: "Cursiva", action: () => execCommand('italic') },
    { separator: true },
    { icon: <Heading1 className="w-4 h-4" />, label: "Título 1", action: () => execCommand('formatBlock', 'h1') },
    { icon: <Heading2 className="w-4 h-4" />, label: "Título 2", action: () => execCommand('formatBlock', 'h2') },
    { icon: <Heading3 className="w-4 h-4" />, label: "Título 3", action: () => execCommand('formatBlock', 'h3') },
    { separator: true },
    { icon: <List className="w-4 h-4" />, label: "Lista", action: () => execCommand('insertUnorderedList') },
    { icon: <ListOrdered className="w-4 h-4" />, label: "Lista numerada", action: () => execCommand('insertOrderedList') },
    { icon: <Quote className="w-4 h-4" />, label: "Cita", action: () => execCommand('formatBlock', 'blockquote') },
    { separator: true },
    { icon: <Code className="w-4 h-4" />, label: "Código", action: () => {
      const sel = getSelection()
      if (sel) {
        insertHtml(`<code style="background: #f1f5f9; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: monospace;">${sel}</code>`)
      }
    }},
    { icon: <LinkIcon className="w-4 h-4" />, label: "Enlace", action: openLinkModal },
    { icon: <ImageIcon className="w-4 h-4" />, label: "Imagen", action: () => setShowImageModal(true) },
    { icon: <Minus className="w-4 h-4" />, label: "Línea", action: () => insertHtml('<hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e2e8f0;" />') },
    { separator: true },
    { icon: <Undo className="w-4 h-4" />, label: "Deshacer", action: () => execCommand('undo') },
    { icon: <Redo className="w-4 h-4" />, label: "Rehacer", action: () => execCommand('redo') },
  ]

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editorRef.current?.contains(document.activeElement)) return
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        execCommand('bold')
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault()
        execCommand('italic')
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        openLinkModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [execCommand])

  return (
    <>
      <div className={cn(
        "flex flex-col border border-slate-200 rounded-lg overflow-hidden bg-white transition-all",
        isFullscreen && "fixed inset-4 z-50 shadow-2xl"
      )}>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-0.5 flex-wrap">
            {toolbarButtons.map((btn, i) => 
              btn.separator ? (
                <div key={i} className="w-px h-5 bg-slate-200 mx-1.5" />
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={btn.action}
                  title={btn.label}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                >
                  {btn.icon}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* WYSIWYG Editor */}
        <div 
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className={cn(
            "flex-1 p-5 text-slate-700 focus:outline-none overflow-auto",
            "prose prose-slate max-w-none",
            "prose-headings:font-bold prose-headings:text-primary",
            "prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6",
            "prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5",
            "prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4",
            "prose-p:mb-4 prose-p:leading-relaxed",
            "prose-a:text-accent prose-a:underline",
            "prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600",
            "prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono",
            "prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto",
            "prose-img:rounded-lg prose-img:mx-auto prose-img:my-4",
            "prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:mb-1",
            "prose-hr:my-6 prose-hr:border-slate-200",
            "[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-slate-400",
            isFullscreen && "min-h-0"
          )}
        />

        {/* Character count */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 text-right">
          <span className="text-xs text-slate-400">
            {value.length} caracteres
          </span>
        </div>
      </div>

      {/* Modals */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleImageInsert}
      />
      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={handleLinkInsert}
        selectedText={selectedText}
      />
    </>
  )
}
