"use server"

import { z } from "zod"
import db from "@/db"
import { bookmarks } from "@/db/schema"
import { sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { BookmarkItem } from "./types"

const insertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Enter a valid URL"),
  description: z.string().optional().default(""),
  icon: z
    .string()
    .min(1, "Icon is required")
    .regex(/^si:/, "Icon must be a Simple Icons slug prefixed with si:"),
})

export async function createBookmark(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? ""),
  }

  const parsed = insertSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      issues: parsed.error.issues.map(i => ({
        message: i.message,
        path: i.path.filter(p => typeof p === "string" || typeof p === "number") as (string | number)[],
      })),
    }
  }

  const { title, url, description, icon } = parsed.data

  await db.insert(bookmarks).values({ title, url, description, icon })
  await db.run(sql`UPDATE bookmarks SET updated_at = CURRENT_TIMESTAMP WHERE id = last_insert_rowid()`)

  revalidatePath("/settings")
  return { ok: true }
}

interface ActionState {
  ok: boolean
  error?: string
  issues?: Array<{ message: string; path?: (string | number)[] }>
}

const listSchema = z.object({
  query: z.string().optional().default(""),
  sort: z.enum(["recently-added", "recently-edited"]).optional().default("recently-edited"),
})

export async function listBookmarks(input?: unknown): Promise<{ ok: true; data: BookmarkItem[] } | { ok: false; error: string }> {
  const parsed = listSchema.safeParse(input ?? {})
  if (!parsed.success) return { ok: false, error: "Invalid list params" }

  const { query, sort } = parsed.data

  const where = query?.trim()
    ? sql`WHERE title LIKE ${`%${query}%`} OR url LIKE ${`%${query}%`} OR description LIKE ${`%${query}%`}`
    : sql``

  const orderBy = sort === "recently-added"
    ? sql`ORDER BY created_at DESC`
    : sql`ORDER BY updated_at DESC`

  const rows = await db.all<BookmarkItem>(sql`SELECT id, title, url, description, icon, created_at AS createdAt, updated_at AS updatedAt FROM bookmarks ${where} ${orderBy}`)

  return { ok: true, data: rows }
}

const deleteSchema = z.object({ ids: z.array(z.number().int().positive()).min(1) })

export async function deleteBookmarks(formData: FormData): Promise<ActionState> {
  const idsRaw = String(formData.get("ids") ?? "")
  const ids = idsRaw
    .split(",")
    .map(v => Number.parseInt(v.trim(), 10))
    .filter(n => Number.isFinite(n))

  const parsed = deleteSchema.safeParse({ ids })
  if (!parsed.success) return { ok: false, error: "Select at least one item" }

  const idsParam = parsed.data.ids
  const list = idsParam.join(",")
  await db.run(sql`DELETE FROM bookmarks WHERE id IN (${sql.raw(list)})`)

  revalidatePath("/settings")

  return { ok: true }
}

export async function deleteAllBookmarks(): Promise<ActionState> {
  await db.run(sql`DELETE FROM bookmarks`)
  revalidatePath("/settings")
  return { ok: true }
}


