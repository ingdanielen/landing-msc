/**
 * ============================================
 * USE CONTACT FORM HOOK - MSC Marine Surveyors
 * ============================================
 * 
 * Hook personalizado para manejar formularios de contacto con EmailJS.
 * Incluye validación, estados de carga y manejo de errores.
 * 
 * @example
 * const { 
 *   formData, 
 *   updateField, 
 *   handleSubmit, 
 *   isLoading, 
 *   isSuccess, 
 *   error,
 *   reset 
 * } = useContactForm()
 * 
 * <form onSubmit={handleSubmit}>
 *   <input 
 *     value={formData.name}
 *     onChange={(e) => updateField('name', e.target.value)}
 *   />
 *   <button type="submit" disabled={isLoading}>
 *     {isLoading ? 'Enviando...' : 'Enviar'}
 *   </button>
 * </form>
 * 
 * ============================================
 */

import { useState, useCallback } from 'react'
import { sendContactEmail, type ContactFormData, isEmailJSConfigured } from '@/lib/emailjs'

// ============================================
// TIPOS
// ============================================

export interface UseContactFormOptions {
  /** Callback al enviar exitosamente */
  onSuccess?: () => void
  /** Callback al fallar el envío */
  onError?: (error: string) => void
  /** Valores iniciales del formulario */
  initialValues?: Partial<ContactFormData>
}

export interface UseContactFormReturn {
  /** Datos actuales del formulario */
  formData: ContactFormData
  /** Actualizar un campo específico */
  updateField: <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => void
  /** Actualizar múltiples campos */
  updateFields: (fields: Partial<ContactFormData>) => void
  /** Manejar el envío del formulario */
  handleSubmit: (e: React.FormEvent) => Promise<void>
  /** Estado de carga */
  isLoading: boolean
  /** Envío exitoso */
  isSuccess: boolean
  /** Mensaje de error */
  error: string | null
  /** Mensaje de éxito */
  successMessage: string | null
  /** Resetear el formulario */
  reset: () => void
  /** Verificar si el formulario es válido */
  isValid: boolean
  /** Errores de validación por campo */
  fieldErrors: Partial<Record<keyof ContactFormData, string>>
  /** Verificar si EmailJS está configurado */
  isConfigured: boolean
}

// ============================================
// VALORES POR DEFECTO
// ============================================

const defaultFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  serviceType: '',
  message: '',
}

// ============================================
// VALIDACIÓN
// ============================================

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {}

  if (!data.name.trim()) {
    errors.name = 'El nombre es requerido'
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  }

  if (!data.email.trim()) {
    errors.email = 'El email es requerido'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email inválido'
  }

  if (!data.message.trim()) {
    errors.message = 'El mensaje es requerido'
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
  }

  return errors
}

// ============================================
// HOOK
// ============================================

export function useContactForm(options: UseContactFormOptions = {}): UseContactFormReturn {
  const { onSuccess, onError, initialValues } = options

  // Estados
  const [formData, setFormData] = useState<ContactFormData>({
    ...defaultFormData,
    ...initialValues,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  // Verificar configuración
  const isConfigured = isEmailJSConfigured()

  // Actualizar un campo
  const updateField = useCallback(<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo al escribir
    setFieldErrors(prev => {
      const { [field]: _, ...rest } = prev
      return rest
    })
    // Limpiar estados de éxito/error al modificar
    if (isSuccess) setIsSuccess(false)
    if (error) setError(null)
  }, [isSuccess, error])

  // Actualizar múltiples campos
  const updateFields = useCallback((fields: Partial<ContactFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }))
  }, [])

  // Verificar si es válido
  const isValid = Object.keys(validateForm(formData)).length === 0

  // Resetear formulario
  const reset = useCallback(() => {
    setFormData({ ...defaultFormData, ...initialValues })
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
    setSuccessMessage(null)
    setFieldErrors({})
  }, [initialValues])

  // Manejar envío
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    // Verificar configuración
    if (!isConfigured) {
      setError('El servicio de email no está configurado.')
      onError?.('MISSING_CONFIG')
      return
    }

    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setIsSuccess(true)
        setSuccessMessage(result.message)
        setFormData({ ...defaultFormData, ...initialValues })
        onSuccess?.()
      } else {
        setError(result.message)
        onError?.(result.error || 'UNKNOWN_ERROR')
      }
    } catch (err) {
      const errorMsg = 'Error inesperado. Por favor, intenta de nuevo.'
      setError(errorMsg)
      onError?.(err instanceof Error ? err.message : 'UNEXPECTED_ERROR')
    } finally {
      setIsLoading(false)
    }
  }, [formData, isConfigured, initialValues, onSuccess, onError])

  return {
    formData,
    updateField,
    updateFields,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    successMessage,
    reset,
    isValid,
    fieldErrors,
    isConfigured,
  }
}
