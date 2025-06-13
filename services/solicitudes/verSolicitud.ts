import { db } from "../../database/connect.ts";

export const verSolicitudes = async (codigo?: string) => {
  const conn = await db();

  const isCli = codigo && /^\d+$/.test(codigo);
  let queryStr = "SELECT id, tipo, solicitud, cli, arq FROM solicitudes";
  const params: (string | number)[] = [];

  if (codigo) {
    queryStr += isCli ? " WHERE cli=?" : " WHERE arq=?";
    params.push(isCli ? Number(codigo) : codigo);
  }

  try {
    const result = await conn.query(queryStr + " ORDER BY id DESC", params);
    return result ?? [];
  } catch (error) {
    console.log("ERROR verSolicitudes,\n", error);
    return [];
  }
};