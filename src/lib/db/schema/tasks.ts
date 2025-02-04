import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  totalRequired: integer("total_required").notNull(),
  type: text("type").notNull(), // 'watchAds', 'dailyTarget', 'watchTime'
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const userTasks = pgTable("user_tasks", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  taskId: text("task_id").references(() => tasks.id).notNull(),
  progress: integer("progress").notNull().default(0),
  completed: integer("completed").notNull().default(0),
  lastResetAt: timestamp("last_reset_at").default(sql`now()`),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});
