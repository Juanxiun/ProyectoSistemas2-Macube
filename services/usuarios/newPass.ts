import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../database/connect.ts";
import { MandarCodigo } from "../email/codigo/mandarCod.ts";

const connect = await db();

export const passCodigo = async (id: string) => {
  try {
    const user = await connect.query(
      `select id 
        from verificacion
        where usuario = ? AND verificado = 1;`,
      [id],
    );

    if (user.length > 0) {
      await connect.query(
        `update verificacion 
            set verificado = 2 
            where usuario = ?;`,
        [id],
      );
    }

    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`;
  }
};

export const enviarCodigo = async (id: string, codigo: string) => {
  try {
    const tuser = isValidNumber(parseInt(id)) ? "clientes" : "arquitectos";
    const tid = isValidNumber(parseInt(id)) ? "ci" : "codigo";
    const dataUsr = await connect.query(
      `SELECT nombre, correo FROM ${tuser} WHERE habilitado =1 AND ${tid} = ?`,
      [id],
    );

    let nombre = "", email = "";
    if (dataUsr.length > 0) {
      nombre = dataUsr[0]?.nombre ?? "";
      email = dataUsr[0]?.correo ?? "";
    } else {
      return "No se encontró el usuario";
    }

    if (email && nombre) {

      const codMan = await MandarCodigo({
        id: id,
        nombre: nombre,
        email: email,
        codigo: codigo,
      })

      if(codMan !== "OK") return codMan;
      return "OK";

    } else {
      return "No se encontró el usuario o el correo";
    }
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`;
  }
};

export const cambiarPass = async (id: string, pass: string) => {
  try {
   
    const tuser = isValidNumber(parseInt(id))? "clientes" : "arquitectos";
    const tid = isValidNumber(parseInt(id))? "ci" : "codigo";
    await connect.query(
      `UPDATE ${tuser} SET contra = ? WHERE ${tid} = ?`,
      [pass, id],
    );

    return "OK";
    
  }catch(e){
    console.log(e);
    return `ERROR, ${e}`;
  }
}

