"use client"

import { useState, useCallback } from "react"
import { Upload, X, Image as ImageIcon, Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  aspectRatio?: "square" | "video" | "auto"
  className?: string
  maxSizeMB?: number
}

const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png']
const ALLOWED_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png']

export function ImageUpload({ 
  value, 
  onChange, 
  aspectRatio = "auto",
  className,
  maxSizeMB = 2
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: `Formato no soportado. Use: ${ALLOWED_EXTENSIONS.join(', ')}` 
      }
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      const currentSizeMB = (file.size / 1024 / 1024).toFixed(2)
      return { 
        valid: false, 
        error: `La imagen excede ${maxSizeMB}MB. Tamaño actual: ${currentSizeMB}MB` 
      }
    }

    return { valid: true }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setError(null)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = async (file: File) => {
    const validation = validateFile(file)
    
    if (!validation.valid) {
      setError(validation.error || "Error al validar archivo")
      return
    }

    setIsUploading(true)
    
    // Create a temporary URL for preview
    // In production, this would upload to a storage service
    const url = URL.createObjectURL(file)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onChange(url)
    setIsUploading(false)
  }

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "min-h-[200px]"
  }[aspectRatio]

  return (
    <div className={className}>
      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 mb-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium">{error}</p>
          </div>
          <button 
            type="button" 
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {value ? (
        <div className={cn("relative rounded-lg overflow-hidden bg-slate-100", aspectClass)}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors group">
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all",
            aspectClass,
            isDragging 
              ? "border-accent bg-accent/5" 
              : "border-slate-200 hover:border-accent/50 hover:bg-accent/5",
            isUploading && "pointer-events-none"
          )}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          ) : (
            <>
              <div className="p-3 bg-slate-100 rounded-full mb-3">
                <Upload className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                {isDragging ? "Suelta la imagen aquí" : "Arrastra una imagen"}
              </p>
              <p className="text-xs text-slate-500 mt-1">o haz clic para seleccionar</p>
              
              {/* File requirements */}
              <div className="mt-3 p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Máx. <strong>{maxSizeMB}MB</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Recomendado: <strong>WebP</strong>, JPG, PNG</span>
                </div>
              </div>
            </>
          )}
          <input
            type="file"
            accept={ALLOWED_EXTENSIONS.join(',')}
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}

      {/* URL Input */}
      <div className="mt-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="O pega una URL de imagen..."
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
        />
      </div>
    </div>
  )
}
