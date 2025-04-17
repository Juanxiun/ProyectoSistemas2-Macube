import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
  idproy: number;
  nombre: string;
  tipo: string;
  precio: number;
  imagen: string;
  direccion: string;
}

//registrar proyectos
const proyEdit = async (data: dataProps) => {
  try {
    await query.query(
      `UPDATE proyectos SET nombre=?, tipo=?, precio=?, imagen=?, direccion=? WHERE id = ?`,
      [
        data.nombre.toLowerCase(),
        data.tipo.toLowerCase(),
        data.precio,
        data.imagen,
        data.direccion,
        data.idproy
      ],
    );

  } catch (err) {
    console.error("Error - EDIT Proy:\n", err);
    throw new Error("Error - EDIT Proy.");
  }
};

export {proyEdit}