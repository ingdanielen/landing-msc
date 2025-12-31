"use client"

import { AdminHeader } from "@/components/admin/layout/header"
import { AdminBreadcrumb } from "@/components/admin/layout/breadcrumb"
import { EmailTemplateContent } from "./email-template-content"
import { useAdminLang } from "@/components/admin/admin-lang-provider"

export function EmailPageWrapper() {
  const { t } = useAdminLang()

  return (
    <>
      <AdminHeader 
        title={t.email.title}
        description={t.email.description}
      />
      <div className="p-6">
        <AdminBreadcrumb items={[{ label: t.nav.email }]} />
        <EmailTemplateContent />
      </div>
    </>
  )
}
