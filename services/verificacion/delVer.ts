import { db } from "../../database/connect.ts";

const connect = await db();

export const dropCodigo = async (id: string) => {
  try{
    await connect.query(
      `update verificacion 
          set verificado = 2 
          where usuario = ?;`,
      [id],
    );
    return "OK";
  }catch(e){
    console.log(e);
    return `ERROR, ${e}`;
  }
}

export const dropCodigoEmail = async (email: string) => {
  try{
    await connect.query(
      `update verificacion 
          set verificado = 2 
          where correo = ?;`,
      [email],
    );
    return "OK";
  }catch(e){
    console.log(e);
    return `ERROR, ${e}`;
  }
}