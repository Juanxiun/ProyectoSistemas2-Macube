import { db } from "../../database/connect.ts";

const query = await db();

//propiedades
interface cliProps {
  ci: number;
  nombre: string;
  apellido: string;
  telefono: number;
  telefono2?: number;
  direccion: string;
  correo: string;
}

interface arqProps {
  codigo: string;
  nombre: string;
  apellido: string;
  telefono: number;
  telefono2?: number;
  direccion: string;
  correo: string;
}

const updateCli = async (data: cliProps) => {
  try {
    await query.query(
      `
        UPDATE clientes SET 
            nombres= ?, apellidos= ?, telefono= ?, 
            telefono2= ?, direccion= ?, correo= ?
        WHERE
            ci = ?
      `,
      [
        data.nombre,
        data.apellido,
        data.telefono,
        data.telefono2,
        data.direccion,
        data.correo,
        data.ci,
      ],
    );
    return "EXITO."
  } catch (err) {
    console.error("Error CLIENTES  update:\n", err);
    throw new Error("Error. CLIENTES update.");
  }
};

const updateArq = async (data: arqProps) => {
  try {
    await query.query(
      `
          UPDATE arquitectos SET 
                nombres, apellidos, telefono, 
                telefono2, direccion, correo 
          WHERE
              codigo = ?
        `,
      [
        data.nombre,
        data.apellido,
        data.telefono,
        data.telefono2,
        data.direccion,
        data.correo,
        data.codigo,
      ],
    );
    return "EXITO."
  } catch (err) {
    console.error("Error ARQUITECTOS  update:\n", err);
    throw new Error("Error. ARQUITECTOS update.");
  }
};

export {updateArq, updateCli};