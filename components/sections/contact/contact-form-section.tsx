"use client"

import type React from "react"
import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContactForm } from "@/hooks/use-contact-form"
import { Send, Ship, Package, Compass, FileSearch, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

const formContent = {
  es: {
    title: "Solicite una Inspeccion",
    subtitle: "Complete el formulario y responderemos en menos de 24 horas",
    form: {
      name: "Nombre completo",
      email: "Correo electronico",
      phone: "Telefono / WhatsApp",
      company: "Empresa u organizacion",
      serviceType: "Tipo de servicio",
      location: "Puerto o ubicacion",
      message: "Detalles adicionales",
      submit: "Enviar Solicitud",
      sending: "Enviando...",
    },
    services: [
      { value: "vessel", label: "Inspeccion de Buques", icon: Ship },
      { value: "cargo", label: "Inspeccion de Carga", icon: Package },
      { value: "consultancy", label: "Consultoria Maritima", icon: Compass },
      { value: "other", label: "Otro Servicio", icon: FileSearch },
    ],
    benefits: [
      "Respuesta garantizada en 24 horas",
      "Cotizacion sin compromiso",
      "Asesoria tecnica inicial gratuita",
    ],
    privacy: "Al enviar este formulario, acepta nuestra politica de privacidad.",
    success: {
      title: "Solicitud Enviada",
      message: "Gracias por contactar a MSC. Responderemos a su solicitud en breve.",
    },
    errors: {
      name: "El nombre es requerido",
      email: "El email es requerido",
      emailInvalid: "Email invalido",
      message: "El mensaje es requerido",
    },
  },
  en: {
    title: "Request an Inspection",
    subtitle: "Fill out the form and we will respond within 24 hours",
    form: {
      name: "Full name",
      email: "Email address",
      phone: "Phone / WhatsApp",
      company: "Company or organization",
      serviceType: "Service type",
      location: "Port or location",
      message: "Additional details",
      submit: "Submit Request",
      sending: "Sending...",
    },
    services: [
      { value: "vessel", label: "Vessel Survey", icon: Ship },
      { value: "cargo", label: "Cargo Inspection", icon: Package },
      { value: "consultancy", label: "Maritime Consultancy", icon: Compass },
      { value: "other", label: "Other Service", icon: FileSearch },
    ],
    benefits: [
      "Guaranteed response within 24 hours",
      "No-obligation quote",
      "Free initial technical advice",
    ],
    privacy: "By submitting this form, you agree to our privacy policy.",
    success: {
      title: "Request Sent",
      message: "Thank you for contacting MSC. We will respond to your request shortly.",
    },
    errors: {
      name: "Name is required",
      email: "Email is required",
      emailInvalid: "Invalid email",
      message: "Message is required",
    },
  },
}

export function ContactFormSection({ lang }: { lang: Language }) {
  const t = formContent[lang as keyof typeof formContent] || formContent.en

  const {
    formData,
    updateField,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    successMessage,
    fieldErrors,
    reset,
  } = useContactForm({
    onSuccess: () => {
      // Toast o notificación adicional si se desea
    },
  })

  // Obtener el label del servicio seleccionado
  const getServiceLabel = (value: string) => {
    const service = t.services.find(s => s.value === value)
    return service?.label || value
  }

  return (
    <section className="py-16 md:py-20 section-ocean-alt">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <h2 className="text-2xl md:text-3xl font-hero font-bold text-primary mb-3 tracking-tight">
              {t.title}
            </h2>
            <p className="text-slate-500 mb-8">{t.subtitle}</p>

            {/* Benefits */}
            <div className="space-y-3">
              {t.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-slate-600 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Service Quick Select - Desktop */}
            <div className="hidden lg:block mt-10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {lang === "es" ? "Servicios Disponibles" : "Available Services"}
              </p>
              <div className="space-y-2">
                {t.services.map((service) => {
                  const Icon = service.icon
                  const isSelected = formData.serviceType === service.value
                  return (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => updateField('serviceType', service.value)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left
                        ${isSelected
                          ? "bg-primary text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-9 h-9 rounded-lg flex items-center justify-center
                          ${isSelected ? "bg-accent" : "bg-slate-100"}
                        `}
                      >
                        <Icon className={`h-4 w-4 ${isSelected ? "text-white" : "text-primary"}`} />
                      </div>
                      <span className="font-medium text-sm">{service.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-slate-100">
              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-800">{t.success.title}</p>
                    <p className="text-sm text-emerald-700">{successMessage || t.success.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {t.form.name} *
                    </label>
                    <Input
                      name="from_name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className={`h-11 rounded-lg border-slate-200 focus:border-accent focus:ring-accent ${
                        fieldErrors.name ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-red-500">{fieldErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {t.form.email} *
                    </label>
                    <Input
                      name="from_email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@company.com"
                      className={`h-11 rounded-lg border-slate-200 focus:border-accent focus:ring-accent ${
                        fieldErrors.email ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-red-500">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {t.form.phone}
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+507 6598-0679"
                      className="h-11 rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {t.form.company}
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="Company Name"
                      className="h-11 rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Service Type - Mobile */}
                <div className="lg:hidden space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.form.serviceType}
                  </label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(value) => updateField('serviceType', value)}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-slate-200">
                      <SelectValue placeholder={lang === "es" ? "Seleccionar..." : "Select..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hidden field for service type (for EmailJS) */}
                <input 
                  type="hidden" 
                  name="service_type" 
                  value={formData.serviceType ? getServiceLabel(formData.serviceType) : ''} 
                />

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t.form.message} *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`min-h-[100px] rounded-lg border-slate-200 focus:border-accent focus:ring-accent resize-none ${
                      fieldErrors.message ? 'border-red-300 focus:border-red-500' : ''
                    }`}
                    placeholder={
                      lang === "es"
                        ? "Describa brevemente su solicitud..."
                        : "Briefly describe your request..."
                    }
                  />
                  {fieldErrors.message && (
                    <p className="text-xs text-red-500">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.form.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t.form.submit}
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                  <p className="text-xs text-slate-400 mt-4 text-center">{t.privacy}</p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
