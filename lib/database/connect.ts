import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

const db = async () => {
    try{
        const client = new Client();
        await client.connect({
            hostname: Deno.env.get("DB_HOST"),
            username: Deno.env.get("DB_USER"),
            db: Deno.env.get("DB_NAME"),
            password: Deno.env.get("DB_PASS"),
        });
        return client;
    }catch(e){
        console.log("Error encontrado :v \n", e)
        throw new Error("Error en database -> Connect -> Database mySQL");
    }
} 

export { db };