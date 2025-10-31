"use server";

import db from "@/db";
import { user, user_preferences } from "@/db/schema";
import { ProceedType } from "@/components/origami/setup/types";

export async function setup(
  state: { ok: boolean; proceed: ProceedType },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user_id = await db
      .insert(user)
      .values({ name, email, password })
      .returning({ id: user.id });

    await db.insert(user_preferences).values({
      user_id: user_id[0].id,
    });
  } catch (error) {
    return {
      ok: false,
      error: "Cannot access database, check if the database exists?",
    };
  }

  return { ok: true, proceed: ProceedType.WELCOME };
}
