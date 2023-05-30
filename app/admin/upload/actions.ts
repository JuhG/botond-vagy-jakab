"use server";

import { db, tasks } from "@/db";
import { Child } from "@/db/schema/tasks";
import { redirect } from "next/navigation";

export const saveTask = async (data: FormData) => {
  const child = data.get("child") as Child;
  const image = data.get("image") as string;

  if (!image) {
    throw new Error("Invalid image");
  }

  await db.insert(tasks).values({
    child,
    image,
  });

  redirect("/admin");
};
