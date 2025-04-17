import { db } from "../../database/connect.ts";

const query = await db();


const delCli = async (ci: number) => {

    try{
        await query.query(
            `UPDATE clientes SET habilitado = 0  WHERE habilitado = 1 AND ci = ?`,
            [ci]
        );


    }catch(err){
        console.error("Error CLIENTES view:\n", err);
        throw new Error("Failed to login client.");
    }
}

const delArq = async (codearq: string) => {

    try{
        await query.query(
            `UPDATE arquitectos SET habilitado = 0 WHERE habilitado = 1 AND codigo = ?`,
            [codearq]
        );


    }catch(err){
        console.error("Error during CLIENT view:\n", err);
        throw new Error("Failed to login client.");
    }
}

export {delCli, delArq};