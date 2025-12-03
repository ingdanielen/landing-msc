"use client"

import { type Language, content } from "@/lib/content"
import { FileCheck } from "lucide-react"

export function Compliance({ lang }: { lang: Language }) {
  const t = content[lang].compliance

  return (
    <section id="quality" className="py-20 bg-slate-50 border-y">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              <FileCheck className="mr-2 h-4 w-4" /> ISO 9001:2015
            </div>
            <h2 className="text-3xl font-bold text-primary font-sans uppercase">{t.title}</h2>
            <p className="text-muted-foreground text-lg">{t.text}</p>

            <div className="grid grid-cols-2 gap-4">
              {t.standards.map((std, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-medium text-secondary">{std}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center gap-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Placeholders for certification logos */}
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200 font-bold text-gray-400 text-center p-2">
              ISO CERTIFIED
            </div>
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200 font-bold text-gray-400 text-center p-2">
              PANAMA MARITIME
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
