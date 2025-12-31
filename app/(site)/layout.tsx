import { LangProvider } from "@/components/lang-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/schema-org"
import { OceanBackground } from "@/components/ui/ocean-background"
import { ScrollProgress } from "@/components/ui/scroll-progress"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mscsurveyors.org"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OceanBackground />
      <OrganizationSchema url={siteUrl} />
      <WebSiteSchema url={siteUrl} />
      <LangProvider>
        <ScrollProgress />
        <div className="flex flex-col min-h-screen relative z-10">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </LangProvider>
    </>
  )
}
