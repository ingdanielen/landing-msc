"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { content } from "@/lib/content"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { SearchBar } from "@/components/ui/search-bar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLang } from "@/components/lang-provider"
import Image from "next/image"

export function Navbar() {
  const { lang, setLang, translatePath, getBasePath } = useLang()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Get the base path for current URL (for comparison)
  const currentBasePath = getBasePath(pathname)

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsSearchOpen(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const t = content[lang].nav
  const tFooter = content[lang].footer.links

  // Base routes (English) - these will be translated automatically
  const navLinks = [
    { name: tFooter.home, baseHref: "/" },
    { name: tFooter.about, baseHref: "/about" },
    { name: tFooter.services, baseHref: "/services" },
    { name: tFooter.quality, baseHref: "/compliance" },
    { name: tFooter.gallery, baseHref: "/gallery" },
    { name: tFooter.blog, baseHref: "/blog" },
    { name: tFooter.contact, baseHref: "/contact" },
  ]

  // Pages with hero sections (base paths)
  const pagesWithHero = ["/", "/about", "/services", "/compliance", "/gallery", "/contact"]
  const isOnPageWithHero = pagesWithHero.includes(currentBasePath)
  const shouldBeTransparent = isOnPageWithHero && !isScrolled && !isMobileMenuOpen

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldBeTransparent ? "bg-transparent" : ""
        }`}
      >
        {/* Background with darker edges gradient */}
        {!shouldBeTransparent && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#000a14] via-primary/95 to-[#000a14] backdrop-blur-md" />
        )}
        
        {/* Bottom border */}
        {!shouldBeTransparent && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        )}

        <div className={`container mx-auto px-4 md:px-6 transition-all duration-300 relative z-10 ${
          shouldBeTransparent ? "py-5" : "py-3"
        }`}>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href={translatePath("/")} className="shrink-0">
              <Image
                src="/brand/logo-white.png"
                alt="MSC Logo"
                width={120}
                height={48}
                className={`transition-all duration-300 ${
                  shouldBeTransparent ? "h-12" : "h-10"
                } w-auto`}
                priority
                quality={90}
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const translatedHref = translatePath(link.baseHref)
                  const isActive = currentBasePath === link.baseHref
                  return (
                    <Link
                      key={link.name}
                      href={translatedHref}
                      className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                        isActive
                          ? "text-accent"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <SearchBar lang={lang} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
              <LanguageToggle lang={lang} setLang={setLang} />
              <Link href={translatePath("/contact")}>
                <Button className="bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-4 py-2 rounded-md transition-all ml-2">
                  {t.request}
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchBar lang={lang} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
              <LanguageToggle lang={lang} setLang={setLang} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative z-50"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          style={{ paddingTop: '72px' }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-primary" />
          
          {/* Content */}
          <div className="relative z-10 h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-2">
                {navLinks.map((link, idx) => {
                  const translatedHref = translatePath(link.baseHref)
                  const isActive = currentBasePath === link.baseHref
                  return (
                    <Link
                      key={link.name}
                      href={translatedHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-4 px-5 transition-all ${
                        isActive
                          ? "bg-accent text-white"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="text-lg font-medium">{link.name}</span>
                      <ChevronRight className="w-5 h-5 opacity-50" />
                    </Link>
                  )
                })}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link href={translatePath("/contact")} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5 text-base">
                    {t.request}
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-center text-white/50 text-sm">
                <p>info@mscsurveyors.org</p>
                <p className="mt-1">+507 6598-0679</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
