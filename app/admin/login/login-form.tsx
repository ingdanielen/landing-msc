"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, Lock, ArrowRight, Loader2, Github, KeyRound, ShieldCheck, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"credentials" | "github">("credentials")

  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "AccessDenied") {
      setError("No tienes permiso para acceder al panel de administración")
      setActiveTab("github")
    } else if (errorParam === "OAuthSignin" || errorParam === "OAuthCallback") {
      setError("Error al conectar con GitHub. Verifica la configuración.")
      setActiveTab("github")
    }
  }, [searchParams])

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin")
    }
  }, [status, router])

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Usuario o contraseña incorrectos")
        setIsLoading(false)
      } else if (result?.ok) {
        router.push("/admin")
        router.refresh()
      }
    } catch {
      setError("Error al iniciar sesión")
      setIsLoading(false)
    }
  }

  const handleGitHubLogin = async () => {
    setIsGitHubLoading(true)
    setError("")
    try {
      await signIn("github", { callbackUrl: "/admin" })
    } catch {
      setError("Error al conectar con GitHub")
      setIsGitHubLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00111f] via-[#0a2a43] to-[#00111f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00111f] via-[#0a2a43] to-[#00111f] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-8 pb-6 text-center border-b border-white/5">
            <Image
              src="/brand/logo-white.png"
              alt="MSC"
              width={140}
              height={56}
              className="h-10 w-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-xl font-semibold text-white mb-1">
              Content Studio
            </h1>
            <p className="text-sm text-white/50">
              Accede al panel de administración
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("credentials")
                setError("")
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all border-b-2",
                activeTab === "credentials"
                  ? "text-accent border-accent bg-accent/5"
                  : "text-white/50 border-transparent hover:text-white/70"
              )}
            >
              <KeyRound className="w-4 h-4" />
              Credenciales
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("github")
                setError("")
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all border-b-2",
                activeTab === "github"
                  ? "text-accent border-accent bg-accent/5"
                  : "text-white/50 border-transparent hover:text-white/70"
              )}
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Global Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {activeTab === "credentials" ? (
              <form onSubmit={handleCredentialsLogin} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    Usuario
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ingresa tu usuario"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      autoFocus
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa la contraseña"
                      className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !username || !password}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium transition-all",
                    isLoading || !username || !password
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-accent hover:bg-accent/90 text-white"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      Acceder
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* GitHub Info */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-white/80 font-medium mb-1">
                        Autenticación con GitHub
                      </p>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Inicia sesión con tu cuenta de GitHub. Solo usuarios autorizados pueden acceder al panel de administración.
                      </p>
                    </div>
                  </div>
                </div>

                {/* GitHub Button */}
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  disabled={isGitHubLoading}
                  className={cn(
                    "w-full flex items-center justify-center gap-3 py-3.5 rounded-lg font-medium transition-all",
                    isGitHubLoading
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-[#24292e] hover:bg-[#2f363d] text-white"
                  )}
                >
                  {isGitHubLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5" />
                      Continuar con GitHub
                    </>
                  )}
                </button>

                {/* Note about GitHub config */}
                <p className="text-xs text-white/30 text-center">
                  Requiere configuración de GitHub OAuth en las variables de entorno
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 pt-2">
            <div className="border-t border-white/5 pt-6 text-center">
              <a 
                href="/"
                className="text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                ← Volver al sitio
              </a>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-xs text-white/20 mt-6">
          Acceso restringido a personal autorizado
        </p>
      </div>
    </div>
  )
}

