"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function CookiesClient() {
  const { lang } = useLang()
  const t = content[lang].legal.cookies

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative h-[30dvh] flex items-center justify-center overflow-hidden bg-primary pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80" />
          <div className="absolute inset-0 bg-linear-gradient(to bottom, var(--color-primary-60), transparent, var(--color-primary-80))" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-hero mb-4 text-white drop-shadow-lg uppercase tracking-tight"
          >
            {t.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{t.intro}</p>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t.sections.types.title}</h3>
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {t.sections.types.content}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t.sections.management.title}</h3>
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {t.sections.management.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}





