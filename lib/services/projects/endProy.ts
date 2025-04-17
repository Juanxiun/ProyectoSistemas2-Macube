import { db } from "../../database/connect.ts";

//conectar a la base de datos
const query = await db();

//terminar proyecto
const endProy = async (id: number) => {
  try {
    await query.query(
      `UPDATE proyectos habilitado = 0 WHERE id=?`,
      [id],
    );
  } catch (err) {
    console.error("Error al terminar el proyecto:\n", err);
    throw new Error("Error al TERMINAR el proyecto");
  }
};

//exportar
export { endProy };
