"use server"

import { z } from "zod"
import db from "@/db"
import { hlItems } from "@/db/schema"
import { sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

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
    return { ok: false, error: "Validation failed", issues: parsed.error.issues.map(i => ({ message: i.message, path: i.path })) }
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



