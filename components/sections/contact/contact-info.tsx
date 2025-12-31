"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Language } from "@/lib/content"
import { MapPin, Phone, Mail, Clock, AlertCircle, Copy, Check, ExternalLink } from "lucide-react"
import { HeroText } from "@/components/ui/hero-text"

const infoContent = {
  es: {
    title: "Conectemos",
    subtitle: "Múltiples canales a su disposición",
    emergencyBadge: "Línea de Emergencia",
    emergencyTitle: "Soporte 24/7",
    emergencyDesc: "Para emergencias marítimas críticas, estamos disponibles en cualquier momento del día o la noche.",
    emergencyPhone: "(+507) 6598-0679",
    emergencyCta: "Llamar Ahora",
    channels: [
      {
        id: "office",
        icon: MapPin,
        title: "Oficina Principal",
        value: "Panamá, Rep. de Panamá",
        detail: "Altos de Curundu, Calle River, Edificio 569B, Ancón",
        action: { label: "Ver en mapa", href: "https://maps.google.com/?q=8.975003,-79.541983" },
        copyable: false,
      },
      {
        id: "phone",
        icon: Phone,
        title: "Teléfono / WhatsApp",
        value: "(+507) 6598-0679",
        detail: "Llamadas y mensajes de WhatsApp",
        action: { label: "Llamar", href: "tel:+50765980679" },
        copyable: true,
        copyValue: "+50765980679",
      },
      {
        id: "email",
        icon: Mail,
        title: "Correo Electrónico",
        value: "msc@mscsurveyors.org",
        detail: "Respuesta garantizada en 24 horas",
        action: { label: "Enviar email", href: "mailto:msc@mscsurveyors.org" },
        copyable: true,
        copyValue: "msc@mscsurveyors.org",
      },
    ],
    hours: {
      title: "Horario",
      schedule: "Lun - Vie: 09:00 - 18:00",
      timezone: "Hora de Panamá (EST)",
    },
    copied: "¡Copiado!",
  },
  en: {
    title: "Let's Connect",
    subtitle: "Multiple channels at your disposal",
    emergencyBadge: "Emergency Line",
    emergencyTitle: "24/7 Support",
    emergencyDesc: "For critical maritime emergencies, we're available at any time of the day or night.",
    emergencyPhone: "(+507) 6598-0679",
    emergencyCta: "Call Now",
    channels: [
      {
        id: "office",
        icon: MapPin,
        title: "Main Office",
        value: "Panama, Rep. of Panama",
        detail: "Altos de Curundu, Calle River, Building 569B, Ancón",
        action: { label: "View on map", href: "https://maps.google.com/?q=8.975003,-79.541983" },
        copyable: false,
      },
      {
        id: "phone",
        icon: Phone,
        title: "Phone / WhatsApp",
        value: "(+507) 6598-0679",
        detail: "Calls and WhatsApp messages",
        action: { label: "Call", href: "tel:+50765980679" },
        copyable: true,
        copyValue: "+50765980679",
      },
      {
        id: "email",
        icon: Mail,
        title: "Email",
        value: "msc@mscsurveyors.org",
        detail: "Guaranteed response within 24 hours",
        action: { label: "Send email", href: "mailto:msc@mscsurveyors.org" },
        copyable: true,
        copyValue: "msc@mscsurveyors.org",
      },
    ],
    hours: {
      title: "Hours",
      schedule: "Mon - Fri: 09:00 - 18:00",
      timezone: "Panama Time (EST)",
    },
    copied: "Copied!",
  },
  zh: {
    title: "联系我们",
    subtitle: "多种联系渠道供您选择",
    emergencyBadge: "紧急热线",
    emergencyTitle: "全天候支持",
    emergencyDesc: "对于紧急海事情况，我们全天候24小时随时待命。",
    emergencyPhone: "(+507) 6598-0679",
    emergencyCta: "立即致电",
    channels: [
      {
        id: "office",
        icon: MapPin,
        title: "总部办公室",
        value: "巴拿马共和国",
        detail: "Altos de Curundu, Calle River, 569B号楼, Ancón",
        action: { label: "查看地图", href: "https://maps.google.com/?q=8.975003,-79.541983" },
        copyable: false,
      },
      {
        id: "phone",
        icon: Phone,
        title: "电话 / WhatsApp",
        value: "(+507) 6598-0679",
        detail: "电话和WhatsApp消息",
        action: { label: "拨打电话", href: "tel:+50765980679" },
        copyable: true,
        copyValue: "+50765980679",
      },
      {
        id: "email",
        icon: Mail,
        title: "电子邮件",
        value: "msc@mscsurveyors.org",
        detail: "保证24小时内回复",
        action: { label: "发送邮件", href: "mailto:msc@mscsurveyors.org" },
        copyable: true,
        copyValue: "msc@mscsurveyors.org",
      },
    ],
    hours: {
      title: "营业时间",
      schedule: "周一至周五: 09:00 - 18:00",
      timezone: "巴拿马时间 (EST)",
    },
    copied: "已复制！",
  },
}

