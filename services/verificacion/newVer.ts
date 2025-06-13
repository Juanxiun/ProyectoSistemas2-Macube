import { db } from "../../database/connect.ts";

const connect = await db();

export const registrarCodigo = async (
  usuario: string,
  correo: string,
  codigo: string,
  telefono?: number,
) => {
  try {
    // Inserta el nuevo código con estado pendiente (verificado = 1)
    await connect.query(
      `INSERT INTO verificacion (usuario, telefono, correo, codigo, verificado)
       VALUES (?, ?, ?, ?, 1)`,
      [usuario, telefono, correo, codigo],
    );

    return "OK";
  } catch (e) {
    console.log(e);
    return `ERROR, ${e}`;
  }
};