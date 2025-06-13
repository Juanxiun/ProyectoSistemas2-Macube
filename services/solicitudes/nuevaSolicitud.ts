import { db } from "../../database/connect.ts";

export interface NuevaSolicitudParams {
  tipo: string;
  solicitud: string;
  cli: number;
  arq: string;
}

export async function nuevaSolicitud(params: NuevaSolicitudParams) {
  const { tipo, solicitud, cli, arq } = params;
  const sql = "CALL createSoli(?, ?, ?, ?)";
  const args = [tipo, solicitud, cli, arq];
  const conn = await db();
  try {
    await conn.execute(sql, args);
    return { ok: true, message: "Solicitud creada correctamente" };
  } catch (error) {
    return { ok: false, message: "Error al crear solicitud", error };
  } 
}
