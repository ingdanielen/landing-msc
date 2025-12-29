"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import dynamic from "next/dynamic"
import { Mail, Phone, AlertCircle, MapPin } from "lucide-react"

// Lazy load del mapa para mejorar LCP
const MSCMap = dynamic(() => import("@/components/ui/msc-map").then(mod => mod.MSCMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
      <div className="text-slate-400 text-sm">Cargando mapa...</div>
    </div>
  ),
})

export function LocationSection({ lang }: { lang: Language }) {
  return (
    <section id="location" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-hero uppercase tracking-tight">
            {lang === "es" ? "Nuestra Ubicación" : lang === "zh" ? "我们的位置" : "Our Location"}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Encuéntranos en Panamá, listos para servirte en cualquier puerto del mundo."
              : lang === "zh"
              ? "在巴拿马找到我们，准备为全球任何港口提供服务。"
              : "Find us in Panama, ready to serve you at any port worldwide."}
          </p>
        </motion.div>

        {/* Map - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl mb-16"
        >
          <MSCMap lang={lang} height="500px" />
        </motion.div>

        {/* Contact Information - Minimalist Design */}
        <div className="max-w-5xl mx-auto">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 pb-8 mb-8 border-b border-primary/10"
          >
            <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {lang === "es" ? "Dirección de Oficina" : lang === "zh" ? "办公地址" : "Office Address"}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Altos de Curundu, Calle River, Edificio 569B, Ancón, Panamá, República de Panamá
              </p>
            </div>
          </motion.div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <Mail className="h-5 w-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {lang === "es" ? "Correo Electrónico" : lang === "zh" ? "电子邮件" : "Email"}
                </p>
                <a
                  href="mailto:msc@mscsurveyors.org"
                  className="text-base text-primary hover:text-accent transition-colors font-medium"
                >
                  msc@mscsurveyors.org
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <Phone className="h-5 w-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {lang === "es" ? "Teléfono / WhatsApp" : lang === "zh" ? "电话 / WhatsApp" : "Phone / WhatsApp"}
                </p>
                <a
                  href="tel:+50765980679"
                  className="text-base text-primary hover:text-accent transition-colors font-medium"
                >
                  (+507) 65980679
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <AlertCircle className="h-5 w-5 text-accent mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {lang === "es" ? "Emergencia 24/7" : lang === "zh" ? "24/7 紧急热线" : "24/7 Emergency"}
                </p>
                <a
                  href="tel:+50765980679"
                  className="text-base text-accent hover:text-accent/80 transition-colors font-bold"
                >
                  (+507) 65980679
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
