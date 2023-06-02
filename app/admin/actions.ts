"use server";

import { db, tasks } from "@/db";
import { Child } from "@/db/schema/tasks";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { utapi } from "uploadthing/server";

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

export const deleteTask = async (data: FormData) => {
  const image = data.get("image") as string;

  if (!image) {
    return;
  }

  await db.delete(tasks).where(eq(tasks.image, image));

  await utapi.deleteFiles(image.replace("https://uploadthing.com/f/", ""));

  revalidatePath("/admin");
};

export const resetVotes = async () => {
  await db.update(tasks).set({
    botond: 0,
    jakab: 0,
  });
};
