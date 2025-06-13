import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../../database/connect.ts";

const connect = await db();

export const valProy = async (
  nomproy: string,
  tipproy: string,
  preproy: number,
  depproy: string,
  dirproy: string,
  imgproy: string,
): Promise<string> => {
  //nombre de proyectos
  if (nomproy.length === 0) return "No inserto el nombre del royecto";
  if (nomproy.length < 3) {
    return "Nombre de proyecto muy corto (minimo 5 caracteres)";
  }
  if (nomproy.length > 50) {
    return "Nombre de proyeto muy largo (maximo 50 caracteres)";
  }

  //tipo de proyectos
  if (tipproy.length === 0) return "No asigno el tipo del proyecto";

  //precio de proyecto
  if (!isValidNumber(preproy)) return "Precio del proyecto no valido";
  if (preproy < 0) return "Precio del proyecto no puede ser negativo";
  if (preproy === 0) return "Precio del proyecto no puede ser cero";
  if (preproy > 99999999) {
    return "Precio del proyecto muy alto (maximo 99999999)";
  }

  //departamento de precio
  if (depproy.length === 0) return "No asigno el departamento del proyecto";

  //direccion de proyecto
  if (dirproy.length === 0) return "No inserto la direccion del proyecto";
  if (dirproy.length < 3) {
    return "Direccion del proyecto muy corta (minimo 5 caracteres)";
  }
  if (dirproy.length > 250) {
    return "Direccion del proyecto muy larga (maximo 250 caracteres)";
  }

  //imagen de proyecto
  if (imgproy.length === 0) return "No inserto la imagen del proyecto";

  //validar segin Base de datos

  const name = await connect.query(
    "SELECT nomproy FROM proyectos WHERE nomproy = ?",
    [nomproy],
  );
  if (name.length > 0) return "Nombre de proyecto ya existe";

  return "OK";
};
