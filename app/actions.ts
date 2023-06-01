"use server";

import { db } from "@/db";
import { Child, tasks } from "@/db/schema/tasks";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const submitTask = async (data: FormData) => {
  const id = Number(data.get("id"));
  const child = data.get("child") as Child;

  const task = await db.select().from(tasks).where(eq(tasks.id, id));

  const success = task[0].child === child.toLowerCase();

  const query = new URLSearchParams({
    success: String(success),
    image: task[0].image,
  });

  redirect("/result?" + query.toString());
};
