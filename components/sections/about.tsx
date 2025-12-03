"use client"

import { motion } from "framer-motion"
import { type Language, content } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Target, Compass } from "lucide-react"

export function About({ lang }: { lang: Language }) {
  const t = content[lang].about

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-4 font-sans uppercase">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-accent mb-6"></div>
          <p className="max-w-[800px] text-muted-foreground text-lg leading-relaxed">{t.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/10 rounded-xl -z-10" />
            <img
              src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop"
              alt="MSC Team"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <div className="space-y-8 flex flex-col justify-center">
            <Card className="border-l-4 border-l-accent border-y-0 border-r-0 rounded-none shadow-sm bg-slate-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-6 w-6 text-accent" />
                  <h3 className="text-xl font-bold text-secondary font-sans">{t.mission.title}</h3>
                </div>
                <p className="text-muted-foreground">{t.mission.text}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary border-y-0 border-r-0 rounded-none shadow-sm bg-slate-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Compass className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-secondary font-sans">{t.vision.title}</h3>
                </div>
                <p className="text-muted-foreground">{t.vision.text}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.values.map((val, i) => {
            const valueTitle = typeof val === "string" ? val : val.title
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center p-4 bg-secondary/5 border border-secondary/10 rounded-md hover:bg-secondary/10 transition-colors"
              >
                <ShieldCheck className="h-5 w-5 text-accent mr-3 shrink-0" />
                <span className="font-semibold text-primary">{valueTitle}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
