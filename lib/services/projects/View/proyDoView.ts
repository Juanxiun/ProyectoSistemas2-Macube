import { db } from "../../../database/connect.ts";

const query = await db();

const proyDoView = async (id: number) => {
  try {
    const result = await query.query(
      `SELECT 
        id, idpro, nombredoc, tipodoc, publicado, archivo, descripcion 
      FROM 
        proy_documentos 
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

export { proyDoView };
