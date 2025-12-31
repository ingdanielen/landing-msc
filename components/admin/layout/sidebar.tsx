"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  User,
  Loader2,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft,
  Mail
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { t } = useAdminLang()

  const navItems = [
    { 
      label: t.nav.dashboard, 
      href: "/admin", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      label: t.nav.articles, 
      href: "/admin/blog", 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      label: t.nav.gallery, 
      href: "/admin/gallery", 
      icon: <ImageIcon className="w-5 h-5" /> 
    },
    { 
      label: t.nav.email, 
      href: "/admin/email", 
      icon: <Mail className="w-5 h-5" /> 
    },
    { 
      label: t.nav.settings, 
      href: "/admin/settings", 
      icon: <Settings className="w-5 h-5" /> 
    },
  ]

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("admin-sidebar-collapsed")
    if (savedState !== null) {
      setCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to localStorage and emit event
  const toggleCollapsed = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("admin-sidebar-collapsed", String(newState))
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: newState }))
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return null
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut({ callbackUrl: "/admin/login" })
  }

  const sidebarContent = (isMobile: boolean = false) => (
    <>
      {/* Logo Section with Collapse Button */}
      <div className={cn(
        "h-16 flex items-center border-b border-white/5 transition-all",
        collapsed && !isMobile ? "px-2 justify-center" : "px-4 justify-between"
      )}>
        <Link href="/admin" className="flex items-center gap-3 min-w-0">
          {collapsed && !isMobile ? (
            <div className="w-9 h-9 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold text-sm">M</span>
            </div>
          ) : (
            <>
              <Image
                src="/brand/logo-white.png"
                alt="MSC"
                width={100}
                height={40}
                className="h-8 w-auto flex-shrink-0"
              />
              <span className="text-white/40 text-xs font-medium tracking-wider uppercase">
                Studio
              </span>
            </>
          )}
        </Link>
        
        {/* Collapse Button - Desktop only, visible position */}
        {!isMobile && (
          <button
            onClick={toggleCollapsed}
            className={cn(
              "p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-all",
              collapsed && "absolute left-1/2 -translate-x-1/2 top-[72px]"
            )}
            title={collapsed ? t.nav.expand : t.nav.collapse}
          >
            {collapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden",
        collapsed && !isMobile && "pt-8"
      )}>
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group relative",
                active 
                  ? "bg-accent text-white" 
                  : "text-white/60 hover:text-white hover:bg-white/5",
                collapsed && !isMobile && "justify-center px-2"
              )}
            >
              <span className={cn(
                "flex-shrink-0 transition-colors",
                active ? "text-white" : "text-white/50 group-hover:text-white/80"
              )}>
                {item.icon}
              </span>
              {(!collapsed || isMobile) && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {collapsed && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-[#0a2a43] text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section - Fixed overflow */}
      {status === "authenticated" && session?.user && (
        <div className={cn(
          "mx-3 mb-2 p-3 bg-white/5 rounded-lg overflow-hidden",
          collapsed && !isMobile && "p-2 mx-2"
        )}>
          <div className={cn(
            "flex items-center gap-3",
            collapsed && !isMobile && "justify-center"
          )}>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "Usuario"}
                width={32}
                height={32}
                className="rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {session.user.name || "Admin"}
                </p>
                <p className="text-xs text-white/50 truncate">
                  {session.user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {/* View Site Link */}
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-white/50 hover:text-white hover:bg-white/5 transition-all group",
            collapsed && !isMobile && "justify-center px-2"
          )}
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobile) && (
            <>
              <span className="text-sm font-medium">{t.nav.viewSite}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all",
            isLoggingOut && "opacity-50 cursor-not-allowed",
            collapsed && !isMobile && "justify-center px-2"
          )}
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5 flex-shrink-0" />
          )}
          {(!collapsed || isMobile) && (
            <span className="text-sm font-medium">{t.nav.logout}</span>
          )}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#00111f] rounded-lg text-white/70 hover:text-white transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-[#00111f] border-r border-white/5 z-50 flex flex-col transform transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        {sidebarContent(true)}
      </aside>

      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex fixed left-0 top-0 h-screen bg-[#00111f] border-r border-white/5 transition-all duration-300 z-40 flex-col overflow-hidden",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        {sidebarContent(false)}
      </aside>
    </>
  )
}
