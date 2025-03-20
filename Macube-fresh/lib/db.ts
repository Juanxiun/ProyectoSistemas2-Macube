
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const db = new Client({
  user: "root",
  password: "1234",
  database: "macube",
  hostname: "localhost",
  port: 5432,
});

await db.connect();

export default db;
