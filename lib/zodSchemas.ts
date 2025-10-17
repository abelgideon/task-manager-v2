import { z } from "zod";

const statusEnum = ["pending", "in_progress", "completed"];
const priorityEnum = ["low", "medium", "high"];

const userSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(statusEnum, { message: "Status is required" }),
  priority: z.enum(priorityEnum, { message: "Priority is required" }),
});

export type userSchemaType = z.infer<typeof userSchema>;
export type taskSchemaType = z.infer<typeof taskSchema>;
export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};
