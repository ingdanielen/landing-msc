"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
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
  const pathname = usePathname()
  
  // Close search when mobile menu opens
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
    { name: tFooter.team, href: "/team" },
    { name: lang === "es" ? "Blog" : "Blog", href: "/blog" },
    { name: tFooter.contact, href: "/contact" },
  ]

  // Pages with hero sections that need transparent navbar
  const pagesWithHero = ["/", "/about", "/services", "/compliance", "/team", "/contact"]
  const isOnPageWithHero = pagesWithHero.includes(pathname)
  const shouldBeTransparent = isOnPageWithHero && !isScrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeTransparent
          ? "bg-transparent py-6"
          : "bg-primary/95 backdrop-blur-md shadow-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/brand/logo-white.png"
            alt="MSC Logo"
            width={1000}
            height={1000}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center gap-6 ml-8 xl:ml-12 transition-all duration-300 ease-in-out ${
          isSearchOpen ? "translate-x-[-80px]" : "translate-x-0"
        }`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold hover:text-accent transition-all duration-300 uppercase tracking-wide ${
                  isActive ? "text-accent" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <SearchBar lang={lang} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          <LanguageToggle lang={lang} setLang={setLang} />
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-white font-bold uppercase text-xs px-6 cursor-pointer">
              {t.request}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <SearchBar lang={lang} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          <LanguageToggle lang={lang} setLang={setLang} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t p-4 flex flex-col gap-4 lg:hidden h-screen">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-medium py-3 border-b border-gray-100 ${
                pathname === link.href ? "text-accent" : "text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full bg-accent mt-4 cursor-pointer py-6 text-lg">{t.request}</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
