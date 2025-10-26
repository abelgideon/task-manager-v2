"use server";

import { ActionResponse, taskSchema } from "@/lib/zodSchemas";
import z from "zod";
import { createTask } from "../data/task/create-task";
import { getSession } from "@/lib/auth";
import { deleteTask } from "../data/task/delete-task";

export async function createTaskAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      priority: formData.get("priority") as string,
    };

    const validationResult = taskSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation Error",
        errors: z.flattenError(validationResult.error).fieldErrors,
      };
    }

    await createTask(validationResult.data);

    return {
      success: true,
      message: "Logged in Successfully",
    };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Error Creating Task" };
  }
}

export async function deleteTaskAction(taskId: string) {
  try {
    await deleteTask(taskId);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
}
