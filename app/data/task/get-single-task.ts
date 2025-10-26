import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function getSingleTask(taskId: string) {
  const session = await getSession();

  if (!session) {
    return null;
  }
  try {
    const task = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.userId, session.userId), eq(tasks.id, taskId)));

    return {
      ...task[0],
      description: task[0].description ?? undefined,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
