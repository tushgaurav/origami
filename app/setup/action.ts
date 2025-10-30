"use server";

import db from "@/db";
import { user, user_preferences } from "@/db/schema";
import { redirect, RedirectType } from "next/navigation";

export async function setup(state: { error: string }, formData: FormData) {
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
    return { error: "Cannot access database, check if the database exists?" };
  }

  redirect("/", RedirectType.replace);
}
