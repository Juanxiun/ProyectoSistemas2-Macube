import { db } from "../../../database/connect.ts";

const query = await db();

const proyView = async (id: number) => {
  try {
    const result = await query.query(
      `SELECT 
        id, cicli, codearq, nombre, tipo, precio, inicio, imagen, direccion 
      FROM 
        proyectos 
      WHERE 
        id= ?`,
      [id],
    );

    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error - view Proy:\n", err);
    throw new Error("Error - view Proy.");
  }
};

export { proyView };
