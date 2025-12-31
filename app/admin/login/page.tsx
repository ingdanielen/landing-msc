import { Suspense } from "react"
import { LoginForm } from "./login-form"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "Iniciar Sesión | MSC Content Studio",
  description: "Accede al panel de administración de MSC",
}

function LoginLoading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#00111f] via-[#0a2a43] to-[#00111f] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-accent animate-spin" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  )
}
