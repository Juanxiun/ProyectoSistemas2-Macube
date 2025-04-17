import { db } from "../../../database/connect.ts";

//conectar con la base de datos
const query = await db();

interface dataProps {
  cicli: number;
  codearq: string;
  nombre: string;
  tipo: string;
  precio: number;
  inicio: Date;
  imagen: string;
  direccion: string;
}

//registrar proyectos
const proyNew = async (data: dataProps) => {
  try {
    await query.query(
      `INSERT INTO proyectos (cicli, codearq, nombre, tipo, precio, inicio, imagen, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `,
      [
        data.cicli,
        data.codearq,
        data.nombre.toLowerCase(),
        data.tipo.toLowerCase(),
        data.precio,
        data.inicio,
        data.imagen ? data.imagen : null,
        data.direccion,
      ],
    );

    return "EXITO."
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

const proyID = async (codearq: string) => {
  try {
    const id = await query.query(
      `SELECT id
        FROM proyectos 
        WHERE codearq = ?
        ORDER BY id DESC
        LIMIT 1;`,
      [codearq],
    );
    return id;
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

//exportamos
export { proyID, proyNew };
