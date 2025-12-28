"use client"

import { content } from "@/lib/content"
import { Linkedin, Phone, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useLang } from "@/components/lang-provider"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const { lang } = useLang()
  const t = content[lang].footer

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Image
                src="/brand/logo-white.png"
                alt="MSC Logo"
                width={1000}
                height={1000}
                className="h-18 w-auto"
              />
            </div>
            <p className="text-lg font-light text-gray-300 max-w-md italic">"{t.brand_quote}"</p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-accent text-sm uppercase tracking-wider">
              {lang === "es" ? "Navegación" : lang === "zh" ? "导航" : "Navigation"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {content[lang].nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {content[lang].nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {content[lang].nav.services}
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {content[lang].blog.title}
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {content[lang].nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-accent text-sm uppercase tracking-wider">
              {lang === "es" ? "Legal" : lang === "zh" ? "法律" : "Legal"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {lang === "es" ? "Términos y Condiciones" : lang === "zh" ? "条款与条件" : "Terms & Conditions"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {lang === "es" ? "Política de Cookies" : lang === "zh" ? "Cookie政策" : "Cookie Policy"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {lang === "es" ? "Mapa del Sitio" : lang === "zh" ? "网站地图" : "Sitemap"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="grid gap-8 md:grid-cols-2 text-xs text-gray-500 leading-relaxed">
          <div>
            <h5 className="font-bold text-gray-400 mb-2">{t.disclaimer.title}</h5>
            <p>{t.disclaimer.text}</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-400 mb-2">{t.privacy.title}</h5>
            <p>{t.privacy.text}</p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-600 mt-12 pt-4 border-t border-white/5">{t.rights}</div>
      </div>
    </footer>
  )
}
