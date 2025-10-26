import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function deleteTask(taskId: string) {
  const session = await getSession();

  if (!session) {
    return null;
  }
  try {
    await db
      .delete(tasks)
      .where(and(eq(tasks.userId, session.userId), eq(tasks.id, taskId)));
  } catch (e) {
    console.error(e);
    return null;
  }
}
