import migrate from "@/db/migrate";

export async function GET() {
  await migrate();
  return new Response("DONE");
}
