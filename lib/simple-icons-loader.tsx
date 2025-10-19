import * as SI from "simple-icons"
import { cn } from "@/lib/utils"

export function SimpleIcon({ si, className, title }: SimpleIconProps) {
  const icon = getSimpleIcon({ si })
  if (!icon) return null

  const ariaLabel = title ?? icon.title

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block size-5", className)}
    >
      <title>{ariaLabel}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}

export function getSimpleIcon({ si }: { si: string }): SimpleIconData | undefined {
  if (!si || typeof si !== "string") return undefined

  const trimmed = si.trim()
  if (!trimmed) return undefined

  const exportKey = buildExportKeyFromSlug({ slug: trimmed })
  const icon = (SI as Record<string, unknown>)[exportKey] as SimpleIconData | undefined
  if (!icon) return undefined
  return icon
}

function buildExportKeyFromSlug({ slug }: { slug: string }): string {
  // Accept either a raw slug (e.g., "github") or a full key (e.g., "siGithub")
  const isAlreadyKey = slug.startsWith("si") && slug.length > 2 && slug[2] === slug[2].toUpperCase()
  if (isAlreadyKey) return slug

  const normalized = slug
    .toLowerCase()
    .replace(/[^a-z0-9+]/g, " ")
    .split(" ")
    .filter(Boolean)
    .join("")
  if (!normalized) return ""

  const capitalized = normalized[0].toUpperCase() + normalized.slice(1)
  return `si${capitalized}`
}

interface SimpleIconData {
  title: string
  slug: string
  hex: string
  source: string
  svg: string
  path: string
  guidelines?: string
  license?: {
    type?: string
    url?: string
  }
}

interface SimpleIconProps {
  si: string
  className?: string
  title?: string
}