export function ContactInfo({ lang }: { lang: Language }) {
  const t = infoContent[lang as keyof typeof infoContent] || infoContent.en
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeChannel, setActiveChannel] = useState<string>("office")

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const currentChannel = t.channels.find((c) => c.id === activeChannel)

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <HeroText 
              as="h2" 
              className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight"
            >
              {t.title}
            </HeroText>
            <p className="text-slate-500">{t.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left - Emergency Card (Featured) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative h-full bg-primary rounded-lg p-6 md:p-8 overflow-hidden">
                {/* Animated pulse ring */}
                <div className="absolute top-6 right-6">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                  </span>
                </div>

                {/* Pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-accent rounded-lg px-3 py-1.5 mb-6">
                    <AlertCircle className="h-4 w-4 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                      {t.emergencyBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                    {t.emergencyTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {t.emergencyDesc}
                  </p>

                  {/* Phone Number */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-white/50 text-xs mb-1">
                      {lang === "es" ? "Número de emergencia" : lang === "zh" ? "紧急电话" : "Emergency number"}
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-white font-mono">
                      {t.emergencyPhone}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="tel:+50765980679"
                    className="flex items-center justify-center gap-2 w-full bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    {t.emergencyCta}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right - Channel Selector & Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 flex flex-col"
            >
              {/* Channel Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {t.channels.map((channel) => {
                  const Icon = channel.icon
                  const isActive = activeChannel === channel.id
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap border
                        ${isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{channel.title}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active Channel Detail */}
              <AnimatePresence mode="wait">
                {currentChannel && (
                  <motion.div
                    key={currentChannel.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-slate-50 rounded-lg p-6 md:p-8 border border-slate-200"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <currentChannel.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">{currentChannel.title}</p>
                        <h4 className="text-2xl md:text-3xl font-black text-primary leading-tight">
                          {currentChannel.value}
                        </h4>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6">{currentChannel.detail}</p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={currentChannel.action.href}
                        target={currentChannel.action.href.startsWith("http") ? "_blank" : undefined}
                        rel={currentChannel.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                      >
                        {currentChannel.action.label}
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {currentChannel.copyable && currentChannel.copyValue && (
                        <button
                          onClick={() => handleCopy(currentChannel.id, currentChannel.copyValue!)}
                          className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
                        >
                          {copiedId === currentChannel.id ? (
                            <>
                              <Check className="h-4 w-4 text-green-600" />
                              {t.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              {lang === "es" ? "Copiar" : lang === "zh" ? "复制" : "Copy"}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hours Bar */}
              <div className="mt-4 bg-slate-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-primary font-bold text-sm">{t.hours.title}</p>
                    <p className="text-slate-500 text-sm">{t.hours.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-slate-400 text-xs">{t.hours.timezone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
