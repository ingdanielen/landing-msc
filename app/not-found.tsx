"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { useLang } from "@/components/lang-provider"

const notFoundContent = {
  es: {
    title: "Página No Encontrada",
    description: "Lo sentimos, la página que buscas no existe o ha sido movida.",
    backHome: "Volver al Inicio",
    goBack: "Página Anterior",
  },
  en: {
    title: "Page Not Found",
    description: "We're sorry, the page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",
    goBack: "Previous Page",
  },
}

export default function NotFound() {
  const { lang } = useLang()
  const t = notFoundContent[lang]

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 pt-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <Image
            src="/brand/not-found.png"
            alt="404 Not Found"
            width={500}
            height={300}
            className="mx-auto"
            priority
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-sans uppercase tracking-tight">
          {t.title}
        </h1>
        
        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
        
        <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
          {t.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold uppercase">
              <Home className="mr-2 h-4 w-4" />
              {t.backHome}
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="border-primary text-primary hover:bg-primary hover:text-white uppercase"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.goBack}
          </Button>
        </div>
      </div>
    </div>
  )
}

