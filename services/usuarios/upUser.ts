import { db } from "../../database/connect.ts";
import { typeArquitectos, typeClientes } from "../../type/typeUsuarios.ts";

const query = await db();

export const uptArq = async (
    data: typeArquitectos
) => {
  try {
    console.log(data.codigo, " ",data.ci," ", data.nombre," ",data.apellido," ",data.telefono," ",data.correo)
    await query.query(
      `CALL updateArq(?, ?, ?, ?, ?)`,
      [
        data.codigo,
        data.nombre,
        data.apellido,
        data.telefono,
        data.correo,
      ],
    );
    return "OK"
  } catch (err) {
    console.log("ERROR. registro, arquitectos\n", err);
    return `ERROR. ${err}`
  }
};

export const uptCli = async (
    data: typeClientes
) => {
  console.log(data.ci," ", data.nombre," ",data.apellido," ",data.departamento," ",data.direccion," ",data.telefono," ",data.correo)
  try {
    await query.query(
      `CALL updateCli(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.ci,
        data.extension,
        data.nombre,
        data.apellido,
        data.departamento,
        data.direccion,
        data.telefono,
        data.correo,
      ],
    );
    return "OK"
  } catch (err) {
    console.log("ERROR. registro, clientes\n", err);
    return `ERROR. ${err}`
  }
};