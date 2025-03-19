import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const db = new Client({
  user: Deno.env.get('DB_USER'),
  database: Deno.env.get('DB_NAME'),
  hostname: Deno.env.get('DB_HOSTNAME'),
  port: 5432,
  password: Deno.env.get('DB_PASSWORD'),
});

try{
  await db.connect()
  console.log('conexion establecida: Hola: ', Deno.env.get('DB_USER'));

}catch(error){
  console.log('error:\n', error);
}


export { db };