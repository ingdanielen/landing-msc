"use client"

import { useState } from "react"
import { 
  Globe, 
  Save,
  CheckCircle,
  Info,
  ExternalLink,
  Mail,
  Shield,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

export function SettingsContent() {
  const { t, lang, setLang } = useAdminLang()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const labels = {
    es: {
      savedMessage: "Configuración guardada correctamente",
      appearance: "Apariencia",
      panelLang: "Idioma del panel",
      panelLangDesc: "Cambia el idioma de toda la interfaz del panel de administración",
      siteInfo: "Información del sitio",
      siteUrl: "URL del sitio",
      adminEmail: "Email de administración",
      security: "Seguridad",
      securityNote: "La contraseña de acceso se configura en las variables de entorno (.env.local). Contacta al desarrollador para cambiarla.",
      currentUser: "Usuario actual",
      aboutCms: "Sobre el CMS",
      aboutCmsDesc: "MSC Content Studio v1.0 - Panel de administración nativo en Next.js.",
      developedBy: "Desarrollado para MSC Surveyors",
      saveChanges: "Guardar cambios",
      viewSite: "Ver sitio web",
    },
    en: {
      savedMessage: "Settings saved successfully",
      appearance: "Appearance",
      panelLang: "Panel language",
      panelLangDesc: "Change the language of the entire admin panel interface",
      siteInfo: "Site information",
      siteUrl: "Site URL",
      adminEmail: "Admin email",
      security: "Security",
      securityNote: "The access password is configured in environment variables (.env.local). Contact the developer to change it.",
      currentUser: "Current user",
      aboutCms: "About the CMS",
      aboutCmsDesc: "MSC Content Studio v1.0 - Native admin panel in Next.js.",
      developedBy: "Developed for MSC Surveyors",
      saveChanges: "Save changes",
      viewSite: "View website",
    }
  }

  const l = labels[lang]

  return (
    <div className="max-w-4xl space-y-6">
      {/* Success Message */}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{l.savedMessage}</p>
        </div>
      )}

      {/* Appearance Section - THIS WORKS */}
      <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Globe className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-slate-900">{l.appearance}</h2>
        </div>
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {l.panelLang}
            </label>
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value as "es" | "en")
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
              }}
              className="w-full max-w-xs px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer"
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇺🇸 English</option>
            </select>
            <p className="mt-2 text-xs text-slate-500">{l.panelLangDesc}</p>
          </div>
        </div>
      </section>

      {/* Site Info - READ ONLY */}
      <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Info className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-900">{l.siteInfo}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {l.siteUrl}
              </label>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm flex-1">
                  https://www.mscsurveyors.org
                </span>
                <a 
                  href="https://www.mscsurveyors.org" 
                  target="_blank"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {l.adminEmail}
              </label>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm flex-1">
                  jjmr1@hotmail.com
                </span>
                <a 
                  href="mailto:jjmr1@hotmail.com"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="bg-white border border-slate-200/60 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Shield className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-900">{l.security}</h2>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">{l.currentUser}: admin</p>
              <p className="text-sm text-amber-700 mt-1">{l.securityNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CMS Info Card */}
      <div className="p-4 bg-accent/5 border border-accent/10 rounded-xl">
        <div className="flex gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Info className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{l.aboutCms}</p>
            <p className="text-sm text-slate-600 mt-1">{l.aboutCmsDesc}</p>
            <p className="text-xs text-slate-400 mt-2">{l.developedBy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
