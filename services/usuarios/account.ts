import { isValidNumber } from "$std/semver/_shared.ts";
import { db } from "../../database/connect.ts";
import { typeArquitectos, typeClientes } from "../../type/typeUsuarios.ts";

//query db
const connect = await db();

export const clientEn = async (id: string) => {
  const result = isValidNumber(parseInt(id.toString()))
    ? await accountCli(parseInt(id))
    : await accountArq(id);

  return result;
};

export const returnClient = async (id?: string) => {
  //console.log("cliente");
  const user = await connect.query(
    `SELECT ci, nombre, apellido FROM clientes WHERE habilitado =1 ${
      id ? "AND  ci=?" : ""
    }`,
    [id ? id : null],
  );
  return user as typeClientes[] ?? [];
};

const accountArq = async (codigo: string) => {
  //console.log("arquitecto");
  const user = await connect.query("CALL viewArq(?)", [codigo]);
  return user as typeArquitectos[] ?? [];
};

const accountCli = async (ci: number) => {
  const user = await connect.query("CALL viewCli(?)", [ci]);
  return user[0] ?? [];
};
