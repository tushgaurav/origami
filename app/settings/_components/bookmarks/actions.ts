"use server"

import { z } from "zod"
import db from "@/db"
import { bookmark_categories, bookmarks } from "@/db/schema"
import { sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { BookmarkItem } from "./types"

const insertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Enter a valid URL"),
  category_id: z
    .union([z.string(), z.number()])
    .optional()
    .transform(v => {
      if (v === undefined || v === null || v === "") return null
      const n = typeof v === "string" ? Number.parseInt(v, 10) : v
      return Number.isFinite(n) ? n : null
    }),
})

export async function createBookmark(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    title: String(formData.get("title") ?? ""),
    url: String(formData.get("url") ?? ""),
    category_id: formData.get("category_id") as string | null,
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

  const { title, url, category_id } = parsed.data

  await db.insert(bookmarks).values({ title, url, category_id })
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
    ? sql`WHERE title LIKE ${`%${query}%`} OR url LIKE ${`%${query}%`}`
    : sql``

  const orderBy = sort === "recently-added"
    ? sql`ORDER BY created_at DESC`
    : sql`ORDER BY updated_at DESC`

  const rows = await db.all<BookmarkItem>(sql`SELECT id, category_id, title, url, created_at AS createdAt, updated_at AS updatedAt FROM bookmarks ${where} ${orderBy}`)

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

const categoryInsertSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().transform(v => v ?? null),
})

export async function createBookmarkCategory(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
  }

  const parsed = categoryInsertSchema.safeParse(raw)
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

  const { name, description } = parsed.data
  await db.insert(bookmark_categories).values({ name, description })
  await db.run(sql`UPDATE bookmark_categories SET updated_at = CURRENT_TIMESTAMP WHERE id = last_insert_rowid()`)
  revalidatePath("/settings")
  return { ok: true }
}


