import { AdminLayoutClient } from "./layout-client"

export const metadata = {
  title: "MSC Content Studio",
  description: "Panel de administración de contenido",
  robots: "noindex, nofollow"
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
