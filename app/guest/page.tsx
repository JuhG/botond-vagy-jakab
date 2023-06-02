import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Home = async () => {
  const onSubmit = async (data: FormData) => {
    "use server";
    const password = data.get("password");

    if (password === "ficko") {
      cookies().set("bvj", "1", {
        httpOnly: true,
        secure: true,
      });
      redirect("/");
    }

    redirect("/guest");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <form className="flex flex-col gap-4" action={onSubmit}>
        <input className="rounded p-1 text-black" type="password" name="password" />
        <button className="rounded bg-blue-500 p-1">GO</button>
      </form>
    </div>
  );
};

export default Home;
