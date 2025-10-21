"use server"

import { z } from "zod"
import db from "@/db"
import { hlItems, user_preferences } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { ApplicationItem } from "./types"
import { toast } from "sonner"

const insertSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Enter a valid URL"),
  description: z.string().optional().default(""),
  icon: z
    .string()
    .min(1, "Icon is required")
    .regex(/^si:/, "Icon must be a Simple Icons slug prefixed with si:"),
})

export async function createApplication(prevState: ActionState, formData: FormData): Promise<ActionState> {
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

  await db.insert(hlItems).values({ title, url, description, icon })
  await db.run(sql`UPDATE hl_items SET updated_at = CURRENT_TIMESTAMP WHERE id = last_insert_rowid()`) // keep updatedAt fresh

  revalidatePath("/settings")
  return { ok: true }
}

interface ActionState {
  ok: boolean
  error?: string
  issues?: Array<{ message: string; path?: (string | number)[] }>
}

// Query + sorting
const listSchema = z.object({
  query: z.string().optional().default(""),
  sort: z.enum(["recently-added", "recently-edited"]).optional().default("recently-edited"),
})

export async function listApplications(input?: unknown): Promise<{ ok: true; data: ApplicationItem[] } | { ok: false; error: string }> {
  const parsed = listSchema.safeParse(input ?? {})
  if (!parsed.success) return { ok: false, error: "Invalid list params" }

  const { query, sort } = parsed.data

  const where = query?.trim()
    ? sql`WHERE title LIKE ${`%${query}%`} OR url LIKE ${`%${query}%`} OR description LIKE ${`%${query}%`}`
    : sql``

  const orderBy = sort === "recently-added"
    ? sql`ORDER BY created_at DESC`
    : sql`ORDER BY updated_at DESC`

  const rows = await db.all<ApplicationItem>(sql`SELECT id, title, url, description, icon, created_at AS createdAt, updated_at AS updatedAt FROM hl_items ${where} ${orderBy}`)

  return { ok: true, data: rows }
}

// Delete selected IDs
const deleteSchema = z.object({ ids: z.array(z.number().int().positive()).min(1) })

export async function deleteApplications(formData: FormData): Promise<ActionState> {
  const idsRaw = String(formData.get("ids") ?? "")
  const ids = idsRaw
    .split(",")
    .map(v => Number.parseInt(v.trim(), 10))
    .filter(n => Number.isFinite(n))

  const parsed = deleteSchema.safeParse({ ids })
  if (!parsed.success) return { ok: false, error: "Select at least one item" }

  const idsParam = parsed.data.ids
  const list = idsParam.join(",")
  await db.run(sql`DELETE FROM hl_items WHERE id IN (${sql.raw(list)})`)

  revalidatePath("/settings")

  return { ok: true }
}

export async function deleteAllApplications(): Promise<ActionState> {
  await db.run(sql`DELETE FROM hl_items`)
  revalidatePath("/settings")
  return { ok: true }
}


export async function changeButtonSize(buttonSize: "full" | "small", panel: "application" | "bookmark"   ) {
  try {
      await db.update(user_preferences).set({
          [panel === "application" ? "application_button_size" : "bookmark_button_size"]: buttonSize,
      }).where(eq(user_preferences.id, 1));

  } catch (error) {
      console.error(error);
  }

  revalidatePath("/settings");
}