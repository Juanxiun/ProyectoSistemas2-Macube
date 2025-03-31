import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const db = new Client({
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DB_NAME"),
  hostname: Deno.env.get("DB_HOST"),
  port: Deno.env.get("DB_PORT"),
  password: Deno.env.get("DB_PASS"),
});

try{
  db.connect();
  console.log("Conexion a la base de datos exitoso, bienvenido: "+ Deno.env.get("DB_PASS"));

}catch(e){
  console.error("Error en la conexion en la base de datos: \n", e);
  throw e;
}

export {db};


