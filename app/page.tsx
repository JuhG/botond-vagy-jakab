/* eslint-disable @next/next/no-img-element */
import { submitTask } from "@/app/actions";
import { db, tasks } from "@/db";
import { sql } from "drizzle-orm";
import { kv } from "@vercel/kv";
import crypto from "node:crypto";

const Home = async () => {
  const items = await db
    .select({
      id: tasks.id,
      image: tasks.image,
    })
    .from(tasks)
    .orderBy(sql`random()`)
    .limit(1);
  const item = items[0];

  const id = crypto.randomBytes(10).toString("hex");
  kv.set(id, item.id, { ex: 3600 });

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <img className="flex-1 object-contain" src={item.image} alt="" />
      <form className="grid w-full grid-cols-2 gap-8" action={submitTask}>
        <input type="hidden" name="id" value={id} />
        <input className="cursor-pointer rounded bg-blue-500 p-1" type="submit" name="child" value="Botond" />
        <input className="cursor-pointer rounded bg-blue-500 p-1" type="submit" name="child" value="Jakab" />
      </form>
    </div>
  );
};

export default Home;
