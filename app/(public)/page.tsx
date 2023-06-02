import { db, tasks } from "@/db";
import { notInArray, sql } from "drizzle-orm";
import { kv } from "@vercel/kv";
import crypto from "node:crypto";
import Image from "next/image";
import { cookies } from "next/headers";

const Home = async () => {
  const { value } = cookies().get("bvj") as { value: string };
  const list: number[] = await kv.lrange(value, 0, -1);

  const items = await db
    .select({
      id: tasks.id,
      image: tasks.image,
    })
    .from(tasks)
    .where(notInArray(tasks.id, list))
    .orderBy(sql`random()`)
    .limit(1);
  const item = items[0];

  if (!item) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-800 p-8">
        <h2 className="text-xl">Elfogyott!</h2>
        <p>Jelenleg ennyi kép volt elérhető, gyere vissza később.</p>
      </div>
    );
  }

  const id = crypto.randomBytes(10).toString("hex");
  kv.set(id, item.id, { ex: 3600 });

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <div className="relative min-h-0 w-full flex-1">
        <Image className="object-contain" fill src={item.image} alt="" />
      </div>
      <form className="grid w-full grid-cols-2 gap-8" action="/result">
        <input type="hidden" name="id" value={id} />
        <input className="cursor-pointer rounded bg-purple-500 p-1" type="submit" name="child" value="Botond" />
        <input className="cursor-pointer rounded bg-teal-500 p-1" type="submit" name="child" value="Jakab" />
      </form>
    </div>
  );
};

export default Home;
