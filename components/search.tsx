"use client"

import { useState } from "react"
import { SearchIcon, ChevronDown, ChevronRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function SearchBar() {
  const [query, setQuery] = useState("")
  const [engineKey, setEngineKey] = useState<keyof typeof SEARCH_ENGINES>("google")

  function changeEngine(newKey: keyof typeof SEARCH_ENGINES) {
    if (!SEARCH_ENGINES[newKey]) return
    setEngineKey(newKey)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    const url = SEARCH_ENGINES[engineKey].buildUrl(trimmed)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
      <form onSubmit={handleSubmit} className="w-full my-20">
        <div className="flex items-stretch gap-2">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
              <SearchIcon className="h-5 w-5" />
            </div>
            <Input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search`}
              className="h-12 md:h-14 pl-12 pr-4 text-base md:text-lg rounded-full"
              aria-label="Search query"
            />
          </div>
          <Button type="submit" className="text-sm text-muted-foreground h-12 md:h-14 rounded-full" size="lg" variant="ghost">
            {SEARCH_ENGINES[engineKey].name} <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </form>
  )
}

export default SearchBar
export { SearchBar }


function buildQuery(base: string, q: string) {
  return `${base}${encodeURIComponent(q)}`
}

const SEARCH_ENGINES = {
  google: {
    name: "Google",
    buildUrl: (q: string) => buildQuery("https://www.google.com/search?q=", q),
  },
  duckduckgo: {
    name: "DuckDuckGo",
    buildUrl: (q: string) => buildQuery("https://duckduckgo.com/?q=", q),
  },
  bing: {
    name: "Bing",
    buildUrl: (q: string) => buildQuery("https://www.bing.com/search?q=", q),
  },
  brave: {
    name: "Brave",
    buildUrl: (q: string) => buildQuery("https://search.brave.com/search?q=", q),
  },
  wikipedia: {
    name: "Wikipedia",
    buildUrl: (q: string) => buildQuery("https://en.wikipedia.org/w/index.php?search=", q),
  },
  youtube: {
    name: "YouTube",
    buildUrl: (q: string) => buildQuery("https://www.youtube.com/results?search_query=", q),
  },
} as const

interface SearchEnginesMap {
  [key: string]: {
    name: string
    buildUrl: (q: string) => string
  }
}