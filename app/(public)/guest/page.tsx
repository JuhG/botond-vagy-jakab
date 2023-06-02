import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { kv } from "@vercel/kv";

const Home = async () => {
  const onSubmit = async (data: FormData) => {
    "use server";
    const password = data.get("password");

    if (password === process.env.DD_PASSWORD) {
      const id = crypto.randomBytes(10).toString("hex");
      await kv.rpush(id, 0);
      await kv.rpush("users", id);

      cookies().set("bvj", id, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      });

      redirect("/");
    }

    redirect("/guest");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <form className="flex flex-col gap-4" action={onSubmit}>
        <input className="rounded p-1 text-black" autoFocus type="password" name="password" />
        <button className="rounded bg-blue-500 p-1">GO</button>
      </form>
    </div>
  );
};

export default Home;
