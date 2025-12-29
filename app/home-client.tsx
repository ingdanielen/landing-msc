"use client"

import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { AboutPreview } from "@/components/sections/about-preview"
import { StatsBanner } from "@/components/sections/stats-banner"
import { LocationSection } from "@/components/sections/location-section"
import { CtaSection } from "@/components/sections/cta-section"
import { BlogPreview } from "@/components/sections/blog-preview"
import { VideoShowcase } from "@/components/sections/video-showcase"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { useLang } from "@/components/lang-provider"
import type { BlogPostPreview } from "@/lib/blog-types"

interface HomeClientProps {
  recentPosts: BlogPostPreview[]
}

export function HomeClient({ recentPosts }: HomeClientProps) {
  const { lang } = useLang()

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Home", labelZh: "首页" },
    { id: "services", label: "Servicios", labelEn: "Services", labelZh: "服务" },
    { id: "about", label: "Nosotros", labelEn: "About", labelZh: "关于" },
    { id: "stats", label: "Estadísticas", labelEn: "Statistics", labelZh: "统计" },
    { id: "location", label: "Ubicación", labelEn: "Location", labelZh: "位置" },
    { id: "cta", label: "Contacto", labelEn: "Contact", labelZh: "联系" },
    { id: "blog", label: "Blog", labelEn: "Blog", labelZh: "博客" },
    { id: "video", label: "Video", labelEn: "Video", labelZh: "视频" },
  ]

  return (
    <div className="flex flex-col gap-10 relative">
      <SectionExplorer sections={sections} lang={lang} />
      <Hero lang={lang} />
      <ServicesPreview lang={lang} />
      <AboutPreview lang={lang} />
      <StatsBanner lang={lang} />
      <LocationSection lang={lang} />
      <CtaSection lang={lang} />
      <BlogPreview lang={lang} posts={recentPosts} />
      <VideoShowcase lang={lang} />
    </div>
  )
}

