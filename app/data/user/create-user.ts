import "server-only";
import { db } from "@/db";
import { users } from "@/db/schema";
import { userSchemaType } from "@/lib/zodSchemas";

export async function createUser(data: userSchemaType) {
  try {
    const results = await db.insert(users).values(data).returning();
    return results[0] || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
