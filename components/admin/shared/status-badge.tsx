"use client"

import { cn } from "@/lib/utils"

type Status = "published" | "draft" | "visible" | "hidden" | "featured"

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  published: {
    label: "Publicado",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  draft: {
    label: "Borrador",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  visible: {
    label: "Visible",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  hidden: {
    label: "Oculto",
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
  featured: {
    label: "Destacado",
    className: "bg-accent/10 text-accent border-accent/20",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}

