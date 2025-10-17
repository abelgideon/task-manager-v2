import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "in_progress",
  "completed",
]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: statusEnum("status").default("pending").notNull(),
  priority: priorityEnum("priority").default("medium").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: text("user_id").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export type Task = InferSelectModel<typeof tasks>;
export type User = InferSelectModel<typeof users>;

export const TASK_STATUS = {
  pending: { label: "Pending", value: "pending" },
  in_progress: { label: "In Progress", value: "in_progress" },
  completed: { label: "Completed", value: "completed" },
};

export const ISSUE_PRIORITY = {
  low: { label: "Low", value: "low" },
  medium: { label: "Medium", value: "medium" },
  high: { label: "High", value: "high" },
};
