"use client"

import { useMemo, useState } from "react"
import * as SI from "simple-icons"

import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { SimpleIcon, getSimpleIcon } from "@/lib/simple-icons-loader"
import useDebounce from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"

function IconSearch({ value, onChange }: IconSearchProps) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 200)

  const options = useMemo(() => {
    const list: Array<{ key: string; slug: string; title: string }> = []
    for (const [exportKey, data] of Object.entries(SI)) {
      if (!exportKey.startsWith("si")) continue
      const icon = data as unknown as { slug?: string; title?: string }
      if (!icon?.slug || !icon?.title) continue
      list.push({ key: exportKey, slug: icon.slug, title: icon.title })
    }

    if (!debouncedQuery.trim()) return list.slice(0, 12)

    const q = debouncedQuery.toLowerCase()
    return list
      .filter(i => i.slug.includes(q) || i.title.toLowerCase().includes(q))
      .slice(0, 12)
  }, [debouncedQuery])

  const selectedSlug = useMemo(() => {
    if (!value) return ""
    if (value.startsWith("si:")) return value.slice(3)
    return value
  }, [value])

  const selectedValid = !!getSimpleIcon({ si: selectedSlug })

  function handleSelect(slug: string) {
    onChange?.(`si:${slug}`)
  }

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="app-icon">Icon</FieldLabel>
          <Input
            id="app-icon"
            placeholder="Search icons (e.g. proxmox, home assistant, pi-hole)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          <FieldDescription>
            Selected: {selectedValid ? selectedSlug : "none"}
          </FieldDescription>
        </Field>

        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <Button
              key={opt.slug}
              onClick={() => handleSelect(opt.slug)}
              aria-label={opt.title}
              variant={selectedSlug === opt.slug ? "secondary" : "outline"}
              size="icon-lg"
            >
              <SimpleIcon si={opt.slug} className="size-5" title={opt.title} />
            </Button>
          ))}
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

export { IconSearch }

interface IconSearchProps {
  value?: string
  onChange?: (value: string) => void
}



