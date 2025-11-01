"use server"

import db from "@/db"
import { user_preferences } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function changeShowWidgets(showWidgets: 0 | 1) {
  try {
    await db.update(user_preferences).set({
      show_widgets: showWidgets,
    }).where(eq(user_preferences.id, 1));
  } catch (error) {
    console.error(error)
  }

  revalidatePath("/settings")
}

