import { sql } from "@vercel/postgres";
import { promises as fs } from "node:fs";
import path from "node:path";

// TODO: save past migrations
const migrate = async () => {
  console.log("Starting migration...");

  const basePath = path.resolve("db/migrations");

  const files = await fs.readdir(basePath);
  const migrations = files.filter((file) => file.endsWith(".sql"));

  for (const migration of migrations) {
    const fullPath = basePath + "/" + migration;
    const content = await fs.readFile(fullPath, "utf-8");
    await sql.query(content);
  }

  console.log("Migration finished!");
};

export default migrate;
