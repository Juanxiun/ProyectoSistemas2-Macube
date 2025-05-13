import { db } from "../../database/connect.ts";
import { typeArquitectos, typeClientes } from "../../type/typeUsuarios.ts";

const query = await db();

export const newArq = async (
  { codigo, ci, extension, nombre, apellido, telefono, correo, contra }:
    typeArquitectos,
) => {
  try {
    await query.query(
      `CALL createArq(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo,
        ci,
        extension,
        nombre,
        apellido,
        telefono,
        correo,
        contra,
      ],
    );
    return "OK";
  } catch (err) {
    console.log("ERROR. registro, arquitectos\n", err);
    return `ERROR. ${err}`;
  }
};

export const newCli = async (
  {
    ci,
    extension,
    nombre,
    apellido,
    departamento,
    direccion,
    telefono,
    correo,
    contra,
  }: typeClientes,
) => {
  try {
    await query.query(
      `CALL createCli(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ci,
        extension,
        nombre,
        apellido,
        departamento,
        direccion,
        telefono,
        correo,
        contra,
      ],
    );
    return "OK";
  } catch (err) {
    console.log("ERROR. registro, cliente\n", err);
    return `ERROR. ${err}`;
  }
};
