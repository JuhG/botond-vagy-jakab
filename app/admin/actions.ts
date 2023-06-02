"use server";

import { db, tasks } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { utapi } from "uploadthing/server";

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
