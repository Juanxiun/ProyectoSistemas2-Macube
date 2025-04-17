import { db } from "../../database/connect.ts";

const query = await db();

//propiedades
interface cliProps {
  ci: number;
  extension: string;
  nombre: string;
  apellido: string;
  telefono: number;
  telefono2?: number;
  direccion: string;
  correo: string;
  pass: string;
}

interface arqProps {
  codigo: string;
  ci: number;
  extension: string;
  nombre: string;
  apellido: string;
  telefono: number;
  telefono2?: number;
  direccion: string;
  correo: string;
  pass:string;
}

const createCli = async (data: cliProps) => {

  console.log(data.ci, " ", data.extension, " ", data.nombre, " ", data.apellido, " ", data.telefono, " ",
    data.telefono2, " ", data.direccion, " ", data.correo, " ", data.pass
  );
  try {
    await query.query(
      `
        INSERT INTO clientes
          (ci, extension,
            nombres, apellidos, telefono, 
            telefono2, direccion, correo, pass)  
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        data.ci,
        data.extension,
        data.nombre.toLowerCase(),
        data.apellido.toLowerCase(),
        data.telefono,
        data.telefono2? data.telefono2 : null,
        data.direccion,
        data.correo? data.correo : null,
        data.pass,
      ],
    );
    return "EXITO."
  } catch (err) {
    console.error("Error CLIENTES  update:\n", err);
    throw new Error("Error. CLIENTES update.");
  }
};

const createArq = async (data: arqProps) => {



  try {
    await query.query(
      `
        INSERT INTO arquitectos(
            codigo, ci, extnsion
            nombres, apellidos, telefono, 
            telefono2, direccion, correo, pass)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,);
        `,
      [
        data.codigo,
        data.ci,
        data.extension,
        data.nombre,
        data.apellido,
        data.telefono,
        data.telefono2,
        data.direccion,
        data.correo,
        data.pass,
      ],
    );
    return "EXITO."
  } catch (err) {
    console.error("Error ARQUITECTOS  update:\n", err);
    throw new Error("Error. ARQUITECTOS update.");
  }
};

export {createArq, createCli};