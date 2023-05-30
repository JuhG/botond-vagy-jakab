import { tasks } from "@/db/schema/tasks";
import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

export { tasks };
export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, "insert">;

export const db = drizzle(sql);
