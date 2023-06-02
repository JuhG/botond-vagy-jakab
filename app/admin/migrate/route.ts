import migrate from "@/db/migrate";
import { redirect } from "next/navigation";

export async function GET() {
  await migrate();
  redirect("/admin");
}
