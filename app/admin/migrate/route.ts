import { resetVotes } from "@/app/admin/actions";
import migrate from "@/db/migrate";
import { redirect } from "next/navigation";

export async function GET() {
  await migrate();
  await resetVotes();
  redirect("/admin");
}
