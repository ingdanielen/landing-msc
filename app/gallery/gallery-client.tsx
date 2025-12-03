"use client"

import { useLang } from "@/components/lang-provider"
import { content } from "@/lib/content"
import { ImageIcon } from "lucide-react"

export function GalleryPageClient() {
  const { lang } = useLang()
  const t = content[lang].gallery

  return (
    <>
      <section className="bg-secondary py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6">{t.title}</h1>
          <p className="text-xl text-blue-100">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200"
              >
                <div className="text-center text-slate-400">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                  <span className="text-sm font-medium">Image Placeholder {item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

