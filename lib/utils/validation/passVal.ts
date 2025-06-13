import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../../database/connect.ts";

export const valNewPass = async (id: string, contra: string) => {
  const connect = await db();

  //contra
  if (contra) {
    if (contra.length < 8) {
      return `ERROR. la contraseña es menor a 8 caracteres, no es válida`;
    }
    if (contra.length > 100) {
      return `ERROR. la contraseña es mayor a 100 caracteres, no es válida`;
    }
    if (/\s/.test(contra)) {
      return `ERROR. la contraseña no debe contener espacios`;
    }
    if (!/[A-Z]/.test(contra)) {
      return `ERROR. la contraseña debe contener al menos una letra mayúscula`;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contra)) {
      return `ERROR. la contraseña debe contener al menos un carácter especial`;
    }
    return "OK";
  }

  //validar contraseña antigua no e sigual a la nueva

  const tuser = isValidNumber(parseInt(id)) ? "clientes" : "arquitectos";
  const tid = isValidNumber(parseInt(id)) ? "ci" : "codigo";
  const dataUsr = await connect.query(
    `SELECT contra FROM ${tuser} WHERE habilitado =1 AND ${tid} = ?`,
    [id],
  );

  let contras = "";

  if (dataUsr.length > 0) {
    contras = dataUsr[0].contra;
  }

  console.log(contras, " ", contra);

  if (contras === contra) {
    return `ERROR. la contraseña nueva no puede ser igual a la antigua`;
  }

  return "OK";
};