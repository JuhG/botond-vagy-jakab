import { db, tasks } from "@/db";
import { kv } from "@vercel/kv";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
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

  const { value } = cookies().get("bvj") as { value: string };
  await kv.lpush(value, item.id);
  if (!success) {
    await kv.incr(`${value}-fail`);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <p
        className={
          "rounded px-2 py-1 text-gray-800 " +
          (item.child === "Botond" ? "bg-purple-300 text-purple-800" : "bg-teal-300 text-teal-800")
        }
      >
        {item.child}
      </p>
      <div className="flex w-full items-center gap-2">
        <p className="shrink-0 text-gray-800">Tippek: </p>
        <div
          className="min-w-[90px] truncate rounded bg-purple-100 p-1 text-purple-800"
          style={{ width: (100 * item.botond) / (item.jakab + item.botond) + "%" }}
        >
          Botond: {item.botond}
        </div>
        <div
          className="min-w-[85px] truncate rounded bg-teal-100 p-1 text-teal-800"
          style={{ width: (100 * item.jakab) / (item.jakab + item.botond) + "%" }}
        >
          Jakab: {item.jakab}
        </div>
      </div>
      <div className="relative min-h-0 w-full flex-1">
        <Image className="object-contain" fill src={item.image} alt="" />
      </div>
      <div className="w-full space-y-4 pb-16 text-center">
        <div className="flex items-center gap-2">
          <p className="shrink-0 text-gray-800">Te tipped:</p>
          {success && <p className="flex-1 rounded bg-green-200 p-1 text-green-800">Talált!</p>}
          {!success && <p className="flex-1 rounded bg-red-200 p-1 text-red-800">Nope, ez mellé</p>}
        </div>
        <Link className="block rounded bg-yellow-300 p-1 text-yellow-800" href="/">
          Kérek új képet!
        </Link>
      </div>
    </div>
  );
};

export default Result;
