import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllTasks(userId: string) {
  try {
    const result = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));

    return result || [];
  } catch (e) {
    console.error(e);
    return null;
  }
}
