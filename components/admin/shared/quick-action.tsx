"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface QuickActionProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  variant?: "default" | "primary"
}

export function QuickAction({ 
  title, 
  description, 
  href, 
  icon,
  variant = "default" 
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-lg border transition-all",
        variant === "primary"
          ? "bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
          : "bg-white border-slate-200/60 hover:border-slate-300 hover:shadow-sm"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors",
        variant === "primary"
          ? "bg-accent/10 text-accent group-hover:bg-accent/20"
          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          variant === "primary" ? "text-accent" : "text-slate-900"
        )}>
          {title}
        </p>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>
      <ChevronRight className={cn(
        "w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5",
        variant === "primary" ? "text-accent/50" : "text-slate-300"
      )} />
    </Link>
  )
}

