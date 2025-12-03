"use client"

import { type Language, content } from "@/lib/content"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection({ lang }: { lang: Language }) {
  const t = content[lang]

  return (
    <section id="cta" className="py-20 bg-primary text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.contact.subtitle}</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {lang === "es"
            ? "Nuestro equipo está listo para movilizarse a cualquier puerto."
            : "Our team is ready to mobilize to any port worldwide."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 h-14">
              {t.contact.form.submit}
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary h-14 bg-transparent"
            >
              {t.contact.info.emergency.split(":")[0]}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

