import { db } from "../../../database/connect.ts";

const connect = await db();

export const codigoCorrecto = async (id: string, cod: string) => {
  try {
    const codigoUsr = await connect.query(
      `SELECT codigo, verificado FROM verificacion WHERE usuario = ? AND verificado = 1;`,
      [id],
    );
    let codigo = "";
    if (codigoUsr.length > 0) {
      codigo = codigoUsr[0]?.codigo ?? "";
    }
    if (codigo === cod) {
      return "OK";
    } else {
      return "codigo incorrecto";
    }
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`;
  }
};

export const codigoCorrectoEmail = async (correo: string, cod: string) => {
  try {
    const codigoUsr = await connect.query(
      `SELECT codigo, verificado FROM verificacion WHERE correo = ? AND verificado = 1;`,
      [correo],
    );
    let codigo = "";
    if (codigoUsr.length > 0) {
      codigo = codigoUsr[0]?.codigo ?? "";
    }
    if (codigo === cod) {
      return "OK";
    } else {
      return "codigo incorrecto";
    }
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`;
  }
};