// Route translations configuration
// Base language: en (physical pages are in English)
// Supported languages: en, es, zh

export type Language = "en" | "es" | "zh"

export const DEFAULT_LANGUAGE: Language = "en"
export const SUPPORTED_LANGUAGES: Language[] = ["en", "es", "zh"]

// Route translations mapping
// Key: base route (en), Value: { es: translated, zh: translated }
export const routeTranslations: Record<string, Record<Language, string>> = {
  "/": {
    en: "/",
    es: "/",
    zh: "/",
  },
  "/about": {
    en: "/about",
    es: "/nosotros",
    zh: "/guanyu",
  },
  "/services": {
    en: "/services",
    es: "/servicios",
    zh: "/fuwu",
  },
  "/compliance": {
    en: "/compliance",
    es: "/cumplimiento",
    zh: "/heguixing",
  },
  "/quality": {
    en: "/quality",
    es: "/calidad",
    zh: "/zhiliang",
  },
  "/gallery": {
    en: "/gallery",
    es: "/galeria",
    zh: "/tuku",
  },
  "/blog": {
    en: "/blog",
    es: "/noticias",
    zh: "/xinwen",
  },
  "/contact": {
    en: "/contact",
    es: "/contacto",
    zh: "/lianxi",
  },
  "/privacy": {
    en: "/privacy",
    es: "/privacidad",
    zh: "/yinsi",
  },
  "/terms": {
    en: "/terms",
    es: "/terminos",
    zh: "/tiaokuan",
  },
  "/cookies": {
    en: "/cookies",
    es: "/cookies",
    zh: "/cookies",
  },
  "/legal": {
    en: "/legal",
    es: "/legal",
    zh: "/falv",
  },
}

// Dynamic route patterns (for routes with parameters)
export const dynamicRoutePatterns: Record<string, Record<Language, string>> = {
  "/blog/:slug": {
    en: "/blog/:slug",
    es: "/noticias/:slug",
    zh: "/xinwen/:slug",
  },
}

// Create reverse mapping: translated route → base route
function createReverseMapping(): Map<string, { baseRoute: string; lang: Language }> {
  const reverseMap = new Map<string, { baseRoute: string; lang: Language }>()
  
  for (const [baseRoute, translations] of Object.entries(routeTranslations)) {
    for (const [lang, translatedRoute] of Object.entries(translations)) {
      if (translatedRoute !== baseRoute || lang === DEFAULT_LANGUAGE) {
        reverseMap.set(translatedRoute, { baseRoute, lang: lang as Language })
      }
    }
  }
  
  return reverseMap
}

const reverseRouteMap = createReverseMapping()

// Get all translated routes for a specific language (excluding base)
export function getTranslatedRoutesForLang(lang: Language): string[] {
  if (lang === DEFAULT_LANGUAGE) return []
  
  return Object.values(routeTranslations)
    .map(translations => translations[lang])
    .filter(route => route !== undefined)
}

// Get base route from any translated URL
export function getBaseRoute(pathname: string): { baseRoute: string; lang: Language } | null {
  // Direct match
  const directMatch = reverseRouteMap.get(pathname)
  if (directMatch) return directMatch

  // Check dynamic routes
  for (const [pattern, translations] of Object.entries(dynamicRoutePatterns)) {
    for (const [lang, translatedPattern] of Object.entries(translations)) {
      const regex = patternToRegex(translatedPattern)
      const match = pathname.match(regex)
      
      if (match) {
        // Extract the dynamic part (e.g., slug)
        const basePattern = pattern
        const dynamicPart = match[1]
        const baseRoute = basePattern.replace(":slug", dynamicPart)
        
        return { baseRoute, lang: lang as Language }
      }
    }
  }

  // If not found in translations, assume it's a base route in default language
  // Check if it matches any base route pattern
  for (const baseRoute of Object.keys(routeTranslations)) {
    if (pathname === baseRoute) {
      return { baseRoute, lang: DEFAULT_LANGUAGE }
    }
  }

  // Check dynamic base routes
  for (const pattern of Object.keys(dynamicRoutePatterns)) {
    const regex = patternToRegex(pattern)
    if (regex.test(pathname)) {
      return { baseRoute: pathname, lang: DEFAULT_LANGUAGE }
    }
  }

  return null
}

// Translate a route to target language
export function translateRoute(pathname: string, targetLang: Language): string {
  // Get the base route info
  const routeInfo = getBaseRoute(pathname)
  
  if (!routeInfo) {
    // Unknown route, return as-is
    return pathname
  }

  const { baseRoute } = routeInfo

  // Check static routes
  if (routeTranslations[baseRoute]) {
    return routeTranslations[baseRoute][targetLang] || baseRoute
  }

  // Check dynamic routes
  for (const [pattern, translations] of Object.entries(dynamicRoutePatterns)) {
    const regex = patternToRegex(pattern)
    const match = baseRoute.match(regex)
    
    if (match) {
      const dynamicPart = match[1]
      const translatedPattern = translations[targetLang] || pattern
      return translatedPattern.replace(":slug", dynamicPart)
    }
  }

  return pathname
}

// Detect language from URL
export function detectLanguageFromUrl(pathname: string): Language {
  const routeInfo = getBaseRoute(pathname)
  return routeInfo?.lang || DEFAULT_LANGUAGE
}

// Helper to convert route pattern to regex
function patternToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const withParams = escaped.replace(":slug", "([^/]+)")
  return new RegExp(`^${withParams}$`)
}

// Check if a language is valid
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language)
}

// Get all rewrites for next.config
export function generateRewrites(): Array<{ source: string; destination: string }> {
  const rewrites: Array<{ source: string; destination: string }> = []

  // Static routes
  for (const [baseRoute, translations] of Object.entries(routeTranslations)) {
    for (const [lang, translatedRoute] of Object.entries(translations)) {
      // Only add rewrite if translated route is different from base
      if (translatedRoute !== baseRoute && lang !== DEFAULT_LANGUAGE) {
        rewrites.push({
          source: translatedRoute,
          destination: baseRoute,
        })
      }
    }
  }

  // Dynamic routes
  for (const [basePattern, translations] of Object.entries(dynamicRoutePatterns)) {
    for (const [lang, translatedPattern] of Object.entries(translations)) {
      if (translatedPattern !== basePattern && lang !== DEFAULT_LANGUAGE) {
        rewrites.push({
          source: translatedPattern.replace(":slug", ":slug"),
          destination: basePattern.replace(":slug", ":slug"),
        })
      }
    }
  }

  return rewrites
}
