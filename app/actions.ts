"use server";

import { db } from "@/db";
import { Child, tasks } from "@/db/schema/tasks";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";

export const submitTask = async (data: FormData) => {
  const id = data.get("id") as string;
  const child = data.get("child") as Child;

  const taskId: number | null = await kv.getdel(id);

  if (!taskId) {
    throw new Error("Invalid");
  }

  const task = await db.select().from(tasks).where(eq(tasks.id, taskId));

  const success = task[0].child === child.toLowerCase();

  const query = new URLSearchParams({
    success: String(success),
    image: task[0].image,
  });

  redirect("/result?" + query.toString());
};
