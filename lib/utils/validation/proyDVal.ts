import { db } from "../../../database/connect.ts";

const connect = await db();

export const valProyDo = async (
  nomdoc: string,
  tipdoc: string,
  arcdoc: string,
  idproy: number,
): Promise<string> => {
  //nombre del documento
  if (nomdoc.length === 0) return "No inserto el nombre del documento";
  if (nomdoc.length < 3) {
    return "Nombre de documento muy corto (minimo 5 caracteres)";
  }
  if (nomdoc.length > 50) {
    return "Nombre de documento muy largo (maximo 50 caracteres)";
  }

  //tipo de documento
  if (tipdoc.length === 0) return "No asigno el tipo del documento";

  //archivo
  if (arcdoc.length === 0) return "No inserto el archivo del documento";

  //validar segun Base de datos
  const name = await connect.query(
    "SELECT nomdoc FROM proy_documentos WHERE nomdoc =? AND proy =?",
    [nomdoc, idproy],
  );
  if (name.length > 0) return "Nombre de documento ya existe";

  return "OK";
};
