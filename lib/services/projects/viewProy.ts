import { db } from "../../database/connect.ts";

const query = await db();

//ver todos los proyectos
const viewProy = async (id?: number | string) => {
  //console.log(id);
  const esNumero = !isNaN(Number(id));

  try {
    const result = esNumero
      ? await query.query(
        `SELECT 
          id, nombre, tipo, precio, inicio, imagen, direccion 
        FROM 
          proyectos 
        WHERE 
          habilitado = 1 AND cicli = ?`,
        [id],
      )
      : await query.query(
        `SELECT 
          id, nombre, tipo, precio, inicio, imagen, direccion 
        FROM 
          proyectos 
        WHERE 
          habilitado = 1 AND codearq = ?`,
        [id],
      );

    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error during PROYECTOS view:\n", err);
    throw new Error("Failed to get project data.");
  }
};

//exportar el proyecto
export { viewProy };
