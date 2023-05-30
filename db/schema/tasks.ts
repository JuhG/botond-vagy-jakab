import { sql } from "drizzle-orm";
import { pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const child = ["botond", "jakab"] as const;
export type Child = (typeof child)[number];
export const childEnum = pgEnum("child", child);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  child: childEnum("child").notNull(),
  image: varchar("image").notNull(),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
