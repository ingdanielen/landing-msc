"use client"

import Link from "next/link"
import { useLang } from "@/components/lang-provider"
import type { ComponentProps } from "react"

type LocalizedLinkProps = ComponentProps<typeof Link>

/**
 * A wrapper around Next.js Link that automatically translates routes
 * based on the current language.
 * 
 * Usage: <LocalizedLink href="/about">About</LocalizedLink>
 * 
 * If current language is Spanish, this will render as href="/nosotros"
 */
export function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const { translatePath } = useLang()
  
  // Only translate internal routes (strings starting with /)
  const translatedHref = typeof href === "string" && href.startsWith("/")
    ? translatePath(href)
    : href
  
  return (
    <Link href={translatedHref} {...props}>
      {children}
    </Link>
  )
}
