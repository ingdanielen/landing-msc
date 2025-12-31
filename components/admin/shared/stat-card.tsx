"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  icon: React.ReactNode
  variant?: "default" | "accent" | "success" | "warning"
}

const variants = {
  default: {
    bg: "bg-white",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  accent: {
    bg: "bg-white",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  success: {
    bg: "bg-white",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  warning: {
    bg: "bg-white",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  variant = "default" 
}: StatCardProps) {
  const styles = variants[variant]
  const isPositive = change && change.value >= 0

  return (
    <div className={cn(
      "p-5 rounded-lg border border-slate-200/60 transition-all hover:border-slate-300/60 hover:shadow-sm",
      styles.bg
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 tracking-tight">
            {value}
          </p>
          {change && (
            <div className="flex items-center gap-1.5">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-emerald-600" : "text-red-600"
              )}>
                {isPositive ? "+" : ""}{change.value}%
              </span>
              <span className="text-sm text-slate-400">{change.label}</span>
            </div>
          )}
        </div>
        <div className={cn(
          "flex items-center justify-center w-11 h-11 rounded-lg",
          styles.iconBg
        )}>
          <span className={styles.iconColor}>{icon}</span>
        </div>
      </div>
    </div>
  )
}

