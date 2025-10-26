import { db } from "@/db";
import { tasks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { taskSchemaType } from "@/lib/zodSchemas";
import { eq, and } from "drizzle-orm";

export async function updateTask(taskId: string, data: taskSchemaType) {
  const session = await getSession();

  if (!session) {
    return null;
  }
  try {
    const result = await db
      .update(tasks)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(tasks.userId, session.userId), eq(tasks.id, taskId)));

    return result || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
