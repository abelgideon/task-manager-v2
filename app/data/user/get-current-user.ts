import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session) {
      return null;
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId as string));

    return result[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
