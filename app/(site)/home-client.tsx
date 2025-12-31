"use client"

import { Hero } from "@/components/sections/hero"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ServicesCarousel } from "@/components/sections/services-carousel"
import { FeaturesMarquee } from "@/components/sections/features-marquee"
import { AboutPreview } from "@/components/sections/about-preview"
import { GalleryPreview } from "@/components/sections/gallery-preview"
import { StatsBanner } from "@/components/sections/stats-banner"
import { LocationSection } from "@/components/sections/location-section"
import { CtaSection } from "@/components/sections/cta-section"
import { ContactFormSection } from "@/components/sections/contact/contact-form-section"
import { BlogPreview } from "@/components/sections/blog-preview"
import { VideoShowcase } from "@/components/sections/video-showcase"
import { SectionExplorer } from "@/components/ui/section-explorer"
import { useLang } from "@/components/lang-provider"
import type { BlogPostPreview } from "@/lib/blog-types"
import type { GalleryItem } from "@/lib/gallery-types"

interface HomeClientProps {
  recentPosts: BlogPostPreview[]
  galleryItems: GalleryItem[]
}

export function HomeClient({ recentPosts, galleryItems }: HomeClientProps) {
  const { lang } = useLang()

  const sections = [
    { id: "hero", label: "Inicio", labelEn: "Home", labelZh: "首页" },
    { id: "services", label: "Servicios", labelEn: "Services", labelZh: "服务" },
    { id: "solutions", label: "Soluciones", labelEn: "Solutions", labelZh: "解决方案" },
    { id: "about", label: "Nosotros", labelEn: "About", labelZh: "关于" },
    { id: "gallery", label: "Galería", labelEn: "Gallery", labelZh: "画廊" },
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
      <section id="solutions">
        <ServicesCarousel lang={lang} />
      </section>
      <FeaturesMarquee lang={lang} />

      <AboutPreview lang={lang} />
      <GalleryPreview lang={lang} items={galleryItems} />
      <StatsBanner lang={lang} />
      <LocationSection lang={lang} />
      <CtaSection lang={lang} />
      <ContactFormSection lang={lang} />
      <BlogPreview lang={lang} posts={recentPosts} />
      <VideoShowcase lang={lang} />
    </div>
  )
}
