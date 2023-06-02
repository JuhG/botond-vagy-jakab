import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import crypto from "node:crypto";

const AdminLogin = async () => {
  const onSubmit = async (data: FormData) => {
    "use server";
    const password = data.get("password");

    if (password === process.env.DD_ADMIN_PASSWORD) {
      const id = crypto.randomBytes(10).toString("hex");
      await kv.set(id, 1, { ex: 24 * 3600 });

      cookies().set("bvj-secure", id, {
        httpOnly: true,
        secure: true,
      });
      redirect("/admin");
    }

    redirect("/admin/guest");
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

export default AdminLogin;
