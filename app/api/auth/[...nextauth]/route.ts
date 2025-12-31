import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "msc-development-secret-key-2024"

const handler = NextAuth({
  providers: [
    // GitHub OAuth (solo si las credenciales están configuradas)
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    // Credenciales (usuario + contraseña)
    CredentialsProvider({
      id: "credentials",
      name: "Credenciales",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME 
        const adminPassword = process.env.ADMIN_PASSWORD 
        
        if (
          credentials?.username === adminUsername && 
          credentials?.password === adminPassword
        ) {
          return {
            id: "admin",
            name: "Administrador",
            email: "jjmr1@hotmail.com",
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Para GitHub, verificar si el usuario está autorizado
      if (account?.provider === "github") {
        const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(",").filter(Boolean) || []
        const allowedUsers = process.env.ALLOWED_ADMIN_USERS?.split(",").filter(Boolean) || []
        
        // Si no hay restricciones configuradas, permitir cualquier usuario de GitHub
        if (allowedEmails.length === 0 && allowedUsers.length === 0) {
          return true
        }
        
        // Verificar email o username
        if (user.email && allowedEmails.includes(user.email)) {
          return true
        }
        if (user.name && allowedUsers.includes(user.name)) {
          return true
        }
        
        return "/admin/login?error=AccessDenied"
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
