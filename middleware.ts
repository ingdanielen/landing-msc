import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Permitir acceso a la página de login y API de auth sin restricciones
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next()
  }
  
  // Para rutas de admin, verificar la cookie de sesión de NextAuth
  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get("next-auth.session-token") ||
                         request.cookies.get("__Secure-next-auth.session-token")
    
    // Si no hay sesión, redirigir a login
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}

