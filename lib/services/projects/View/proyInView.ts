import { db } from "../../../database/connect.ts";

const query = await db();

const proyInView = async (id: number) => {
  try {
    const result = await query.query(
      `SELECT 
        id, idpro, asunto, inspecciondes, fechains, estado
      FROM 
        proy_inspecciones 
      WHERE 
        idpro=?`,
      [id],
    );

    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error - registro Proy:\n", err);
    throw new Error("Error - registro Proy.");
  }
};

export { proyInView };
