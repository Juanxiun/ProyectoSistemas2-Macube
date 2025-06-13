import { db } from "../../../database/connect.ts";

const connect = await db();

export const valProyFa = async (
  tipfas: string,
  nomfas: string,
  id: number,
): Promise<string> => {
  //tipo de fase
  if (tipfas.length === 0) return "No asigno la fase";

  //nombre de fase
  if (nomfas.length === 0) return "No inserto el nombre de la fase";
  if (nomfas.length < 3) {
    return "Nombre de fase muy corto (minimo 5 caracteres)";
  }
  if (nomfas.length > 50) {
    return "Nombre de fase muy largo (maximo 50 caracteres)";
  }

  //validar segun Base de datos
  const name = await connect.query(
    "SELECT nomfas FROM proy_fases WHERE nomfas =? AND proy =?",
    [nomfas, id],
  );
  if (name.length > 0) return "Nombre de fase ya existe";

  return "OK";
};
