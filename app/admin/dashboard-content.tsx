"use client"

import Link from "next/link"
import { 
  FileText, 
  Image as ImageIcon, 
  Eye, 
  TrendingUp,
  Plus,
  Clock,
  ArrowRight,
  Newspaper,
  PenTool,
  ImagePlus
} from "lucide-react"
import { StatCard, QuickAction } from "@/components/admin"
import { useAdminLang } from "@/components/admin/admin-lang-provider"
import { getCategoryLabelByKey } from "@/lib/admin/i18n"

interface DashboardContentProps {
  blogCount: number
  galleryCount: number
  recentPosts: Array<{
    slug: string
    title: string
    date: string
    category: string
    published?: boolean
  }>
}

function formatDateLocalized(dateStr: string, lang: "es" | "en"): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === "es" ? "es-PA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export function DashboardContent({ 
  blogCount, 
  galleryCount, 
  recentPosts 
}: DashboardContentProps) {
  const { t, lang } = useAdminLang()
  const publishedCount = recentPosts.filter(p => p.published !== false).length
  const draftCount = recentPosts.filter(p => p.published === false).length

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2a43] to-[#00111f] rounded-xl p-6 text-white">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-2">
            {t.dashboard.welcome}
          </h2>
          <p className="text-white/70 text-sm max-w-lg">
            {t.dashboard.welcomeDesc}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/20 rounded-full" />
        
        {/* Quick Links */}
        <div className="flex gap-3 mt-6 relative z-10">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t.dashboard.createArticle}
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            {t.nav.viewSite}
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.dashboard.totalArticles}
          value={blogCount}
          icon={<FileText className="w-5 h-5" />}
          variant="accent"
          change={{ value: 12, label: t.dashboard.vsLastMonth }}
        />
        <StatCard
          title={t.dashboard.galleryImages}
          value={galleryCount}
          icon={<ImageIcon className="w-5 h-5" />}
          variant="default"
        />
        <StatCard
          title={t.dashboard.publishedArticles}
          value={publishedCount}
          icon={<Eye className="w-5 h-5" />}
          variant="success"
        />
        <StatCard
          title={t.dashboard.draftArticles}
          value={draftCount}
          icon={<Clock className="w-5 h-5" />}
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">{t.dashboard.recentArticles}</h3>
            <Link 
              href="/admin/blog"
              className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 transition-colors"
            >
              {t.dashboard.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/admin/blog/${post.slug}/edit`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {formatDateLocalized(post.date, lang)}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">
                        {getCategoryLabelByKey(post.category, lang)}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                    post.published !== false 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {post.published !== false ? t.articles.published : t.articles.draft}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">{t.dashboard.noArticles}</p>
                <Link 
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-2 mt-3 text-sm text-accent hover:text-accent/80"
                >
                  <Plus className="w-4 h-4" />
                  {t.dashboard.createFirst}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">{t.dashboard.quickActions}</h3>
          
          <div className="space-y-3">
            <QuickAction
              title={t.dashboard.createArticle}
              description={t.dashboard.newArticleDesc}
              href="/admin/blog/new"
              icon={<PenTool className="w-5 h-5" />}
              variant="primary"
            />
            <QuickAction
              title={t.dashboard.uploadImage}
              description={t.dashboard.uploadImageDesc}
              href="/admin/gallery/new"
              icon={<ImagePlus className="w-5 h-5" />}
            />
            <QuickAction
              title={t.dashboard.viewBlog}
              description={t.dashboard.viewBlogDesc}
              href="/blog"
              icon={<Eye className="w-5 h-5" />}
            />
            <QuickAction
              title={t.dashboard.viewGallery}
              description={t.dashboard.viewGalleryDesc}
              href="/gallery"
              icon={<ImageIcon className="w-5 h-5" />}
            />
          </div>

          {/* Tips Card */}
          <div className="mt-6 p-4 bg-accent/5 border border-accent/10 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{t.dashboard.tipOfDay}</p>
                <p className="text-xs text-slate-600 mt-1">
                  {t.dashboard.tipContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
