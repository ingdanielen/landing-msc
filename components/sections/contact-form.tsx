"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Lazy load del mapa para mejorar LCP
const MSCMap = dynamic(() => import("@/components/ui/msc-map").then(mod => mod.MSCMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
      <div className="text-slate-400 text-sm">Cargando mapa...</div>
    </div>
  ),
})

export function ContactForm({ lang }: { lang: Language }) {
  const t = content[lang].contact
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPending(false)
    toast({
      title: lang === "es" ? "Mensaje Enviado" : "Message Sent",
      description:
        lang === "es"
          ? "Gracias por contactar a MSC. Responderemos pronto."
          : "Thank you for contacting MSC. We will reply shortly.",
    })
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-primary font-hero uppercase mb-2">{t.title}</h2>
              <p className="text-accent text-lg">{t.subtitle}</p>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-50 border-none">
                <CardContent className="p-6 flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Panama HQ</h4>
                    <p className="text-muted-foreground text-sm">{t.info.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-none">
                <CardContent className="p-6 flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Call Us</h4>
                    <p className="text-muted-foreground">{t.info.phone}</p>
                    <p className="text-red-600 font-bold text-sm mt-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {t.info.emergency}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-none">
                <CardContent className="p-6 flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Email</h4>
                    <p className="text-muted-foreground">{t.info.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaflet Map */}
            <MSCMap lang={lang} height="200px" />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">{t.form.name}</label>
                  <Input required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">{t.form.phone}</label>
                  <Input required placeholder="+507 ..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">{t.form.company}</label>
                <Input required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">{t.form.type}</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vessel">Vessel Survey</SelectItem>
                      <SelectItem value="cargo">Cargo Survey</SelectItem>
                      <SelectItem value="drone">Drone Inspection</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">{t.form.location}</label>
                  <Input required placeholder="Port Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">{t.form.message}</label>
                <Textarea className="min-h-[120px]" placeholder="..." />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 cursor-pointer"
                  disabled={pending}
                >
                  {pending ? (lang === "es" ? "Enviando..." : "Sending...") : t.form.submit}
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">{content[lang].footer.privacy.text}</p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
