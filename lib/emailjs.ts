/**
 * ============================================
 * EMAILJS CONFIGURATION - MSC Marine Surveyors
 * ============================================
 * 
 * Configuración centralizada para EmailJS.
 * Usar este módulo para enviar correos desde formularios de contacto.
 * 
 * CONFIGURACIÓN REQUERIDA EN .env.local:
 * - NEXT_PUBLIC_EMAILJS_SERVICE_ID: ID del servicio de EmailJS
 * - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ID de la plantilla de EmailJS
 * - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: Clave pública de EmailJS
 * 
 * Para configurar EmailJS:
 * 1. Crear cuenta en https://www.emailjs.com/
 * 2. Crear un servicio de email (Gmail, Outlook, etc.)
 * 3. Crear una plantilla con las variables: from_name, from_email, phone, service_type, message
 * 4. Copiar los IDs a las variables de entorno
 * 
 * ============================================
 */

// Importación dinámica para evitar errores en SSR
let emailjs: typeof import('@emailjs/browser')['default'] | null = null

// Solo importar en el cliente
if (typeof window !== 'undefined') {
  import('@emailjs/browser').then((module) => {
    emailjs = module.default
  })
}

// ============================================
// CONFIGURACIÓN
// ============================================

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// ============================================
// TIPOS
// ============================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  serviceType?: string
  message: string
}

export interface EmailJSResponse {
  success: boolean
  message: string
  error?: string
}

// ============================================
// INICIALIZACIÓN
// ============================================

let isInitialized = false

/**
 * Inicializa EmailJS con la clave pública.
 * Se llama automáticamente antes de enviar un email.
 */
export function initEmailJS(): void {
  if (!isInitialized && EMAILJS_CONFIG.publicKey && emailjs) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
    isInitialized = true
  }
}

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Envía un email usando EmailJS.
 * 
 * @param formData - Datos del formulario de contacto
 * @returns Promesa con el resultado del envío
 * 
 * @example
 * const result = await sendContactEmail({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '+1234567890',
 *   serviceType: 'Inspección de buques',
 *   message: 'Necesito una inspección...'
 * })
 * 
 * if (result.success) {
 *   toast.success('Mensaje enviado')
 * } else {
 *   toast.error(result.message)
 * }
 */
export async function sendContactEmail(formData: ContactFormData): Promise<EmailJSResponse> {
  // Verificar que estamos en el cliente
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'El servicio de email solo funciona en el navegador.',
      error: 'SSR_NOT_SUPPORTED',
    }
  }

  // Verificar configuración
  if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
    console.error('EmailJS: Configuración incompleta. Verifica las variables de entorno.')
    return {
      success: false,
      message: 'Error de configuración del servicio de email.',
      error: 'MISSING_CONFIG',
    }
  }

  // Cargar emailjs si no está disponible
  if (!emailjs) {
    const module = await import('@emailjs/browser')
    emailjs = module.default
  }

  // Inicializar si es necesario
  initEmailJS()

  try {
    // Preparar los parámetros de la plantilla
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'No proporcionado',
      company: formData.company || 'No proporcionado',
      service_type: formData.serviceType || 'General',
      message: formData.message,
      // Variables adicionales para la plantilla
      to_name: 'MSC Team',
      reply_to: formData.email,
    }

    // Enviar el email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
      }
    } else {
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
        error: `HTTP_${response.status}`,
      }
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return {
      success: false,
      message: 'No se pudo enviar el mensaje. Por favor, intenta más tarde o contáctanos directamente.',
      error: errorMessage,
    }
  }
}

/**
 * Envía un email usando un formulario HTML directamente.
 * Útil cuando se tiene un ref al formulario.
 * 
 * @param form - Referencia al elemento del formulario
 * @returns Promesa con el resultado del envío
 * 
 * @example
 * const formRef = useRef<HTMLFormElement>(null)
 * 
 * const handleSubmit = async (e: React.FormEvent) => {
 *   e.preventDefault()
 *   if (formRef.current) {
 *     const result = await sendFormEmail(formRef.current)
 *     // ...
 *   }
 * }
 */
export async function sendFormEmail(form: HTMLFormElement): Promise<EmailJSResponse> {
  // Verificar que estamos en el cliente
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'El servicio de email solo funciona en el navegador.',
      error: 'SSR_NOT_SUPPORTED',
    }
  }

  // Verificar configuración
  if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
    console.error('EmailJS: Configuración incompleta.')
    return {
      success: false,
      message: 'Error de configuración del servicio de email.',
      error: 'MISSING_CONFIG',
    }
  }

  // Cargar emailjs si no está disponible
  if (!emailjs) {
    const module = await import('@emailjs/browser')
    emailjs = module.default
  }

  // Inicializar si es necesario
  initEmailJS()

  try {
    const response = await emailjs.sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Mensaje enviado correctamente.',
      }
    } else {
      return {
        success: false,
        message: 'Error al enviar el mensaje.',
        error: `HTTP_${response.status}`,
      }
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    
    return {
      success: false,
      message: 'No se pudo enviar el mensaje.',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

/**
 * Verifica si EmailJS está correctamente configurado.
 * 
 * @returns true si todas las variables de entorno están presentes
 */
export function isEmailJSConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  )
}
