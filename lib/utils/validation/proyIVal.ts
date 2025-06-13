import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../../database/connect.ts";

const connect = await db();

export const valProyIn = async (
  id: number,
  tipins: string,
  desins: string,
  fecins: string,
  estins: number,
): Promise<string> => {
  //tipo inspeccion
  if (tipins.length === 0) return "No asigno la inspeccion";

  //descripcion de inspeccion
  if (desins.length === 0) return "No inserto la descripcion de la inspeccion";
  if (desins.length < 3) {
    return "Descripcion de inspeccion muy corta (minimo 5 caracteres)";
  }
  if (desins.length > 250) {
    return "Descripcion de inspeccion muy larga (maximo 250 caracteres)";
  }

  //fecha de inspeccion
  if (fecins.length === 0) return "No inserto la fecha de la inspeccion";

  //estado de inspeccion
  if (!isValidNumber(estins)) return "Estado de inspeccion no valido";
  if (estins < 0 || estins === null) return "Estado de inspeccion no asignado";

  //validar segun Base de datos
  const fecha = await connect.query(
    "SELECT fecins FROM proy_inspecciones WHERE fecins =? AND proy =?",
    [fecins, id],
  );
  if (fecha.length > 0) return "Fecha de inspeccion ya existe";

  return "OK";
};
