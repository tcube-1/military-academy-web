import { neon } from "@neondatabase/serverless";
import { EnvConfig } from "../config/env";

const sql = neon(EnvConfig.DATABASE_URL);
async function run() {
  const res = await sql`SELECT id, student_code FROM students WHERE id = '6a46f816-57db-4122-a853-2209863147c3'`;
  console.log(res);
}
run();
