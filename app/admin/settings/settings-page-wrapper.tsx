"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { SettingsContent } from "./settings-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

export function SettingsPageWrapper() {
  const { t } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.settings.title}
        description={t.settings.description}
      />
      <div className="p-6">
        <AdminBreadcrumb items={[{ label: t.nav.settings }]} />
        <SettingsContent />
      </div>
    </>
  )
}

