"use client"

import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { GoogleMap } from "@/components/sections/google-map"
import { Mail, Phone, AlertCircle, MapPin } from "lucide-react"

export function LocationSection({ lang }: { lang: Language }) {
  return (
    <section id="location" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans uppercase tracking-tight">
            {lang === "es" ? "Nuestra Ubicación" : "Our Location"}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {lang === "es"
              ? "Encuéntranos en Panamá, listos para servirte en cualquier puerto del mundo."
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
          <GoogleMap height="500px" />
        </motion.div>

        {/* Contact Information - Minimalist Design */}
        <div className="max-w-5xl mx-auto">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-4 pb-8 mb-8 border-b border-slate-200"
          >
            <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {lang === "es" ? "Dirección de Oficina" : "Office Address"}
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
                  {lang === "es" ? "Correo Electrónico" : "Email"}
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
                  {lang === "es" ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}
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
                  {lang === "es" ? "Emergencia 24/7" : "24/7 Emergency"}
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
