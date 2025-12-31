"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/layout/sidebar"
import { AuthProvider } from "@/components/admin/auth/session-provider"
import { AdminLangProvider } from "@/components/admin/admin-lang-provider"

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Sync sidebar collapsed state
  useEffect(() => {
    const savedState = localStorage.getItem("admin-sidebar-collapsed")
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true")
    }

    // Listen for storage changes
    const handleStorage = () => {
      const state = localStorage.getItem("admin-sidebar-collapsed")
      setSidebarCollapsed(state === "true")
    }

    window.addEventListener("storage", handleStorage)
    
    // Also listen for custom event for same-tab updates
    const handleCustomEvent = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail)
    }
    window.addEventListener("sidebar-toggle" as any, handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("sidebar-toggle" as any, handleCustomEvent)
    }
  }, [])

  return (
    <AuthProvider>
      <AdminLangProvider>
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="min-h-screen bg-[#f8fafc]">
            <AdminSidebar />
            <main 
              className={`min-h-screen transition-all duration-300 ${
                sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
              }`}
            >
              {children}
            </main>
          </div>
        )}
      </AdminLangProvider>
    </AuthProvider>
  )
}
