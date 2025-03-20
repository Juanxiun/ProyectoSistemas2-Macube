import { Client } from "pg";

const client = new Client({
  user: "root",
  password: "1234",
  database: "macube",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

export { client };
