"use client"

import React from 'react'

interface EmailTemplatePreviewProps {
  formData: {
    from_name: string
    from_email: string
    phone: string
    company: string
    service_type: string
    message: string
  }
  mode?: "desktop" | "mobile"
}

export function EmailTemplatePreview({ formData, mode = "desktop" }: EmailTemplatePreviewProps) {
  const isMobile = mode === "mobile"
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud - MSC</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    ::-webkit-scrollbar { display: none; }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; overflow-x: hidden;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: ${isMobile ? '100%' : '640px'}; margin: 0 auto;">
    <tr>
      <td style="padding: ${isMobile ? '12px' : '24px'};">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2e8f0;">
          
          <tr>
            <td style="background-color: #0a2a43; padding: ${isMobile ? '16px 20px' : '24px 32px'};">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: ${isMobile ? '20px' : '24px'}; font-weight: bold; color: #ffffff; letter-spacing: 3px;">MSC</span>
                  </td>
                  <td style="text-align: right;">
                    <span style="color: rgba(255,255,255,0.6); font-size: ${isMobile ? '10px' : '12px'};">Marine Surveyors & Consultants</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #2e86c1; padding: ${isMobile ? '12px 20px' : '16px 32px'};">
              <h1 style="margin: 0; color: #ffffff; font-size: ${isMobile ? '14px' : '18px'}; font-weight: 600;">
                Nueva Solicitud de Inspección
              </h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: ${isMobile ? '20px' : '32px'};">
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: ${isMobile ? '16px' : '24px'}; border-left: 4px solid #2e86c1;">
                <tr>
                  <td style="padding: ${isMobile ? '12px 16px' : '16px 20px'}; background-color: #f8fafc;">
                    <p style="margin: 0 0 4px 0; color: #64748b; font-size: ${isMobile ? '10px' : '11px'}; text-transform: uppercase; letter-spacing: 1px;">
                      Servicio Solicitado
                    </p>
                    <p style="margin: 0; color: #0a2a43; font-size: ${isMobile ? '14px' : '18px'}; font-weight: 600;">
                      ${formData.service_type || 'No especificado'}
                    </p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: ${isMobile ? '16px' : '24px'};">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #0a2a43; font-size: ${isMobile ? '11px' : '13px'}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Datos del Cliente
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="${isMobile ? '80' : '120'}" style="padding: 8px 0; color: #64748b; font-size: ${isMobile ? '11px' : '13px'}; vertical-align: top;">
                          Nombre
                        </td>
                        <td style="padding: 8px 0; color: #0a2a43; font-size: ${isMobile ? '12px' : '14px'}; font-weight: 500;">
                          ${formData.from_name}
                        </td>
                      </tr>
                      <tr>
                        <td width="${isMobile ? '80' : '120'}" style="padding: 8px 0; color: #64748b; font-size: ${isMobile ? '11px' : '13px'}; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Email
                        </td>
                        <td style="padding: 8px 0; border-top: 1px solid #f1f5f9;">
                          <a href="mailto:${formData.from_email}" style="color: #2e86c1; text-decoration: none; font-size: ${isMobile ? '12px' : '14px'}; font-weight: 500; word-break: break-all;">
                            ${formData.from_email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width="${isMobile ? '80' : '120'}" style="padding: 8px 0; color: #64748b; font-size: ${isMobile ? '11px' : '13px'}; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Teléfono
                        </td>
                        <td style="padding: 8px 0; color: #0a2a43; font-size: ${isMobile ? '12px' : '14px'}; font-weight: 500; border-top: 1px solid #f1f5f9;">
                          ${formData.phone || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td width="${isMobile ? '80' : '120'}" style="padding: 8px 0; color: #64748b; font-size: ${isMobile ? '11px' : '13px'}; vertical-align: top; border-top: 1px solid #f1f5f9;">
                          Empresa
                        </td>
                        <td style="padding: 8px 0; color: #0a2a43; font-size: ${isMobile ? '12px' : '14px'}; font-weight: 500; border-top: 1px solid #f1f5f9;">
                          ${formData.company || 'N/A'}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: ${isMobile ? '16px' : '24px'};">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #0a2a43; font-size: ${isMobile ? '11px' : '13px'}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Mensaje
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <p style="margin: 0; color: #475569; font-size: ${isMobile ? '12px' : '14px'}; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${formData.message}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top: 8px;">
                    <a href="mailto:${formData.from_email}?subject=Re: Solicitud de ${formData.service_type} - MSC" 
                       style="display: inline-block; background-color: #0a2a43; color: #ffffff; padding: ${isMobile ? '10px 16px' : '14px 28px'}; text-decoration: none; font-size: ${isMobile ? '11px' : '13px'}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Responder al Cliente
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f8fafc; padding: ${isMobile ? '16px 20px' : '24px 32px'}; border-top: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; color: #64748b; font-size: ${isMobile ? '10px' : '12px'};">
                      Solicitud recibida desde
                    </p>
                    <p style="margin: 0; color: #0a2a43; font-size: ${isMobile ? '11px' : '13px'}; font-weight: 600;">
                      www.mscsurveyors.org
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0 0 2px 0; color: #64748b; font-size: ${isMobile ? '10px' : '12px'};">
                      info@mscsurveyors.org
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: ${isMobile ? '10px' : '12px'};">
                      +507 6598-0679
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #0a2a43; padding: ${isMobile ? '12px 20px' : '16px 32px'}; text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: ${isMobile ? '9px' : '11px'};">
                © 2025 Marine Surveyors & Consultants. Todos los derechos reservados.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `

  return (
    <iframe 
      srcDoc={htmlContent}
      className="w-full h-full border-0 bg-white block min-h-0"
      title="Email Template Preview"
    />
  )
}
