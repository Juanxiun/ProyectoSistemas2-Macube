import { db } from "../../database/connect.ts";

const query = await db();

export const delProy = async (id: number) => {
  try {
    await query.query(
      "UPDATE proyectos SET habilitado=0 WHERE id=?",
      [id],
    );
    return "OK";
  } catch (error) {
    console.log("ERRO al eliminar poryecto,\n", error);
    return `ERROR, ${error}`;
  }
};
