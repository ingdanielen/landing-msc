"use client"

import { useState, useEffect, useRef } from "react"
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
  const { lang, setLang } = useLang()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsSearchOpen(false)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const t = content[lang].nav
  const tFooter = content[lang].footer.links

  const navLinks = [
    { name: tFooter.home, href: "/" },
    { name: tFooter.about, href: "/about" },
    { name: tFooter.services, href: "/services" },
    { name: tFooter.quality, href: "/compliance" },
    { name: lang === "es" ? "Galería" : lang === "zh" ? "图库" : "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: tFooter.contact, href: "/contact" },
  ]

  const pagesWithHero = ["/", "/about", "/services", "/compliance", "/gallery", "/contact"]
  const isOnPageWithHero = pagesWithHero.includes(pathname)
  const shouldBeTransparent = isOnPageWithHero && !isScrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
        shouldBeTransparent
          ? "bg-transparent"
          : ""
      }`}
    >
      {/* Video Background when scrolled - Impactante y revolucionario */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          shouldBeTransparent ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-150"
          style={{ filter: 'blur(8px)' }}
        >
          <source src="/images/videos/hero-1.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay - Deep ocean feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00111f]/95 via-primary/90 to-[#00111f]/95" />
        
        {/* Subtle animated gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse-slow" />
        
        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
      <div className={`container mx-auto px-4 md:px-6 transition-all duration-300 relative z-10 ${
        shouldBeTransparent ? "py-5" : "py-3"
      }`}>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
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
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
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
            <Link href="/contact">
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
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        role="navigation"
        aria-label="Menú de navegación móvil"
        className={`lg:hidden absolute top-full left-0 right-0 border-t border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Video Background for mobile menu */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-150"
            style={{ filter: 'blur(12px)' }}
          >
            <source src="/images/videos/hero-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#00111f]/95 via-primary/95 to-[#00111f]/98" />
        </div>
        <div className="container mx-auto px-4 py-4 space-y-1 relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all ${
                pathname === link.href
                  ? "bg-accent text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="font-medium">{link.name}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-white/10">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-accent hover:bg-accent/90 font-semibold py-5 rounded-lg">
                {t.request}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
