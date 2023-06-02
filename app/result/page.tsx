/* eslint-disable @next/next/no-img-element */
import { db, tasks } from "@/db";
import { kv } from "@vercel/kv";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { z } from "zod";

const resultSchema = z.object({
  id: z.string().length(20),
  child: z.enum(["Botond", "Jakab"]),
});

const Result = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { id, child } = resultSchema.parse(searchParams);
  const taskId: number | null = await kv.getdel(id);

  if (!taskId) {
    throw new Error("Invalid");
  }

  const items = await db.select().from(tasks).where(eq(tasks.id, taskId));
  const item = items[0];
  const success = item.child === child.toLowerCase();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <img className="flex-1 object-contain" src={item.image} alt="" />
      <div className="w-full space-y-4 pb-16 text-center">
        {success && <p className="rounded bg-green-200 p-1 text-green-700">Talált</p>}
        {!success && <p className="rounded bg-red-200 p-1 text-red-700">Nope</p>}
        <Link className="block rounded bg-yellow-500 p-1" href="/">
          Újra
        </Link>
      </div>
    </div>
  );
};

export default Result;
