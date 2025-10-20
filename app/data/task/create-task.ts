import "server-only";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { taskSchemaType } from "@/lib/zodSchemas";
import { getSession } from "@/lib/auth";

export async function createTask(data: taskSchemaType) {
  const session = await getSession();

  if (!session) {
    return null;
  }
  try {
    const results = await db.insert(tasks).values(data).returning();
    return results[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
