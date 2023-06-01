/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { redirect } from "next/navigation";

const Result = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const image = typeof searchParams.image === "string" ? searchParams.image : "";
  const success = typeof searchParams.success === "string" ? searchParams.success === "true" : false;

  if (!image || !image.startsWith("https://uploadthing.com/f/")) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 bg-gray-200 p-8">
      <img className="flex-1 object-contain" src={image} alt="" />
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
