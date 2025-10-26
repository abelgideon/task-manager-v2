import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function getAllTasks() {
  const session = await getSession();

  if (!session) {
    return null;
  }
  try {
    const result = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, session.userId));

    return result || [];
  } catch (e) {
    console.error(e);
    return null;
  }
}
