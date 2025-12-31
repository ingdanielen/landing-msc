"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function LegalClient() {
  const { lang } = useLang()
  const t = content[lang].legal.legalNotice

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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{content[lang].legal.disclaimer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {content[lang].legal.disclaimer.content}
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.company.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{t.company.name}</p>
              <p className="text-muted-foreground">{t.company.registration}</p>
              <p className="text-muted-foreground">{t.company.ruc}</p>
            </CardContent>
          </Card>

          {/* Registered Office */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.office.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t.office.address}</p>
            </CardContent>
          </Card>

          {/* Authorized Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.contact.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">{t.contact.email}</p>
              <p className="text-muted-foreground">{t.contact.phone}</p>
              <p className="text-muted-foreground">{t.contact.website}</p>
            </CardContent>
          </Card>

          {/* Regulatory Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.compliance.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {t.compliance.content}
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.intellectual.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {t.intellectual.content}
              </div>
            </CardContent>
          </Card>

          {/* Jurisdiction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t.jurisdiction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {t.jurisdiction.content}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}





