import { db } from "../../database/connect.ts";

const query = await db();

const viewCliID = async (ci: number) => {

    try{
        const result = await query.query(
            `SELECT 
                ci, extension, nombres, apellidos, telefono, 
                telefono2, direccion, correo, referencia
            FROM 
                clientes 
            WHERE 
                habilitado = 1 AND ci = ?`,
            [ci]
        );

        if(result) return result;
        else return "";
        
    }catch(err){
        console.error("Error CLIENTES view:\n", err);
        throw new Error("Error. CLIENTES.");
    }
}

const viewArqID = async (codearq: string) => {

    try{
        const result = await query.query(
            `SELECT 
                codigo, ci, extension, nombres, apellidos, telefono, 
                telefono2, direccion, correo 
            FROM 
                arquitectos 
            WHERE 
                habilitado = 1 AND codigo = ?`,
            [codearq]
        );

        if(result) return result;
        else return "";
        
    }catch(err){
        console.error("Error ARQUITECTOS view:\n", err);
        throw new Error("Error. ARQUITECTOS.");
    }
}

export {viewArqID, viewCliID};