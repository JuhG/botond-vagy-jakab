import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const child = ["Botond", "Jakab"] as const;
export type Child = (typeof child)[number];
export const childEnum = pgEnum("child", child);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  child: childEnum("child").notNull(),
  image: varchar("image").notNull(),
  botond: integer("botond").notNull().default(0),
  jakab: integer("jakab").notNull().default(0),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
