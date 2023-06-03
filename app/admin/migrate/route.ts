import { resetVotes } from "@/app/admin/actions";
import migrate from "@/db/migrate";
import { redirect } from "next/navigation";

export async function GET() {
  // TODO: why does this run on deploy
  // also - never put destructive stuff to a get handler
  // await migrate();
  // await resetVotes();
  redirect("/admin");
}
