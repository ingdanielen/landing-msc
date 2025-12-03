"use client"

import { ContactForm } from "@/components/sections/contact-form"
import { GoogleMap } from "@/components/sections/google-map"
import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { SectionExplorer } from "@/components/ui/section-explorer"

export function ContactPageClient() {
  const { lang } = useLang()
  const t = content[lang].contact

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Hero" },
    { id: "contact-info", label: "Información", labelEn: "Contact Info" },
    { id: "map", label: "Mapa", labelEn: "Map" },
  ]

  return (
    <div className="flex flex-col gap-0 relative">
      <SectionExplorer sections={sections} lang={lang} />
      <section id="hero" className="relative h-[40dvh] flex items-center justify-center overflow-hidden bg-primary pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 to-transparent opacity-30" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6 text-white drop-shadow-lg uppercase tracking-tight">{t.title}</h1>
          <p className="text-xl text-blue-100 drop-shadow-md uppercase">{t.subtitle}</p>
        </div>
      </section>

      <div id="contact-info" className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-secondary mb-6">Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 mb-1">Address</span>
                    <span className="text-slate-600 text-sm">{t.info.address}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 mb-1">Phone & Emergency</span>
                    <span className="text-slate-600 text-sm block">{t.info.phone}</span>
                    <span className="text-red-500 text-sm font-bold block mt-1">24/7 Support Available</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 mb-1">Email</span>
                    <span className="text-slate-600 text-sm break-all">{t.info.email}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 mb-1">Office Hours</span>
                    <span className="text-slate-600 text-sm">09:00 - 18:00 (Panama Time)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm lang={lang} />
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div id="map" className="w-full">
        <GoogleMap height="400px" />
      </div>
    </div>
  )
}

