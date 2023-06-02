import { db, tasks } from "@/db";
import { kv } from "@vercel/kv";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const resultSchema = z.object({
  id: z.string().length(20),
  child: z.enum(["Botond", "Jakab"]),
});

const Result = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { id, child } = resultSchema.parse(searchParams);
  const taskId: number | null = await kv.get(id);

  if (!taskId) {
    throw new Error("Invalid");
  }

  const items = await db.select().from(tasks).where(eq(tasks.id, taskId));
  const item = items[0];
  const success = item.child === child;

  if (child.toLowerCase() === "botond") {
    item.botond = item.botond + 1;
  } else {
    item.jakab = item.jakab + 1;
  }

  await db
    .update(tasks)
    .set(child.toLowerCase() === "botond" ? { botond: item.botond } : { jakab: item.jakab })
    .where(eq(tasks.id, item.id));

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <p className="text-gray-800">Ez {item.child}</p>
      <div className="flex w-full gap-2">
        <div
          className="rounded bg-purple-400 p-1"
          style={{ width: (100 * item.botond) / (item.jakab + item.botond) + "%" }}
        >
          Botond: {item.botond}
        </div>
        <div
          className="rounded bg-teal-400 p-1"
          style={{ width: (100 * item.jakab) / (item.jakab + item.botond) + "%" }}
        >
          Jakab: {item.jakab}
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <Image className="h-full w-full object-contain" height="800" width="800" src={item.image} alt="" />
      </div>
      <div className="w-full space-y-4 pb-16 text-center">
        {success && <p className="rounded bg-green-200 p-1 text-green-700">Talált!</p>}
        {!success && <p className="rounded bg-red-200 p-1 text-red-700">Nope, ez mellé</p>}
        <Link className="block rounded bg-yellow-500 p-1" href="/">
          Újra
        </Link>
      </div>
    </div>
  );
};

export default Result;
