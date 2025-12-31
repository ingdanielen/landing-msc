"use client"

import { useState } from "react"
import { Copy, Check, Code, Eye, Monitor, Smartphone, Terminal, Sparkles } from "lucide-react"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { EmailTemplatePreview } from "@/components/email-template-preview"

const EMAIL_TEMPLATE_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud - MSC</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto;">
    <tr>
      <td style="padding: 24px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2e8f0;">
          
          <tr>
            <td style="background-color: #0a2a43; padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 3px;">MSC</span>
                  </td>
                  <td style="text-align: right;">
                    <span style="color: rgba(255,255,255,0.6); font-size: 12px;">Marine Surveyors & Consultants</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #2e86c1; padding: 16px 32px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                Nueva Solicitud de Inspección
              </h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 32px;">
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-left: 4px solid #2e86c1;">
                <tr>
                  <td style="padding: 16px 20px; background-color: #f8fafc;">
                    <p style="margin: 0 0 4px 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                      Servicio Solicitado
                    </p>
                    <p style="margin: 0; color: #0a2a43; font-size: 18px; font-weight: 600;">
                      {{service_type}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #0a2a43; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Datos del Cliente
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">
                          Nombre
                        </td>
                        <td style="padding: 10px 0; color: #0a2a43; font-size: 14px; font-weight: 500;">
                          {{from_name}}
                        </td>
                      </tr>
                      <tr>
                        <td width="120" style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Email
                        </td>
                        <td style="padding: 10px 0; border-top: 1px solid #f1f5f9;">
                          <a href="mailto:{{from_email}}" style="color: #2e86c1; text-decoration: none; font-size: 14px; font-weight: 500;">
                            {{from_email}}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width="120" style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Teléfono
                        </td>
                        <td style="padding: 10px 0; color: #0a2a43; font-size: 14px; font-weight: 500; border-top: 1px solid #f1f5f9;">
                          {{phone}}
                        </td>
                      </tr>
                      <tr>
                        <td width="120" style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Empresa
                        </td>
                        <td style="padding: 10px 0; color: #0a2a43; font-size: 14px; font-weight: 500; border-top: 1px solid #f1f5f9;">
                          {{company}}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #0a2a43; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Mensaje
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">{{message}}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top: 8px;">
                    <a href="mailto:{{from_email}}?subject=Re: Solicitud de {{service_type}} - MSC" 
                       style="display: inline-block; background-color: #0a2a43; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Responder al Cliente
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px;">
                      Solicitud recibida desde
                    </p>
                    <p style="margin: 0; color: #0a2a43; font-size: 13px; font-weight: 600;">
                      www.mscsurveyors.org
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0 0 4px 0; color: #64748b; font-size: 12px;">
                      info@mscsurveyors.org
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 12px;">
                      +507 6598-0679
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #0a2a43; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px;">
                © 2025 Marine Surveyors & Consultants. Todos los derechos reservados.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`

const dummyFormData = {
  from_name: "Carlos Rodríguez",
  from_email: "carlos.rodriguez@empresa.com",
  phone: "+507 6123-4567",
  company: "Naviera Pacífico S.A.",
  service_type: "Inspección Pre-Compra",
  message: "Necesitamos una inspección completa para un buque tipo Panamax que estamos evaluando adquirir. El buque está actualmente en el Puerto de Balboa.\n\nDetalles del buque:\n- Año: 2015\n- Tipo: Bulk Carrier\n- DWT: 75,000\n\nPor favor contactarnos para coordinar."
}

export function EmailTemplateContent() {
  const { lang } = useAdminLang()
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_TEMPLATE_HTML)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const t = {
    preview: lang === "es" ? "Vista Previa" : "Preview",
    code: lang === "es" ? "Código" : "Code",
    copy: lang === "es" ? "Copiar" : "Copy",
    copied: lang === "es" ? "¡Copiado!" : "Copied!",
    desktop: lang === "es" ? "Desktop" : "Desktop",
    mobile: lang === "es" ? "Mobile" : "Mobile",
    info: lang === "es" 
      ? "Datos de ejemplo para visualización" 
      : "Sample data for visualization",
    fileName: "email-template.html"
  }

  return (
    <div className="mt-6">
      {/* Main Card */}
      <div className="bg-[#0a1929] border border-white/10 overflow-hidden">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d2137] border-b border-white/10">
          {/* Left: Tab Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCode(false)}
              className={`group flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative ${
                !showCode 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Eye className="w-4 h-4" />
              {t.preview}
              {!showCode && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`group flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative ${
                showCode 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Terminal className="w-4 h-4" />
              {t.code}
              {showCode && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          </div>

          {/* Right: Device Toggle or Copy Button */}
          {!showCode ? (
            <div className="flex items-center gap-2 bg-[#0a1929] p-1">
              <button
                onClick={() => setViewMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === "desktop"
                    ? 'bg-accent text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                {t.desktop}
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === "mobile"
                    ? 'bg-accent text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                {t.mobile}
              </button>
            </div>
          ) : (
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                copied 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-accent/20 text-accent hover:bg-accent/30'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t.copy}
                </>
              )}
            </button>
          )}
        </div>

        {/* Content Area */}
        {showCode ? (
          /* Code Editor Style */
          <div className="relative">
            {/* Code Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/5">
              <div className="flex items-center gap-3">
                {/* Window Controls */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                {/* File Name */}
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Code className="w-3.5 h-3.5" />
                  <span className="font-mono">{t.fileName}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HTML</span>
              </div>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="relative max-h-[600px] overflow-auto">
              <div className="flex">
                {/* Line Numbers */}
                <div className="flex-shrink-0 py-4 pl-4 pr-3 text-right select-none border-r border-white/5 bg-[#0d1117]">
                  {EMAIL_TEMPLATE_HTML.split('\n').map((_, i) => (
                    <div key={i} className="text-white/20 text-xs font-mono leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>
                {/* Code */}
                <pre className="flex-1 p-4 overflow-x-auto">
                  <code className="text-sm font-mono leading-6">
                    {EMAIL_TEMPLATE_HTML.split('\n').map((line, i) => (
                      <div key={i} className="hover:bg-white/5 -mx-4 px-4">
                        {highlightHTML(line)}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="p-4 md:p-6 bg-gradient-to-b from-[#0d2137] to-[#0a1929]">
            {/* Info Badge */}
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                {t.info}
              </span>
            </div>

            {/* Preview Container */}
            <div className="flex justify-center">
              {viewMode === "mobile" ? (
                /* Mobile Frame - 9:16 aspect ratio */
                <div className="flex-shrink-0">
                  <div className="relative w-[300px] px-3 pt-3 pb-4 bg-[#1c1c1e] rounded-[2.5rem] border-4 border-[#2c2c2e] shadow-2xl">
                    {/* Dynamic Island */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                    
                    {/* Screen - 9:16 aspect ratio */}
                    <div className="mt-5 bg-white rounded-[1.75rem] overflow-hidden" style={{ aspectRatio: '9/16' }}>
                      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                        <EmailTemplatePreview formData={dummyFormData} mode="mobile" />
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="mt-2 mx-auto w-24 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>
              ) : (
                /* Desktop Frame - 16:9 aspect ratio */
                <div className="w-full max-w-5xl">
                  {/* Monitor */}
                  <div className="bg-[#1c1c1e] rounded-lg border-4 border-[#2c2c2e] shadow-2xl overflow-hidden">
                    {/* Monitor Top Bar */}
                    <div className="flex items-center justify-center py-2 bg-[#2c2c2e]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4c4c4e]" />
                    </div>
                    
                    {/* Screen Content - 16:9 aspect ratio */}
                    <div className="bg-slate-200" style={{ aspectRatio: '16/9' }}>
                      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                        <EmailTemplatePreview formData={dummyFormData} mode="desktop" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Monitor Stand */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-8 bg-gradient-to-b from-[#3c3c3e] to-[#2c2c2e]" />
                    <div className="w-36 h-2 bg-[#2c2c2e] rounded-b-md" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Simple HTML syntax highlighting
function highlightHTML(line: string): JSX.Element {
  // Handle empty lines
  if (!line.trim()) {
    return <span>{'\u00A0'}</span>
  }

  const parts: JSX.Element[] = []
  let remaining = line
  let key = 0

  // Pattern for tags, attributes, and strings
  const tagPattern = /<\/?([a-zA-Z0-9]+)/g
  const attrPattern = /([a-zA-Z-]+)=/g
  const stringPattern = /"([^"]*)"/g
  const commentPattern = /<!--[\s\S]*?-->/g

  // Simple approach: just colorize based on patterns
  // Tags
  remaining = remaining.replace(/<\/?([a-zA-Z0-9]+)/g, (match) => {
    return `§TAG§${match}§/TAG§`
  })
  
  // Attribute names
  remaining = remaining.replace(/\s([a-zA-Z-]+)=/g, (match, attr) => {
    return ` §ATTR§${attr}§/ATTR§=`
  })

  // Strings
  remaining = remaining.replace(/"([^"]*)"/g, (match) => {
    return `§STR§${match}§/STR§`
  })

  // Convert markers to JSX
  const segments = remaining.split(/§(TAG|ATTR|STR|\/TAG|\/ATTR|\/STR)§/)
  let currentType: string | null = null

  segments.forEach((segment, i) => {
    if (segment === 'TAG') {
      currentType = 'tag'
    } else if (segment === 'ATTR') {
      currentType = 'attr'
    } else if (segment === 'STR') {
      currentType = 'str'
    } else if (segment === '/TAG' || segment === '/ATTR' || segment === '/STR') {
      currentType = null
    } else if (segment) {
      let className = 'text-slate-300'
      if (currentType === 'tag') className = 'text-pink-400'
      else if (currentType === 'attr') className = 'text-sky-300'
      else if (currentType === 'str') className = 'text-amber-300'
      
      parts.push(
        <span key={key++} className={className}>
          {segment}
        </span>
      )
    }
  })

  return <>{parts}</>
}
