import "server-only";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getUserByEmail(email: string) {
  try {
    const results = await db.select().from(users).where(eq(users.email, email));
    return results[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
