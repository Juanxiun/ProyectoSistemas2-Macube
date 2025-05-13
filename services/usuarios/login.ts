import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../database/connect.ts";
import { comparePass } from "../../lib/utils/passwordMet.ts";

//query db
const query = await db();

//login clientes
export const loginUser = async (
  userCod: number | string,
  pass: string,
) => {
  const isNumber = isValidNumber(parseInt(userCod.toString()));
  let result;
  if (isNumber) {
    result = await loginCli(parseInt(userCod.toString()), pass);
  } else {
    result = await loginArq(userCod.toString(), pass);
  }
  return result;
};

//login arquitectos real
const loginArq = async (codigo: string, pass: string) => {
  try {
    const user = await (await query).query(
      "SELECT nombre, apellido, contra FROM arquitectos WHERE codigo=?",
      [codigo],
    );
    //console.log("user", user);
    if (user.length <= 0) return "ERROR. no existe el usuario (ARQUITECTO)";
    else {
      // deno-lint-ignore no-explicit-any
      const passBD = user.map((p: any) => p.contra);
      const compare = await comparePass(pass, passBD);

      if (!(compare)) return "ERROR. contraseña incorrecta (ARQUITECTO)";
      else {
        // deno-lint-ignore no-explicit-any
        const { nombre, apellido } = user[0] as any;
        return `${nombre} ${apellido}`;
      }
    }
  } catch (error) {
    return `ERROR. en el login apiBuss ${error}`;
  }
};

//login clientes
const loginCli = async (ci: number, pass: string) => {
  try {
    const user = await (await query).query(
      "SELECT nombre, apellido, contra FROM clientes WHERE ci=?",
      [ci],
    );
    if (user.length <= 0) return "ERROR. no existe el usuario (CLIENTE)";
    else {
      // deno-lint-ignore no-explicit-any
      const passBD = user.map((p: any) => p.contra);
      const compare = await comparePass(pass, passBD);

      if (!(compare)) return "ERROR. contraseña incorrecta (CLIENTE)";
      else {
        // deno-lint-ignore no-explicit-any
        const { nombre, apellido } = user[0] as any;
        return `${nombre} ${apellido}`;
      }
    }
  } catch (error) {
    return `ERROR en el login ${error}`;
  }
};
