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

  const USER_ID = 1;

  try {
    await db
      .insert(user)
      .values({ id: USER_ID, name, email, password })
      .returning({ id: user.id });

    await db.insert(user_preferences).values({
      id: USER_ID,
      user_id: USER_ID,
    });
    
  } catch (error) {
    return {
      ok: false,
      proceed: ProceedType.NULL,
    };
  }

  return { ok: true, proceed: ProceedType.WELCOME };
}
